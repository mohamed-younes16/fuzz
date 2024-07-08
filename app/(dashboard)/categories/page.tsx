"use client";
import Heading from "@/components/Heading";
import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import { Users2Icon } from "lucide-react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { CategoryResponseGetType, columns } from "./components/columns";
import CliComp from "@/providers/modalProvider";

import { useDeleteCategory, useGetCategories } from "@/hooks/categories-hooks";
import FormSheet from "@/components/sheets/FormSheet";
import TableSkeleton from "@/components/TableSkeleton";

const page = () => {
  const { data: categories, isLoading } = useGetCategories();
  const { mutate, isPending } = useDeleteCategory();
  const isDisabeled = isLoading || isPending;

  let formattedCategories: CategoryResponseGetType[] = [];
  if (categories) {
    formattedCategories = categories.map((e) => ({
      id: e.id,
      createdAt: format(e.createdAt, "MMMM do , yyyy"),
      name: e.name,
    }));
  }

  return (
    <div className="bg-background min-h-screen rounded-md py-4  w-full px-8 max-lg:px-4 ">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Categories Page</h1>
        <CliComp>
          <FormSheet type="category" />
        </CliComp>
      </div>
      <div className="flex items-center justify-between">
        <Heading
          icon={<Users2Icon className="text-foreground h-10 w-10" />}
          title={`List Of Categories`}
          description="Manage all your Categories ."
        />{" "}
      </div>{" "}
      <Separator className="my-6" />
      {!!categories ? (
        <DataTable
          queryKey={["categories"]}
          OnDelete={(Ids) => mutate({ Ids: Ids.map((e) => e.original.id) })}
          disabled={isDisabeled}
          searchKey="name"
          columns={columns}
          data={formattedCategories}
        />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
};

export default page;
