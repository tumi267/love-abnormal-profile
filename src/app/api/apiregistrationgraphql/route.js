import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { db } from '../../libs/firebase';
import { collection, doc, getDoc, setDoc, deleteDoc, getDocs, addDoc, query, where } from 'firebase/firestore';
import jwt from 'jsonwebtoken'; // For generating and verifying JWTs
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs

// Define your schema for API registration/update
const typeDefs = gql`
  type Api {
    id: ID!
    api: String!
    token: String! # JWT containing apiKey and apiId
    uuid: String! # Unique identifier for the API (used as JWT secret)
  }

  type Query {
    getApis: [Api] # Fetch all APIs
    getApi(id: ID!): Api # Fetch a single API by ID
    getApiByApiName(api: String!): Api # Fetch a single API by api name
  }

  type Mutation {
    registerApi(api: String!, apiKey: String!, apiId: String!): Api # Add a new API
    updateApi(id: ID!, api: String!, apiKey: String!, apiId: String!): Api # Edit an existing API
    deleteApi(id: ID!): Boolean # Delete an API
  }
`;

// Define resolvers for API registration/update
const resolvers = {
  Query: {
    // Fetch all APIs
    getApis: async () => {
      const apisCollection = collection(db, 'apis');
      const apisSnapshot = await getDocs(apisCollection);
      const apis = apisSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return apis;
    },

    // Fetch a single API by ID
    getApi: async (_, { id }) => {
      const docRef = doc(db, 'apis', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      throw new Error('API not found');
    },

    // Fetch a single API by api name
    getApiByApiName: async (_, { api }) => {
      const apisCollection = collection(db, 'apis');
      const q = query(apisCollection, where('api', '==', api)); // Filter by api name
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('API not found');
      }

      // Return the first matching API
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    },
  },
  Mutation: {
    // Register a new API
    registerApi: async (_, { api, apiKey, apiId }) => {
      // Generate a UUID (this will also act as the JWT secret)
      const uuid = uuidv4();

      // Create a JWT containing apiKey and apiId, signed with the UUID as the secret
      const token = jwt.sign({ apiKey, apiId }, uuid, {
        expiresIn: '1h', // Token expires in 1 hour
      });

      // Register new API (Firestore will auto-generate an ID)
      const apisCollection = collection(db, 'apis');
      const newDocRef = await addDoc(apisCollection, { api, token, uuid });
      return { id: newDocRef.id, api, token, uuid };
    },

    // Update an existing API
    updateApi: async (_, { id, api, apiKey, apiId }) => {
      // Check if the API exists
      const docRef = doc(db, 'apis', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('API not found');
      }

      // Fetch the existing UUID (this acts as the JWT secret)
      const existingUuid = docSnap.data().uuid;

      // Create a new JWT containing the updated apiKey and apiId, signed with the existing UUID
      const token = jwt.sign({ apiKey, apiId }, existingUuid, {
        expiresIn: '1h', // Token expires in 1 hour
      });

      // Update the existing API
      await setDoc(docRef, { api, token, uuid: existingUuid }, { merge: true }); // Merge with existing data
      return { id, api, token, uuid: existingUuid };
    },

    // Delete an API by ID
    deleteApi: async (_, { id }) => {
      const docRef = doc(db, 'apis', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('API not found');
      }

      await deleteDoc(docRef);
      return true; // Indicate success
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