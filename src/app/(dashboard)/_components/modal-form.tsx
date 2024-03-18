"use client";

import { statuses, priorities } from "@/app/(dashboard)/data/data";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type ModalFormProps = {
  action: "create" | "edit";
  open: boolean;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
};

export const ModalForm = ({
  action,
  open,
  setOpen,
  form,
  onSubmit,
}: ModalFormProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[450px] sm:rounded-sm rounded-none h-full overflow-auto p-10">
        <DialogHeader>
          <DialogTitle>
            {action === "create" ? "タスクを追加する" : "タスクを編集する"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                onSubmit(data);
                setOpen(false);
              })}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>タイトル</FormLabel>
                    <FormControl>
                      <Input {...field} inputMode="text" autoCapitalize="off" />
                    </FormControl>{" "}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ステータス</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {statuses.map((status) => (
                          <div key={status.value}>
                            <RadioGroupItem
                              value={status.value}
                              id={status.value}
                              className="peer sr-only"
                              defaultChecked={field.value === status.value}
                            />
                            <FormLabel
                              htmlFor={status.value}
                              className="flex items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <status.icon className="w-4 h-4" />
                              <span className="ml-2">{status.label}</span>
                            </FormLabel>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>{" "}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>優先度</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {priorities.map((priority) => (
                          <div key={priority.value}>
                            <RadioGroupItem
                              value={priority.value}
                              id={priority.value}
                              className="peer sr-only"
                              defaultChecked={field.value === priority.value}
                            />
                            <FormLabel
                              htmlFor={priority.value}
                              className="flex items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <priority.icon className="w-4 h-4" />
                              <span className="ml-2">{priority.label}</span>
                            </FormLabel>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>{" "}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">
                {action === "create" ? "追加" : "更新"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
