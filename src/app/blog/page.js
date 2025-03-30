'use client'
import { useState, useEffect } from 'react'
import Carousel from '../components/ThreeDCarosel/ThreeDCarosel'
import EventCard from '../components/EventCard/EventCrad'
import styles from './blog.module.css'
import Loading from '../loading'

function BlogPage() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch categories
        const categoriesResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/bloggraphql`, {
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
          signal: abortController.signal
        })

        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories')
        }

        const categoriesResult = await categoriesResponse.json()
        setCategories(categoriesResult.data?.categories || [])

        // Fetch articles
        const articlesQuery = selectedCategory 
          ? `articles(category: "${selectedCategory}", limit: 10)`
          : 'articles(limit: 10)'

        const articlesResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/bloggraphql`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query {
                ${articlesQuery} {
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
          signal: abortController.signal
        })

        if (!articlesResponse.ok) {
          throw new Error('Failed to fetch articles')
        }

        const articlesResult = await articlesResponse.json()
        setArticles(articlesResult.data?.articles || [])
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to fetch data. Please try again later.')
          console.error('Error fetching data:', err)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    return () => abortController.abort()
  }, [selectedCategory])

  const handleCategorySelect = (categoryTitle) => {
    setSelectedCategory(prev => prev === categoryTitle ? null : categoryTitle)
  }

  if (isLoading) return <Loading />
  if (error) return <div className={styles.error}>{error}</div>

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
              <div 
                key={category.id} 
                className={`${styles.categoryCard} ${selectedCategory === category.title ? styles.selected : ''}`}
                onClick={() => handleCategorySelect(category.title)}
              >
                <EventCard 
                  event={category}
                  isSelected={selectedCategory === category.title}
                />
              </div>
            ))
          ) : (
            <p className={styles.noCategories}>No categories available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPage