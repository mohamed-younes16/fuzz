"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowBigDownDash, ArrowBigUp } from "lucide-react";
import { useState } from "react";

const CheckRefrence = ({
  data,
  setRefrence,
  Refrence,
  type,
}: {
  data: { name: string; id: string; createdAt: string }[];
  setRefrence: (v: string) => void;
  Refrence: string;
  type: "account" | "category";
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [choosen, setChoosen] = useState<string>(
    (data && data.filter((e) => e.id === Refrence)[0]?.name) || ""
  );

  return (
    <div>
      <DropdownMenu onOpenChange={setOpen} open={open}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={` w-full max-w-sm ${
              !!choosen && !!Refrence && "bg-minor"
            } px-0 flex pl-3`}
          >
            <div className=" flex-1 text-start ">
              {!!choosen && !!Refrence ? choosen : `Choose your ${type}`}
            </div>
            <Button
              variant={"outline"}
              className=" flexcenter border py-2 px-4"
            >
              <ArrowBigDownDash
                className={`${
                  open && "rotate-180 text-minor"
                } transition-all h-6 w-6 `}
              />
            </Button>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Panel Refrence</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {data.map((e, i) => (
            <DropdownMenuCheckboxItem
              onCheckedChange={(c) => {
                c ? setRefrence(e.id) : setRefrence("");

                c
                  ? setChoosen(e.name || "")
                  : setChoosen(
                      (data &&
                        data.filter((e) => e.id === Refrence)[0]?.name) ||
                        ""
                    );
              }}
              checked={e.id == Refrence}
            >
              {e.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CheckRefrence;
