"use server";

import { getClient } from "@/lib/apollo-client";
import {
  InsertUsersOneDocument,
  InsertUsersOneMutation,
  InsertUsersOneMutationVariables,
} from "@/graphql/generated/gql.types";

export const insertUsersOne = async (
  input: InsertUsersOneMutationVariables
) => {
  const { data, errors, extensions } =
    await getClient().mutate<InsertUsersOneMutation>({
      mutation: InsertUsersOneDocument,
      variables: input,
    });
  return { data, errors, extensions };
};
