import React from 'react';
import styles from './ColumInfo.module.css';
import Image from 'next/image';

function ColumInfo({ infoarr = [{ title: 'who', msg: 'the offer', url: '' }] }) {
  return (
    <section className={styles.columInfo_contain}>
      {/* service discription */}
      {infoarr.map((e, i) => {
        return (
          <div key={i}>
            <Image src={e.url} height={60} width={60} alt="mission image" />
            <h3>{e.title}</h3>
            <p>{e.msg}</p>
          </div>
        );
      })}
    </section>
  );
}

export default ColumInfo;