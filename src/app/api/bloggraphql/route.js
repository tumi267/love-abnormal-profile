export const dynamic = 'force-dynamic';
  // app/api/bloggraphql/route.js
  import { ApolloServer } from '@apollo/server';
  import { startServerAndCreateNextHandler } from '@as-integrations/next';
  import { gql } from 'graphql-tag';
  import { db } from '../../libs/firebase';
  import { 
    collection, 
    getDocs, 
    addDoc, 
    doc, 
    updateDoc, 
    deleteDoc, 
    query, 
    orderBy, 
    limit as firestoreLimit 
  } from 'firebase/firestore';

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
      articles(
        limit: Int
        sortBy: String = "date"
        sortOrder: String = "desc"
        category: String
      ): [Article]
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
          .filter((category) => category.title != null);
      },
      articles: async (_, { limit, sortBy, sortOrder, category }) => {
        try {
          // Create base query
          let articlesQuery = collection(db, 'articles');
          
          // Apply filters if provided
          if (category) {
            articlesQuery = query(articlesQuery, where('category', '==', category));
          }
          
          // Apply sorting
          if (sortBy) {
            articlesQuery = query(
              articlesQuery, 
              orderBy(sortBy, sortOrder === 'asc' ? 'asc' : 'desc')
            );
          }
          
          // Apply limit with maximum safeguard
          const finalLimit = Math.min(limit || 10, 50); // Max 50 articles
          articlesQuery = query(articlesQuery, firestoreLimit(finalLimit));
          
          const snapshot = await getDocs(articlesQuery);
          return snapshot.docs.map((doc) => ({ 
            id: doc.id, 
            ...doc.data(),
            // Ensure all required fields have fallback values
            title: doc.data().title || 'Untitled Article',
            preview: doc.data().preview || '',
            date: doc.data().date || new Date().toISOString(),
            href: doc.data().href || '#',
            image: doc.data().image || '',
            content: doc.data().content || '',
            author: doc.data().author || 'Anonymous'
          }));
        } catch (error) {
          console.error('Error fetching articles:', error);
          throw new Error('Failed to fetch articles. Please try again later.');
        }
      },
    },
    Mutation: {
      addCategory: async (_, { title, description, image, href }) => {
        if (!title) throw new Error('Title is required');
        try {
          const docRef = await addDoc(collection(db, 'categories'), { 
            title, 
            description, 
            image, 
            href 
          });
          return { id: docRef.id, title, description, image, href };
        } catch (error) {
          throw new Error(`Failed to create category: ${error.message}`);
        }
      },
      updateCategory: async (_, { id, title, description, image, href }) => {
        if (!title) throw new Error('Title is required');
        try {
          await updateDoc(doc(db, 'categories', id), { 
            title, 
            description, 
            image, 
            href 
          });
          return { id, title, description, image, href };
        } catch (error) {
          throw new Error(`Failed to update category: ${error.message}`);
        }
      },
      deleteCategory: async (_, { id }) => {
        try {
          await deleteDoc(doc(db, 'categories', id));
          return id;
        } catch (error) {
          throw new Error(`Failed to delete category: ${error.message}`);
        }
      },
      addArticle: async (_, { 
        title, 
        category, 
        preview, 
        date, 
        href, 
        image, 
        content, 
        author 
      }) => {
        if (!title || !author) {
          throw new Error('Title and author are required');
        }
        try {
          const docRef = await addDoc(collection(db, 'articles'), {
            title,
            category,
            preview,
            date: date || new Date().toISOString(),
            href,
            image,
            content,
            author,
          });
          return { 
            id: docRef.id, 
            title, 
            category, 
            preview, 
            date, 
            href, 
            image, 
            content, 
            author 
          };
        } catch (error) {
          throw new Error(`Failed to create article: ${error.message}`);
        }
      },
      updateArticle: async (_, { 
        id, 
        title, 
        category, 
        preview, 
        date, 
        href, 
        image, 
        content, 
        author 
      }) => {
        if (!title || !author) {
          throw new Error('Title and author are required');
        }
        try {
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
        } catch (error) {
          throw new Error(`Failed to update article: ${error.message}`);
        }
      },
      deleteArticle: async (_, { id }) => {
        try {
          await deleteDoc(doc(db, 'articles', id));
          return id;
        } catch (error) {
          throw new Error(`Failed to delete article: ${error.message}`);
        }
      },
    },
  };

  // Create Apollo Server with enhanced error handling
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      // Don't expose internal errors to clients
      return {
        message: error.message,
        extensions: {
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR'
        }
      };
    },
    introspection: process.env.NODE_ENV !== 'production', // Enable introspection in development
  });

  // Start the server and create a Next.js API route handler
  const handler = startServerAndCreateNextHandler(server, {
    context: async () => ({
      // You can add any context you want to pass to resolvers here
    }),
  });

  // Export handlers for GET and POST requests
  export { handler as GET, handler as POST };