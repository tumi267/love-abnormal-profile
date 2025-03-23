'use client'; // Mark as a Client Component

import React, { useState, useEffect } from 'react';
import styles from './Contact.module.css'; // Import the CSS module

function Contact() {
  const [contact, setContact] = useState(null); // Single contact state
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  // Fetch the single contact
  const fetchContact = async () => {
    const query = `
      query GetContact {
        contact {
          id
          whatsapp
          email
          address
        }
      }
    `;

    const response = await fetch('/api/contactgraphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    if (result.data && result.data.contact) {
      setContact(result.data.contact);
      // Pre-fill the form fields with the existing contact data
      setWhatsapp(result.data.contact.whatsapp);
      setEmail(result.data.contact.email);
      setAddress(result.data.contact.address);
    }
  };

  // Update the single contact
  const updateContact = async () => {
    const mutation = `
      mutation UpdateContact($whatsapp: String!, $email: String!, $address: String!) {
        updateContact(whatsapp: $whatsapp, email: $email, address: $address) {
          id
          whatsapp
          email
          address
        }
      }
    `;

    const variables = {
      whatsapp,
      email,
      address,
    };

    const response = await fetch('/api/contactgraphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const result = await response.json();
    if (result.data && result.data.updateContact) {
      alert('Contact updated successfully!');
      fetchContact(); // Refresh the contact
    } else if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
    }
  };

  // Fetch the contact on component mount
  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Contact</h1>

      {/* Display Contact Details */}
      <div className={styles.contactDetails}>
        {contact ? (
          <div>
            <p><strong>WhatsApp:</strong> {contact.whatsapp}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Address:</strong> {contact.address}</p>
          </div>
        ) : (
          <p>No details found.</p>
        )}
      </div>

      {/* Edit Contact Form */}
      <div className={styles.editForm}>
        <h2 className={styles.subtitle}>Edit Contact</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>WhatsApp:</label>
          <input
            type="text"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={styles.input}
          />
        </div>
        <button onClick={updateContact} className={styles.button}>
          Update Contact
        </button>
      </div>
    </div>
  );
}

export default Contact;