"use client";
import React, { useEffect, useState } from "react";
import styles from "./blog.module.css";
import { useParams } from "next/navigation";
import Image from "next/image";

function BlogArticle() {
  const params = useParams();
  const { id } = params;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchArticle() {
      try {
        const response = await fetch(`/api/getArticle/${id}`);
        const result = await response.json();

        if (response.ok) {
          setArticle(result);
        } else {
          console.error("Error:", result.error);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <div className={styles.articleContainer}>
      <header className={styles.header}>
        <h1>{article.title}</h1>
        <p className={styles.meta}>
          By <span>{article.author}</span> • {article.date}
        </p>
      </header>

      {article.images?.length > 0 && (
        <div className={styles.featuredImage}>
          <Image src={article.images[0]} width={800} height={500} alt={article.title} />
        </div>
      )}

      <div className={styles.content}>
        <p>{article.content}</p>
        {article.images?.slice(1).map((image, index) => (
          <div key={index} className={styles.breakingImage}>
            <Image src={image} width={800} height={500} alt={`Article Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogArticle;


