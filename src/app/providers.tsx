"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import ReduxProvider from "../../store/redux-provider";
import '@ant-design/v5-patch-for-react-19';


export function Providers({ children }: { children: React.ReactNode }) {
  return (
   <ReduxProvider>
     <ThemeProvider defaultTheme="dark" attribute="class">
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
   </ReduxProvider>
  );
}
