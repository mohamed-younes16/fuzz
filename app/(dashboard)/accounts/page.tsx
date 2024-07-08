"use client";
import Heading from "@/components/Heading";
import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import { Users2Icon } from "lucide-react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { AccountResponseGetType, columns } from "./components/columns";
import CliComp from "@/providers/modalProvider";
import FormSheet from "@/components/sheets/FormSheet";
import { useDeleteAccount, useGetAccounts } from "@/hooks/accounts-hooks";
import TableSkeleton from "@/components/TableSkeleton";
import { useGetPurchase } from "@/hooks/purchase-hooks";

const page = () => {
  const { data: accounts, isLoading } = useGetAccounts();
  const { mutate, isPending } = useDeleteAccount();
  const isDisabeled = isLoading || isPending;

  let formattedAccounts: AccountResponseGetType[] = [];
  if (accounts) {
    formattedAccounts = accounts.map((e) => ({
      id: e.id,
      createdAt: format(e.createdAt, "MMMM do , yyyy"),
      name: e.name,
    }));
  }

  const { data: pay } = useGetPurchase();

  return (
    <div className="bg-background min-h-screen rounded-md py-4  w-full px-8 max-lg:px-4 ">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Accounts Page</h1>
        <CliComp>
          <FormSheet type="account" />
        </CliComp>
      </div>
      <div className="flex items-center justify-between">
        <Heading
          icon={<Users2Icon className="text-foreground h-10 w-10" />}
          title={`List Of Accounts`}
          description="Manage all your Accounts ."
        />{" "}
      </div>{" "}
      <Separator className="my-6" />
      {!!accounts ? (
        <DataTable
          queryKey={["accounts"]}
          OnDelete={(Ids) => mutate({ Ids: Ids.map((e) => e.original.id) })}
          disabled={isDisabeled}
          searchKey="name"
          columns={columns}
          data={formattedAccounts}
        />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
};

export default page;
