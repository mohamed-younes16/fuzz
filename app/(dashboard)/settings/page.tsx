"use client";
import Heading from "@/components/Heading";
import SubscribeModal from "@/components/SubscribeModal";
import { Separator } from "@/components/ui/separator";
import { useGetPlan } from "@/hooks/purchase-hooks";
import CliComp from "@/providers/modalProvider";
import { CheckCircle, Loader2, Settings } from "lucide-react";

const page = () => {
  const { data: plan } = useGetPlan();
  return (
    <div className="bg-background min-h-[40dvh] rounded-md py-4  w-full px-8 max-lg:px-4 ">
      <div className="flex items-center justify-between">
        <Heading
          icon={<Settings className="text-foreground h-10 w-10" />}
          title={`Your settings Options `}
          description="Manage all your Settings."
        />
      </div>
      <Separator className=" my-4" />
      <div
        className="flex p-3 rounded-xl shadow-sm hover:shadow-xl 
      transition-all border-foreground/20 border-[1px]  items-center justify-between"
      >
        {plan ? (
          <>
            <p className=" text-lg font-semibold">Subpscription</p>
            <div>{plan?.isPro ? "You are On A Pro Plan" : "No Plan Yet"}</div>
            <CliComp>
              <div>
                {" "}
                {!plan.isPro ? (
                  <SubscribeModal />
                ) : (
                  <div className=" flexcenter font-semibold text-minor gap-4">
                    <CheckCircle strokeWidth={3} className="h-8 w-8" />
                    <p>Subscribed</p>
                  </div>
                )}
              </div>
            </CliComp>
          </>
        ) : (
          <Loader2 className=" h-8 w-8 text-foreground animate-spin" />
        )}
      </div>
    </div>
  );
};

export default page;
