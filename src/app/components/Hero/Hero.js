import React from 'react'
import styles from './Hero.module.css'
import Image from 'next/image'
function Hero({url,msg,welcome,imagediscription,hHeight}) {
 
  return (
    <section className={styles.hero_contain} style={{ '--hero': `${hHeight}px`,display: msg && url ? 'flex' : 'grid',maxWidth: msg && url ? '1080px':'100%',width:msg && url ? '80%':'100%',marginTop: msg && url ? '48px' : '0px',}}>
        {welcome&&<div>{welcome&&<h2>{welcome}</h2>}
            {msg&&<br/>}
            {msg&&<h3>{msg}</h3>}
            {msg&&<br/>}
            {msg&&<p>call to action btn</p>}
            {msg&&<br/>}
            {msg&&<p>call to action btn</p>}
        </div>}
        <div className={styles.image_contain} style={{borderRadius: msg && url ?'12px':'0px'}}><Image
        src={url}
        fill={true}
        
        alt={imagediscription?imagediscription:'hero image'}
        />
        </div>
    </section>
  )
}

export default Hero