'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './AboutUs.module.css';
import Image from 'next/image';

async function getAboutData() {
  const query = `
    query {
      about {
        id
        heroTitle
        heroMsg
        missionTitle
        missionMsg
        team {
          name
          position
        }
        impactTitle
        impactMsg
      }
    }
  `;

  try {
    const response = await fetch('/api/aboutgraphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result.data.about;
  } catch (error) {
    console.error('Error fetching about data:', error);
    return null;
  }
}

function AboutUs() {
  const [aboutData, setAboutData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const data = await getAboutData();
      setAboutData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!aboutData) {
    return <div className={styles.error}>Failed to load data</div>;
  }

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        {/* image fill */}
        <h1>{aboutData.heroTitle}</h1>
        <p>{aboutData.heroMsg }</p>
      </section>

      <section className={styles.mission}>
        <h2>{aboutData.missionTitle}</h2>
        <p>{aboutData.missionMsg}</p>
      </section>

      <section className={styles.team}>
        <h2>Meet Our Team</h2>
        <div className={styles.teamGrid}>
          {aboutData.team?.map((member, index) => (
            <TeamMember key={index} member={member} index={index} />
          ))}
        </div>
      </section>

      <section className={styles.impact}>
        <h2>{aboutData.impactTitle }</h2>
        <p>{aboutData.impactMsg}</p>
      </section>
    </div>
  );
}

function TeamMember({ member, index }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
      transition={{ delay: index * 0.3, duration: 0.5 }}
    >
      <div className={styles.image_contain}>
      {member.image&&<Image 
          src={member.image } 
          alt={member.name} 
          fill
          style={{ objectFit: 'cover' }}
          onError={(e) => {
            e.currentTarget.src = '/team-default.jpg';
          }}
        />}
      </div>
      <p>
        {member.name} - {member.position}
      </p>
    </motion.div>
  );
}

export default AboutUs;