import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { db } from '../../libs/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

const typeDefs = gql`
  type Hero {
    url: String!
    imagediscription: String!
    hHeight: String!
    welcome: String!
    msg: String!
    calltoaction: CallToAction!
    calltoaction2: CallToAction!
  }

  type CallToAction {
    name: String!
    link: String!
  }

  type SubHeading {
    heading: String!
    msg: String!
  }

  type ColumnInfoItem {
    title: String!
    msg: String!
    url: String!
  }

  type ImageDescriptionItem {
    title: String!
    discprtion: String!
    url: String!
  }

  type Home {
    id: ID!
    hero: Hero!
    subHeading: SubHeading!
    columnInfo: [ColumnInfoItem!]!
    imageDescriptions: [ImageDescriptionItem!]!
    callToAction: CallToAction!
  }

  input HeroInput {
    url: String!
    imagediscription: String!
    hHeight: String!
    welcome: String!
    msg: String!
    calltoaction: CallToActionInput!
    calltoaction2: CallToActionInput!
  }

  input CallToActionInput {
    name: String!
    link: String!
  }

  input SubHeadingInput {
    heading: String!
    msg: String!
  }

  input ColumnInfoItemInput {
    title: String!
    msg: String!
    url: String!
  }

  input ImageDescriptionItemInput {
    title: String!
    discprtion: String!
    url: String!
  }

  input HomeInput {
    hero: HeroInput!
    subHeading: SubHeadingInput!
    columnInfo: [ColumnInfoItemInput!]!
    imageDescriptions: [ImageDescriptionItemInput!]!
    callToAction: CallToActionInput!
  }

  type Query {
    home: Home
  }

  type Mutation {
    saveHome(id: ID!, input: HomeInput!): Home
    deleteHome(id: ID!): ID
  }
`;

const resolvers = {
  Query: {
    home: async () => {
      const snapshot = await getDocs(collection(db, 'home'));
      if (snapshot.empty) return null;
      const homeData = snapshot.docs[0];
      return { id: homeData.id, ...homeData.data() };
    }
  },
  Mutation: {
    saveHome: async (_, { id, input }) => {
      const homeRef = doc(db, 'home', id);
      await setDoc(homeRef, input, { merge: true });
      return { id, ...input };
    },
    deleteHome: async (_, { id }) => {
      await deleteDoc(doc(db, 'home', id));
      return id;
    }
  }
};
export const dynamic = 'force-dynamic';
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return error;
  }
});

const handler = startServerAndCreateNextHandler(server);
export { handler as GET, handler as POST };