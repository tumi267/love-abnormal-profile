import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { db } from '../../libs/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Define your schema for events
const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    date: String!
    location: String!
    description: String!
    image: String!
    ticketLink: String!
  }

  type Query {
    events: [Event]
  }

  type Mutation {
    addEvent(
      title: String!
      date: String!
      location: String!
      description: String!
      image: String!
      ticketLink: String!
    ): Event
    updateEvent(
      id: ID!
      title: String!
      date: String!
      location: String!
      description: String!
      image: String!
      ticketLink: String!
    ): Event
    deleteEvent(id: ID!): ID
  }
`;

// Define resolvers for events
const resolvers = {
  Query: {
    events: async () => {
      const snapshot = await getDocs(collection(db, 'events'));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
  },
  Mutation: {
    addEvent: async (_, { title, date, location, description, image, ticketLink }) => {
      const docRef = await addDoc(collection(db, 'events'), {
        title,
        date,
        location,
        description,
        image,
        ticketLink,
      });
      return { id: docRef.id, title, date, location, description, image, ticketLink };
    },
    updateEvent: async (_, { id, title, date, location, description, image, ticketLink }) => {
      await updateDoc(doc(db, 'events', id), {
        title,
        date,
        location,
        description,
        image,
        ticketLink,
      });
      return { id, title, date, location, description, image, ticketLink };
    },
    deleteEvent: async (_, { id }) => {
      await deleteDoc(doc(db, 'events', id));
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