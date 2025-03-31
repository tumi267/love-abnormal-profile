// app/blog/page.js
export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import styles from './blog.module.css';
import Carousel from '../components/ThreeDCarosel/ThreeDCarosel';
import EventCard from '../components/EventCard/EventCrad';

async function getBlogData(selectedCategory = null) {
  try {
    // Fetch categories and articles in parallel
    const [categoriesResponse, articlesResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/bloggraphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              categories {
                id
                title
                description
                image
                href
              }
            }
          `
        }),
        cache: 'no-store'
      }),
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/bloggraphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              ${selectedCategory ? `articles(category: "${selectedCategory}", limit: 10)` : 'articles(limit: 10)'} {
                id
                title
                category
                preview
                date
                href
                image
              }
            }
          `
        }),
        cache: 'no-store'
      })
    ]);

    if (!categoriesResponse.ok || !articlesResponse.ok) {
      throw new Error('Failed to fetch blog data');
    }

    const [categoriesResult, articlesResult] = await Promise.all([
      categoriesResponse.json(),
      articlesResponse.json()
    ]);

    return {
      categories: categoriesResult.data?.categories || [],
      articles: articlesResult.data?.articles || []
    };
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return {
      categories: [],
      articles: [],
      error: 'Failed to load blog data'
    };
  }
}

export default async function BlogPage({ searchParams }) {
  const selectedCategory = searchParams?.category || null;
  const { categories, articles, error } = await getBlogData(selectedCategory);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      {/* Articles Carousel */}
      <div className={styles.carouselSection}>
        {articles.length > 0 ? (
          <Carousel carouselItems={articles} />
        ) : (
          <p className={styles.noArticles}>No articles found</p>
        )}
      </div>

      {/* Categories Section */}
      <div className={styles.categoriesSection}>
        <div className={styles.header}>
          <h2>Categories</h2>
        </div>
        
        <div className={styles.card_contain}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/blog?category=${category.title}`}
                className={`${styles.categoryCard} ${selectedCategory === category.title ? styles.selected : ''}`}
              >
                <EventCard 
                  event={category}
                  isSelected={selectedCategory === category.title}
                />
              </Link>
            ))
          ) : (
            <p className={styles.noCategories}>No categories available</p>
          )}
        </div>
      </div>
    </div>
  );
}