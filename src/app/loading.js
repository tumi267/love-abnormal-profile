'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function Loading() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/hearts.json') // Load from public folder
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Error loading Lottie animation:', error));
  }, []);

  if (!animationData) return <p>Loading...</p>; // Show simple text while fetching JSON

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Lottie animationData={animationData} loop={true} style={{ width: 250, height: 250 }} />
    </div>
  );
}
