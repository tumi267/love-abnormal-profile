'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './admin.module.css';
import Blog from '../components/Blog/Blog';
import Events from '../components/Events/Events';
import Services from '../components/Services/Services';
import Doctors from '../components/Doctors/Doctors';
import Sponsors from '../components/Sponsors/Sponsors';
import ApiReg from '../components/ApiReg/ApiReg';
import AboutUs from '../components/AboutUs/AboutUs';
import Contact from '../components/Contact/Contact';
import HomeAdmin from '../components/HomeAdmin/HomeAdmin'

function AdminPage() {
  const [selectedComponent, setSelectedComponent] = useState('HomeAdmin'); // Default component

  // Map component names to their corresponding components
  const components = {
    HomeAdmin,
    Blog,
    Events,
    Services,
    Doctors,
    Sponsors,
    ApiReg,
    AboutUs,
    Contact,
  };

  // Get the currently selected component
  const ComponentToRender = components[selectedComponent];

  return (
    <div className={styles.adminContainer}>
      {/* Side Menu */}
      <motion.div
        className={styles.sideMenu}
        initial={{ width: 250 }} // Initial width
        animate={{ width: 250 }} // Always open for now
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Menu Items */}
        <ul className={styles.menuList}>
          {[
            { name: 'Home', component: 'HomeAdmin' },
            { name: 'Blog', component: 'Blog' },
            { name: 'Events', component: 'Events' },
            { name: 'Services', component: 'Services' },
            { name: 'Doctors', component: 'Doctors' },
            { name: 'Sponsors', component: 'Sponsors' },
            { name: 'API Reg', component: 'ApiReg' },
            { name: 'About Us', component: 'AboutUs' },
            { name: 'Contact', component: 'Contact' },
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className={styles.menuLink}
                onClick={() => setSelectedComponent(item.component)} // Update selected component
              >
                {item.name}
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <h1>Admin Dashboard</h1>
        {/* Render the selected component */}
        <ComponentToRender />
      </main>
    </div>
  );
}

export default AdminPage;