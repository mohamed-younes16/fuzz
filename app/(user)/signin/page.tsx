import AnimatedLogo from "@/components/AnimatedLogo";
import AuthComponent from "@/components/AuthComponent";
import MenuItem from "@/components/navbar/MenuItem";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/themeButton";

import Image from "next/image";

export const metadata = {
  title: "Finance",
  description: "finance manager",
};
export default async function Home() {
  return (
    <div
      className="min-h-screen bg-cover 
     max-lg:bg-[url(/assets/auth-bg.svg)] 
     relative max-lg:flex-col max-lg:py-2 flexcenter bg-white dark:bg-neutral-900"
    >
      <div
        className=" w-[60%]
         px-2 lg:px-6
          transition-all  relative z-10 max-lg:w-full  flexcenter"
      >
        <div
          className="w-full backdrop-blur-sm border-[1px] px-4
         bg-background/30 py-12 flex flex-col justify-between max-lg:py-6 min-h-[90dvh] shadow-xl max-lg:max-h-[calc(100dvh_-_1rem)] overflow-auto rounded-xl max-lg:border-background/70"
        >
          <AuthComponent />{" "}
          <div className=" space-y-3  w-full">
            <Separator className=" mt-auto" />
            <MenuItem className="bg-background  mx-auto w-fit border-foreground shadow-xl">
              <div className="flex gap-2 items-center">
                <ModeToggle>
                  <div className="ml-2 text-lg">Toggle Theme</div>
                </ModeToggle>
              </div>
            </MenuItem>
          </div>
        </div>{" "}
      </div>

      <div
        className="lg:w-[40%] lg:min-h-screen max-lg:absolute 
       max-lg:rounded-full  max-lg:w-[150px] max-lg:left-1/2
        max-lg:h-[150px] max-lg:top-1/2 max-lg:-translate-x-1/2 
        max-lg:-translate-y-1/2 max-lg:animate-pulse max-lg:blur-2xl relative flexcenter"
      >
        <Image
          alt="auth bg"
          className=" object-cover  z-0"
          fill
          src={"/assets/auth-bg.svg"}
        />
        <AnimatedLogo className="h-[100px] relative z-10 max-lg:hidden  stroke-white w-[100px]" />
      </div>
    </div>
  );
}
