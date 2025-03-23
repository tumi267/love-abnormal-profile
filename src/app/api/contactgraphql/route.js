import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { db } from '../../libs/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Define your schema for contacts
const typeDefs = gql`
  type Contact {
    id: ID!
    whatsapp: String!
    email: String!
    address: String!
  }

  type Query {
    contact: Contact
  }

  type Mutation {
    updateContact(whatsapp: String!, email: String!, address: String!): Contact
  }
`;

// Define resolvers for contacts
const resolvers = {
  Query: {
    contact: async () => {
      const docRef = doc(db, 'contacts', 'singleContact'); // Fixed document ID
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    },
  },
  Mutation: {
    updateContact: async (_, { whatsapp, email, address }) => {
      const docRef = doc(db, 'contacts', 'singleContact'); // Fixed document ID
      await setDoc(docRef, { whatsapp, email, address }, { merge: true }); // Merge to update only specified fields
      return { id: 'singleContact', whatsapp, email, address };
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