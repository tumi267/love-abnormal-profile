import { useState, useEffect } from 'react';

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

  return (
    <div>
      <h1>Event Manager</h1>

      {/* Add/Edit Event Form */}
      <form onSubmit={handleSubmit}>
        <h2>{isEditing ? 'Edit Event' : 'Add Event'}</h2>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ticket Link:</label>
          <input
            type="text"
            name="ticketLink"
            value={formData.ticketLink}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isEditing ? 'Update Event' : 'Add Event'}</button>
        {isEditing && (
          <button type="button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>

      {/* Event List */}
      <h2>Event List</h2>
      {events.map((event) => (
        <div key={event.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
          <p>Ticket Link: <a href={event.ticketLink} target="_blank" rel="noopener noreferrer">Buy Tickets</a></p>
          <img src={event.image} alt={event.title} style={{ maxWidth: '100%', height: 'auto' }} />
          <button onClick={() => handleEdit(event)}>Edit</button>
          <button onClick={() => handleDelete(event.id)} style={{ color: 'red' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default EventManager;