'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import styles from './Nav.module.css';
import Link from 'next/link';

function Nav() {
  const { scrollY } = useScroll(); // Track scroll position
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const [hidden, setHidden] = useState(false); // Control visibility of the navbar

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
          <Link className={styles.links} href={'/'}>
            logo image
          </Link>
        </span>
        <span className={styles.nav_options}>
          <Link className={styles.links} href={'/blog'}>
            blog
          </Link>
          <Link className={styles.links} href={'/activities'}>
            events
          </Link>
          <Link className={styles.links} href={'/services'}>
            services
          </Link>
          <Link className={styles.links} href={'/practitioners'}>
            practitioners
          </Link>
          <Link className={styles.links} href={'/sponsours'}>
            sponsours
          </Link>
          <Link className={styles.links} href={'/donation'}>
            donate
          </Link>
          <Link className={styles.links} href={'/about'}>
            about us
          </Link>
          <Link className={styles.links} href={'/contact'}>
            contact us
          </Link>
        </span>
      </span>
    </motion.section>
  );
}

export default Nav;