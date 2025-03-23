'use client'
import React from 'react'
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './donation.module.css'
function DonationRes() {
    const params=useParams()
    const {slug}=params
    if(slug=='thank-you'){
        return (
            <div className={styles.container}>
              <h1>Thank You!</h1>
              <p>Your donation was successful. We appreciate your support!</p>
              <Link href="/">Return to Home</Link>
            </div>
          )
    }else{
        return (
            <div className={styles.container}>
              <h1>Payment Canceled</h1>
              <p>Your payment was not completed. If this was a mistake, you can try again.</p>
              <Link href="/donations">Try Again</Link>
            </div>
          );
    }

}

export default DonationRes