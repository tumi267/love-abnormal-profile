// lib/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Create HTTP links for both endpoints
const blogHttpLink = createHttpLink({
    uri: '/api/bloggraphql',
  });
  
  const eventsHttpLink = createHttpLink({
    uri: '/api/eventsgraphql',
  });
  
  // Use the split function to route requests to the appropriate link
  const splitLink = split(
    ({ operationName }) => {
      // Define which operations go to which endpoint
      return operationName.startsWith('Blog');
    },
    blogHttpLink,
    eventsHttpLink
  );
  
  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

export default client;