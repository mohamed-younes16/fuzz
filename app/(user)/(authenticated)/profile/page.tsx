"use client";
import { HomeIcon, Loader2, LucideLogOut } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ProfileForm from "@/components/forms/ProfileForm";
import TooltipComp from "@/components/ui/TooltipComp";

import SignOutButton from "@/components/inputs/SignOutButton";
import CliComp from "@/providers/modalProvider";
import { useUser } from "@/hooks/user-hooks";

const Page = () => {
  const { data: CurrentUserData } = useUser();

  return (
    <div>
      <>
        <div className="flex items-center  gap-6">
          <div className=" flexcenter  gap-4 ">
            <TooltipComp hoverText="Log-out">
              <SignOutButton>
                <LucideLogOut className="h-10 w-10 " />
              </SignOutButton>
            </TooltipComp>
          </div>

          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger>
                <Link href={"/"} aria-label="redirect to profile page ">
                  <HomeIcon className="h-10 w-10 " />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Main Page</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="min-h-[60dvh] flexcenter">
          {CurrentUserData ? (
            <CliComp>
              <ProfileForm userData={CurrentUserData} />
            </CliComp>
          ) : (
            <Loader2 className="w-14 h-14 mx-auto animate-spin text-foreground" />
          )}
        </div>
      </>
    </div>
  );
};

export default Page;
