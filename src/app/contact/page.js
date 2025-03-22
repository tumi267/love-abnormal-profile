'use client';

import React from 'react';
import Link from 'next/link';
import styles from './contact.module.css';

function ContactPage() {
  let number = '0123456789';
  const address = 'Sandton, Johannesburg, South Africa';
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Contact Us</h1>

      <div className={styles.contactDetails}>
        <p>
          <strong>Email:</strong>{' '}
          <Link href="mailto:info@example.com" className={styles.link}>
            info@example.com
          </Link>
        </p>

        <p>
          <strong>WhatsApp:</strong>{' '}
          <Link
            href={`https://wa.me/${number}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Chat on WhatsApp
          </Link>
        </p>
      </div>

      <div className={styles.mapContainer}>
        <h3>{address}</h3>
        <iframe
          className={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.04137469393!2d28.054315315321!3d-26.107566583442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9573c3f3b2f0b5%3A0x4f5f8f5b9f5b9f5b!2sSandton%2C%20Johannesburg%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1611818169804!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactPage;
