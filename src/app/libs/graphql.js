import { gql } from '@apollo/client';

// Fetch categories
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      title
      description
      image
      href
    }
  }
`;

// Fetch articles
export const GET_ARTICLES = gql`
  query GetArticles {
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
`;

// Fetch events
export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      date
      location
      description
      image
      ticketLink
    }
  }
`;

// Add a category
export const ADD_CATEGORY = gql`
  mutation AddCategory($title: String!, $description: String!, $image: String!, $href: String!) {
    addCategory(title: $title, description: $description, image: $image, href: $href) {
      id
      title
      description
      image
      href
    }
  }
`;

// Update a category
export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $title: String!, $description: String!, $image: String!, $href: String!) {
    updateCategory(id: $id, title: $title, description: $description, image: $image, href: $href) {
      id
      title
      description
      image
      href
    }
  }
`;

// Delete a category
export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
    }
  }
`;

// Add an article
export const ADD_ARTICLE = gql`
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
`;

// Update an article
export const UPDATE_ARTICLE = gql`
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
`;

// Delete an article
export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      id
    }
  }
`;

// Add an event
export const ADD_EVENT = gql`
  mutation AddEvent(
    $title: String!
    $date: String!
    $location: String!
    $description: String!
    $image: String!
    $ticketLink: String!
  ) {
    addEvent(
      title: $title
      date: $date
      location: $location
      description: $description
      image: $image
      ticketLink: $ticketLink
    ) {
      id
      title
      date
      location
      description
      image
      ticketLink
    }
  }
`;

// Update an event
export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $title: String!
    $date: String!
    $location: String!
    $description: String!
    $image: String!
    $ticketLink: String!
  ) {
    updateEvent(
      id: $id
      title: $title
      date: $date
      location: $location
      description: $description
      image: $image
      ticketLink: $ticketLink
    ) {
      id
      title
      date
      location
      description
      image
      ticketLink
    }
  }
`;

// Delete an event
export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;