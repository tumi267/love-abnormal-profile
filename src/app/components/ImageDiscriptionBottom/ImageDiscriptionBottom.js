'use client';
import React, { useState } from 'react';
import styles from './ImageDiscriptionBottom.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';

function ImageDiscriptionBottom({ url, title, discprtion, link }) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (isHovered) {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => setIsHovered(false);

  return (
    <motion.div
      className={styles.card} // Wrapping div for the entire card
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? -(position.y - window.innerHeight / 2) / 30 : 0, // Smaller tilt effect
        rotateY: isHovered ? -(position.x - window.innerWidth / 2) / 30 : 0, // Smaller tilt effect
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 10,
      }}
    >
      {url && (
        <div
          className={styles.image_contain}
        >
          <Image src={url} fill alt="image" />
        </div>
      )}

      <div className={styles.text_contain}>
        <h3>{title}</h3>
        <p>{discprtion}</p>
      </div>
    </motion.div>
  );
}

export default ImageDiscriptionBottom;


