'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import styles from './Nav.module.css';
import Link from 'next/link';

function Nav() {
  const { scrollY } = useScroll(); // Track scroll position
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const [hidden, setHidden] = useState(false); // Control visibility of the navbar
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Control mobile menu visibility

  // Detect scroll direction and hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = scrollY.get();

      if (currentScrollY < lastScrollY && currentScrollY > 112) {
        // Scrolling down
        setHidden(false);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling up
        setHidden(true);
      }

      setLastScrollY(currentScrollY);
    };

    const unsubscribe = scrollY.onChange(handleScroll);
    return () => unsubscribe();
  }, [lastScrollY, scrollY]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Animation variants for the navbar
  const navVariants = {
    visible: { y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
    hidden: { y: -100, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  return (
    <motion.section
      className={styles.contain}
      variants={navVariants}
      animate={hidden ? 'hidden' : 'visible'}
      initial="visible"
    >
      <span className={styles.content}>
        <span>
          <Link className={styles.links} href={'/'} onClick={handleLinkClick}>
            logo image
          </Link>
        </span>
        {/* Burger Menu Icon */}
        <div className={styles.burger} onClick={toggleMobileMenu}>
          <div className={styles.burger_line}></div>
          <div className={styles.burger_line}></div>
          <div className={styles.burger_line}></div>
        </div>
        {/* Mobile Menu */}
        <div className={`${styles.nav_options} ${isMobileMenuOpen ? styles.nav_options_open : ''}`}>
          <Link className={styles.links} href={'/blog'} onClick={handleLinkClick}>
            blog
          </Link>
          <Link className={styles.links} href={'/activities'} onClick={handleLinkClick}>
            events
          </Link>
          <Link className={styles.links} href={'/services'} onClick={handleLinkClick}>
            services
          </Link>
          <Link className={styles.links} href={'/practitioners'} onClick={handleLinkClick}>
            practitioners
          </Link>
          <Link className={styles.links} href={'/sponsours'} onClick={handleLinkClick}>
            sponsours
          </Link>
          <Link className={styles.links} href={'/donation'} onClick={handleLinkClick}>
            donate
          </Link>
          <Link className={styles.links} href={'/about'} onClick={handleLinkClick}>
            about us
          </Link>
          <Link className={styles.links} href={'/contact'} onClick={handleLinkClick}>
            contact us
          </Link>
        </div>
      </span>
    </motion.section>
  );
}

export default Nav;