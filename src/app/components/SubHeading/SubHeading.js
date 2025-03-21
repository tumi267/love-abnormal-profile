import React from 'react'
import styles from './SubHeading.module.css'
function SubHeading({heading,msg}) {
  return (
    <section className={styles.sub_heading_contain}>
       <h2> {heading}</h2>
       <p>{msg}</p>
    </section>
  )
}

export default SubHeading