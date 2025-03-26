'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Services.module.css'

function Services() {
  // State (keeping your exact structure)
  const [services, setServices] = useState([])
  const [title, setTitle] = useState('')
  const [titleMsg, setTitleMsg] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [subMsg, setSubMsg] = useState('')
  const [serviceItems, setServiceItems] = useState([{ title: '', image: '' }])
  
  // Edit states
  const [editingMain, setEditingMain] = useState(false)
  const [editingSupport, setEditingSupport] = useState(false)
  const [editingItems, setEditingItems] = useState({})
  const [newItemIndex, setNewItemIndex] = useState(null)

  // Fetch all services (your exact implementation)
  const fetchServices = async () => {
    const query = `
      query ServiceList {
        services {
          id
          title
          services {
            title
            image
          }
          titleMsg
          subTitle
          subMsg
        }
      }
    `

    const response = await fetch('/api/servicesgraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })

    const result = await response.json()
    if (result.data && result.data.services) {
      setServices(result.data.services)
      if (result.data.services.length > 0) {
        const firstService = result.data.services[0]
        setTitle(firstService.title)
        setTitleMsg(firstService.titleMsg)
        setSubTitle(firstService.subTitle)
        setSubMsg(firstService.subMsg)
        setServiceItems(firstService.services || [{ title: '', image: '' }])
      }
    }
  }

  // Update a service (your exact implementation)
  const updateService = async (id) => {
    const mutation = `
      mutation ServiceUpdate($id: ID!, $services: [ServiceItemInput!]!, $title: String!, $titleMsg: String!, $subTitle: String!, $subMsg: String!) {
        updateService(id: $id, services: $services, title: $title, titleMsg: $titleMsg, subTitle: $subTitle, subMsg: $subMsg) {
          id
          title
          services {
            title
            image
          }
          titleMsg
          subTitle
          subMsg
        }
      }
    `

    const variables = { id, services: serviceItems, title, titleMsg, subTitle, subMsg }

    const response = await fetch('/api/servicesgraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables }),
    })

    const result = await response.json()
    if (result.data && result.data.updateService) {
      alert('Service updated successfully!')
      fetchServices()
      cancelEditing()
    }
  }

  // Delete a service (your exact implementation)
  const deleteService = async (id) => {
    const mutation = `
      mutation ServiceDelete($id: ID!) {
        deleteService(id: $id)
      }
    `

    const response = await fetch('/api/servicesgraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables: { id } }),
    })

    const result = await response.json()
    if (result.data && result.data.deleteService) {
      alert('Service deleted successfully!')
      fetchServices()
    }
  }

  // Handle input changes for service items (your exact implementation)
  const handleServiceItemChange = (index, field, value) => {
    const updatedItems = [...serviceItems]
    updatedItems[index][field] = value
    setServiceItems(updatedItems)
  }

  // Add a new service item (modified to show edit mode immediately)
  const addServiceItem = () => {
    const newItems = [...serviceItems, { title: '', image: '' }]
    setServiceItems(newItems)
    setNewItemIndex(newItems.length - 1) // Set to edit mode immediately
  }

  // Remove a service item (your exact implementation)
  const removeServiceItem = (index) => {
    const updatedItems = serviceItems.filter((_, i) => i !== index)
    setServiceItems(updatedItems)
    setNewItemIndex(null)
  }

  const cancelEditing = () => {
    setEditingMain(false)
    setEditingSupport(false)
    setEditingItems({})
    setNewItemIndex(null)
    fetchServices() // Reset to original data
  }

  // Fetch services on component mount
  useEffect(() => { fetchServices() }, [])

  if (!services.length) return <div className={styles.container}>Loading...</div>

  const mainService = services[0]

  return (
    <div className={styles.container}>
      <div className={styles.bentoContainer}>
        {/* Mission Section */}
        <div className={styles.mission}>
          {editingMain ? (
            <>
              <div className={styles.formGroup}>
                <label className={styles.label}>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Message:</label>
                <textarea
                  value={titleMsg}
                  onChange={(e) => setTitleMsg(e.target.value)}
                  className={styles.textarea}
                />
              </div>
              <div className={styles.serviceActions}>
                <button onClick={() => updateService(mainService.id)} className={styles.updateButton}>
                  Save
                </button>
                <button onClick={cancelEditing} className={styles.deleteButton}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>{mainService.title}</h2>
              <p>{mainService.titleMsg}</p>
              <button 
                onClick={() => setEditingMain(true)}
                className={styles.updateButton}
              >
                Edit
              </button>
            </>
          )}
        </div>

        {/* Bento Grid Items */}
        <div className={styles.bentogrid}>
          {serviceItems.map((item, index) => (
            <div key={index} className={styles.card}>
              {(editingItems[index] || newItemIndex === index) ? (
                <div className={styles.serviceItemForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Title:</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleServiceItemChange(index, 'title', e.target.value)}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Image URL:</label>
                    <input
                      type="text"
                      value={item.image}
                      onChange={(e) => handleServiceItemChange(index, 'image', e.target.value)}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.serviceActions}>
                    <button
                      onClick={() => removeServiceItem(index)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        if (newItemIndex === index) {
                          setNewItemIndex(null)
                        } else {
                          setEditingItems({...editingItems, [index]: false})
                        }
                        if (services.length > 0) {
                          updateService(services[0].id)
                        }
                      }}
                      className={styles.updateButton}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={styles.itemImage}
                    />
                  )}
                  <h3>{item.title}</h3>
                  <button
                    onClick={() => setEditingItems({...editingItems, [index]: true})}
                    className={styles.updateButton}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
          
          {/* Add New Item Button */}
          <div className={styles.card}>
            <button onClick={addServiceItem} className={styles.addButton}>
              + Add Item
            </button>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className={styles.serviceContainer}>
        <div className={styles.serviceContent}>
          {editingSupport ? (
            <>
              <div className={styles.formGroup}>
                <label className={styles.label}>Subtitle:</label>
                <input
                  type="text"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Message:</label>
                <textarea
                  value={subMsg}
                  onChange={(e) => setSubMsg(e.target.value)}
                  className={styles.textarea}
                />
              </div>
              <div className={styles.serviceActions}>
                <button onClick={() => updateService(mainService.id)} className={styles.updateButton}>
                  Save
                </button>
                <button onClick={cancelEditing} className={styles.deleteButton}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>{mainService.subTitle}</h2>
              <p>{mainService.subMsg}</p>
              <button
                onClick={() => setEditingSupport(true)}
                className={styles.updateButton}
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Services;

