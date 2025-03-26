'use client';

import React from 'react';
import Link from 'next/link';
import styles from './contact.module.css';

async function getContactData() {
  const query = `
    query {
      contact {
        id
        whatsapp
        email
        address
      }
    }
  `;

  try {
    const response = await fetch('/api/contactgraphql', {
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
    return result.data.contact;
  } catch (error) {
    console.error('Error fetching contact data:', error);
    return null;
  }
}

function ContactPage() {
  const [contactData, setContactData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const data = await getContactData();
      setContactData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading contact information...</div>;
  }

  // Fallback values if no contact data is available
  const whatsappNumber = contactData?.whatsapp ;
  const email = contactData?.email;
  const address = contactData?.address;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Contact Us</h1>

      <div className={styles.contactDetails}>
        <p>
          <strong>Email:</strong>{' '}
          <Link href={`mailto:${email}`} className={styles.link}>
            {email}
          </Link>
        </p>

        <p>
          <strong>WhatsApp:</strong>{' '}
          <Link
            href={`https://wa.me/${whatsappNumber}`}
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