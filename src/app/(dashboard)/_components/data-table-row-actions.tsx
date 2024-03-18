"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModalForm } from "./modal-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskValidator, updateTaskFormValidator } from "@/lib/validations/task";
import { useState } from "react";
import { revalidatePaths } from "@/lib/revalidate-paths";
import { deleteTasksByPk, updateTasksByPk } from "@/actions/task";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);
  const task = taskValidator.parse(row.original);
  const form = useForm<z.infer<typeof updateTaskFormValidator>>({
    resolver: zodResolver(updateTaskFormValidator),
  });

  async function onSubmit(data: z.infer<typeof updateTaskFormValidator>) {
    const { data: updatedData, errors } = await updateTasksByPk(data);
    if (updatedData?.update_tasks_by_pk?.id && !errors) {
      toast({
        title: "タスクを編集しました",
      });
      revalidatePaths(["/"]);
    }
  }

  const handleEdit = () => {
    form.reset({
      id: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority,
    });
    setOpen(true);
  };

  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const handleDelete = async () => {
    const { data, errors } = await deleteTasksByPk({
      id: task.id,
    });
    if (data?.delete_tasks_by_pk?.id && !errors) {
      toast({
        title: "タスクを削除しました",
      });
      revalidatePaths(["/"]);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenAlertDialog(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ModalForm
        action="edit"
        open={open}
        setOpen={setOpen}
        form={form}
        onSubmit={onSubmit}
      />
      <AlertDialog
        open={openAlertDialog}
        onOpenChange={() => setOpenAlertDialog(!openAlertDialog)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消すことができません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete()}>
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
