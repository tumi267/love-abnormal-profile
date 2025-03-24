import React from 'react';
import styles from './Hero.module.css';
import Image from 'next/image';
import CallToAction from '../CallToAction/CallToAction';

function Hero({ url, msg, welcome, imagediscription, hHeight, calltoaction, calltoaction2 }) {
  return (
    <section className={styles.hero_contain}>
      {welcome && (
        <div className={styles.text_contain}>
          {welcome && <h2>{welcome}</h2>}
          {msg && <br />}
          {msg && <h3>{msg}</h3>}
          <div className={styles.cta_container}>
            {calltoaction && (
              <CallToAction action={calltoaction.name} link={calltoaction.link} />
            )}
            {calltoaction2 && (
              <CallToAction action={calltoaction2.name} link={calltoaction2.link} />
            )}
          </div>
        </div>
      )}
      <div className={styles.image_contain}>
        <Image
          src={url}
          fill={true}
          alt={imagediscription ? imagediscription : 'hero image'}
        />
      </div>
    </section>
  );
}

export default Hero;