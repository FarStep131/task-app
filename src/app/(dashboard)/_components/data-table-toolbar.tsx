"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./data-table-view-options";
import { Session } from "next-auth";
import { ModalForm } from "./modal-form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createTaskFormValidator } from "@/lib/validations/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTasksOne } from "@/actions/task";
import { toast } from "@/components/ui/use-toast";
import { revalidatePaths } from "@/lib/revalidate-paths";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  session: Session;
}

export function DataTableToolbar<TData>({
  table,
  session,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof createTaskFormValidator>>({
    resolver: zodResolver(createTaskFormValidator),
  });

  async function onSubmit(data: z.infer<typeof createTaskFormValidator>) {
    const { data: newData, errors } = await insertTasksOne(data);
    if (newData?.insert_tasks_one?.id && !errors) {
      toast({
        title: "タスクを追加しました",
      });
      form.reset({
        title: "",
        status: "",
        priority: "",
      });
      revalidatePaths(["/"]);
    }
  }

  const handleOpenModal = () => {
    form.reset({
      user_id: session.user.id,
    });
    setOpen(true);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-10 w-full md:w-[400px]"
        />
        <div className="hidden lg:flex justify-center items-center">
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          )}
          {table.getColumn("priority") && (
            <DataTableFacetedFilter
              column={table.getColumn("priority")}
              title="Priority"
              options={priorities}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className=""
            >
              <Cross2Icon className="mr-2 h-4 w-4" />
              Reset
            </Button>
          )}
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <Button className="ml-2" onClick={handleOpenModal}>
        New Task
      </Button>
      <ModalForm
        action="create"
        open={open}
        setOpen={setOpen}
        form={form}
        onSubmit={onSubmit}
      />
    </div>
  );
}
