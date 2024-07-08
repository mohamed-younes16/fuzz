import { ReactNode } from "react";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="fixed inset-0   flexcenter left-0 top-0  text-black  
          dark:text-white
          min-h-screen transition-all 
          bg-cover"
    >
      {" "}
      <div className=" w-[80dvw]  p-4 rounded-2xl mt-6 border-neutral-600 border backdrop-blur-md ">
        {children}
      </div>
    </div>
  );
}
