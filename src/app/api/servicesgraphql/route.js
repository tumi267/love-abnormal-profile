export const dynamic = 'force-dynamic';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { db } from '../../libs/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Define your schema for services
const typeDefs = gql`
  type ServiceItem {
    title: String!
    image: String!
  }

  type Service {
    id: ID!
    services: [ServiceItem!]!
    title:String!
    titleMsg: String!
    subTitle: String!
    subMsg: String!
  }

  type Query {
    services: [Service]
  }

  type Mutation {
    addService(
      services: [ServiceItemInput!]!
      title:String!
      titleMsg: String!
      subTitle: String!
      subMsg: String!
    ): Service
    updateService(
      id: ID!
      services: [ServiceItemInput!]!
      title:String!
      titleMsg: String!
      subTitle: String!
      subMsg: String!
    ): Service
    deleteService(id: ID!): ID
  }

  input ServiceItemInput {
    title: String!
    image: String!
  }
`;

// Define resolvers for services
const resolvers = {
  Query: {
    services: async () => {
      const snapshot = await getDocs(collection(db, 'services'));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
  },
  Mutation: {
    addService: async (_, { services, titleMsg, subTitle, subMsg,title }) => {
      const docRef = await addDoc(collection(db, 'services'), {
        services,
        title,
        titleMsg,
        subTitle,
        subMsg,
      });
      return { id: docRef.id, services, titleMsg, subTitle, subMsg,title };
    },
    updateService: async (_, { id, services, titleMsg, subTitle, subMsg,title }) => {
      await updateDoc(doc(db, 'services', id), {
        services,
        title,
        titleMsg,
        subTitle,
        subMsg,
      });
      return { id, services, titleMsg, subTitle, subMsg,title };
    },
    deleteService: async (_, { id }) => {
      await deleteDoc(doc(db, 'services', id));
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