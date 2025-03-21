import React from 'react'
import styles from './DisplayLinkGrid.module.css'
import Image from 'next/image'
import Link from 'next/link'
function DisplayLinkGrid() {
  return (
    <div className={styles.bento}>
      <div className={`${styles.box} ${styles.box1}`}>
      <Link className={styles.link} href={'/'} >
        <Image src={'https://media.istockphoto.com/id/1473162545/photo/senior-care-hug-and-portrait-of-nurse-with-patient-for-medical-help-healthcare-or.webp?a=1&b=1&s=612x612&w=0&k=20&c=QtONGdC7xFMxC1S7Xmkd41FTrxF0r9soVLCE1PlkxRc='} fill  alt='services'/>
        <h3 className={styles.title}>services</h3>
        </Link>
      </div>
      <div className={`${styles.box} ${styles.box2}`}> 
      <Link className={styles.link} href={'/'} >
        <Image src={'https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBhcm5lcnNoaXAlMjBidXNpbmVzc3xlbnwwfHwwfHx8MA%3D%3D'} fill  alt='partnership'/>
        <h3 className={styles.title}>partnership</h3>
      </Link>
      </div>
      <div className={`${styles.box} ${styles.box3}`}>
        <Link className={styles.link} href={'/'} >
          <Image src={'https://media.istockphoto.com/id/2190213688/photo/disabled-men-gardening.webp?a=1&b=1&s=612x612&w=0&k=20&c=yOj-fzk32X6XQsi0A73AlHTEWaY-o-ttSol5dvxg2T8='} fill  alt='conect with community'/>
          <h3 className={styles.title}>conect with community</h3>
        </Link>
      </div>
      <div className={`${styles.box} ${styles.box4}`}>
        <Link className={styles.link} href={'/'} >
          <Image src={'https://images.unsplash.com/photo-1474480109237-15a7ca8f0685?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2QlMjBhbmQlMjBoZWFsdGh8ZW58MHx8MHx8fDA%3D'} fill  alt='food and recipes'/>
          <h3 className={styles.title}>food and recipes</h3>  
        </Link>
      </div>
      <div className={`${styles.box} ${styles.box5}`}>
        <Link className={styles.link} href={'/'} >
          <Image src={'https://images.unsplash.com/photo-1658314755561-389d5660ee54?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzI2fHxkaXNhYmxpdHklMjBzcG9ydHxlbnwwfHwwfHx8MA%3D%3D'} fill  alt='events'/>
          <h3 className={styles.title}>events</h3>
        </Link>
      </div>
      <div className={`${styles.box} ${styles.box6}`}>
        <Link className={styles.link} href={'/'} >
          <Image src={'https://plus.unsplash.com/premium_photo-1661770160867-2c3a5092ec3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGRpc2FibGl0eSUyMGRvY3RvcnN8ZW58MHx8MHx8fDA%3D'} fill  alt='conect with community'/>
          <h3 className={styles.title}>Our registered practitioners</h3>
        </Link>
      </div>
    </div>
  )
}

export default DisplayLinkGrid