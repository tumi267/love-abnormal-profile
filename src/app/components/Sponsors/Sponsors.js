'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Sponsors.module.css'

function Sponsors() {
  // State (keeping your exact structure)
  const [sponsours, setSponsours] = useState([])
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')
  
  // Edit states
  const [editingId, setEditingId] = useState(null)
  const [addingNew, setAddingNew] = useState(false)

  // Your exact fetchSponsours implementation
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
    `

    const response = await fetch('/api/sponsoursgraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })

    const result = await response.json()
    if (result.data && result.data.sponsours) {
      setSponsours(result.data.sponsours)
    }
  }

  // Your exact addSponsour implementation
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
    `

    const variables = {
      name,
      image,
      url,
    }

    const response = await fetch('/api/sponsoursgraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables }),
    })

    const result = await response.json()
    if (result.data && result.data.addSponsour) {
      alert('Sponsour added successfully!')
      fetchSponsours()
      cancelEditing()
    }
  }

  // Your exact updateSponsour implementation
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
    `

    const variables = {
      id,
      name,
      image,
      url,
    }

    const response = await fetch('/api/sponsoursgraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables }),
    })

    const result = await response.json()
    if (result.data && result.data.updateSponsour) {
      alert('Sponsour updated successfully!')
      fetchSponsours()
      cancelEditing()
    }
  }

  // Your exact deleteSponsour implementation
  const deleteSponsour = async (id) => {
    const mutation = `
      mutation DeleteSponsour($id: ID!) {
        deleteSponsour(id: $id)
      }
    `

    const response = await fetch('/api/sponsoursgraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables: { id } }),
    })

    const result = await response.json()
    if (result.data && result.data.deleteSponsour) {
      alert('Sponsour deleted successfully!')
      fetchSponsours()
    }
  }

  // Prepare form for editing
  const startEditing = (sponsour) => {
    setEditingId(sponsour.id)
    setName(sponsour.name)
    setImage(sponsour.image)
    setUrl(sponsour.url)
    setAddingNew(false)
  }

  // Start adding new sponsour
  const startAddingNew = () => {
    setEditingId(null)
    setName('')
    setImage('')
    setUrl('')
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
      addSponsour()
    } else if (editingId) {
      updateSponsour(editingId)
    }
  }

  // Fetch sponsours on component mount
  useEffect(() => { fetchSponsours() }, [])

  return (
    <div className={styles.sponsorsPage}>
      <h1 className={styles.pageTitle}>Our Sponsors</h1>

      {/* Add New Sponsour Button */}
      <button onClick={startAddingNew} className={styles.addButton}>
        + Add New Sponsor
      </button>

      {/* Add/Edit Form (shown when adding or editing) */}
      {(addingNew || editingId) && (
        <div className={styles.formContainer}>
          <h2>{addingNew ? 'Add New Sponsor' : 'Edit Sponsor'}</h2>
          
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
            <label>Image URL:</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Website URL:</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={styles.input}
            />
          </div>
          
          <div className={styles.formActions}>
            <button onClick={saveChanges} className={styles.saveButton}>
              {addingNew ? 'Add Sponsor' : 'Save Changes'}
            </button>
            <button onClick={cancelEditing} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Sponsors Grid */}
      <div className={styles.sponsorGrid}>
        {sponsours.map((sponsour) => (
          <div key={sponsour.id} className={styles.sponsorCard}>
            {editingId === sponsour.id ? (
              <div className={styles.editForm}>
                {/* Edit form would show here if doing inline editing */}
              </div>
            ) : (
              <>
                <Link href={sponsour.url} passHref target="_blank" rel="noopener noreferrer">
                  <div className={styles.cardContent}>
                    <div className={styles.sponsorLogo}>
                      {sponsour.image && (
                        <Image
                          src={sponsour.image}
                          alt={sponsour.name}
                          fill
                          className={styles.image}
                        />
                      )}
                    </div>
                    <p className={styles.sponsorName}>{sponsour.name}</p>
                  </div>
                </Link>
                <div className={styles.cardActions}>
                  <button 
                    onClick={() => startEditing(sponsour)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteSponsour(sponsour.id)}
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

export default Sponsors;