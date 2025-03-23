'use client'; // Mark as a Client Component

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import the Image component
import styles from './Sponsors.module.css'; // Import the CSS module

function Sponsors() {
  const [sponsours, setSponsours] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  // Fetch all sponsours
  const fetchSponsours = async () => {
    const query = `
      query SponsourList {
        sponsours {
          id
          name
          image
          url
        }
      }
    `;

    const response = await fetch('/api/sponsoursgraphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    if (result.data && result.data.sponsours) {
      setSponsours(result.data.sponsours);
    }
  };

  // Add a new sponsour
  const addSponsour = async () => {
    const mutation = `
      mutation AddSponsour($name: String!, $image: String!, $url: String!) {
        addSponsour(name: $name, image: $image, url: $url) {
          id
          name
          image
          url
        }
      }
    `;

    const variables = {
      name,
      image,
      url,
    };

    const response = await fetch('/api/sponsoursgraphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const result = await response.json();
    if (result.data && result.data.addSponsour) {
      alert('Sponsour added successfully!');
      fetchSponsours(); // Refresh the list
      setName(''); // Reset form fields
      setImage('');
      setUrl('');
    } else if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
    }
  };

  // Update a sponsour
  const updateSponsour = async (id) => {
    const mutation = `
      mutation UpdateSponsour($id: ID!, $name: String!, $image: String!, $url: String!) {
        updateSponsour(id: $id, name: $name, image: $image, url: $url) {
          id
          name
          image
          url
        }
      }
    `;

    const variables = {
      id,
      name,
      image,
      url,
    };

    const response = await fetch('/api/sponsoursgraphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const result = await response.json();
    if (result.data && result.data.updateSponsour) {
      alert('Sponsour updated successfully!');
      fetchSponsours(); // Refresh the list
      setName(''); // Reset form fields
      setImage('');
      setUrl('');
    } else if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
    }
  };

  // Delete a sponsour
  const deleteSponsour = async (id) => {
    const mutation = `
      mutation DeleteSponsour($id: ID!) {
        deleteSponsour(id: $id)
      }
    `;

    const response = await fetch('/api/sponsoursgraphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation, variables: { id } }),
    });

    const result = await response.json();
    if (result.data && result.data.deleteSponsour) {
      alert('Sponsour deleted successfully!');
      fetchSponsours(); // Refresh the list
    } else if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
    }
  };

  // Fetch sponsours on component mount
  useEffect(() => {
    fetchSponsours();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Sponsours</h1>

      {/* Display existing sponsours */}
      <div className={styles.sponsoursList}>
        <h2 className={styles.subtitle}>Existing Sponsours</h2>
        {sponsours.map((sponsour) => (
          <div key={sponsour.id} className={styles.sponsourCard}>
            <h3 className={styles.sponsourName}>{sponsour.name}</h3>
            <div className={styles.sponsourImage}>
              <Image
                src={sponsour.image}
                alt={sponsour.name}
                width={100}
                height={100}
                className={styles.image}
              />
            </div>
            <a
              href={sponsour.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.websiteLink}
            >
              Visit Website
            </a>
            <div className={styles.actions}>
              <button
                onClick={() => updateSponsour(sponsour.id)}
                className={styles.updateButton}
              >
                Update
              </button>
              <button
                onClick={() => deleteSponsour(sponsour.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Sponsour Form */}
      <div className={styles.formContainer}>
        <h2 className={styles.subtitle}>Add/Edit Sponsour</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Website URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={styles.input}
          />
        </div>
        <button onClick={addSponsour} className={styles.addButton}>
          Add Sponsour
        </button>
      </div>
    </div>
  );
}

export default Sponsors;