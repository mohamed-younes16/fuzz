"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { AccountSchema, CategorySchema } from "@/models/Schemas/Setup";
import {
  useAddAccount,
  useDeleteAccount,
  usePatchAccount,
} from "@/hooks/accounts-hooks";
import {
  useAddCategory,
  useDeleteCategory,
  usePatchCategory,
} from "@/hooks/categories-hooks";
import { Trash2Icon } from "lucide-react";
import { useEffect } from "react";


const DataForm = ({
  OnDone,
  defaultValues,
  id,
  type,
}:
  | {
      OnDone: () => void;
      defaultValues: z.infer<typeof AccountSchema>;
      id?: string;
      type: "account";
    }
  | {
      OnDone: () => void;
      defaultValues: z.infer<typeof CategorySchema>;
      id?: string;
      type: "category";
    }) => {
  const isAccount = type === "account";
  const isCategory = type === "category";

  const {
    isPending: p1,
    mutate: addHandler,
    isSuccess: s1,
  } = isAccount ? useAddAccount() : useAddCategory();
  const {
    isPending: p2,
    mutate: patchHandler,
    isSuccess: s2,
  } = isAccount ? usePatchAccount() : usePatchCategory();
  const {
    isPending: p3,
    mutate: deleteHandler,
    isSuccess: s3,
  } = isAccount ? useDeleteAccount() : useDeleteCategory();

  const isPending = p1 || p2 || p3;
  const isSuccess = s1 || s2 || s3;

  useEffect(() => {
    isSuccess && OnDone();
  }, [isSuccess]);

  const formSchema = isAccount ? AccountSchema : CategorySchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { reset, handleSubmit, control, formState } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      id ? patchHandler({ id, name: values.name }) : addHandler(values);

      reset();
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = () => {
    deleteHandler({
      Ids: [id as string],
    });
    OnDone();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="name"
          disabled={isPending}
          render={({ field }) => (
            <FormItem className=" flex flex-col   ">
              <FormLabel className="   ">Name</FormLabel>

              <FormControl className="">
                <Input className="account-form_input " type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {formState.isDirty && (
          <Button
            type="submit"
            disabled={isPending}
            className={`${
              isPending && "opacity-50"
            } bg-minor flexcenter w-full gap-2`}
          >
            {id ? "Update" : "Submit"}
            {isPending && (
              <div
                className="w-4 h-4 border-2 border-white
     dark:border-black !border-t-transparent rounded-full animate-spin"
              />
            )}
          </Button>
        )}
        {!!id && (
          <Button
            variant={"outline"}
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className={`${
              isPending && "opacity-50"
            } flexcenter w-full  hover:text-red-700 font-semibold  gap-2`}
          >
            <Trash2Icon />
            <p>Delete {isAccount ? "Account" : "Category"}</p>
          </Button>
        )}
      </form>
    </Form>
  );
};

export default DataForm;
