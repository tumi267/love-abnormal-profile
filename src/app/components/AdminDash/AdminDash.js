'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './AdminDash.module.css';
import dynamic from 'next/dynamic';
import Loading from '@/app/loading';

// Menu configuration - unchanged from your original
const MENU_ITEMS = [
  { name: 'Home', component: 'HomeAdmin' },
  { name: 'Blog', component: 'Blog' },
  { name: 'Events', component: 'Events' },
  { name: 'Services', component: 'Services' },
  { name: 'Doctors', component: 'Doctors' },
  { name: 'Sponsors', component: 'Sponsors' },
  { name: 'API Reg', component: 'ApiReg' },
  { name: 'About Us', component: 'AboutUs' },
  { name: 'Contact', component: 'Contact' },
];

// Dynamic imports with your original component names
const COMPONENTS = {
  HomeAdmin: dynamic(() => import('../HomeAdmin/HomeAdmin'), {
    loading: () => <Loading/>
  }),
  Blog: dynamic(() => import('../Blog/Blog'), {
    loading: () => <Loading/>
  }),
  Events: dynamic(() => import('../Events/Events'), {
    loading: () => <Loading/>
  }),
  Services: dynamic(() => import('../Services/Services'), {
    loading: () => <Loading/>
  }),
  Doctors: dynamic(() => import('../Doctors/Doctors'), {
    loading: () => <Loading/>
  }),
  Sponsors: dynamic(() => import('../Sponsors/Sponsors'), {
    loading: () => <Loading/>
  }),
  ApiReg: dynamic(() => import('../ApiReg/ApiReg'), {
    loading: () => <Loading/>
  }),
  AboutUs: dynamic(() => import('../AboutUs/AboutUs'), {
    loading: () => <Loading/>
  }),
  Contact: dynamic(() => import('../Contact/Contact'), {
    loading: () => <Loading/>
  }),
};

export default function AdminDash() {
  const [selectedComponent, setSelectedComponent] = useState('HomeAdmin');
  const ComponentToRender = COMPONENTS[selectedComponent];

  return (
    <div className={styles.adminContainer}>
      {/* Side Menu - using your exact class names */}
      <motion.div
        className={styles.sideMenu}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <ul className={styles.menuList}>
          {MENU_ITEMS.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className={styles.menuLink}
                onClick={() => setSelectedComponent(item.component)}
              >
                {item.name}
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Main Content - using your exact class names */}
      <main className={styles.mainContent}>
        <h1>Admin Dashboard</h1>
        <ComponentToRender />
      </main>
    </div>
  );
}