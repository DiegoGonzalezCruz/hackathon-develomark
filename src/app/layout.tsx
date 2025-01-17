import { SidebarProvider } from "@/components/layout/ClientProvider";
import { Sidebar } from "@/components/layout/Sidebar";
import { PropsWithChildren } from "react";

import "./globals.css";
import { getSiteDetails } from "@/lib/siteIds";

const siteDetails = await getSiteDetails();
// console.log(siteDetails, "siteDetails");

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <html>
      <body>
        <SidebarProvider>
          <div className="grid grid-cols-[auto,1fr] h-dvh ">
            <Sidebar siteDetails={siteDetails} />
            <div className="bg-white shadow-lg overflow-y-auto">{children}</div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
