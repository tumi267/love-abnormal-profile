'use client'; // Mark as a Client Component

import React, { useState, useEffect } from 'react';

function Services() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [titleMsg, setTitleMsg] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [subMsg, setSubMsg] = useState('');
  const [serviceItems, setServiceItems] = useState([{ title: '', image: '' }]);

  // Fetch all services
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
    `;

    const response = await fetch('/api/servicesgraphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    if (result.data && result.data.services) {
      setServices(result.data.services);
    }
  };

  // Add a new service
  const addService = async () => {
    const mutation = `
      mutation ServiceAdd($services: [ServiceItemInput!]!, $title: String!, $titleMsg: String!, $subTitle: String!, $subMsg: String!) {
        addService(services: $services, title: $title, titleMsg: $titleMsg, subTitle: $subTitle, subMsg: $subMsg) {
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
    `;

    const variables = {
      services: serviceItems,
      title,
      titleMsg,
      subTitle,
      subMsg,
    };

    const response = await fetch('/api/servicesgraphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const result = await response.json();
    if (result.data && result.data.addService) {
      alert('Service added successfully!');
      fetchServices(); // Refresh the list
    } else if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
    }
  };

  // Update a service
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
    `;

    const variables = {
      id,
      services: serviceItems,
      title,
      titleMsg,
      subTitle,
      subMsg,
    };

    const response = await fetch('/api/servicesgraphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const result = await response.json();
    if (result.data && result.data.updateService) {
      alert('Service updated successfully!');
      fetchServices(); // Refresh the list
    } else if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
    }
  };

  // Delete a service
  const deleteService = async (id) => {
    const mutation = `
      mutation ServiceDelete($id: ID!) {
        deleteService(id: $id)
      }
    `;

    const response = await fetch('/api/servicesgraphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation, variables: { id } }),
    });

    const result = await response.json();
    if (result.data && result.data.deleteService) {
      alert('Service deleted successfully!');
      fetchServices(); // Refresh the list
    } else if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
    }
  };

  // Handle input changes for service items
  const handleServiceItemChange = (index, field, value) => {
    const updatedItems = [...serviceItems];
    updatedItems[index][field] = value;
    setServiceItems(updatedItems);
  };

  // Add a new service item
  const addServiceItem = () => {
    setServiceItems([...serviceItems, { title: '', image: '' }]);
  };

  // Remove a service item
  const removeServiceItem = (index) => {
    const updatedItems = serviceItems.filter((_, i) => i !== index);
    setServiceItems(updatedItems);
  };

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <h1>Manage Services</h1>

      {/* Display existing services */}
      <div>
        <h2>Existing Services</h2>
        {services.map((service) => (
          <div key={service.id}>
            <h3>{service.title}</h3>
            <p>{service.titleMsg}</p>
            <h3>{service.subTitle}</h3>
            <p>{service.subMsg}</p>
            <ul>
              {service.services.map((item, index) => (
                <li key={index}>
                  {item.title} - <img src={item.image} alt={item.title} width="50" />
                </li>
              ))}
            </ul>
            <button onClick={() => updateService(service.id)}>Update</button>
            <button onClick={() => deleteService(service.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Add/Edit Service Form */}
      <div>
        <h2>Add/Edit Service</h2>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Title Message:</label>
          <textarea
            value={titleMsg}
            onChange={(e) => setTitleMsg(e.target.value)}
          />
        </div>
        <div>
          <label>Subtitle:</label>
          <input
            type="text"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Sub Message:</label>
          <textarea
            value={subMsg}
            onChange={(e) => setSubMsg(e.target.value)}
          />
        </div>
        <div>
          <h3>Service Items</h3>
          {serviceItems.map((item, index) => (
            <div key={index}>
              <label>Title:</label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleServiceItemChange(index, 'title', e.target.value)}
              />
              <label>Image URL:</label>
              <input
                type="text"
                value={item.image}
                onChange={(e) => handleServiceItemChange(index, 'image', e.target.value)}
              />
              <button onClick={() => removeServiceItem(index)}>Remove</button>
            </div>
          ))}
          <button onClick={addServiceItem}>Add Service Item</button>
        </div>
        <button onClick={addService}>Add Service</button>
      </div>
    </div>
  );
}

export default Services;