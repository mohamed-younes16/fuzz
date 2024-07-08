import { ThemeProvider } from "@/components/ui/theme-provider";
import { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "sonner";
import NavBar from "@/components/navbar/NavBar";
import getCurrentUser from "@/actions";
import { UserLoader } from "@/hooks/store";
import { QueryProvider } from "@/providers/query";
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});


export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user: UserFetched | null = await getCurrentUser();

  return (
    <html suppressHydrationWarning className={`${inter.className}`} lang="en">
      <body
        className="dark:bg-[url(/assets/magicdark1.svg)] 
         bg-[url(/assets/magicdark2.svg)] bg-cover min-h-screen
       overflow-x-hidden  "
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="admin-theme"
        >
          <QueryProvider>
            <UserLoader userData={user} />
            <Toaster richColors position="top-center" />
            {user && <NavBar userData={user} />}
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
