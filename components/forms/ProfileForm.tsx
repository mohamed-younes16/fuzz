"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input, InputProps } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UploadDropzone } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import { ProfileSchema } from "@/models/Schemas/Setup";
import { usePatchProfile } from "@/hooks/user-hooks";

const ProfileForm = ({ userData }: { userData: UserFetched | null }) => {
  const defaultValues = {
    bio: userData?.bio || "",
    imageUrl: userData?.imageUrl || "",
    name: userData?.name || "",
    username: userData?.username || "",
  };
  const { mutate, isPending } = usePatchProfile();
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    mutate(values);

  }
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="imageUrl"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className=" flex justify-center  gap-20 flex-wrap max-md:gap-10 ">
                {field.value ? (
                  <FormLabel
                    className=" mr-8 relative 
             w-[250px] flex justify-center items-center max-md:h-36 max-md:w-36 m-0 h-[250px] 
            bg-zinc-900 rounded-full flexcenter "
                  >
                    {field?.value ? (
                      <>
                        <X
                          onClick={() => field.onChange("")}
                          className="absolute cursor-pointer transition-all  
                      hover:scale-105 bg-red-500 top-2 max-md:top-0 max-md:right-0 right-2 
                      rounded-full p-2 h-10 w-10 z-50"
                        ></X>
                        <Image
                          src={field.value}
                          className="object-cover rounded-full"
                          alt="image of you"
                          fill
                        />
                      </>
                    ) : (
                      <Image
                        src="/assets/profile.svg"
                        className=" object-contain"
                        alt="image"
                        height={70}
                        width={70}
                      />
                    )}
                  </FormLabel>
                ) : (
                  <UploadDropzone
                    endpoint="imageUploader"
                    appearance={{
                      container: ` max-md:!px-2 max-md:!py-6 transition-all hover:scale-105 dark:border-black
                    bg-white cursor-pointer dark:bg-zinc-300 `,
                      label: `text-xl `,
                    }}
                    onClientUploadComplete={(e) => field.onChange(e?.[0].url)}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className=" flex flex-col   ">
                <FormLabel className="   ">Name</FormLabel>

                <FormControl className="">
                  <Input
                    className="account-form_input "
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className=" flex flex-col   ">
                <FormLabel className="   ">Username</FormLabel>

                <FormControl className=" ">
                  <Input
                    className="account-form_input "
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className=" flex flex-col   ">
                <FormLabel className="    ">Bio</FormLabel>

                <FormControl className="">
                  <Input
                    className="account-form_input "
                    type="text"
                    {...(field as InputProps)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.isDirty && (
            <Button
              type="submit"
              disabled={isPending}
              className={`${isPending ? "  bg-zinc-500" : ""} flexcenter gap-2`}
            >
              Submit
              {isPending && (
                <div
                  className="w-4 h-4 border-2 border-white
     dark:border-black !border-t-transparent rounded-full animate-spin"
                />
              )}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
