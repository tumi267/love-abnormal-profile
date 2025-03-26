import Link from "next/link";
import styles from "./practitioners.module.css";
import Image from "next/image";

async function getPractitioners() {
  const query = `
    query {
      practitioners {
        id
        name
        specialization
        bio
        email
        phone
        image
        bookingLink
      }
    }
  `;

  try {
    const response = await fetch('http://localhost:3000/api/practitionersgraphql', {
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
    return result.data.practitioners;
  } catch (error) {
    console.error('Error fetching practitioners:', error);
    return [];
  }
}

async function Page() {
  const practitioners = await getPractitioners();

  return (
    <div className={styles.container}>
      <h2>Our Practitioners</h2>
      <div className={styles.grid}>
        {practitioners.map((practitioner) => (
          <div key={practitioner.id} className={styles.card}>
            <Image 
              src={practitioner.image} 
              alt={practitioner.name} 
              className={styles.image}
              fill
            />
            <h3>{practitioner.name}</h3>
            <p><strong>{practitioner.specialization}</strong></p>
            <p>{practitioner.bio}</p>
            <p>📧 {practitioner.email}</p>
            <p>📞 {practitioner.phone}</p>
            {practitioner.bookingLink && (
              <Link 
                href={practitioner.bookingLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.button}
              >
                Book Appointment
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;