"use client";
import { client } from "@/lib/hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

export const useUser = () => {
  const query = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await client.api.profile.$get();
      if (!res.ok) throw new Error("Failed to Fetch User");
      const { user } = await res.json();
      return user;
    },
  });
  return query;
};

type RequestProfilePostType = InferRequestType<
  typeof client.api.profile.patch.$post
>["json"];
type ResponseProfilePostType = InferResponseType<
  typeof client.api.profile.patch.$post
>;

export const usePatchProfile = () => {
  const queryClient = useQueryClient();
  const query = useMutation<
    ResponseProfilePostType,
    Error,
    RequestProfilePostType
  >({
    mutationFn: async (json) => {
      const res = await client.api.profile["patch"].$post({ json });
      if (!res.ok) throw new Error((await res.json()).message);
      return await res.json();
    },
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      window.location.reload();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return query;
};
