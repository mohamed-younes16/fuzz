"use client";

import { useAddAccount } from "@/hooks/accounts-hooks";
import { useStore } from "@/hooks/store";
import { motion as m } from "framer-motion";
import { Loader2 } from "lucide-react";
const Welcome = () => {
  const { user } = useStore();

  return (
    <div className=" space-y-4">
      <div
        className="  w-full  whitespace-nowrap
        duration-500 transition-all   h-full flex items-center    max-lg:text-2xl font-bold text-3xl"
      >
        {user?.name ? (
          <>
            <p className=" mr-3 tracking-[.25rem] max-lg:tracking-tight ">Welcome Back ! </p>
            <div className=" flex gap-1 max-lg:gap-[1px] items-center ">
              {" "}
              {user?.name.split("").map((e, i) => (
                <m.p
                key={i}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  transition={{
                    delay: 0.1 * i,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  initial={{ opacity: 0, y: 20, x: -10 }}
                  className=" text-"
                >
                  {e}
                </m.p>
              ))}
              <p>🖐️</p>
            </div>
          </>
        ) : (
          <Loader2 className="h-10 w-10 animate-spin " />
        )}
      </div>

      <p>this is your financial overview report </p>
    </div>
  );
};

export default Welcome;
