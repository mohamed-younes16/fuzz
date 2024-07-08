"use client";
import { client } from "@/lib/hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponsePaymentType = InferResponseType<
  typeof client.api.purchase.$post,
  201
>;
export const useGetPurchase = () => {
  const query = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await client.api.purchase.$post();

      if (!res.ok) throw new Error("Failed to Fetch accounts");

      const data = await res.json();

      return data;
    },
  });
  return query;
};
export const useGetPlan = () => {
  const query = useQuery({
    queryKey: ["plan"],
    queryFn: async () => {
      const res = await client.api.purchase.$get();

      if (!res.ok) throw new Error("Failed to Fetch accounts");

      const { planData } = await res.json();

      return planData;
    },
  });
  return query;
};
