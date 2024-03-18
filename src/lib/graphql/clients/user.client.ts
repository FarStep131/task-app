import {
  SelectUsersByEmailDocument,
  SelectUsersByEmailQuery,
  SelectUsersByEmailQueryVariables,
  SelectUsersByUsernameDocument,
  SelectUsersByUsernameQuery,
  SelectUsersByUsernameQueryVariables,
} from "@/graphql/generated/gql.types";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { GqlErrorHandler } from "../error.handler";

export class UserClient {
  public static select_user_by_email = async (
    variables: SelectUsersByEmailQueryVariables,
    client: ApolloClient<NormalizedCacheObject>
  ): Promise<SelectUsersByEmailQuery> => {
    const { data, errors } = await client.query({
      query: SelectUsersByEmailDocument,
      variables,
    });

    GqlErrorHandler.checkError("select_user_by_email@UserClient", errors);
    if (!data.users)
      throw new Error("select_user_by_email@UserClient failed to select");

    return data;
  };

  public static select_user_by_username = async (
    variables: SelectUsersByUsernameQueryVariables,
    client: ApolloClient<NormalizedCacheObject>
  ): Promise<SelectUsersByUsernameQuery> => {
    const { data, errors } = await client.query({
      query: SelectUsersByUsernameDocument,
      variables,
    });

    GqlErrorHandler.checkError("select_user_by_username@UserClient", errors);
    if (!data.users)
      throw new Error("select_user_by_username@UserClient failed to select");

    return data;
  };
}
