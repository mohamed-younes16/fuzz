import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Loader2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="flex gap-6 flex-col items-center py-6">
      <Loader2 className=" w-14 h-14 animate-spin text-foreground" />
      <div className="border w-full  rounded-lg shadow-sm">
        <div className="relative w-full overflow-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left font-medium">
                  <Checkbox />
                </th>
                <th className="px-4 py-3 text-left font-medium">Value</th>
                <th className="px-4 py-3 text-left font-medium">Value</th>
                <th className="px-4 py-3 text-left font-medium">Value</th>
                <th className="px-4 py-3 text-right font-medium">Value</th>
              </tr>
            </thead>
            <tbody className="min-h-[60dvh]">
              <tr className="animate-pulse">
                <td className="px-4 py-3 border-b">
                  <Checkbox />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-32" />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-40" />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-24" />
                </td>
                <td className="px-4 py-3 border-b text-right">
                  <Skeleton className="h-8 w-16" />
                </td>
              </tr>
              <tr className="animate-pulse">
                <td className="px-4 py-3 border-b">
                  <Checkbox />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-32" />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-40" />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-24" />
                </td>
                <td className="px-4 py-3 border-b text-right">
                  <Skeleton className="h-8 w-16" />
                </td>
              </tr>{" "}
              <tr className="animate-pulse">
                <td className="px-4 py-3 border-b">
                  <Checkbox />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-32" />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-40" />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-24" />
                </td>
                <td className="px-4 py-3 border-b text-right">
                  <Skeleton className="h-8 w-16" />
                </td>
              </tr>{" "}
              <tr className="animate-pulse">
                <td className="px-4 py-3 border-b">
                  <Checkbox />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-32" />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-40" />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-24" />
                </td>
                <td className="px-4 py-3 border-b text-right">
                  <Skeleton className="h-8 w-16" />
                </td>
              </tr>{" "}
              <tr className="animate-pulse">
                <td className="px-4 py-3 border-b">
                  <Checkbox />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-32" />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-40" />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-24" />
                </td>
                <td className="px-4 py-3 border-b text-right">
                  <Skeleton className="h-8 w-16" />
                </td>
              </tr>{" "}
              <tr className="animate-pulse">
                <td className="px-4 py-3 border-b">
                  <Checkbox />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-32" />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-40" />
                </td>
                <td className="px-4 py-3 border-b">
                  <Skeleton className="h-8 w-24" />
                </td>
                <td className="px-4 py-3 border-b text-right">
                  <Skeleton className="h-8 w-16" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
