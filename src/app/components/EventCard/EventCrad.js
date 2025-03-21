"use client";
import React from "react";
import styles from "./EventCard.module.css";
import Image from "next/image";
import Link from "next/link";

function EventCard({ event }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src={event.image} alt={event.title} width={300} height={200} />
      </div>
      <div className={styles.content}>
        <h3>{event.title}</h3>
        <p className={styles.date}>{event.date} • {event.location}</p>
        <p className={styles.description}>{event.description}</p>
        <Link href={event.ticketLink} target="_blank" className={styles.ticketButton}>
          Get Tickets
        </Link>
      </div>
    </div>
  );
}

export default EventCard;