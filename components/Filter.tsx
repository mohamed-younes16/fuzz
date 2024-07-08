"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useGetAccounts } from "@/hooks/accounts-hooks";
import { useGetsummary } from "@/hooks/summary-hooks";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format, parse, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { useState } from "react";

const Filter = () => {
  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId") || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const defTo = new Date();
  const defFrom = subDays(new Date(), 30);
  const [date, setDate] = useState<DateRange | undefined>({
    from: from ? parse(from, "yyyy-MM-dd", new Date()) : defFrom,
    to: to ? parse(to, "yyyy-MM-dd", new Date()) : defTo,
  });

  const router = useRouter();
  const { data: accounts, isLoading: l1 } = useGetAccounts();
  const { isLoading: l2 } = useGetsummary();
  const isLoading = l1 || l2;

  const handleFilterChange = (params: {
    accountId?: string;
    dateRange?: DateRange;
  }) => {
    const current: any = qs.parse(searchParams.toString());

    let query = { ...current };

    if (params.accountId !== undefined) {
      query.accountId = params.accountId !== "all" ? params.accountId : null;
    }

    if (params.dateRange !== undefined) {
      query.from = format(params.dateRange.from || defFrom, "yyyy-MM-dd");
      query.to = format(params.dateRange.to || defTo, "yyyy-MM-dd");
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url, { scroll: false });
  };

  return (
    <div className="mb-8 flex items-center flex-wrap max-lg:justify-center gap-4">
      <h3 className="text-lg font-semibold">Filters:</h3>
      <Select
        disabled={isLoading}
        value={accountId || "all"}
        onValueChange={(e) =>
          handleFilterChange({ accountId: e, dateRange: undefined })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choose Acoount" />
        </SelectTrigger>

        <SelectContent>
          {!!accounts ? (
            <>
              <SelectItem value={"all"}>all</SelectItem>
              {accounts.map((e, i) => (
                <SelectItem value={e.id}>{e.name}</SelectItem>
              ))}
            </>
          ) : (
            <Loader2 className=" h-8 w-8 animate-spin" />
          )}
        </SelectContent>
      </Select>{" "}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(dateRange) => {
              setDate(dateRange);
              handleFilterChange({ dateRange });
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Filter;
