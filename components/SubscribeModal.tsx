"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle, Crown } from "lucide-react";
import { Button } from "./ui/button";
import { useGetPurchase } from "@/hooks/purchase-hooks";
import { useRouter } from "next/navigation";
import { motion as m } from "framer-motion";
import Image from "next/image";
import { Separator } from "./ui/separator";
const SubscribeModal = () => {
  const features = ["Upload CSV files", "Diffrent Chart types"];
  const router = useRouter();
  const { data, isLoading, isSuccess } = useGetPurchase();
  const Onclick = async () => {
    isSuccess && data && window.open(`${data.checkoutUrl}`, "_blank");
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger disabled={isLoading} asChild>
          <Button className=" flexcenter gap-4 hover:text-minor">
            <Crown /> Subscribe
          </Button>
        </DialogTrigger>
        <DialogContent className=" rounded-xl">
          <DialogHeader className=" flex flex-col items-center">
            <div className="h-16 w-16 relative">
              {" "}
              <Image
                loading="eager"
                alt="logo"
                className=" object-contain"
                fill
                src={"/assets/logo.svg"}
              />
            </div>

            <DialogTitle className=" text-xl font-bold">
              Upgrade to a Pro Plan
            </DialogTitle>
            <DialogDescription>
              you'll be redirected into payment page and then back to the app
            </DialogDescription>
          </DialogHeader>
          <Separator />
          {features.flatMap((e, i) => (
            <m.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: i * 0.2,
              }}
              className=" flex items-center gap-4"
              key={`feature-${i}`}
            >
              <CheckCircle className=" text-minor " />
              <p>{e}</p>
            </m.div>
          ))}
          <Separator />
          <m.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.4,
            }}
            className="w-full"
            viewport={{ once: true }}
          >
            <DialogClose className="w-full">Cancel</DialogClose>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.6,
            }}
            viewport={{ once: true }}
          >
            {" "}
            <Button onClick={Onclick} className="w-full bg-minor">
              Take me there
            </Button>
          </m.div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscribeModal;
