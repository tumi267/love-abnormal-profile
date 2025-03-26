'use client';

import React from 'react';
import Link from 'next/link'; // Import Link from Next.js
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h3>Love Abnormal Profile</h3>
          <p>Empowering Communities, Changing Lives</p>
        </div>
        <div className={styles.middle}>
          <h4>Quick Links</h4>
          <ul className={styles.links_ul}>
            <li className={styles.links_li}><Link className={styles.links} href="/about">About Us</Link></li>
            <li className={styles.links_li}><Link className={styles.links} href="/activities">Activities</Link></li>
            <li className={styles.links_li}><Link className={styles.links} href="/donation">donation</Link></li>
            <li className={styles.links_li}><Link className={styles.links} href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className={styles.right}>
          <h4>Contact Us</h4>

        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; 2025 Love Abnormal Profile. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
