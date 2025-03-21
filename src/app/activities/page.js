import React from 'react'
import Hero from '../components/Hero/Hero'
import Search from '../components/search/search'
import EventCard from '../components/EventCard/EventCrad'
import styles from './activities.module.css'
function page() {
  const events=[
    {
      "id": 1,
      "title": "Annual Health Awareness Walk",
      "date": "2025-05-10",
      "location": "Johannesburg Botanical Gardens",
      "description": "A 5km walk to promote physical fitness and raise awareness about healthy lifestyles.",
      "image": "/images/health-walk.jpg",
      "ticketLink": "https://www.quicket.co.za/events/health-awareness-walk"
    },
    {
      "id": 2,
      "title": "Free Community Health Checkups",
      "date": "2025-06-15",
      "location": "Cape Town Civic Centre",
      "description": "Free blood pressure, diabetes, and cholesterol screenings for all attendees.",
      "image": "/images/health-check.jpg",
      "ticketLink": "https://www.computicket.com/event/community-health-checkups"
    },
    {
      "id": 3,
      "title": "Youth Sports Development Camp",
      "date": "2025-07-20",
      "location": "Durban Sports Complex",
      "description": "A weekend of sports training, mentorship, and fitness education for young athletes.",
      "image": "/images/sports-camp.jpg",
      "ticketLink": "https://www.quicket.co.za/events/youth-sports-camp"
    },
    {
      "id": 4,
      "title": "Mental Health Awareness Seminar",
      "date": "2025-08-30",
      "location": "Pretoria University Auditorium",
      "description": "A panel discussion on mental health challenges, solutions, and professional guidance.",
      "image": "/images/mental-health.jpg",
      "ticketLink": "https://www.computicket.com/event/mental-health-seminar"
    },
    {
      "id": 5,
      "title": "Nutrition and Wellness Expo",
      "date": "2025-09-12",
      "location": "Sandton Convention Centre",
      "description": "An interactive event with health experts, dieticians, and fitness professionals sharing tips on balanced nutrition.",
      "image": "/images/wellness-expo.jpg",
      "ticketLink": "https://www.quicket.co.za/events/nutrition-wellness-expo"
    },
    {
      "id": 6,
      "title": "Breast Cancer Awareness Run",
      "date": "2025-10-05",
      "location": "Port Elizabeth Beachfront",
      "description": "A 10km charity run to support breast cancer patients and raise awareness.",
      "image": "/images/cancer-run.jpg",
      "ticketLink": "https://www.computicket.com/event/breast-cancer-awareness-run"
    }
  ]
  
  // graphQL
  return (
    <main>
      <Hero
      url='https://media.istockphoto.com/id/1372606811/photo/volunteers-arranging-donations-in-a-community-center-including-a-disabled-person.webp?a=1&b=1&s=612x612&w=0&k=20&c=xsG8kh_2A-GX_2PQZ4fgxl5nPlmXXPGdkrBKu7aXmpM='
      hHeight='250'/>
      <Search
      query='event'
      />
      <div className={styles.card_contain}>
      {events.map((e)=>{
        return(<div key={e.id}>
          <EventCard
          event={e}/>
        </div>)
      })}
      </div>
    </main>
  )
}

export default page