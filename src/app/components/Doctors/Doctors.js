'use client'; // Mark as a Client Component

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import the Image component
import styles from './PractitionersManager.module.css'; // Import the CSS module

function PractitionersManager() {
  const [practitioners, setPractitioners] = useState([]);
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const [bookingLink, setBookingLink] = useState('');

  // Fetch all practitioners
  const fetchPractitioners = async () => {
    const query = `
      query PractitionerList {
        practitioners {
          id
          name
          specialization
          bio
          email
          phone
          image
          bookingLink
        }
      }
    `;

    const response = await fetch('/api/practitionersgraphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    if (result.data && result.data.practitioners) {
      setPractitioners(result.data.practitioners);
    }
  };

  // Add a new practitioner
  const addPractitioner = async () => {
    const mutation = `
      mutation AddPractitioner($name: String!, $specialization: String!, $bio: String!, $email: String!, $phone: String!, $image: String!, $bookingLink: String!) {
        addPractitioner(name: $name, specialization: $specialization, bio: $bio, email: $email, phone: $phone, image: $image, bookingLink: $bookingLink) {
          id
          name
          specialization
          bio
          email
          phone
          image
          bookingLink
        }
      }
    `;

    const variables = {
      name,
      specialization,
      bio,
      email,
      phone,
      image,
      bookingLink,
    };

    const response = await fetch('/api/practitionersgraphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const result = await response.json();
    if (result.data && result.data.addPractitioner) {
      alert('Practitioner added successfully!');
      fetchPractitioners(); // Refresh the list
      // Reset form fields
      setName('');
      setSpecialization('');
      setBio('');
      setEmail('');
      setPhone('');
      setImage('');
      setBookingLink('');
    } else if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
    }
  };

  // Update a practitioner
  const updatePractitioner = async (id) => {
    const mutation = `
      mutation UpdatePractitioner($id: ID!, $name: String!, $specialization: String!, $bio: String!, $email: String!, $phone: String!, $image: String!, $bookingLink: String!) {
        updatePractitioner(id: $id, name: $name, specialization: $specialization, bio: $bio, email: $email, phone: $phone, image: $image, bookingLink: $bookingLink) {
          id
          name
          specialization
          bio
          email
          phone
          image
          bookingLink
        }
      }
    `;

    const variables = {
      id,
      name,
      specialization,
      bio,
      email,
      phone,
      image,
      bookingLink,
    };

    const response = await fetch('/api/practitionersgraphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const result = await response.json();
    if (result.data && result.data.updatePractitioner) {
      alert('Practitioner updated successfully!');
      fetchPractitioners(); // Refresh the list
      // Reset form fields
      setName('');
      setSpecialization('');
      setBio('');
      setEmail('');
      setPhone('');
      setImage('');
      setBookingLink('');
    } else if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
    }
  };

  // Delete a practitioner
  const deletePractitioner = async (id) => {
    const mutation = `
      mutation DeletePractitioner($id: ID!) {
        deletePractitioner(id: $id)
      }
    `;

    const response = await fetch('/api/practitionersgraphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation, variables: { id } }),
    });

    const result = await response.json();
    if (result.data && result.data.deletePractitioner) {
      alert('Practitioner deleted successfully!');
      fetchPractitioners(); // Refresh the list
    } else if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
    }
  };

  // Fetch practitioners on component mount
  useEffect(() => {
    fetchPractitioners();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Practitioners</h1>

      {/* Display existing practitioners */}
      <div className={styles.practitionersList}>
        <h2 className={styles.subtitle}>Existing Practitioners</h2>
        {practitioners.map((practitioner) => (
          <div key={practitioner.id} className={styles.practitionerCard}>
            <div className={styles.practitionerImage}>
              <Image
                src={practitioner.image}
                alt={practitioner.name}
                width={100}
                height={100}
                className={styles.image}
              />
            </div>
            <div className={styles.practitionerDetails}>
              <h3 className={styles.practitionerName}>{practitioner.name}</h3>
              <p className={styles.practitionerSpecialization}>{practitioner.specialization}</p>
              <p className={styles.practitionerBio}>{practitioner.bio}</p>
              <p className={styles.practitionerContact}>
                <strong>Email:</strong> {practitioner.email}
              </p>
              <p className={styles.practitionerContact}>
                <strong>Phone:</strong> {practitioner.phone}
              </p>
              <a
                href={practitioner.bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bookingLink}
              >
                Book Appointment
              </a>
            </div>
            <div className={styles.actions}>
              <button
                onClick={() => updatePractitioner(practitioner.id)}
                className={styles.updateButton}
              >
                Update
              </button>
              <button
                onClick={() => deletePractitioner(practitioner.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Practitioner Form */}
      <div className={styles.formContainer}>
        <h2 className={styles.subtitle}>Add/Edit Practitioner</h2>
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
          <label className={styles.label}>Specialization:</label>
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={styles.textarea}
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
          <label className={styles.label}>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <label className={styles.label}>Booking Link:</label>
          <input
            type="text"
            value={bookingLink}
            onChange={(e) => setBookingLink(e.target.value)}
            className={styles.input}
          />
        </div>
        <button onClick={addPractitioner} className={styles.addButton}>
          Add Practitioner
        </button>
      </div>
    </div>
  );
}

export default PractitionersManager;