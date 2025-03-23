import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { db } from '../../libs/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Define your schema
const typeDefs = gql`
  type Category {
    id: ID!
    title: String!
    description: String!
    image: String!
    href: String!
  }

  type Article {
    id: ID!
    title: String!
    category: String!
    preview: String!
    date: String!
    href: String!
    image: String!
    content: String!
    author: String!
  }

  type Query {
    categories: [Category]
    articles: [Article]
  }

  type Mutation {
    addCategory(title: String!, description: String!, image: String!, href: String!): Category
    updateCategory(id: ID!, title: String!, description: String!, image: String!, href: String!): Category
    deleteCategory(id: ID!): ID
    addArticle(
      title: String!
      category: String!
      preview: String!
      date: String!
      href: String!
      image: String!
      content: String!
      author: String!
    ): Article
    updateArticle(
      id: ID!
      title: String!
      category: String!
      preview: String!
      date: String!
      href: String!
      image: String!
      content: String!
      author: String!
    ): Article
    deleteArticle(id: ID!): ID
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    categories: async () => {
      const snapshot = await getDocs(collection(db, 'categories'));
      return snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((category) => category.title != null); // Filter out categories without a title
    },
    articles: async () => {
      const snapshot = await getDocs(collection(db, 'articles'));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
  },
  Mutation: {
    addCategory: async (_, { title, description, image, href }) => {
      if (!title) {
        throw new Error('Title is required');
      }
      const docRef = await addDoc(collection(db, 'categories'), { title, description, image, href });
      return { id: docRef.id, title, description, image, href };
    },
    updateCategory: async (_, { id, title, description, image, href }) => {
      if (!title) {
        throw new Error('Title is required');
      }
      await updateDoc(doc(db, 'categories', id), { title, description, image, href });
      return { id, title, description, image, href };
    },
    deleteCategory: async (_, { id }) => {
      await deleteDoc(doc(db, 'categories', id));
      return id;
    },
    addArticle: async (_, { title, category, preview, date, href, image, content, author }) => {
      if (!title || !author) {
        throw new Error('Title and author are required');
      }
      const docRef = await addDoc(collection(db, 'articles'), {
        title,
        category,
        preview,
        date,
        href,
        image,
        content,
        author,
      });
      return { id: docRef.id, title, category, preview, date, href, image, content, author };
    },
    updateArticle: async (_, { id, title, category, preview, date, href, image, content, author }) => {
      if (!title || !author) {
        throw new Error('Title and author are required');
      }
      await updateDoc(doc(db, 'articles', id), {
        title,
        category,
        preview,
        date,
        href,
        image,
        content,
        author,
      });
      return { id, title, category, preview, date, href, image, content, author };
    },
    deleteArticle: async (_, { id }) => {
      await deleteDoc(doc(db, 'articles', id));
      return id;
    },
  },
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return error;
  },
});

// Start the server and create a Next.js API route handler
const handler = startServerAndCreateNextHandler(server);

// Export handlers for GET and POST requests
export { handler as GET, handler as POST };