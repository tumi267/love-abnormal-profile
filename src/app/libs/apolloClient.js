import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';

// Define a mapping of prefixes to endpoints
const endpointMap = {
  Blog: '/api/bloggraphql',
  Event: '/api/eventsgraphql',
  Service: '/api/servicesgraphql',
  Sponsour: '/api/sponsoursgraphql',
  Practitioners:'/api/practitionersgraphql',
  Contact:'/api/contactgraphql',
  apiregistratio:'/api/apiregistrationgraphql'
  // Add more endpoints here as needed
};

// Create HTTP links dynamically
const createHttpLinks = () => {
  const links = {};
  for (const [prefix, uri] of Object.entries(endpointMap)) {
    links[prefix] = createHttpLink({ uri });
  }
  return links;
};

const httpLinks = createHttpLinks();

// Use the split function to route requests to the appropriate link
const splitLink = split(
  ({ operationName }) => {
    // Find the prefix that matches the operation name
    for (const prefix of Object.keys(endpointMap)) {
      if (operationName.startsWith(prefix)) {
        return prefix;
      }
    }
    // Default to the first endpoint if no prefix matches
    return Object.keys(endpointMap)[0];
  },
  ...Object.values(httpLinks).map((link) => link)
);

// Create Apollo Client instance
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;