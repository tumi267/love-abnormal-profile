import styles from './AboutUs.module.css';
import Loading from '../loading';
import AboutFront from '../components/AboutFront/AboutFront';

// Enable SSR for this page
export const dynamic = 'force-dynamic';

async function getAboutData() {
  try {
    const query = `
      query {
        about {
          id
          heroTitle
          heroMsg
          missionTitle
          missionMsg
          team {
            name
            position
            image
          }
          impactTitle
          impactMsg
        }
      }
    `;

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}api/aboutgraphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      cache: 'no-store',
      next: { tags: ['about'] } // Optional: for on-demand revalidation
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data?.about || null;
  } catch (error) {
    console.error('About data fetch error:', error);
    return null;
  }
}

export default async function AboutPage() {
  const aboutData = await getAboutData();

  if (!aboutData) {
    return (
      <div className={styles.errorContainer}>
        <h2>Unable to load content</h2>
        <p>process.env.NEXT_PUBLIC_SITE_URL</p>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <AboutFront aboutData={aboutData} />
    </main>
  );
}