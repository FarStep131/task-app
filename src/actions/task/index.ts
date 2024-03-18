"use server";

import { getClient } from "@/lib/apollo-client";
import {
  InsertTasksOneDocument,
  InsertTasksOneMutation,
  InsertTasksOneMutationVariables,
  DeleteTasksByPkDocument,
  DeleteTasksByPkMutation,
  DeleteTasksByPkMutationVariables,
  UpdateTasksByPkDocument,
  UpdateTasksByPkMutation,
  UpdateTasksByPkMutationVariables,
} from "@/graphql/generated/gql.types";

export const insertTasksOne = async (
  input: InsertTasksOneMutationVariables
) => {
  const { data, errors, extensions } =
    await getClient().mutate<InsertTasksOneMutation>({
      mutation: InsertTasksOneDocument,
      variables: input,
    });
  return { data, errors, extensions };
};

export const deleteTasksByPk = async (
  input: DeleteTasksByPkMutationVariables
) => {
  const { data, errors, extensions } =
    await getClient().mutate<DeleteTasksByPkMutation>({
      mutation: DeleteTasksByPkDocument,
      variables: input,
    });
  return { data, errors, extensions };
};

export const updateTasksByPk = async (
  input: UpdateTasksByPkMutationVariables
) => {
  const { data, errors, extensions } =
    await getClient().mutate<UpdateTasksByPkMutation>({
      mutation: UpdateTasksByPkDocument,
      variables: input,
    });
  return { data, errors, extensions };
};
