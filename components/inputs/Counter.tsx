"use client";

import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";

import { z } from "zod";
import { transactionSchema } from "@/models/Schemas/Setup";

const AmountInput = ({
  form,
  choice,
  setChoice,
}: {
  form: UseFormReturn<z.infer<typeof transactionSchema>>;
  choice: "positive" | "negative";
  setChoice: (v: "positive" | "negative") => void;
}) => {
  return (
    <div className="">
      <div className="flexcenter max-sm:gap-1 gap-3">
        <Button
          type="button"
          onClick={() =>
            setChoice(choice === "positive" ? "negative" : "positive")
          }
          variant={"outline"}
          className="rounded-xl active:scale-95 
           hover:scale-105 transition-all  w-[50px]  max-sm:!h-6 !p-0 max-sm:!w-6 h-12"
        >
          {choice == "positive" ? (
            <PlusCircleIcon className="text-green-600 " />
          ) : (
            <MinusCircleIcon className=" text-red-600" />
          )}
        </Button>
        <Input
          type="number"
          step={"0.001"}
          onChange={(e) => form.setValue("amount", parseFloat(e.target.value))}
          defaultValue={form.getValues("amount")}
        />
      </div>{" "}
      <p className="mt-2 text-sm text-foreground/80">
        {" "}
        {choice == "positive"
          ? "this will count as an income"
          : "this will count as an expense"}
      </p>
    </div>
  );
};

export default AmountInput;
