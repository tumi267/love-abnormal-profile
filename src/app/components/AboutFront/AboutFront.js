'use client';
import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './About.module.css';
import Image from 'next/image';
import Loading from '../../loading';

function AboutFront({ aboutData, isLoading }) {
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <motion.section 
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>{aboutData.heroTitle}</h1>
        <p>{aboutData.heroMsg}</p>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        className={styles.mission}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2>{aboutData.missionTitle}</h2>
        <p>{aboutData.missionMsg}</p>
      </motion.section>

      {/* Team Section */}
      <section className={styles.team}>
        <h2>Meet Our Team</h2>
        <div className={styles.teamGrid}>
          {aboutData.team?.length > 0 ? (
            aboutData.team.map((member, index) => (
              <TeamMember key={`${member.name}-${index}`} member={member} index={index} />
            ))
          ) : (
            <p className={styles.noTeam}>No team members to display</p>
          )}
        </div>
      </section>

      {/* Impact Section */}
      <motion.section 
        className={styles.impact}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2>{aboutData.impactTitle}</h2>
        <p>{aboutData.impactMsg}</p>
      </motion.section>
    </div>
  );
}

function TeamMember({ member, index }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={styles.member}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className={styles.image_contain}>
        {member.image ? (
          <Image 
            src={member.image} 
            alt={member.name || 'Team member'} 
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.initials}>
              {member.name?.split(' ').map(n => n[0]).join('') || 'TM'}
            </span>
          </div>
        )}
      </div>
      <div className={styles.memberInfo}>
        <h3>{member.name || 'Team Member'}</h3>
        <p>{member.position || 'Position'}</p>
      </div>
    </motion.div>
  );
}

export default React.memo(AboutFront);