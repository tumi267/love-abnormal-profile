'use client'
import EventCard from '@/app/components/EventCard/EventCrad'
import Carousel from '@/app/components/ThreeDCarosel/ThreeDCarosel'
import React, { useEffect ,useState} from 'react'
import styles from './blog.module.css'
import { useParams } from 'next/navigation';
import Link from 'next/link'


function Categories() {
const category =useParams()
const [drawerisopen, setDrawerIsOpen] = useState(false);
const [mobile,setmobile]=useState(false)
    //graphQl call
    const articles = [
        {
          id: 1,
          title: "Adaptive Workouts: Staying Fit with Limited Mobility",
          category: "Disability & Fitness",
          image: "/images/adaptive-workout.jpg",
          preview: "Discover workout modifications designed for individuals with mobility challenges.",
          date: "2025-03-21",
          hrefA: `/blog/${category.slug}/1`
        },
        {
          id: 2,
          title: "The Best Superfoods for Heart Health",
          category: "Nutrition",
          image: "/images/heart-health.jpg",
          preview: "Support your heart with these nutrient-rich superfoods that promote cardiovascular wellness.",
          date: "2025-03-19",
          hrefA: `/blog/${category.slug}/2`
        },
        {
          id: 3,
          title: "Managing Anxiety with Simple Breathing Techniques",
          category: "Mental Health",
          image: "/images/breathing-techniques.jpg",
          preview: "Reduce stress and anxiety with easy-to-follow breathing exercises.",
          date: "2025-03-18",
          hrefA: `/blog/${category.slug}/3`
        },
        {
          id: 4,
          title: "How to Create an Inclusive Gym Space for Everyone",
          category: "Accessibility & Fitness",
          image: "/images/inclusive-gym.jpg",
          preview: "Learn how gyms can become more welcoming and accessible to individuals with disabilities.",
          date: "2025-03-15",
          hrefA: `/blog/${category.slug}/4`
        },
        {
          id: 5,
          title: "Hydrotherapy: The Healing Benefits of Water Exercise",
          category: "Rehabilitation & Recovery",
          image: "/images/hydrotherapy.jpg",
          preview: "Discover how hydrotherapy can aid in pain relief, rehabilitation, and improved mobility.",
          date: "2025-03-12",
          hrefA: `/blog/${category.slug}/5`
        },
        {
          id: 6,
          title: "The Connection Between Sleep and Physical Recovery",
          category: "Wellness",
          image: "/images/sleep-recovery.jpg",
          preview: "Explore how quality sleep impacts muscle recovery and overall health.",
          date: "2025-03-10",
          hrefA: `/blog/${category.slug}/6`
        }
      ];
      const categories = [
        { 
          id: 1, 
          title: "Disability & Fitness", 
          description: "Explore fitness routines and wellness tips tailored for individuals with disabilities.", 
          image: "/images/disability-fitness.jpg",
          href: "/blog/disability-fitness" // Updated link
        },
        { 
          id: 2, 
          title: "Nutrition", 
          description: "Learn about the best foods for your health, including heart-healthy meals and more.", 
          image: "/images/nutrition.jpg",
          href: "/blog/nutrition" // Updated link
        },
        { 
          id: 3, 
          title: "Mental Health", 
          description: "Discover mental health resources, coping strategies, and support techniques.", 
          image: "/images/mental-health.jpg",
          href: "/blog/mental-health" // Updated link
        },
        { 
          id: 4, 
          title: "Accessibility & Fitness", 
          description: "Creating fitness spaces that are accessible and inclusive for everyone.", 
          image: "/images/accessibility-fitness.jpg",
          href: "/blog/accessibility-fitness" // Updated link
        },
        { 
          id: 5, 
          title: "Rehabilitation & Recovery", 
          description: "Learn about recovery techniques and rehabilitation programs to regain strength and mobility.", 
          image: "/images/rehabilitation-recovery.jpg",
          href: "/blog/rehabilitation-recovery" // Updated link
        },
        { 
          id: 6, 
          title: "Wellness", 
          description: "Holistic wellness tips, from mindfulness to sleep hygiene and everything in between.", 
          image: "/images/wellness.jpg",
          href: "/blog/wellness" // Updated link
        },
      ];
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
        setmobile(true)
      } else {
        // On desktop, always show the sideMenu
        sideMenu.style.display = 'block';
        setmobile(false)
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
      return (
        <div className={styles.mainContent}>
        {mobile&&<button onClick={()=>{toggleDrawer()}}>burger</button>}
        <div className={styles.sideMenu}>
              <h3>Categories</h3>
              {categories.map((e) => (
                <div key={e.id} className={styles.menuItem}>
                  <Link className={styles.link} href={e.href}>
                   
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
                  <EventCard event={e} />
                </div>
              ))}
            </div>
        </div>  

          
        </div>
      );
    }
    
export default Categories;