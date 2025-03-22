import React from 'react'
import Carousel from '../components/ThreeDCarosel/ThreeDCarosel'
import EventCard from '../components/EventCard/EventCrad';
import styles from './blog.module.css'
function page() {
    // graphQl
    const articles = [
        {
          id: 1,
          title: "Adaptive Workouts: Staying Fit with Limited Mobility",
          category: "Disability & Fitness",
          image: "/images/adaptive-workout.jpg",
          preview: "Discover workout modifications designed for individuals with mobility challenges.",
          date: "2025-03-21"
        },
        {
          id: 2,
          title: "The Best Superfoods for Heart Health",
          category: "Nutrition",
          image: "/images/heart-health.jpg",
          preview: "Support your heart with these nutrient-rich superfoods that promote cardiovascular wellness.",
          date: "2025-03-19"
        },
        {
          id: 3,
          title: "Managing Anxiety with Simple Breathing Techniques",
          category: "Mental Health",
          image: "/images/breathing-techniques.jpg",
          preview: "Reduce stress and anxiety with easy-to-follow breathing exercises.",
          date: "2025-03-18"
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
      
  return (
    <div>
        <Carousel
        carouselItems={articles}
        />
        <div className={styles.header}>
        <h2>Categories</h2>
        </div>
        
        <div className={styles.card_contain}>
    {categories.map((e)=>{
        return(<div key={e.id}>
          <EventCard
          event={e}/>
        </div>)
      })}
      </div>
    </div>
  )
}

export default page