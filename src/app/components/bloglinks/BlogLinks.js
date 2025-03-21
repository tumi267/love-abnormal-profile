'use client';
import React from 'react'
import styles from './BlogLinks.module.css'
import { useRouter } from 'next/router'
function BlogLinks() {
    // const router = useRouter()
    // const blogRoute = (id)=>{
    //     router.push(`/blog${id}`, { scroll: false })
    //   }
    //   const handleChange = (event) => {
    //     const selectedId = event.target.value;
    //     if (selectedId) {
    //       blogRoute(selectedId); // Trigger route change
    //     }
    //   };
  return (
    <select>
    {/* map blog categorgy options graphQL call*/}
    <option>0</option>
    <option>1</option>
    <option>2</option>
  </select>
  )
}

export default BlogLinks