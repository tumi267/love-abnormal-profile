'use client';
import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './AboutUs.module.css';
import Image from 'next/image';
import Loading from '../loading';

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
          image
        }
        impactTitle
        impactMsg
      }
    }
  `;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/aboutgraphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data?.about || null;
  } catch (error) {
    console.error('Error fetching about data:', error);
    return null;
  }
}

function AboutUs() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const data = await getAboutData();
        if (!data) {
          throw new Error('No data received');
        }
        setAboutData(data);
      } catch (err) {
        setError('Failed to load about data');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => abortController.abort();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!aboutData) return <div className={styles.error}>No data available</div>;

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
            alt={member.name} 
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
      </div>
      <div className={styles.memberInfo}>
        <h3>{member.name}</h3>
        <p>{member.position}</p>
      </div>
    </motion.div>
  );
}

export default AboutUs;