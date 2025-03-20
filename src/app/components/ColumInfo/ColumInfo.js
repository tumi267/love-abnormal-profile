import React from 'react'
import styles from './ColumInfo.module.css'
function ColumInfo({infoarr=[{title:'who',msg:'the offer'}]}) {
  return (
    <section>
        {/* service discription */}
        {infoarr.map((e)=>{<div>
            <h3>{e.title}</h3>
            <p>{e.msg}</p>
        </div>})}

    </section>
  )
}

export default ColumInfo