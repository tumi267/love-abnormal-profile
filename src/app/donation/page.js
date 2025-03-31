export const dynamic = 'force-dynamic';
import styles from './donations.module.css'
export default function DonationsPage() {

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Make a Donation</h1>
      <p className={styles.description}>
        Your support helps us continue our mission. Please fill out the form below to donate:
      </p>

      <form 
        method="POST" 
        action="/api/donation"
        className="payfastForm"
      >
        <div className={styles.formGroup}>
          <label htmlFor="amount">Donation Amount (ZAR):</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="10"
            step="1"
            defaultValue="100"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            className={styles.input}
          />
        </div>

        {/* Hidden field for payment processor */}
        <input type="hidden" name="processor" value="payfast" />

        <button type="submit" className={styles.submitButton}>
          Donate Now
        </button>
      </form>

      <p className={styles.note}>
        You will be redirected to our secure payment processor to complete your donation.
      </p>
    </div>
  );
}