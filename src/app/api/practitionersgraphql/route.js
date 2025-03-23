import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { db } from '../../libs/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Define your schema for practitioners
const typeDefs = gql`
  type Practitioner {
    id: ID!
    name: String!
    specialization: String!
    bio: String!
    email: String!
    phone: String!
    image: String!
    bookingLink: String!
  }

  type Query {
    practitioners: [Practitioner]
  }

  type Mutation {
    addPractitioner(
      name: String!
      specialization: String!
      bio: String!
      email: String!
      phone: String!
      image: String!
      bookingLink: String!
    ): Practitioner
    updatePractitioner(
      id: ID!
      name: String!
      specialization: String!
      bio: String!
      email: String!
      phone: String!
      image: String!
      bookingLink: String!
    ): Practitioner
    deletePractitioner(id: ID!): ID
  }
`;

// Define resolvers for practitioners
const resolvers = {
  Query: {
    practitioners: async () => {
      const snapshot = await getDocs(collection(db, 'practitioners'));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
  },
  Mutation: {
    addPractitioner: async (_, { name, specialization, bio, email, phone, image, bookingLink }) => {
      const docRef = await addDoc(collection(db, 'practitioners'), {
        name,
        specialization,
        bio,
        email,
        phone,
        image,
        bookingLink,
      });
      return { id: docRef.id, name, specialization, bio, email, phone, image, bookingLink };
    },
    updatePractitioner: async (_, { id, name, specialization, bio, email, phone, image, bookingLink }) => {
      await updateDoc(doc(db, 'practitioners', id), {
        name,
        specialization,
        bio,
        email,
        phone,
        image,
        bookingLink,
      });
      return { id, name, specialization, bio, email, phone, image, bookingLink };
    },
    deletePractitioner: async (_, { id }) => {
      await deleteDoc(doc(db, 'practitioners', id));
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