'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import Hero from './components/Hero/Hero'
import SubHeading from './components/SubHeading/SubHeading'
import ColumInfo from './components/ColumInfo/ColumInfo'
import ImageDiscriptionBottom from './components/ImageDiscriptionBottom/ImageDiscriptionBottom'
import DisplayLinkGrid from './components/DisplayLinkGrid/DisplayLinkGrid'
import CallToAction from './components/CallToAction/CallToAction'
import Slider from './components/slider/Slider'
import dataimage from '/public/data.png'
import fingerPrint from '/public/fingerprint.png'
import training from '/public/training.png'

export default function Home() {
  const [homeData, setHomeData] = useState(null)
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch home page content
        const homeResponse = await fetch('/api/homegraphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query {
                home {
                  hero {
                    url
                    imagediscription
                    hHeight
                    welcome
                    msg
                    calltoaction {
                      name
                      link
                    }
                    calltoaction2 {
                      name
                      link
                    }
                  }
                  subHeading {
                    heading
                    msg
                  }
                  columnInfo {
                    title
                    msg
                    url
                  }
                  imageDescriptions {
                    title
                    discprtion
                    url
                  }
                  callToAction {
                    name
                    link
                  }
                }
              }
            `
          })
        })
        const homeResult = await homeResponse.json()

        // Fetch latest articles for slider
        const blogResponse = await fetch('/api/bloggraphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query {
                articles(limit: 10) {
                  id
                  title
                  preview
                  date
                  href
                  image
                }
              }
            `
          })
        })
        const blogResult = await blogResponse.json()

        if (homeResult.data?.home) {
          setHomeData(homeResult.data.home)
        }

        if (blogResult.data?.articles) {
          setArticles(blogResult.data.articles)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>
  }



  return (
    <main className={styles.main}>
      {/* Hero Section */}
      {homeData?.hero && (
        <Hero
          url={homeData.hero.url || 'https://media.istockphoto.com/id/1153882875/photo/african-wheelchair-basketball-players-on-the-community-ground-playing-a-friendly-match.webp'}
          imagediscription={homeData.hero.imagediscription || 'african wheelchair basketball players'}
          hHeight={homeData.hero.hHeight || '350'}
          welcome={homeData.hero.welcome || 'Welcome to Empowering Abilities: Sport and Health for All'}
          msg={homeData.hero.msg || 'At Empowering Abilities, we believe that every person, regardless of ability, has the power to achieve greatness. Through sports and wellness, we create a community where strength, resilience, and passion shine. Together, we break barriers, inspire confidence, and celebrate the true potential within us all.'}
          calltoaction={homeData.hero.calltoaction || { name: 'Donate', link: 'donation' }}
          calltoaction2={homeData.hero.calltoaction2 || { name: 'doctors', link: 'practitioners' }}
        />
      )}

      {/* SubHeading Section */}
      <div className={styles.separator}>
        {homeData?.subHeading && (
          <SubHeading
            heading={homeData.subHeading.heading || 'Empowering All Abilities: Advancing Health, Sports, and Wellness for Everyone'}
            msg={homeData.subHeading.msg || 'At our core, we are committed to promoting health, physical activity, and inclusion for individuals of all abilities. Our journey began as a resource hub and has since evolved into a leader in public health, focused on improving lives through accessible sports and wellness programs. In recent years, we have expanded our efforts to center on three key strategies that guide our work and impact communities country wide'}
          />
        )}
        
        <ColumInfo infoarr={homeData.columnInfo} />
      </div>

      {/* Image Descriptions Section */}
      <div className={styles.pitch}>
        {homeData?.imageDescriptions?.map((item, index) => (
          <ImageDiscriptionBottom
            key={index}
            title={item.title}
            discprtion={item.discprtion}
            url={item.url}
          />
        ))}
      </div>

      {/* Display Link Grid */}
      <DisplayLinkGrid />

      {/* Call to Action */}
      <div className={styles.callToAction}>
        <CallToAction
          action={homeData?.callToAction?.name || 'Donate'}
          link={homeData?.callToAction?.link || 'donation'}
        />
      </div>

      {/* Slider with Articles */}
      <Slider sliderarr={articles } />
    </main>
  )
}