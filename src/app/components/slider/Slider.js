'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import styles from './Slider.module.css';

function Slider({ sliderarr }) {
  // Duplicate the slider items to create an infinite scrolling effect
  const duplicatedItems = [...sliderarr, ...sliderarr];

  return (
    <div className={styles.slider_container}>
      <motion.div
        className={styles.slider}
        animate={{ x: ["0%", "-50%"] }} // Moves left continuously by 50% of the content width
        transition={{
          ease: "linear",
          duration: 30, // Adjust speed for the desired effect
          repeat: Infinity,
        }}
      >
        {duplicatedItems.map((e, i) => (
          <div key={i} className={styles.slide_item}>
            <Image src={e.url} height={150} width={150} alt={e.title} />
            <h4>{e.title}</h4>
            <h3>{e.preview}</h3>
            <h4>{e.date}</h4>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default Slider;
