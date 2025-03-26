import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './Event.module.css'; // Import the CSS module

function EventManager() {
  // State for managing form inputs
  const [formData, setFormData] = useState({
    id: null, // Used for editing
    title: '',
    date: '',
    location: '',
    description: '',
    image: '',
    ticketLink: '',
  });

  // State to toggle between add and edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State to store the list of events
  const [events, setEvents] = useState([]);

  // Fetch events from the GraphQL API
  const fetchEvents = async () => {
    const query = `
      query GetEvents {
        events {
          id
          title
          date
          location
          description
          image
          ticketLink
        }
      }
    `;

    try {
      const response = await fetch('/api/eventsgraphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const result = await response.json();
      setEvents(result.data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (for both add and edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const mutation = isEditing
      ? `
        mutation UpdateEvent(
          $id: ID!
          $title: String!
          $date: String!
          $location: String!
          $description: String!
          $image: String!
          $ticketLink: String!
        ) {
          updateEvent(
            id: $id
            title: $title
            date: $date
            location: $location
            description: $description
            image: $image
            ticketLink: $ticketLink
          ) {
            id
            title
            date
            location
            description
            image
            ticketLink
          }
        }
      `
      : `
        mutation AddEvent(
          $title: String!
          $date: String!
          $location: String!
          $description: String!
          $image: String!
          $ticketLink: String!
        ) {
          addEvent(
            title: $title
            date: $date
            location: $location
            description: $description
            image: $image
            ticketLink: $ticketLink
          ) {
            id
            title
            date
            location
            description
            image
            ticketLink
          }
        }
      `;

    try {
      const response = await fetch('/api/eventsgraphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: mutation,
          variables: formData,
        }),
      });
      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      alert(isEditing ? 'Event updated successfully!' : 'Event added successfully!');
      fetchEvents(); // Refresh the event list
      resetForm(); // Clear the form
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      id: null,
      title: '',
      date: '',
      location: '',
      description: '',
      image: '',
      ticketLink: '',
    });
    setIsEditing(false);
  };

  // Set form data for editing
  const handleEdit = (event) => {
    setFormData({
      id: event.id,
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description,
      image: event.image,
      ticketLink: event.ticketLink,
    });
    setIsEditing(true);
  };

  // Handle event deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const mutation = `
        mutation DeleteEvent($id: ID!) {
          deleteEvent(id: $id)
        }
      `;

      try {
        const response = await fetch('/api/eventsgraphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: mutation,
            variables: { id },
          }),
        });
        const result = await response.json();
        if (result.errors) {
          throw new Error(result.errors[0].message);
        }
        alert('Event deleted successfully!');
        fetchEvents(); // Refresh the event list
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event.');
      }
    }
  };
  const regex = /^\/.*/
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Event Manager</h1>

      {/* Event List */}
      <h2 className={styles.subtitle}>Event List</h2>
      <div className={styles.event_contain_list}>
      {events.map((event) => (
        <div key={event.id} className={styles.eventCard}>
          <h3 className={styles.eventTitle}>{event.title}</h3>
          <p className={styles.eventDescription}>{event.description}</p>
          <p className={styles.eventDetail}><strong>Date:</strong> {event.date}</p>
          <p className={styles.eventDetail}><strong>Location:</strong> {event.location}</p>
          <p className={styles.eventDetail}>
            <strong>Ticket Link:</strong>{' '}
            <a href={event.ticketLink} target="_blank" rel="noopener noreferrer" className={styles.ticketLink}>
              Buy Tickets
            </a>
          </p>
          <div className={styles.eventImage}>
            {event?.image && regex.test(event.image)&&
              <Image
                src={event?.image}
                alt={event.title}
                fill
                className={styles.image}
              />
            }
          </div>
          <div className={styles.eventActions}>
            <button onClick={() => handleEdit(event)} className={styles.editButton}>
              Edit
            </button>
            <button onClick={() => handleDelete(event.id)} className={styles.deleteButton}>
              Delete
            </button>
          </div>
        </div>
      ))}
      </div>

      {/* Add/Edit Event Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.subtitle}>{isEditing ? 'Edit Event' : 'Add Event'}</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Ticket Link:</label>
          <input
            type="text"
            name="ticketLink"
            value={formData.ticketLink}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            {isEditing ? 'Update Event' : 'Add Event'}
          </button>
          {isEditing && (
            <button type="button" onClick={resetForm} className={styles.cancelButton}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EventManager;