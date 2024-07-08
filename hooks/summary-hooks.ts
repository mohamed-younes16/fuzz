"use client";
import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from "next/navigation";

export const useGetsummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";
  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const res = await client.api.summary.$get({
        query: { accountId, to, from },
      });
      if (!res.ok) throw new Error("Failed to Fetch summary");

      const data = await res.json();

      return {
        ...data,
      };
    },
  });
  return query;
};
