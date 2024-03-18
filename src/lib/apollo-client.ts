import { ApolloLink, createHttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { onError } from "@apollo/client/link/error";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";

const errorLink = onError((errors) => {
  const { graphQLErrors, networkError } = errors;
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const { getClient } = registerApolloClient(() => {
  const httpLink = createHttpLink({
    uri: process.env.HASURA_GQL_URL,
  });

  const link = ApolloLink.from([errorLink, httpLink]);

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link,
  });
});
