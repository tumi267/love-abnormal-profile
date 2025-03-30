export const dynamic = 'force-dynamic';

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { db } from '../../libs/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Define your schema for sponsours
const typeDefs = gql`
  type Sponsour {
    id: ID!
    name: String!
    image: String!
    url: String!
  }

  type Query {
    sponsours: [Sponsour]
  }

  type Mutation {
    addSponsour(name: String!, image: String!, url: String!): Sponsour
    updateSponsour(id: ID!, name: String!, image: String!, url: String!): Sponsour
    deleteSponsour(id: ID!): ID
  }
`;

// Define resolvers for sponsours
const resolvers = {
  Query: {
    sponsours: async () => {
      const snapshot = await getDocs(collection(db, 'sponsours'));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
  },
  Mutation: {
    addSponsour: async (_, { name, image, url }) => {
      const docRef = await addDoc(collection(db, 'sponsours'), {
        name,
        image,
        url,
      });
      return { id: docRef.id, name, image, url };
    },
    updateSponsour: async (_, { id, name, image, url }) => {
      await updateDoc(doc(db, 'sponsours', id), {
        name,
        image,
        url,
      });
      return { id, name, image, url };
    },
    deleteSponsour: async (_, { id }) => {
      await deleteDoc(doc(db, 'sponsours', id));
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