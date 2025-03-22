'use client';

import React, { useState } from 'react';
import styles from './donations.module.css';

function DonationsPage() {
  // PayFast sandbox credentials (replace with your actual credentials)
  const merchantId = '10037768'; // Example sandbox merchant ID
  const merchantKey = 'vgjgkbfmipf79'; // Example sandbox merchant key

  // Payment details
  const [amount,setAmount] = useState('100.00'); // Donation amount in ZAR
  const itemName = 'Donation to Our Cause';
  const returnUrl = 'http://localhost:3000/donation/thank-you'; // Redirect after payment
  const cancelUrl = 'http://localhost:3000/donation/cancel'; // Redirect if payment is canceled
  
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Make a Donation</h1>
      <p className={styles.description}>
        Your support helps us continue our mission. Please fill out the form below to donate:
      </p>

      {/* PayFast Embedded Form */}
      <form
        action="https://sandbox.payfast.co.za/eng/process"
        method="POST"
        className={styles.payfastForm}
      >
        <input type="hidden" name="merchant_id" value={merchantId} />
        <input type="hidden" name="merchant_key" value={merchantKey} />
        <input type="hidden" name="return_url" value={returnUrl} />
        <input type="hidden" name="cancel_url" value={cancelUrl} />
        
        <input type="hidden" name="amount" value={amount} onChange={(e)=>{setAmount(e.target.value)}} />
        <input type="hidden" name="item_name" value={itemName} />

        <div className={styles.formGroup}>
          <label htmlFor="amount">Donation Amount (ZAR):</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            readOnly
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email_address"
            placeholder="Enter your email"
            required
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Donate R{amount}
        </button>
      </form>

      <p className={styles.note}>
        You will be redirected to PayFast to complete your donation securely.
      </p>
    </div>
  );
}

export default DonationsPage;