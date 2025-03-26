'use client';

import React, { useState } from 'react';
import styles from './donations.module.css';
import jwt from 'jsonwebtoken'; // Ensure jwt is installed

function DonationsPage() {
  const [amount, setAmount] = useState('100'); // Default amount to be set
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const baseUrl = process.env.NEXT_PUBLIC_DEV === 'prod' 
  ? 'https://love-abnormal-profile.vercel.app/' 
  : 'http://localhost:3000/';
  // Handle donation submission
  const handleDonateClick = async (e) => {
    e.preventDefault(); // Prevent immediate form submission
    setIsLoading(true);

    // Fetch API details
    const fetchApiDetails = async () => {
      const query = `
        query GetApis {
          getApis {
            id
            api
            token
          }
        }
      `;

      try {
        const response = await fetch('/api/apiregistrationgraphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        if (result.data.getApis) {
          // Decode the JWT for each API to get apiKey and apiId
          const apiDetails = result.data.getApis.map((api) => {
            const decoded = jwt.decode(api.token);
            return {
              id: api.id,
              api: api.api,
              apiKey: decoded.apiKey,
              apiId: decoded.apiId,
            };
          });

          const payfastApi = apiDetails.find((api) => api.api === 'payfast');
          if (payfastApi) {
            const { apiKey, apiId } = payfastApi;

            // Proceed with donation if PayFast credentials are found
            const formData = {
              merchant_id: apiId,
              merchant_key: apiKey,
              return_url: `${baseUrl}donation/thank-you`,
              cancel_url: `${baseUrl}donation/cancel`,
              amount: amount,
              item_name: 'Donation to Our Cause',
            };

            // Redirect to PayFast for processing
            window.location.href = `https://sandbox.payfast.co.za/eng/process?merchant_id=${formData.merchant_id}&merchant_key=${formData.merchant_key}&return_url=${formData.return_url}&cancel_url=${formData.cancel_url}&amount=${formData.amount}&item_name=${formData.item_name}`;
          } else {
            setMessage('PayFast API credentials not found.');
          }
        } else {
          setMessage('No APIs found.');
        }
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    // Trigger the API fetching before donation submission
    fetchApiDetails();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Make a Donation</h1>
      <p className={styles.description}>
        Your support helps us continue our mission. Please fill out the form below to donate:
      </p>

      {/* PayFast Embedded Form */}
      <form onSubmit={handleDonateClick}>
        <div className={styles.formGroup}>
          <label htmlFor="amount">Donation Amount (ZAR):</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Processing...' : `Donate R${amount}`}
        </button>
      </form>

      <p className={styles.note}>
        You will be redirected to PayFast to complete your donation securely.
      </p>
    </div>
  );
}

export default DonationsPage;
