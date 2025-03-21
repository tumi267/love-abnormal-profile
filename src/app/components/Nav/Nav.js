'use client';
import React from 'react'
import styles from './Nav.module.css'
import Link from 'next/link'
import BlogLinks from '../bloglinks/BlogLinks'
function Nav() {


  return (
    <section className={styles.contain}>
      <span className={styles.content}>
        <span><Link className={styles.links} href={'/'}>logo image</Link></span>
        <span className={styles.nav_options}>
            <BlogLinks/>
            <Link className={styles.links} href={'/activities'}>events</Link>
            <Link className={styles.links} href={'/about'}>about us</Link>
            <Link className={styles.links} href={'/sponsours'}>sponours</Link>
            <Link className={styles.links} href={'/donation'}>donate</Link>
            <Link className={styles.links} href={'/contact'}>contact us</Link>
        </span>
      </span>
    </section>
  )
}

export default Nav