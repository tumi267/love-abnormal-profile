'use client'
import React from 'react';
import styles from './AboutUs.module.css';

function AboutUs() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>About Our NPO</h1>
        <p>Dedicated to making a difference in health, sports, and wellness.</p>
      </section>

      <section className={styles.mission}>
        <h2>Our Mission</h2>
        <p>
          We strive to improve lives by promoting health, sports, and wellness programs in local communities. 
          Through education, outreach, and engagement, we empower individuals to lead healthier lives.
        </p>
      </section>

      <section className={styles.team}>
        <h2>Meet Our Team</h2>
        <div className={styles.teamGrid}>
          <div className={styles.member}>
            <img src="/team1.jpg" alt="Team Member 1" />
            <p>John Doe - Founder</p>
          </div>
          <div className={styles.member}>
            <img src="/team2.jpg" alt="Team Member 2" />
            <p>Jane Smith - Operations</p>
          </div>
          <div className={styles.member}>
            <img src="/team3.jpg" alt="Team Member 3" />
            <p>Michael Johnson - Outreach</p>
          </div>
        </div>
      </section>

      <section className={styles.impact}>
        <h2>Our Impact</h2>
        <p>Over 10,000 lives touched through our health and sports initiatives.</p>
      </section>
    </div>
  );
}

export default AboutUs;
