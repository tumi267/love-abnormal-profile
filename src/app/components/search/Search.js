'use client';
import React, { useState } from 'react';
import styles from './Search.module.css'; // Make sure to create this file for the styles

function Search({ query }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // Placeholder array, replace this with data from GraphQL query
  const filterOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  // GraphQL search query set by mount
  return (
    <div className={styles.searchContainer}>
      <div className={styles.formInput}>
        <input
          className={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <span className={styles.label}>
          <p>Search</p>
        </span>
        <span className={styles.label} onClick={() => setFilterOpen(!filterOpen)}>
          <p>Filter</p>
        </span>
      </div>
      {/* Dropdown menu */}
      {filterOpen && (
        <div className={styles.dropdown}>
          {filterOptions.map((option, index) => (
            <div key={index} className={styles.dropdownItem}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
