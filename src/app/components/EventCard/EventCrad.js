"use client";
import React from "react";
import styles from "./EventCard.module.css";
import Image from "next/image";
import Link from "next/link";

function EventCard({ event,typeArticle=false}) {
  const regex = /^\/.*/;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {event?.image && regex.test(event.image)&&<Image src={event.image} alt={event.title} width={300} height={200} />}
      </div>
      <div className={styles.content}>
        {event.title&&<h3>{event.title}</h3>}
        {event.date&&<p className={styles.date}>{event.date} • {event.location}</p>}
        {event.description&&<p className={styles.description}>{event.description}</p>}
        {event.ticketLink&&<Link href={event.ticketLink} target="_blank" className={styles.ticketButton}>
          Get Tickets
        </Link>}
        {event.href&&<Link href={event.href}  className={styles.ticketButton}>
          read articles
        </Link>}
        {typeArticle&&<Link href={`/blog/${event?.category}/${event?.id}`}  className={styles.ticketButton}>
          read more
        </Link>}
      </div>
    </div>
  );
}

export default EventCard;