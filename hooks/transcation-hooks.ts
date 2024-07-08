"use client";
import { client } from "@/lib/hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export const useGetTransactions = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";
  const query = useQuery({
    queryKey: ["transactions", { from, to, accountId }],
    queryFn: async () => {
      const res = await client.api.transactions.$get({
        query: { accountId, to, from },
      });
      if (!res.ok) throw new Error("Failed to Fetch transactions");

      const { transactions } = await res.json();

      return transactions;
    },
  });
  return query;
};

//////////////////////////////////////////////////////////////////

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    queryKey: ["transaction", { id }],
    queryFn: async () => {
      const res = await client.api.transactions[":id"].$get({ param: { id } });
      if (!res.ok) throw new Error("Failed to Fetch transaction");

      const { transaction } = await res.json();

      return transaction;
    },
  });
  return query;
};

///////////////////////////////////////////////////////////////

type RequestTransactionPatchType = InferRequestType<
  (typeof client.api.transactions)["patch"]["$post"]
>["json"];
type ResponseTransactionPatchType = InferResponseType<
  (typeof client.api.transactions)["patch"]["$post"]
>;

export const usePatchTransaction = () => {
  const queryClient = useQueryClient();
  const query = useMutation<
    ResponseTransactionPatchType,
    Error,
    RequestTransactionPatchType
  >({
    mutationFn: async (json) => {
      const res = await client.api.transactions["patch"].$post({ json });
      if (!res.ok) throw new Error((await res.json()).message);

      const { message } = await res.json();

      return { message };
    },
    onSuccess: (result, { id }) => {
      toast.success(result.message);
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return query;
};

////////////////////////////////////////////

type RequestTransactionPostType = InferRequestType<
  typeof client.api.transactions.$post
>["json"];
type ResponseTransactionPostType = InferResponseType<
  typeof client.api.transactions.$post
>;

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  const query = useMutation<
    ResponseTransactionPostType,
    Error,
    RequestTransactionPostType
  >({
    mutationFn: async (json) => {
      const res = await client.api.transactions.$post({ json });
      if (!res.ok) throw new Error((await res.json()).message);
      return await res.json();
    },
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return query;
};

/////////////////////////////////////////////

type RequestTransactionDeleteType = InferRequestType<
  (typeof client.api.transactions)["delete"]["$post"]
>["json"];
type ResponseTransactionDeleteType = InferResponseType<
  (typeof client.api.transactions)["delete"]["$post"]
>;

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  const query = useMutation<
    ResponseTransactionDeleteType,
    Error,
    RequestTransactionDeleteType
  >({
    mutationFn: async (json) => {
      const res = await client.api.transactions["delete"].$post({ json });
      if (!res.ok) throw new Error((await res.json()).message);
      const result = await res.json();
      return result;
    },
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return query;
};
