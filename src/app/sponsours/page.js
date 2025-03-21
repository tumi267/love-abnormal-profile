import React from 'react'
import styles from './sonsours.module.css'
import Link from 'next/link'
function sponsours() {
  const sponsorsData = [
    {
      name: "Department of Health",
      logo: "", // Add logos to the public/images directory
      link: "https://www.health.gov.za",
    },
    {
      name: "Sport South Africa",
      logo: "",
      link: "https://www.srsa.gov.za",
    },
    {
      name: "Wellness Warehouse",
      logo: "",
      link: "https://www.wellnesswarehouse.com",
    },
    {
      name: "Discovery Health",
      logo: "",
      link: "https://www.discovery.co.za",
    },
    {
      name: "Sanlam Health",
      logo: "",
      link: "https://www.sanlam.co.za",
    },
    {
      name: "South African Sports Confederation and Olympic Committee (SASCOC)",
      logo: "",
      link: "https://www.sascoc.co.za",
    },
    {
      name: "The Heart and Stroke Foundation South Africa",
      logo: "",
      link: "https://www.heartfoundation.co.za",
    },
    {
      name: "Bidvest Wellness",
      logo: "/images/bidvest-wellness.png",
      link: "https://www.bidvest-wellness.co.za",
    },
    {
      name: "Sizwe Health Fund",
      logo: "",
      link: "https://www.sizwehealth.co.za",
    },
    {
      name: "Virgin Active South Africa",
      logo: "",
      link: "https://www.virginactive.co.za",
    },
  ];
  
  return (
    <div className={styles.sponsorsPage}>
    <h1 className={styles.pageTitle}>Our Sponsors</h1>
    <div className={styles.sponsorGrid}>
      {sponsorsData.map((sponsor, index) => (
        <div key={index} className={styles.sponsorCard}>
          {/* Use Next.js Link for internal and external links */}
          <Link href={sponsor.link} passHref>
            <div className={styles.cardContent}>
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className={styles.sponsorLogo}
              />
              <p className={styles.sponsorName}>{sponsor.name}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
  )
}

export default sponsours