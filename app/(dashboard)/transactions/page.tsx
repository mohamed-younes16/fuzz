"use client";
import Heading from "@/components/Heading";
import { DataTable } from "@/components/ui/data-table";
import { Users2Icon } from "lucide-react";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { TransactionResponseGetType, columns } from "./components/columns";

import CliComp from "@/providers/modalProvider";
import FormSheet from "@/components/sheets/FormSheet";
import {
  useDeleteTransaction,
  useGetTransactions,
} from "@/hooks/transcation-hooks";

import TableSkeleton from "@/components/TableSkeleton";
import { formatMilliunits } from "@/utils";
import UploadButton from "@/components/inputs/UploadButton";
import ImportCard from "@/components/forms/ImportCard";
import { Button } from "@/components/ui/button";
import { useGetPlan } from "@/hooks/purchase-hooks";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}
const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: [],
};

const page = () => {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importRes, setImportRes] = useState(INITIAL_IMPORT_RESULTS);

  const endImport = () => {
    setVariant(VARIANTS.LIST);
    setImportRes(INITIAL_IMPORT_RESULTS);
  };
  const onUpload = (res: typeof INITIAL_IMPORT_RESULTS) => {
    setVariant(VARIANTS.IMPORT);
    setImportRes(res);
  };
  const { data: transactions, isLoading } = useGetTransactions();
  const { mutate, isPending } = useDeleteTransaction();
  const isDisabeled = isLoading || isPending;
  const { data: plan } = useGetPlan();
  let formattedTransactions: TransactionResponseGetType[] = [];
  if (transactions) {
    formattedTransactions = transactions.map((e) => ({
      id: e.id,
      accountRef: e.accountRef.name,
      categoryRef: e.categoryRef?.name,
      amount: formatMilliunits(e.amount),
      createdAt: e.createdAt,
      notes: e.notes,
      payee: e.payee,
    }));
  }

  return (
    <div className="bg-background min-h-screen rounded-md py-4  w-full px-8 max-lg:px-4 ">
      {variant === VARIANTS.IMPORT ? (
        <div className="space-y-6 ">
          <div className="flex items-center gap-x-4">
            <UploadButton onUpload={onUpload} />
            <Button size={"sm"} onClick={endImport}>
              Cancel
            </Button>
          </div>

          <ImportCard data={importRes.data} onSubmit={endImport} />
        </div>
      ) : (
        <>
          <div className="flex mb-4 items-center max-lg:justify-center max-lg:gap-6 flex-wrap justify-between">
            <h1 className="text-xl font-bold">Transactions Page</h1>
            <CliComp>
              {" "}
              {!!plan && plan.isPro && <UploadButton onUpload={onUpload} />}
              <FormSheet type="transaction" />
            </CliComp>
          </div>
          <div className="flex items-center justify-between">
            <Heading
              icon={
                <Users2Icon className="text-foreground max-lg:h-6 max-lg:w-6 h-10 w-10" />
              }
              title={`List Of Transactions`}
              description="Manage all your Transactions ."
            />{" "}
          </div>{" "}
          <Separator className="my-6" />
          {!!transactions ? (
            <DataTable
              queryKey={["transactions"]}
              OnDelete={(Ids) => mutate({ Ids: Ids.map((e) => e.original.id) })}
              disabled={isDisabeled}
              searchKey="name"
              columns={columns}
              data={formattedTransactions}
            />
          ) : (
            <TableSkeleton />
          )}
        </>
      )}
    </div>
  );
};

export default page;
