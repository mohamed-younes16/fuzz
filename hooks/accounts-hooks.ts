"use client";
import { client } from "@/lib/hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await client.api.accounts.$get();
      if (!res.ok) throw new Error("Failed to Fetch accounts");

      const { accounts } = await res.json();

      return accounts;
    },
  });
  return query;
};
export const useGetAccount = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["accounts", { id }],
    queryFn: async () => {
      const res = await client.api.accounts[":id"].$get({ param: { id } });
      if (!res.ok) throw new Error("Failed to Fetch account");

      const { account } = await res.json();

      return account;
    },
  });
  return query;
};

type RequestAccountPatchType = InferRequestType<
  (typeof client.api.accounts)["patch"]["$post"]
>["json"];
type ResponseAccountPatchType = InferResponseType<
  (typeof client.api.accounts)["patch"]["$post"]
>;

export const usePatchAccount = () => {
  const queryClient = useQueryClient();
  const query = useMutation<
    ResponseAccountPatchType,
    Error,
    RequestAccountPatchType
  >({
    mutationFn: async (json) => {
      const res = await client.api.accounts["patch"].$post({ json });
      if (!res.ok) throw new Error((await res.json()).message);

      const { message } = await res.json();

      return { message };
    },
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return query;
};
////////////////////////////////////////////

type RequestAccountPostType = InferRequestType<
  typeof client.api.accounts.$post
>["json"];
type ResponseAccountPostType = InferResponseType<
  typeof client.api.accounts.$post
>;

export const useAddAccount = () => {
  const queryClient = useQueryClient();
  const query = useMutation<
    ResponseAccountPostType,
    Error,
    RequestAccountPostType
  >({
    mutationFn: async (json) => {
      const res = await client.api.accounts.$post({ json });
      if (!res.ok) throw new Error((await res.json()).message);
      return await res.json();
    },
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return query;
};
/////////////////////////////////////////////
////////////////////////////////////////////

type RequestAccountDeleteType = InferRequestType<
  (typeof client.api.accounts)["delete"]["$post"]
>["json"];
type ResponseAccountDeleteType = InferResponseType<
  (typeof client.api.accounts)["delete"]["$post"]
>;

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const query = useMutation<
    ResponseAccountDeleteType,
    Error,
    RequestAccountDeleteType
  >({
    mutationFn: async (json) => {
      const res = await client.api.accounts["delete"].$post({ json });
      if (!res.ok) throw new Error((await res.json()).message);
      const result = await res.json();
      return result;
    },
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return query;
};
/////////////////////////////////////////////
