import React from 'react'
import styles from "./services.module.css";

const services = [
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

const bentoItems = [
    { id: 1, title: "Individuals with Disabilities", emoji: "♿️" },
    { id: 2, title: "Healthcare Professionals", emoji: "🏥" },
    { id: 3, title: "Allied Health Professionals", emoji: "⚕️" },
    { id: 4, title: "Families and Communities", emoji: "👨‍👩‍👧‍👦" },
    { id: 5, title: "Educators & Advocates", emoji: "📚" },
    { id: 6, title: "Researchers", emoji: "🔬" },
    { id: 7, title: "And more!", emoji: "✨" },
  ];
function page() {
  return (
    <>
    <div className={styles.container}>
        <div className={styles.bentoContainer}>
        <div className={styles.mission}>
        <h2>Committed to Your Success</h2>
        <p>
          We are the nation’s premier center dedicated to promoting health and wellness through 
          evidence-based programs, resources, campaigns, and strategic initiatives.
        </p>
        </div>
        <div className={styles.bentogrid}>
        {bentoItems.map((item) => (
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
        <h2>Discover how we can support you!</h2>
        <p>
          We offer a range of services and expertise to 
          our community and organizational partners, ensuring you have the tools needed to 
          promote health equity and advance inclusion.
        </p>
        </div>
        </div>

        <div className={styles.service_contain}>
            <h2>Our Services</h2>
      
            <div className={styles.grid}>
              {services.map((service) => (
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

export default page