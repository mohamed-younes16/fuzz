import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  selectedColumns: Record<number, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
  columnIndex: number;
};

const opts = ["createdAt", "payee", "amount", "category"];

const HeaderSelect = ({ columnIndex, onChange, selectedColumns }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<string | null>(null);
  const handleCheckedChange = (value: string | null) => {
    setChecked(value);
    onChange(columnIndex, value);
  };

  const selectedWith = selectedColumns[columnIndex];

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"outline"}
            size="sm"
            className={`w-[150px] max-lg:w-[100px] text-muted-foreground text-start ${
              !!selectedWith && "bg-minor text-foreground  "
            }`}
          >
            {!!selectedWith ? <p>{selectedWith}</p> : <p>skipped</p>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {opts.map((e) => (
            <DropdownMenuCheckboxItem
              disabled={
                Object.values(selectedColumns).includes(e) && !(e === checked)
              }
              key={e}
              checked={e === checked}
              onCheckedChange={(checked) =>
                handleCheckedChange(checked ? e : null)
              }
            >
              {e}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderSelect;
