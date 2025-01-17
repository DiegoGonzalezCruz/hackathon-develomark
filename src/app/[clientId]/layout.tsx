import { PropsWithChildren } from "react";

// import { getSiteDetails } from "@/lib/siteIds";

// const siteDetails = await getSiteDetails();
// console.log(siteDetails, "siteDetails");

export default async function ClientLayout({ children }: PropsWithChildren) {
  return <div className="wrapper">{children}</div>;
}
