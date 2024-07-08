"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ImportTable from "./ImportTable";
import { useAddTransaction } from "@/hooks/transcation-hooks";
import CheckRefrence from "../inputs/CheckRefrence";
import { useGetAccounts } from "@/hooks/accounts-hooks";
import { client } from "@/lib/hono";
import { InferRequestType } from "hono";
import { toast } from "sonner";
import { toMilliunits } from "@/utils";
import { Separator } from "../ui/separator";

interface Transaction {
  payee: string | undefined;
  amount: number | undefined;
  createdAt: string | undefined;
  category?: string | undefined;
  accountId: string;
}
type RequestTransactionPostType = InferRequestType<
  typeof client.api.transactions.$post
>["json"];
type SubUnorderedData = {
  payee?: string[];
  amount?: string[];
  createdAt?: string[];
  category?: string[];
};
type FullUnorderedData = {
  payee: string[];
  amount: string[];
  createdAt: string[];
  category?: string[];
};
type props = {
  data: string[][];

  onSubmit: () => void;
};
const requiredOpts = ["payee", "amount", "createdAt"];
interface SelectedColumnsState {
  [key: number]: string | null;
}
const ImportCard = ({ data, onSubmit }: props) => {
  const headers = data[0];
  const body = data.slice(1);
  const { isPending, mutate: addHandler, isSuccess } = useAddTransaction();
  const { data: accounts } = useGetAccounts();
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {}
  );
  const [accountId, setAccountId] = useState<string>("");
  const orderData = (data: FullUnorderedData) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).map((e) => [e[0], e[1].filter((e) => !!e)])
    );

    const minimumEligible = Object.values(
      Object.values(filteredData).reduce((prev, cur) => {
        const prevlen = Object.values(prev).length;
        const curlen = Object.values(cur).length;
        return prevlen < curlen ? prev : cur;
      })
    ).length;

    const orderedTransactions: RequestTransactionPostType = [];
    let i = 0;
    while (i < minimumEligible) {
      orderedTransactions.push({
        categoryId: "",
        amount: toMilliunits(parseInt(data.amount[i])),
        category: (data.category && data?.category[i]) || "",
        payee: data.payee[i],
        createdAt: data.createdAt[i],
        accountId,
      });
      i++;
    }
    accountId && addHandler(orderedTransactions);
  };

  useEffect(() => {
    isSuccess && onSubmit();
  }, [isSuccess]);

  const getData = () => {
    if (!accountId) toast.error("no account choosen");
    const objectsData: SubUnorderedData | FullUnorderedData = {};
    Object.keys(selectedColumns).map((key) => {
      let elementsOfKeys: string[] = [];
      body.forEach((elememnt) => elementsOfKeys.push(elememnt[key]));
      objectsData[selectedColumns[key]] = elementsOfKeys;
    });
    const hasAllRequired = requiredOpts.every((opt) => opt in objectsData);
    if (hasAllRequired) {
      orderData(objectsData as FullUnorderedData);
    }
  };

  const selectedNumber = Object.values(selectedColumns).filter((e) =>
    requiredOpts.includes(e)
  ).length;

  const notReady = selectedNumber < requiredOpts.length;
  const isCategorySelected =
    Object.values(selectedColumns).includes("category");

  return (
    <Card>
      <CardHeader className="w-full flex flex-wrap flex-row justify-between items-center">
        <CardTitle className=" max-lg:text-lg">
          {" "}
          Import Transaction Page
        </CardTitle>

        <div>
          <div className=" space-y-3">
            <Button
              onClick={() => {
                !notReady ? getData() : null;
              }}
              size="sm"
              disabled={selectedNumber < requiredOpts.length || isPending}
              className=" bg-minor text-foreground max-lg:text-sm text-lg"
            >
              {notReady
                ? `Needed (${selectedNumber}/${requiredOpts.length})`
                : "Submit"}
            </Button>
            <p
              className={` text-sm ${
                isCategorySelected ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {!isCategorySelected
                ? `Add category (unecessery)`
                : "Category was Added"}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className=" space-y-6">
        <Separator className="bg-muted-foreground/60" />
        <p className=" font-semibold text-lg">Account</p>

        {accounts && (
          <CheckRefrence
            type="account"
            data={accounts}
            setRefrence={(v) => setAccountId(v)}
            Refrence={accountId}
          />
        )}
        <Separator className="bg-muted-foreground/60" />
        {!!data ? (
          <ImportTable
            selectedColumns={selectedColumns!}
            headers={headers}
            body={body}
            onTableHeadSelectChange={(i, d) => {
              const updated = { ...selectedColumns, [i]: d };

              setSelectedColumns(
                Object.fromEntries(
                  Object.entries(updated).filter((e) => e[1] !== null)
                )
              );
            }}
          />
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ImportCard;
