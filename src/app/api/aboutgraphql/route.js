// app/api/aboutgraphql/route.js
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { db } from '../../libs/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

// Define your schema
const typeDefs = gql`
  type TeamMember {
    name: String!
    position: String!
  }

  input TeamMemberInput {
    name: String!
    position: String!
  }

  type About {
    id: ID!
    heroTitle: String!
    heroMsg: String!
    missionTitle: String!
    missionMsg: String!
    team: [TeamMember!]!
    impactTitle: String!
    impactMsg: String!
  }

  input AboutInput {
    heroTitle: String!
    heroMsg: String!
    missionTitle: String!
    missionMsg: String!
    team: [TeamMemberInput!]!
    impactTitle: String!
    impactMsg: String!
  }

  type Query {
    about: About
  }

  type Mutation {
    saveAbout(
      id: ID!
      input: AboutInput!
    ): About
    deleteAbout(id: ID!): ID
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    about: async () => {
      const snapshot = await getDocs(collection(db, 'about'));
      if (snapshot.empty) {
        return null; // Return null if no document exists
      }
      const aboutData = snapshot.docs[0]; // Get the first document
      return { id: aboutData.id, ...aboutData.data() };
    },
  },
  Mutation: {
    saveAbout: async (_, { id, input }) => {
      const aboutRef = doc(db, 'about', id); // Use a fixed ID
      await setDoc(aboutRef, input, { merge: true }); // Merge to update or create
      return { id, ...input };
    },
    deleteAbout: async (_, { id }) => {
      await deleteDoc(doc(db, 'about', id)); // Delete the document
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