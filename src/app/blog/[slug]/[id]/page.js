'use client'
import React from "react";
import styles from "./blog.module.css";
import { useParams } from "next/navigation";
import Image from "next/image";

const articleData = {
  title: "The Secret to Perfect Homemade Pasta",
  author: "Chef Marco Rossi",
  date: "March 21, 2025",
  content: [
    "Homemade pasta is a game-changer in the kitchen. With just a few simple ingredients, you can create silky, fresh pasta that tastes far superior to anything store-bought.",
    "The key to great pasta lies in the dough. Use high-quality '00' flour and fresh eggs for a smooth texture and rich flavor. Kneading the dough properly and allowing it to rest ensures the perfect elasticity.",
    "Once you've mastered the dough, the possibilities are endless—tagliatelle, ravioli, fettuccine, or even handmade shapes like orecchiette!",
    "Pair your pasta with a simple sauce. A classic aglio e olio (garlic and oil) or a slow-cooked tomato sauce brings out the freshness of the pasta without overpowering it.",
  ],
  images: [
    "", 
    "", 
    ""
  ],
};
function BlogArtical(){
  const params =useParams()
  const {id}=params
//  use id to get article graphQl
  return (
    <div className={styles.articleContainer}>
      {/* Article Header */}
      <header className={styles.header}>
        <h1>{articleData.title}</h1>
        <p className={styles.meta}>
          By <span>{articleData.author}</span> • {articleData.date}
        </p>
      </header>

      {/* Featured Image */}
      {articleData.images.length > 0 && (
        <div className={styles.featuredImage}>
          <Image src={articleData.images[0]} fill alt={articleData.title} />
        </div>
      )}

      {/* Article Content */}
      <div className={styles.content}>
          <p >{articleData.content}</p>
  

        {/* Breaking Images */}
        {articleData.images.slice(1).map((image, index) => (
          <div key={index} className={styles.breakingImage}>
            <Image src={image} fill alt={`Article Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogArtical;
