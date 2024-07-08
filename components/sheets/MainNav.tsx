"use client";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useEffect } from "react";
import { BarChart3, Minimize2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import UserHandler from "../UserHandler";
import { useStore } from "@/hooks/store";
import Image from "next/image";
import Links from "../navbar/Links";

const MainNav = () => {
  const { isSheetOpen, setIsSheetOpen, user: userData } = useStore();
  const pathname = usePathname();
  useEffect(() => setIsSheetOpen(false), [pathname]);

  return (
    <div className=" flex gap-[10px] relative">
      <div className="lg:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className=" ">
            <Button>
              {" "}
              <BarChart3 className={`rotate-[270deg]`} />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-3    flex flex-col items-start pt-6  ">
            <div className="h-full w-full space-y-3">
              <Link className="min-h-[65px] block w-[65px] relative " href="/">
                <Image
                  loading="eager"
                  alt="logo"
                  className="w-fit object-contain"
                  fill
                  src={"/assets/logo.svg"}
                />
              </Link>
              <div className="  w-full">
                <SheetHeader className="mb-4">
                  <SheetTitle>Check The Pages</SheetTitle>
                  <SheetDescription>
                    List Of the pages In The App
                  </SheetDescription>
                </SheetHeader>
              </div>
              <Links />
            </div>
            <Separator />
            <SheetClose asChild>
              <Button
                variant={"outline"}
                className="flexcenter  py-8 max-sm:py-5 w-full"
              >
                {" "}
                <Minimize2 className="h-10 max-sm:h-6 w-10" />{" "}
              </Button>
            </SheetClose>

            <Separator />
            <UserHandler userData={userData} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MainNav;
