'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './PractitionersManager.module.css'

function PractitionersManager() {
  // State (keeping your exact structure)
  const [practitioners, setPractitioners] = useState([])
  const [name, setName] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [image, setImage] = useState('')
  const [bookingLink, setBookingLink] = useState('')
  
  // Edit states
  const [editingId, setEditingId] = useState(null)
  const [addingNew, setAddingNew] = useState(false)

  // Your exact fetchPractitioners implementation
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
    `

    const response = await fetch('/api/practitionersgraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })

    const result = await response.json()
    if (result.data && result.data.practitioners) {
      setPractitioners(result.data.practitioners)
    }
  }

  // Your exact addPractitioner implementation
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
    `

    const variables = {
      name,
      specialization,
      bio,
      email,
      phone,
      image,
      bookingLink,
    }

    const response = await fetch('/api/practitionersgraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables }),
    })

    const result = await response.json()
    if (result.data && result.data.addPractitioner) {
      alert('Practitioner added successfully!')
      fetchPractitioners()
      cancelEditing()
    }
  }

  // Your exact updatePractitioner implementation
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
    `

    const variables = {
      id,
      name,
      specialization,
      bio,
      email,
      phone,
      image,
      bookingLink,
    }

    const response = await fetch('/api/practitionersgraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables }),
    })

    const result = await response.json()
    if (result.data && result.data.updatePractitioner) {
      alert('Practitioner updated successfully!')
      fetchPractitioners()
      cancelEditing()
    }
  }

  // Your exact deletePractitioner implementation
  const deletePractitioner = async (id) => {
    const mutation = `
      mutation DeletePractitioner($id: ID!) {
        deletePractitioner(id: $id)
      }
    `

    const response = await fetch('/api/practitionersgraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables: { id } }),
    })

    const result = await response.json()
    if (result.data && result.data.deletePractitioner) {
      alert('Practitioner deleted successfully!')
      fetchPractitioners()
    }
  }

  // Prepare form for editing
  const startEditing = (practitioner) => {
    setEditingId(practitioner.id)
    setName(practitioner.name)
    setSpecialization(practitioner.specialization)
    setBio(practitioner.bio)
    setEmail(practitioner.email)
    setPhone(practitioner.phone)
    setImage(practitioner.image)
    setBookingLink(practitioner.bookingLink)
    setAddingNew(false)
  }

  // Start adding new practitioner
  const startAddingNew = () => {
    setEditingId(null)
    setName('')
    setSpecialization('')
    setBio('')
    setEmail('')
    setPhone('')
    setImage('')
    setBookingLink('')
    setAddingNew(true)
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null)
    setAddingNew(false)
  }

  // Save changes (either add or update)
  const saveChanges = () => {
    if (addingNew) {
      addPractitioner()
    } else if (editingId) {
      updatePractitioner(editingId)
    }
  }

  // Fetch practitioners on component mount
  useEffect(() => { fetchPractitioners() }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Practitioners</h1>

      {/* Add New Practitioner Button */}
      <button onClick={startAddingNew} className={styles.addButton}>
        + Add New Practitioner
      </button>

      {/* Add/Edit Form (shown when adding or editing) */}
      {(addingNew || editingId) && (
        <div className={styles.formContainer}>
          <h2>{addingNew ? 'Add New Practitioner' : 'Edit Practitioner'}</h2>
          
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Specialization:</label>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={styles.textarea}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Image URL:</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Booking Link:</label>
            <input
              type="text"
              value={bookingLink}
              onChange={(e) => setBookingLink(e.target.value)}
              className={styles.input}
            />
          </div>
          
          <div className={styles.formActions}>
            <button onClick={saveChanges} className={styles.saveButton}>
              {addingNew ? 'Add Practitioner' : 'Save Changes'}
            </button>
            <button onClick={cancelEditing} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Practitioners Grid */}
      <div className={styles.grid}>
        {practitioners.map((practitioner) => (
          <div key={practitioner.id} className={styles.card}>
            {editingId === practitioner.id ? (
              <div className={styles.editForm}>
                {/* Edit form would show here if doing inline editing */}
              </div>
            ) : (
              <>
                {practitioner.image && (
                  <Image
                    src={practitioner.image}
                    alt={practitioner.name}
                    width={200}
                    height={200}
                    className={styles.image}
                  />
                )}
                <h3>{practitioner.name}</h3>
                <p><strong>{practitioner.specialization}</strong></p>
                <p>{practitioner.bio}</p>
                <p>📧 {practitioner.email}</p>
                <p>📞 {practitioner.phone}</p>
                {practitioner.bookingLink && (
                  <Link 
                    href={practitioner.bookingLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.button}
                  >
                    Book Appointment
                  </Link>
                )}
                <div className={styles.cardActions}>
                  <button 
                    onClick={() => startEditing(practitioner)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deletePractitioner(practitioner.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
export default PractitionersManager;