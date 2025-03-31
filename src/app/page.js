// app/page.js
export const dynamic = 'force-dynamic';

import Image from 'next/image';
import styles from './page.module.css';
import Hero from './components/Hero/Hero';
import SubHeading from './components/SubHeading/SubHeading';
import ColumInfo from './components/ColumInfo/ColumInfo';
import ImageDiscriptionBottom from './components/ImageDiscriptionBottom/ImageDiscriptionBottom';
import DisplayLinkGrid from './components/DisplayLinkGrid/DisplayLinkGrid';
import CallToAction from './components/CallToAction/CallToAction';
import Slider from './components/slider/Slider';
import dataimage from '/public/data.png';
import fingerPrint from '/public/fingerprint.png';
import training from '/public/training.png';

async function getHomeData() {
  try {
    // Fetch both home content and articles in parallel
    const [homeResponse, blogResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/homegraphql`, {
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
        }),
        cache: 'no-store'
      }),
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/bloggraphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              articles(limit: 3) {
                id
                title
                preview
                date
                href
                image
              }
            }
          `
        }),
        cache: 'no-store'
      })
    ]);

    const [homeResult, blogResult] = await Promise.all([
      homeResponse.json(),
      blogResponse.json()
    ]);

    return {
      home: homeResult.data?.home || {
        hero: {
          url: 'https://media.istockphoto.com/id/1153882875/photo/african-wheelchair-basketball-players-on-the-community-ground-playing-a-friendly-match.webp',
          imagediscription: 'african wheelchair basketball players',
          hHeight: '350',
          welcome: 'Welcome to Empowering Abilities: Sport and Health for All',
          msg: 'At Empowering Abilities, we believe that every person, regardless of ability, has the power to achieve greatness. Through sports and wellness, we create a community where strength, resilience, and passion shine. Together, we break barriers, inspire confidence, and celebrate the true potential within us all.',
          calltoaction: { name: 'Donate', link: 'donation' },
          calltoaction2: { name: 'doctors', link: 'practitioners' }
        },
        subHeading: {
          heading: 'Empowering All Abilities: Advancing Health, Sports, and Wellness for Everyone',
          msg: 'At our core, we are committed to promoting health, physical activity, and inclusion for individuals of all abilities. Our journey began as a resource hub and has since evolved into a leader in public health, focused on improving lives through accessible sports and wellness programs. In recent years, we have expanded our efforts to center on three key strategies that guide our work and impact communities country wide'
        }
      },
      articles: blogResult.data?.articles || []
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return {
      home: {
        hero: {
          url: 'https://media.istockphoto.com/id/1153882875/photo/african-wheelchair-basketball-players-on-the-community-ground-playing-a-friendly-match.webp',
          imagediscription: 'african wheelchair basketball players',
          hHeight: '350',
          welcome: 'Welcome to Empowering Abilities: Sport and Health for All',
          msg: 'At Empowering Abilities, we believe that every person, regardless of ability, has the power to achieve greatness. Through sports and wellness, we create a community where strength, resilience, and passion shine. Together, we break barriers, inspire confidence, and celebrate the true potential within us all.',
          calltoaction: { name: 'Donate', link: 'donation' },
          calltoaction2: { name: 'doctors', link: 'practitioners' }
        },
        subHeading: {
          heading: 'Empowering All Abilities: Advancing Health, Sports, and Wellness for Everyone',
          msg: 'At our core, we are committed to promoting health, physical activity, and inclusion for individuals of all abilities. Our journey began as a resource hub and has since evolved into a leader in public health, focused on improving lives through accessible sports and wellness programs. In recent years, we have expanded our efforts to center on three key strategies that guide our work and impact communities country wide'
        }
      },
      articles: []
    };
  }
}

export default async function Home() {
  const { home, articles } = await getHomeData();

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <Hero
        url={home.hero.url}
        imagediscription={home.hero.imagediscription}
        hHeight={home.hero.hHeight}
        welcome={home.hero.welcome}
        msg={home.hero.msg}
        calltoaction={home.hero.calltoaction}
        calltoaction2={home.hero.calltoaction2}
      />

      {/* SubHeading Section */}
      <div className={styles.separator}>
        <SubHeading
          heading={home.subHeading.heading}
          msg={home.subHeading.msg}
        />
        
        {home.columnInfo && <ColumInfo infoarr={home.columnInfo} />}
      </div>

      {/* Image Descriptions Section */}
      {home.imageDescriptions && (
        <div className={styles.pitch}>
          {home.imageDescriptions.map((item, index) => (
            <ImageDiscriptionBottom
              key={index}
              title={item.title}
              discprtion={item.discprtion}
              url={item.url}
            />
          ))}
        </div>
      )}

      {/* Display Link Grid */}
      <DisplayLinkGrid />

      {/* Call to Action */}
      <div className={styles.callToAction}>
        <CallToAction
          action={home.callToAction?.name || 'Donate'}
          link={home.callToAction?.link || 'donation'}
        />
      </div>

      {/* Slider with Articles */}
      {articles.length > 0 && <Slider sliderarr={articles} />}
    </main>
  );
}