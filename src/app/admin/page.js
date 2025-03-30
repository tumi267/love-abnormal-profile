'use client';

import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import styles from './admin.module.css';
import dynamic from 'next/dynamic';
import Loading from '../loading';


// Dynamically import all admin components with loading states
const AdminComponents = {
  HomeAdmin: dynamic(() => import('../components/HomeAdmin/HomeAdmin'), {
    loading: () => <Loading />,
    ssr: false
  }),
  Blog: dynamic(() => import('../components/Blog/Blog'), {
    loading: () => <Loading />,
    ssr: false
  }),
  Events: dynamic(() => import('../components/Events/Events'), {
    loading: () => <Loading/>,
    ssr: false
  }),
  Services: dynamic(() => import('../components/Services/Services'), {
    loading: () => <Loading />,
    ssr: false
  }),
  Doctors: dynamic(() => import('../components/Doctors/Doctors'), {
    loading: () => <Loading />,
    ssr: false
  }),
  Sponsors: dynamic(() => import('../components/Sponsors/Sponsors'), {
    loading: () => <Loading />,
    ssr: false
  }),
  ApiReg: dynamic(() => import('../components/ApiReg/ApiReg'), {
    loading: () => <Loading />,
    ssr: false
  }),
  AboutUs: dynamic(() => import('../components/AboutUs/AboutUs'), {
    loading: () => <Loading />,
    ssr: false
  }),
  Contact: dynamic(() => import('../components/Contact/Contact'), {
    loading: () => <Loading />,
    ssr: false
  }),
};

const menuItems = [
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

export default function AdminPage() {
  const [selectedComponent, setSelectedComponent] = useState('HomeAdmin');
  const CurrentComponent = AdminComponents[selectedComponent];

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar Navigation */}
      <motion.div
        className={styles.sideMenu}
        initial={{ width: 250 }}
        animate={{ width: 250 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <ul className={styles.menuList}>
          {menuItems.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className={`${styles.menuLink} ${
                  selectedComponent === item.component ? styles.active : ''
                }`}
                onClick={() => setSelectedComponent(item.component)}
              >
                {item.name}
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <h1>Admin Dashboard</h1>
        <Suspense fallback={<Loading/>}>
          <CurrentComponent />
        </Suspense>
      </main>
    </div>
  );
}