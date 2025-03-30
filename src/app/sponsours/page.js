'use client';
import React, { useEffect, useState } from 'react';
import styles from './sonsours.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Loading from '../loading';

function Sponsours() {
  const [sponsorsData, setSponsorsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSponsors() {
      const query = `
        query {
          sponsours {
            id
            name
            image
            url
          }
        }
      `;

      try {
        const response = await fetch('/api/sponsoursgraphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        setSponsorsData(result.data.sponsours);
      } catch (error) {
        console.error('Error fetching sponsors:', error);
        setSponsorsData([]);
      } finally {
        setLoading(false);
      }
    }

    getSponsors();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className={styles.sponsorsPage}>
      <h1 className={styles.pageTitle}>Our Sponsors</h1>
      <div className={styles.sponsorGrid}>
        {sponsorsData.map((sponsor) => (
          <div key={sponsor.id} className={styles.sponsorCard}>
            <Link href={sponsor.url} passHref target="_blank" className={styles.links} rel="noopener noreferrer">
              <div className={styles.cardContent}>
                <div className={styles.sponsorLogo}>
                  {sponsor.image ? (
                    <Image
                      src={sponsor.image}
                      alt={sponsor.name}
                      width={150}
                      height={100}
                      style={{ objectFit: 'contain' }}
                      onError={(e) => (e.currentTarget.src = '/images/default-sponsor.png')}
                    />
                  ) : (
                    <div className={styles.sponsorNameFallback}>{sponsor.name}</div>
                  )}
                </div>
                <p className={styles.sponsorName}>{sponsor.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sponsours;
