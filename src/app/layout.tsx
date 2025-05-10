"use client";
import { Geist, Roboto } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const Roboto_font = Roboto({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathName = usePathname();
  const queryClient = new QueryClient();
  const hideNav = ["/auth/sign-in", "/unauthorized"].includes(pathName);
  return (
    <html lang="en">
      <title>Admin GenzBlog</title>
      <body
        className={`${geistSans.variable} ${Roboto_font.variable} antialiased`}
      >
        <SidebarProvider>
          <QueryClientProvider client={queryClient}>

            {!hideNav && (
              <>
              <AppSidebar />
              <SidebarTrigger />
              </>
            )}

            {children}
            <Toaster/>
          </QueryClientProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
