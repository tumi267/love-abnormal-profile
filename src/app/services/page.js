import React from 'react';
import styles from "./services.module.css";

async function getServices() {
  const query = `
    query {
      services {
        id
        title
        titleMsg
        subTitle
        subMsg
        services {
          title
          image
        }
      }
    }
  `;

  try {
    const response = await fetch('http://localhost:3000/api/servicesgraphql', {
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
    return result.data.services;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}



// Our Services data (kept as is)
const ourServices = [
  {
    id: 1,
    name: "Nutritional Counseling",
    description: "Personalized diet plans to help you achieve your health goals.",
    icon: "🍏", // Placeholder emoji
  },
  {
    id: 2,
    name: "Physiotherapy",
    description: "Expert therapy for injury recovery and mobility improvement.",
    icon: "💆‍♂️",
  },
  {
    id: 3,
    name: "Mental Health Support",
    description: "One-on-one counseling for mental wellness and stress management.",
    icon: "🧘",
  },
];

async function Page() {
  const servicesData = await getServices();
  const firstService = servicesData[0] || {};

  return (
    <>
      <div className={styles.container}>
        <div className={styles.bentoContainer}>
          <div className={styles.mission}>
            <h2>{firstService.title }</h2>
            <p>
              {firstService.titleMsg }
            </p>
          </div>
          <div className={styles.bentogrid}>
            {firstService.services.map((item) => (
              <div key={item.id} className={styles.card}>
                <span className={styles.emoji}>{item.emoji}</span>
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className={styles.serviceContainer}>
        <div className={styles.serviceContent}>
          <h2>{firstService.subTitle }</h2>
          <p>
            {firstService.subMsg }
          </p>
        </div>
      </div>

      {/* Our Services Section (kept as is) */}
      <div className={styles.service_contain}>
        <h2>Our Services</h2>
        <div className={styles.grid}>
          {ourServices.map((service) => (
            <div key={service.id} className={styles.card}>
              <span className={styles.icon}>{service.icon}</span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Page;