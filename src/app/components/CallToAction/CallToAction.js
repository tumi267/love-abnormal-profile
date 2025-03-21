'use client'
import Link from 'next/link'
import React from 'react'
import styles from './CalltoAction.module.css'
import { motion } from 'framer-motion';

function CallToAction({ action, link }) {
  return (
    <motion.div
      className={styles.btn}
      whileHover={{ scale: 1.1, rotateX: 10, rotateY: 10 }}  // Simulates depth with rotation
      whileTap={{ scale: 0.95 }}  // Slightly scales down on click
      transition={{ type: 'spring', stiffness: 200 }} // Smooth transition
    >
      <Link className={styles.link} href={`/${link}`}>
        {action}
      </Link>
    </motion.div>
  );
}

export default CallToAction;


