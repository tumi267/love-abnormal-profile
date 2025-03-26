'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import styles from './Nav.module.css';
import Link from 'next/link';

function Nav() {
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = scrollY.get();
      
      if (currentScrollY < lastScrollY && currentScrollY > 50) {
        setHidden(false);
      } else if (currentScrollY > lastScrollY) {
        setHidden(true);
      }

      setLastScrollY(currentScrollY);
    };

    const unsubscribe = scrollY.onChange(handleScroll);
    return () => unsubscribe();
  }, [lastScrollY, scrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navVariants = {
    visible: { y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
    hidden: { y: -100, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  return (
    <motion.nav
      className={styles.contain}
      variants={navVariants}
      animate={hidden ? 'hidden' : 'visible'}
      initial="visible"
    >
      <div className={styles.content}>
        <Link className={styles.logo} href="/" onClick={handleLinkClick}>
          Logo
        </Link>

        {/* Burger Menu Icon */}
        <button
          className={styles.burger}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <div className={`${styles.burger_line} ${isMobileMenuOpen ? styles.burger_open1 : ''}`}></div>
          <div className={`${styles.burger_line} ${isMobileMenuOpen ? styles.burger_open2 : ''}`}></div>
          <div className={`${styles.burger_line} ${isMobileMenuOpen ? styles.burger_open3 : ''}`}></div>
        </button>

        {/* Desktop Navigation */}
        <div className={styles.nav_options}>
          {["blog", "activities", "services", "practitioners", "sponsours", "donation", "about", "contact"].map((item) => (
            <Link key={item} className={styles.links} href={`/${item}`} onClick={handleLinkClick}>
              {item.replace(/^./, item[0].toUpperCase())}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobile_menu} ${isMobileMenuOpen ? styles.mobile_open : ''}`}>
          {["blog", "activities", "services", "practitioners", "sponsours", "donation", "about", "contact"].map((item) => (
            <Link key={item} className={styles.links} href={`/${item}`} onClick={handleLinkClick}>
              {item.replace(/^./, item[0].toUpperCase())}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

export default Nav;
