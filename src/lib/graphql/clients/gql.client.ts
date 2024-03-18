import {
  from,
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";

export class GqlClientFactory {
  public static client = (uri: string): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
      link: from([this._error_link, this._http_link(uri)]),
      cache: new InMemoryCache(),
    });
  };

  private static _error_link = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  private static _http_link = (uri: string): ApolloLink => {
    return createHttpLink({
      uri: uri,
    });
  };
}
