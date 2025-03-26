'use client'
import EventCard from '@/app/components/EventCard/EventCrad'
import Carousel from '@/app/components/ThreeDCarosel/ThreeDCarosel'
import React, { useEffect ,useState} from 'react'
import styles from './blog.module.css'
import { useParams } from 'next/navigation';
import Link from 'next/link'
import Loading from '@/app/loading'


function Categories() {
const category =useParams()
const { slug } = useParams(); // Extract category slug from URL params
const [articles, setArticles] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [drawerisopen, setDrawerIsOpen] = useState(false);
const [mobile, setMobile] = useState(false);
const [categories, setCategories] = useState([]);

useEffect(() => {
  async function fetchArticles() {
    try {
      const response = await fetch(`/api/articles-by-category/${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const data = await response.json();
     
      setArticles(data.articles); // Assuming the API returns an array of articles
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  
  if (slug) {
    fetchArticles();
  }
}, [slug]);

// Fetch Categories from GraphQL API
useEffect(() => {
  async function fetchCategories() {
    const query = `
      query {
        categories {
          id
          title
          description
          image
        }
      }
    `;

    try {
      const response = await fetch('/api/bloggraphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const { data } = await response.json();
      console.log(data.categories)
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  fetchCategories();
}, []);
      const caroseclArticles = articles.slice(0, 3);
      const toggleDrawer = () => {
        setDrawerIsOpen(!drawerisopen);
      };
      useEffect(() => {
  // Function to check if the screen is mobile
  const isMobile = () => window.innerWidth <= 768;

  // Function to update sideMenu display
  const updateSideMenuDisplay = () => {
    const sideMenu = document.querySelector(`.${styles.sideMenu}`);
    if (sideMenu) {
      if (isMobile()) {
        // On mobile, show/hide based on drawerisopen state
        sideMenu.style.display = drawerisopen ? 'block' : 'none';
        setMobile(true)
      } else {
        // On desktop, always show the sideMenu
        sideMenu.style.display = 'block';
        setMobile(false)
      }
    }
  };

  // Initial check
  updateSideMenuDisplay();

  // Add resize event listener
  window.addEventListener('resize', updateSideMenuDisplay);
  
  // Cleanup
  return () => window.removeEventListener('resize', updateSideMenuDisplay);
      }, [drawerisopen]);
      
      if (loading) return <Loading/>
      return (
        <div className={styles.mainContent}>
        {mobile&&<button onClick={()=>{toggleDrawer()}}>burger</button>}
        <div className={styles.sideMenu}>
              <h3>Categories</h3>
              {categories.map((e) => (
                <div key={e.id} className={styles.menuItem}>
                  <Link className={styles.link} href={`/blog/${e.title.replace(/\s+/g, '-')}`}>
                   
                      <h4>{e.title}</h4>
                      <p>{e.description}</p>
                   
                  </Link>
                </div>
              ))}
            </div>
        <div>
          <Carousel carouselItems={caroseclArticles} />
          <div className={styles.header}>
            <h2>{category.slug}</h2>
          </div>
          
          
            <div className={styles.articles}>
              {articles.map((e) => (
                <div key={e.id}>
                  <EventCard event={e}
                  typeArticle={true} />
                </div>
              ))}
            </div>
        </div>  

          
        </div>
      );
    }
    
export default Categories;