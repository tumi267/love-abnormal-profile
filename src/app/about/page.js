'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './AboutUs.module.css';
import Image from 'next/image';

// Team data stored in an array
const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Founder',
    image: '/team1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Operations',
    image: '/team2.jpg',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    role: 'Outreach',
    image: '/team3.jpg',
  },
];
const slogan='Dedicated to making a difference in health, sports, and wellness.'
const mission='We strive to improve lives by promoting health, sports, and wellness programs in local communities. Through education, outreach, and engagement, we empower individuals to lead healthier lives.'
const impact='Over 10,000 lives touched through our health and sports initiatives.'
function AboutUs() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>About Our NPO</h1>
        <p>{slogan}</p>
      </section>

      <section className={styles.mission}>
        <h2>Our Mission</h2>
        <p>
          {mission}
        </p>
      </section>

      <section className={styles.team}>
        <h2>Meet Our Team</h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <TeamMember key={member.id} member={member} index={index} />
          ))}
        </div>
      </section>

      <section className={styles.impact}>
        <h2>Our Impact</h2>
        <p>{impact}</p>
      </section>
    </div>
  );
}

// TeamMember component with Framer Motion animations
function TeamMember({ member, index }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' }); // Trigger animation when in view

  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={styles.member}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.3, duration: 0.5 }} // Staggered delay based on index
    >
      <div className={styles.image_contain}>
      <Image src={member.image} fill alt={member.name} />
      </div>
      <p>
        {member.name} - {member.role}
      </p>
    </motion.div>
  );
}

export default AboutUs;
