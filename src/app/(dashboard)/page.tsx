import { Metadata } from "next";
import { getAuthSession } from "@/lib/auth";
import { getClient } from "@/lib/apollo-client";
import { SelectTasksByUserIdDocument } from "@/graphql/generated/gql.types";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default async function TaskPage() {
  const session = await getAuthSession();
  if (!session) redirect("/sign_in");

  const {
    data: { tasks },
  } = await getClient().query({
    query: SelectTasksByUserIdDocument,
    variables: {
      user_id: session.user.id,
    },
  });

  return (
    <div className="h-full my-5">
      <DataTable data={tasks} columns={columns} session={session} />
    </div>
  );
}
