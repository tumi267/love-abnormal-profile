// app/donations/page.js
'use client'; // Still needed for client-side interactions

import React, { useState } from 'react';
import styles from './donations.module.css';
import jwt from 'jsonwebtoken';

// This can remain a client component since it handles form submission
export default function DonationsPage() {
  const [amount, setAmount] = useState('100');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleDonateClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Fetch API details
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/apiregistrationgraphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query GetApis {
              getApis {
                id
                api
                token
              }
            }
          `
        })
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      if (!result.data?.getApis) {
        throw new Error('No APIs found');
      }

      // Find and decode PayFast token
      const payfastApi = result.data.getApis.find(api => api.api === 'payfast');
      if (!payfastApi) {
        throw new Error('PayFast API credentials not found');
      }

      const decoded = jwt.decode(payfastApi.token);
      if (!decoded?.apiKey || !decoded?.apiId) {
        throw new Error('Invalid PayFast token');
      }

      // Prepare PayFast redirect
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
      const formData = new URLSearchParams();
      formData.append('merchant_id', decoded.apiId);
      formData.append('merchant_key', decoded.apiKey);
      formData.append('return_url', `${baseUrl}/donation/thank-you`);
      formData.append('cancel_url', `${baseUrl}/donation/cancel`);
      formData.append('amount', amount);
      formData.append('item_name', 'Donation to Our Cause');
      formData.append('email_address', e.target.email_address.value);

      // Redirect to PayFast
      window.location.href = `https://sandbox.payfast.co.za/eng/process?${formData.toString()}`;

    } catch (error) {
      setMessage(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Make a Donation</h1>
      <p className={styles.description}>
        Your support helps us continue our mission. Please fill out the form below to donate:
      </p>

      {message && <div className={styles.errorMessage}>{message}</div>}

      <form onSubmit={handleDonateClick}>
        <div className={styles.formGroup}>
          <label htmlFor="amount">Donation Amount (ZAR):</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="10"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.input}
            required
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

        <button 
          type="submit" 
          className={styles.submitButton} 
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : `Donate R${amount}`}
        </button>
      </form>

      <p className={styles.note}>
        You will be redirected to PayFast to complete your donation securely.
      </p>
    </div>
  );
}