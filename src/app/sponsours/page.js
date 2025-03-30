'use client';
import React, { useEffect, useState } from 'react';
import styles from './sonsours.module.css';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 3600;

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

  const response = await fetch(`${process.env.API_URL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch sponsors');
  }

  const result = await response.json();
  return result.data.sponsours;
}

export default async function Sponsours() {
  const sponsorsData = await getSponsors();

  return (
    <div className={styles.sponsorsPage}>
      <h1 className={styles.pageTitle}>Our Sponsors</h1>
      
      {sponsorsData.length === 0 ? (
        <div className={styles.noSponsors}>
          <p>No sponsors found</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
