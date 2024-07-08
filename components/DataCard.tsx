"use client";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { Loader2, LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { Countup } from "./CountUp";
import { formatedPercentage, formatedPrice } from "@/utils";

import { motion as m } from "framer-motion";
import { Skeleton } from "./ui/skeleton";
const boxVariant = cva("rounded-md p-3 shrink-0", {
  variants: {
    variant: {
      default: "bg-blue-500/20",
      success: "bg-emerald-500/20",
      danger: "bg-rose-500/20",
      warning: "bg-yellow-500/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const iconVariant = cva("h-6 w-6", {
  variants: {
    variant: {
      default: "text-blue-500",
      success: "text-emerald-500",
      danger: "text-rose-500",
      warning: "text-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type BoxVariants = VariantProps<typeof boxVariant>;
export type IconVariants = VariantProps<typeof iconVariant>;
interface DataCardProps extends BoxVariants, IconVariants {
  Icon: LucideIcon;
  title: string;
  percentageChange: number;
  dateRange: string;
  value: number;
  isReady: boolean;
}
const DataCard = ({
  Icon,
  variant,
  percentageChange,
  dateRange,
  title,
  isReady,
  value = 0,
}: DataCardProps) => {
  return (
    <Card className="min-h-[180px] shadow-2xl ">
      {isReady ? (
        <m.div
          initial={{
            opacity: 0,
          }}
          transition={{
            duration: 1,
          }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          <CardHeader className=" flex flex-row items-center max-lg:py-4 justify-between  gap-x-4">
            <div className=" space-y-2">
              <CardTitle className="text-xl max line-clamp-1"> {title}</CardTitle>
              <CardDescription className=" line-clamp-1">
                {dateRange}
              </CardDescription>
            </div>{" "}
            <div className={cn(boxVariant({ variant }))}>
              <Icon className={cn(iconVariant({ variant }))} />
            </div>
          </CardHeader>
          <CardContent className=" space-y-2">
            <h1 className=" text-2xl  max-lg:text-lg font-bold">
              <Countup
                preserveValue
                start={0}
                end={value}
                decimals={2}
                decimalPlaces={2}
                formattingFn={formatedPrice}
              />
            </h1>
            <p
              className={cn(
                "text-muted-foreground ",
                percentageChange > 0 && "text-emerald-500",
                percentageChange < 0 && "text-rose-500"
              )}
            >
              {formatedPercentage(percentageChange, { addPrefix: true })} from
              Last Period
            </p>
          </CardContent>{" "}
        </m.div>
      ) : (
        <div className="h-full space-y-2 p-6  w-full">
          <div className="flex items-center gap-x-4 pb-6 justify-between">
            <div className="space-y-2 w-full">
              <Skeleton className=" h-7 w-24" />
              <Skeleton className=" h-5 w-full" />
            </div>
            <div>
              <Skeleton className=" h-14 w-14" />
            </div>
          </div>
          <div>
            <div className="space-y-2">
              <Skeleton className=" h-9 w-32" />
              <Skeleton className=" h-4 w-36" />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DataCard;
