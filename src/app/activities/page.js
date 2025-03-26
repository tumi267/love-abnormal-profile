import React from 'react';
import Hero from '../components/Hero/Hero';
import Search from '../components/search/Search';
import EventCard from '../components/EventCard/EventCrad';
import styles from './activities.module.css';

async function getEvents() {
  const query = `
    query {
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
    const response = await fetch('http://localhost:3000/api/eventsgraphql', {
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
    return result.data.events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

async function Page() {
  const events = await getEvents();

  return (
    <main>
      <Hero
        url='https://media.istockphoto.com/id/1372606811/photo/volunteers-arranging-donations-in-a-community-center-including-a-disabled-person.webp?a=1&b=1&s=612x612&w=0&k=20&c=xsG8kh_2A-GX_2PQZ4fgxl5nPlmXXPGdkrBKu7aXmpM='
        hHeight='250'
      />
      <Search query='event' />
      <div className={styles.card_contain}>
        {events.map((e) => (
          <div key={e.id}>
            <EventCard event={e} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default Page;