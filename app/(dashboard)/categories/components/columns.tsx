"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import CellAction from "./CellAction";
import { Checkbox } from "@/components/ui/checkbox";
import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

export type CategoryResponseGetType = InferResponseType<
  typeof client.api.categories.$get,
  200
>["categories"][0];

export const columns: ColumnDef<CategoryResponseGetType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  // {
  //   accessorKey: "logo",
  //   header: "logo ",

  //   cell: ({ row }) =><Image height={50} width={50} alt="" src={row.original.logo}/>
  // },
  // {
  //   accessorKey: "billboardLabel",
  //   header: "billBoard label",

  //   cell: ({ row }) => row.original.billboardLabel,
  // },
  {
    header: "Action",
    id: "action",
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
