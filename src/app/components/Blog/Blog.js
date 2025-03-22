'use client';

import React, { useState, useEffect } from 'react';
import styles from './Blog.module.css';

function Blog() {
  const [view, setView] = useState('articles'); // Switch between 'articles' and 'categories'
  const [newCategory, setNewCategory] = useState({ title: '', description: '', image: '', href: '' });
  const [newArticle, setNewArticle] = useState({ title: '', category: '', preview: '', date: '', href: '', image: '', content: '', author: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);

  // Fetch categories and articles on component mount
  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    const response = await fetch('/api/bloggraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            categories {
              id
              title
              description
              image
              href
            }
          }
        `,
      }),
    });
    const { data } = await response.json();
    setCategories(data.categories);
  };

  // Fetch articles
  const fetchArticles = async () => {
    const response = await fetch('/api/bloggraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            articles {
              id
              title
              category
              preview
              date
              href
              image
              content
              author
            }
          }
        `,
      }),
    });
    const { data } = await response.json();
    setArticles(data.articles);
  };

  // Add a new category
  const handleAddCategory = async () => {
    const response = await fetch('/api/bloggraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation AddCategory($title: String!, $description: String!, $image: String!, $href: String!) {
            addCategory(title: $title, description: $description, image: $image, href: $href) {
              id
              title
              description
              image
              href
            }
          }
        `,
        variables: newCategory,
      }),
    });
    const { data } = await response.json();
    if (data.addCategory) {
      setNewCategory({ title: '', description: '', image: '', href: '' });
      fetchCategories(); // Refresh categories
    }
  };

  // Edit a category
  const handleEditCategory = async () => {
    const response = await fetch('/api/bloggraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation UpdateCategory($id: ID!, $title: String!, $description: String!, $image: String!, $href: String!) {
            updateCategory(id: $id, title: $title, description: $description, image: $image, href: $href) {
              id
              title
              description
              image
              href
            }
          }
        `,
        variables: editingCategory,
      }),
    });
    const { data } = await response.json();
    if (data.updateCategory) {
      setEditingCategory(null);
      fetchCategories(); // Refresh categories
    }
  };

  // Delete a category
  const handleDeleteCategory = async (id) => {
    const response = await fetch('/api/bloggraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation DeleteCategory($id: ID!) {
            deleteCategory(id: $id)
          }
        `,
        variables: { id },
      }),
    });
    const { data } = await response.json();
    if (data.deleteCategory) {
      fetchCategories(); // Refresh categories
    }
  };

  // Add a new article
  const handleAddArticle = async () => {
    const response = await fetch('/api/bloggraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation AddArticle(
            $title: String!
            $category: String!
            $preview: String!
            $date: String!
            $href: String!
            $image: String!
            $content: String!
            $author: String!
          ) {
            addArticle(
              title: $title
              category: $category
              preview: $preview
              date: $date
              href: $href
              image: $image
              content: $content
              author: $author
            ) {
              id
              title
              category
              preview
              date
              href
              image
              content
              author
            }
          }
        `,
        variables: newArticle,
      }),
    });
    const { data } = await response.json();
    if (data.addArticle) {
      setNewArticle({ title: '', category: '', preview: '', date: '', href: '', image: '', content: '', author: '' });
      fetchArticles(); // Refresh articles
    }
  };

  // Edit an article
  const handleEditArticle = async () => {
    const response = await fetch('/api/bloggraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation UpdateArticle(
            $id: ID!
            $title: String!
            $category: String!
            $preview: String!
            $date: String!
            $href: String!
            $image: String!
            $content: String!
            $author: String!
          ) {
            updateArticle(
              id: $id
              title: $title
              category: $category
              preview: $preview
              date: $date
              href: $href
              image: $image
              content: $content
              author: $author
            ) {
              id
              title
              category
              preview
              date
              href
              image
              content
              author
            }
          }
        `,
        variables: editingArticle,
      }),
    });
    const { data } = await response.json();
    if (data.updateArticle) {
      setEditingArticle(null);
      fetchArticles(); // Refresh articles
    }
  };

  // Delete an article
  const handleDeleteArticle = async (id) => {
    const response = await fetch('/api/bloggraphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation DeleteArticle($id: ID!) {
            deleteArticle(id: $id)
          }
        `,
        variables: { id },
      }),
    });
    const { data } = await response.json();
    if (data.deleteArticle) {
      fetchArticles(); // Refresh articles
    }
  };

  let cleancategories = categories.filter((e) => e !== null);

  return (
    <div className={styles.blogContainer}>
      <h2>Blog Management</h2>

      {/* Switch between articles and categories */}
      <div className={styles.switchButtons}>
        <button
          className={view === 'articles' ? styles.active : ''}
          onClick={() => setView('articles')}
        >
          Manage Articles
        </button>
        <button
          className={view === 'categories' ? styles.active : ''}
          onClick={() => setView('categories')}
        >
          Manage Categories
        </button>
      </div>

      {/* Render articles or categories based on view */}
      {view === 'articles' ? (
        <div>
          <h3>Articles</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Preview</th>
                <th>Date</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles?.map((article) => (
                <tr key={article.id}>
                  <td>{article.title}</td>
                  <td>{article.category}</td>
                  <td>{article.preview}</td>
                  <td>{article.date}</td>
                  <td>{article.author}</td>
                  <td>
                    <button onClick={() => setEditingArticle(article)}>Edit</button>
                    <button onClick={() => handleDeleteArticle(article.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Article Form */}
          <div className={styles.form}>
            <h4>Add New Article</h4>
            <input
              type="text"
              placeholder="Title"
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            />
            <select
              value={newArticle.category}
              onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
            >
              <option value="">Select a category</option>
              {cleancategories && cleancategories.map((category) => (
                <option key={category.id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Preview"
              value={newArticle.preview}
              onChange={(e) => setNewArticle({ ...newArticle, preview: e.target.value })}
            />
            <input
              type="date"
              placeholder="Date"
              value={newArticle.date}
              onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Href"
              value={newArticle.href}
              onChange={(e) => setNewArticle({ ...newArticle, href: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newArticle.image}
              onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
            />
            <textarea
              placeholder="Content"
              value={newArticle.content}
              onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
            />
            <input
              type="text"
              placeholder="Author"
              value={newArticle.author}
              onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
            />
            <button onClick={handleAddArticle}>Add Article</button>
          </div>

          {/* Edit Article Form */}
          {editingArticle && (
            <div className={styles.form}>
              <h4>Edit Article</h4>
              <input
                type="text"
                placeholder="Title"
                value={editingArticle.title}
                onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
              />
              <select
                value={editingArticle.category}
                onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
              >
                <option value="">Select a category</option>
                {cleancategories && cleancategories.map((category) => (
                  <option key={category.id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Preview"
                value={editingArticle.preview}
                onChange={(e) => setEditingArticle({ ...editingArticle, preview: e.target.value })}
              />
              <input
                type="date"
                placeholder="Date"
                value={editingArticle.date}
                onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
              />
              <input
                type="text"
                placeholder="Href"
                value={editingArticle.href}
                onChange={(e) => setEditingArticle({ ...editingArticle, href: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={editingArticle.image}
                onChange={(e) => setEditingArticle({ ...editingArticle, image: e.target.value })}
              />
              <textarea
                placeholder="Content"
                value={editingArticle.content}
                onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
              />
              <input
                type="text"
                placeholder="Author"
                value={editingArticle.author}
                onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
              />
              <button onClick={handleEditArticle}>Save Changes</button>
              <button onClick={() => setEditingArticle(null)}>Cancel</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3>Categories</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Image</th>
                <th>Href</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cleancategories?.map((category) => (
                <tr key={category?.id}>
                  <td>{category?.title}</td>
                  <td>{category?.description}</td>
                  <td>{category?.image}</td>
                  <td>{category?.href}</td>
                  <td>
                    <button onClick={() => setEditingCategory(category)}>Edit</button>
                    <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Category Form */}
          <div className={styles.form}>
            <h4>Add New Category</h4>
            <input
              type="text"
              placeholder="Title"
              value={newCategory.title}
              onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newCategory.image}
              onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
            />
            <input
              type="text"
              placeholder="Href"
              value={newCategory.href}
              onChange={(e) => setNewCategory({ ...newCategory, href: e.target.value })}
            />
            <button onClick={handleAddCategory}>Add Category</button>
          </div>

          {/* Edit Category Form */}
          {editingCategory && (
            <div className={styles.form}>
              <h4>Edit Category</h4>
              <input
                type="text"
                placeholder="Title"
                value={editingCategory.title}
                onChange={(e) => setEditingCategory({ ...editingCategory, title: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={editingCategory.description}
                onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={editingCategory.image}
                onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
              />
              <input
                type="text"
                placeholder="Href"
                value={editingCategory.href}
                onChange={(e) => setEditingCategory({ ...editingCategory, href: e.target.value })}
              />
              <button onClick={handleEditCategory}>Save Changes</button>
              <button onClick={() => setEditingCategory(null)}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Blog;