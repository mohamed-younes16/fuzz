import { ReactNode, Suspense } from "react";

import CliComp from "@/providers/modalProvider";
import Welcome from "@/components/Welcome";

import Filter from "@/components/Filter";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div suppressHydrationWarning className=" min-h-screen ">
      <div
        className=" w-[100dvw]  pb-16 max-lg:h-[35dvh] lg:h-[40dvh]
         max-lg:pt-10 pt-[150px] max-lg:px-10 px-28
        from-[40%]  bg-gradient-to-b space-y-6  from-main to-minor   z-[0]"
      >
        <CliComp>
          <Welcome />
          <Suspense fallback={<div>Loading filter</div>}>
            {" "}
            <Filter />
          </Suspense>
        </CliComp>{" "}
      </div>

      <div className=" px-16 max-lg:px-2  w-full max-lg:-mt-6 -mt-10">
        {children}
      </div>
    </div>
  );
}
