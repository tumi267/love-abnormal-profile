import Link from "next/link";
import styles from "./practitioners.module.css";

const practitioners = [
  {
    id: 1,
    name: "Dr. Jane Doe",
    specialization: "Nutritionist",
    bio: "Helping people achieve balanced diets.",
    email: "janedoe@email.com",
    phone: "+27 123 456 789",
    profileImage: "/images/jane-doe.jpg", // Placeholder image
    bookingLink: "https://calendly.com/janedoe",
  },
  {
    id: 2,
    name: "Dr. John Smith",
    specialization: "Physiotherapist",
    bio: "Expert in sports injury rehabilitation.",
    email: "johnsmith@email.com",
    phone: "+27 987 654 321",
    profileImage: "/images/john-smith.jpg",
    bookingLink: "https://calendly.com/johnsmith",
  },
];

function page() {
  return (
    <div className={styles.container}>
      <h2>Our Practitioners</h2>
      <div className={styles.grid}>
        {practitioners.map((practitioner) => (
          <div key={practitioner.id} className={styles.card}>
            <img src={practitioner.profileImage} alt={practitioner.name} className={styles.image} />
            <h3>{practitioner.name}</h3>
            <p><strong>{practitioner.specialization}</strong></p>
            <p>{practitioner.bio}</p>
            <p>📧 {practitioner.email}</p>
            <p>📞 {practitioner.phone}</p>
            {practitioner.bookingLink && (
              <Link href={practitioner.bookingLink} target="_blank" rel="noopener noreferrer" className={styles.button}>
                Book Appointment
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default page