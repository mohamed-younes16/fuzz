"use client"
import { client } from "@/lib/hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

// Get all categories
export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await client.api.categories.$get();
      if (!res.ok) throw new Error("Failed to fetch categories");

      const { categories } = await res.json();

      return categories;
    },
  });
  return query;
};

// Get a single category by ID
export const useGetCategory = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["categories", { id }],
    queryFn: async () => {
      const res = await client.api.categories[":id"].$get({ param: { id } });
      if (!res.ok) throw new Error("Failed to fetch category");

      const { category } = await res.json();

      return category;
    },
  });
  return query;
};

// Patch (update) a category
type RequestCategoryPatchType = InferRequestType<
  (typeof client.api.categories)["patch"]["$post"]
>["json"];
type ResponseCategoryPatchType = InferResponseType<
  (typeof client.api.categories)["patch"]["$post"]
>;

export const usePatchCategory = () => {
  const queryClient = useQueryClient();
  const query = useMutation<
    ResponseCategoryPatchType,
    Error,
    RequestCategoryPatchType
  >({
    mutationFn: async (json) => {
      const res = await client.api.categories["patch"].$post({ json });
      if (!res.ok) throw new Error((await res.json()).message);

      const { message } = await res.json();

      return { message };
    },
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["transactions",] });

    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return query;
};

// Add a new category
type RequestCategoryPostType = InferRequestType<
  typeof client.api.categories.$post
>["json"];
type ResponseCategoryPostType = InferResponseType<
  typeof client.api.categories.$post
>;

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const query = useMutation<
    ResponseCategoryPostType,
    Error,
    RequestCategoryPostType
  >({
    mutationFn: async (json) => {
      const res = await client.api.categories.$post({ json });
      if (!res.ok) throw new Error((await res.json()).message);
      return await res.json();
    },
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["transactions",] });

    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return query;
};

// Delete a category
type RequestCategoryDeleteType = InferRequestType<
  (typeof client.api.categories)["delete"]["$post"]
>["json"];
type ResponseCategoryDeleteType = InferResponseType<
  (typeof client.api.categories)["delete"]["$post"]
>;

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const query = useMutation<
    ResponseCategoryDeleteType,
    Error,
    RequestCategoryDeleteType
  >({
    mutationFn: async (json) => {
      const res = await client.api.categories["delete"].$post({ json });
      if (!res.ok) throw new Error((await res.json()).message);
      const result = await res.json();
      return result;
    },
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["transactions",] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return query;
};
