import Image from 'next/image'
import styles from './page.module.css'
import Hero from './components/Hero/Hero'
import SubHeading from './components/SubHeading/SubHeading'
import ColumInfo from './components/ColumInfo/ColumInfo'
import ImageDiscriptionBottom from './components/ImageDiscriptionBottom/ImageDiscriptionBottom'
import DisplayLinkGrid from './components/DisplayLinkGrid/DisplayLinkGrid'
import CallToAction from './components/CallToAction/CallToAction'

export default function Home() {
  return (
    <main className={styles.main}>
     <Hero/>
     <SubHeading/>
     <ColumInfo/>
     <ImageDiscriptionBottom/>
     <DisplayLinkGrid/>
     <ColumInfo/>
     <div>
      <h4>action call</h4>
      <div>
        <p>soft sell</p>
        <CallToAction/>
      </div>
     </div>
    </main>
  )
}
