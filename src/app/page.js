
import Image from 'next/image'
import styles from './page.module.css'
import Hero from './components/Hero/Hero'
import SubHeading from './components/SubHeading/SubHeading'
import ColumInfo from './components/ColumInfo/ColumInfo'
import ImageDiscriptionBottom from './components/ImageDiscriptionBottom/ImageDiscriptionBottom'
import DisplayLinkGrid from './components/DisplayLinkGrid/DisplayLinkGrid'
import CallToAction from './components/CallToAction/CallToAction'
import dataimage from '/public/data.png'
import fingerPrint from '/public/fingerprint.png'
import training from '/public/training.png'
import Slider from './components/slider/slider'
export default function Home() {
  // graphQl data
  const ColumInfoarr1=[{title:'Smart Solutions Through Data',msg:'Introducing our participant-centered wellness database, a powerful tool that supports data-driven decision-making and personalized health insights.',url:dataimage},{title:'Breaking Barriers, Expanding Opportunities',msg:'Expanding access to evidence-based virtual health programs, led by experts in disability health, to ensure inclusive and engaging wellness opportunities for all.',url:fingerPrint},{title:'Strengthening Skills, Transforming Lives',msg:'Strengthening the field of disability health through education, training, and collaboration—empowering individuals, communities, and organizations to drive lasting change.',url:training}]
    // graphQl data
  let d = new Date().getDate();

  const sliderarr=[
    {title:'article Title',preview:"article previwe",date:d,url:''},
    {title:'article Title',preview:"article previwe",date:d,url:''},
    {title:'article Title',preview:"article previwe",date:d,url:''},
    {title:'article Title',preview:"article previwe",date:d,url:''},
    {title:'article Title',preview:"article previwe",date:d,url:''}
  ]
  return (
    <main className={styles.main}>
     <Hero
     url={'https://media.istockphoto.com/id/1153882875/photo/african-wheelchair-basketball-players-on-the-community-ground-playing-a-friendly-match.webp?a=1&b=1&s=612x612&w=0&k=20&c=cFy1qGgZvRfMk7mQPs0-mVSvSl2vMxBkyXzpxuqdILU='}
     imagediscription={'african wheelchair basketball players'}
     hHeight={'350'}
     welcome='Welcome to Empowering Abilities: Sport and Health for All'
     msg='At Empowering Abilities, we believe that every person, regardless of ability, has the power to achieve greatness. Through sports and wellness, we create a community where strength, resilience, and passion shine. Together, we break barriers, inspire confidence, and celebrate the true potential within us all.'
    /*
    options welcome:
    "Inspiring Strength: Sports and Wellness for Everyone"
    "Empowering Lives: Inclusive Sports and Health for All"
    "Unleashing Potential: Sports and Wellbeing for People with Disabilities"
    "Championing Abilities: Where Health and Sports Meet for All" */
     />
     <div className={styles.separator}>
     <SubHeading
     heading='Empowering All Abilities: Advancing Health, Sports, and Wellness for Everyone'
     msg='At our core, we are committed to promoting health, physical activity, and inclusion for individuals of all abilities. Our journey began as a resource hub and has since evolved into a leader in public health, focused on improving lives through accessible sports and wellness programs. In recent years, we have expanded our efforts to center on three key strategies that guide our work and impact communities country wide'
     />
     <ColumInfo
     infoarr={ColumInfoarr1}
     />
     </div>
     <div className={styles.pitch}>
     <ImageDiscriptionBottom
     title='Empower Inclusive Wellness in Your Community'
     discprtion='Join us in expanding access to adaptive sports, health programs, and inclusive wellness initiatives. Through collaboration and innovation, we’re building a future where everyone, regardless of ability, has the opportunity to thrive. Explore funding and partnership opportunities to drive meaningful change and create a more accessible, healthier world for all.'
     url='https://images.unsplash.com/photo-1500823050524-096fd13fa287?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFmcmljYSUyMGRpc2FibGlhdHklMjBmdW5kaW5nJTIwYW5kJTIwcGFydG5lcnNoaXB8ZW58MHx8MHx8fDA%3D'
     />
    <ImageDiscriptionBottom
     title='Your Partner in Inclusive Health & Wellness'
     discprtion='Discover evidence-based programs and resources designed to empower individuals with disabilities through health, wellness, and physical activity—supporting lifelong well-being for all.'
     url='https://media.istockphoto.com/id/1759623927/photo/african-wheelchair-user-celebrating-success-by-raising-hands-up.webp?a=1&b=1&s=612x612&w=0&k=20&c=g8wwP3ilWbV-V0wvoxGER25SHJU1iy4eX79ca2YdLoc='
     />
     </div>
     <DisplayLinkGrid/>
     
    
      <div className={styles.callToAction}>
      <CallToAction
      action='Donate'
      link='donation'
      />
      </div>
      <Slider
      sliderarr={sliderarr}
      />
    </main>
  )
}
