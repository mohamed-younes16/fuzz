"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useEffect } from "react";
import { Loader2, PlusCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useStore } from "@/hooks/store";
import { Button } from "../ui/button";
import { useGetAccount } from "@/hooks/accounts-hooks";
import { useGetCategory } from "@/hooks/categories-hooks";
import DataForm from "../forms/DataForm";
import TransactionForm from "../forms/TranscationForm";
import { useGetTransaction } from "@/hooks/transcation-hooks";
import { InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { formatMilliunits } from "@/utils";
type ResponseTransactionGetType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$get"],
  200
>["transaction"];
const FormSheet = ({ type }) => {
  const { isFormSheetOpen, setIsFormSheetOpen, choosenId, setchoosenId } =
    useStore();
  const pathname = usePathname();

  const { data: entity, isLoading: l1 } =
    type === "account" ? useGetAccount(choosenId) : useGetCategory(choosenId);

  let transaction: ResponseTransactionGetType | null = null;
  let l2 = false;

  if (type === "transaction") {
    ({ data: transaction = null, isLoading: l2 } =
      useGetTransaction(choosenId));
  }

  const isLoading = l1 || l2;
  useEffect(() => setIsFormSheetOpen(false), [pathname]);

  return (
    <div className="flex gap-[10px] relative">
      <div className="">
        <Sheet
          open={isFormSheetOpen}
          onOpenChange={(e) => {
            setIsFormSheetOpen(e);
            !e && setchoosenId(undefined);
          }}
        >
          <SheetTrigger asChild className="">
            <Button className="flexcenter gap-3 text-lg font-semibold">
              <PlusCircle />
              <p>
                {type === "account"
                  ? "Add Account"
                  : type == "category"
                  ? "Add Category"
                  : "Add transaction"}
              </p>
            </Button>
          </SheetTrigger>
          <SheetContent side={"right"} className="px-6 overflow-auto pt-20">
            <>
              <div className="text-center mb-8 mt-4">
                <h1 className="text-2xl font-bold">
                  {type === "account"
                    ? "Account Form"
                    : type == "category"
                    ? "Category Form"
                    : "Transaction Form"}
                </h1>
                <p className="text-foreground">
                  {type === "account"
                    ? "Create an account to track your transactions"
                    : type == "category"
                    ? "Create a category to track your transactions"
                    : "Create your to transactions from scratch"}
                </p>
              </div>
              <div className="max-w-md mx-auto">
                {choosenId && isLoading ? (
                  <Loader2 className="w-14 h-14 animate-spin text-foreground" />
                ) : type === "transaction" ? (
                  choosenId ? (
                    !!transaction && !l2 ? (
                      <TransactionForm
                        id={choosenId}
                        defaultValues={{
                          category: transaction.categoryRef?.name || "",
                          accountId: transaction.accountRef.id,
                          amount: formatMilliunits(transaction.amount),
                          categoryId: transaction?.categoryRef?.id || "",
                          notes: transaction.notes || "",
                          payee: transaction.payee,
                          createdAt: transaction.createdAt,
                        }}
                        OnDone={() => {
                          setIsFormSheetOpen(false);
                          setchoosenId(undefined);
                        }}
                      />
                    ) : null
                  ) : (
                    <TransactionForm
                      id={""}
                      defaultValues={null}
                      OnDone={() => {
                        setIsFormSheetOpen(false);
                        setchoosenId(undefined);
                      }}
                    />
                  )
                ) : (
                  <DataForm
                    type={type}
                    id={entity?.id}
                    defaultValues={{
                      name: entity?.name || "",
                    }}
                    OnDone={() => {
                      setIsFormSheetOpen(false);
                      setchoosenId(undefined);
                    }}
                  />
                )}
              </div>
            </>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default FormSheet;
