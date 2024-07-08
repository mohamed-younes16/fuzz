"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  ClipboardEdit,
  CopyIcon,
  GripVertical,
  LucideTrash2,
} from "lucide-react";
import { toast } from "sonner";

import { useStore } from "@/hooks/store";
import { useDeleteCategory } from "@/hooks/categories-hooks";
import { CategoryResponseGetType } from "./columns";

const CellAction = ({ data }: { data: CategoryResponseGetType }) => {
  const { setchoosenId } = useStore();
  const { mutate } = useDeleteCategory();

  const { id: categorieId } = data;

  const copy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Copied");
  };
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="shadow-none " asChild>
          <Button variant="ghost" className="p-2 rounded-full">
            <GripVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36 font-bold">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setchoosenId(categorieId);
            }}
            className="flex items-center gap-3"
          >
            <ClipboardEdit /> Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => copy()}
            className="flex items-center gap-3"
          >
            <CopyIcon /> Copy
          </DropdownMenuItem>

          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="flex text-red-600 items-center gap-3">
              <LucideTrash2 /> Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>{" "}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Label and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="!flex-col-reverse sm">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              mutate({ Ids: [data.id] });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CellAction;
