"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import CellAction from "./CellAction";
import { Checkbox } from "@/components/ui/checkbox";
import { client } from "@/lib/hono";
import { InferResponseType } from "hono";
import { Badge } from "@/components/ui/badge";
import { formatDateString, formatedPrice } from "@/utils";

export type TransactionResponseGetType = {
  id: string;
  accountRef: string;
  categoryRef: string | undefined;
  amount: number;
  createdAt: string;
  notes: string | null;
  payee: string;
};

export const columns: ColumnDef<TransactionResponseGetType>[] = [
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
    accessorKey: "accountRef",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Account Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="whitespace-nowrap px-4 ">{row.original?.accountRef}</p>
    ),
  },
  {
    accessorKey: "categoryRef",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="whitespace-nowrap px-4 ">{row.original?.categoryRef}</p>
    ),
  },
  {
    accessorKey: "payee",
    header: "Payee Name",
  },

  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.original.amount;
      return (
        <Badge className={`${amount > 0 ? "bg-green-500" : "bg-red-500"}`}>
          {formatedPrice(amount)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => (
      <p className="whitespace-nowrap">
        {formatDateString(row.original.createdAt)}
      </p>
    ),
  },
  {
    header: "Action",
    id: "action",
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
