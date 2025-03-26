'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // Import Link from Next.js
import styles from './Carousel.module.css'; // Make sure to create this file for styling

function Carousel({ carouselItems }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const prevItem = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextItem, 4000); // 4000ms = 4 seconds
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div className={styles.carouselContainer}>
      <motion.div
        className={styles.carousel}
        initial={{ rotateY: -180 }}
        animate={{ rotateY: 0 }}
        exit={{ rotateY: 180 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.carouselWrapper}>
          {carouselItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={styles.carouselItem}
              style={{
                transform: `rotateY(${(index - currentIndex) * 60}deg) translateZ(300px)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link href={`/blog/${item.category}/${item.id}`} passHref> {/* Link to the category with the item's id */}
                
                  {/* <img src={item.image} alt={item.title} className={styles.carouselImage} /> */}
                  <h3>{item.title}</h3>
                  <p>{item.preview}</p>
                  <small>{item.date}</small>
                
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <button className={styles.prevButton} onClick={prevItem}>
        &#10094;
      </button>
      <button className={styles.nextButton} onClick={nextItem}>
        &#10095;
      </button>
    </div>
  );
}

export default Carousel;

