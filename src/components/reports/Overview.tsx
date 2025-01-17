"use client";
import React from "react";
import { format } from "date-fns";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReportPageWrapper } from "./report-page-wrapper";
import { SiteDetails } from "@/lib/schemas";

interface OverviewProps {
  summary: SiteDetails;
}

export default function Overview({ summary }: OverviewProps) {
  const {
    site_seo,
    site_business_info,
    site_domain,
    google_tracking_id,
    publish_status,
    first_published_date,
  } = summary;

  return (
    <ReportPageWrapper title="Overview" subtitle={site_seo.title}>
      <Card>
        <CardHeader>
          <CardTitle className="font-title text-2xl sm:text-3xl lg:text-4xl">
            Business Overview of {site_business_info.business_name}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <p className="text-muted-foreground">{site_seo.description}</p>

          <div className="grid gap-2 text-sm">
            <InfoItem label="Domain" value={site_domain} />
            <InfoItem label="Google Analytics ID" value={google_tracking_id} />
            <InfoItem
              label="Business Contact"
              value={`${site_business_info.phone_number}, ${site_business_info.email}`}
            />
            <InfoItem
              label="Published Status"
              value={
                <>
                  <Badge variant={"default"}>{publish_status}</Badge>
                  {" since "}
                  {format(new Date(first_published_date), "MMMM d, yyyy")}
                </>
              }
            />
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Site Preview</h3>
            <div className="relative aspect-video w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-md">
              <Image
                src={site_seo.og_image || "/placeholder.svg"}
                alt={`Preview of ${site_business_info.business_name} website`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </ReportPageWrapper>
  );
}

interface InfoItemProps {
  label: string;
  value: React.ReactNode;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-semibold">{label}:</span>
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
}

// import React from "react";
// import { ReportPageWrapper } from "./report-page-wrapper";
// import { SiteDetails } from "@/lib/schemas";
// import Image from "next/image";

// export default function Overview({ summary }: { summary: SiteDetails }) {
//   return (
//     <ReportPageWrapper title="Overview" subtitle={`${summary.site_seo.title}`}>
//       <div className="rounded-lg px-8 py-6 shadow-md border flex flex-col gap-5">
//         <h1 className="font-bold font-title text-2xl @3xl/dashboard:text-4xl">
//           Business Overview of {summary.site_business_info.business_name}
//         </h1>
//         <h2>{summary.site_seo.description}</h2>
//         <p className="text-sm">
//           <strong>Domain:</strong> {summary.site_domain}
//         </p>
//         <p className="text-sm">
//           <strong>Google Analytics ID:</strong> {summary.google_tracking_id}
//         </p>
//         <p className="text-sm">
//           <strong>Business Contact:</strong>{" "}
//           {summary.site_business_info.phone_number},{" "}
//           {summary.site_business_info.email}
//         </p>
//         <p className="text-sm">
//           <strong>Published Status:</strong> {summary.publish_status} since{" "}
//           {new Date(summary.first_published_date).toLocaleDateString()}
//         </p>
//         <Image
//           src={summary.site_seo.og_image}
//           alt="Site Preview"
//           className="rounded shadow"
//           width={250}
//           height={250}
//         />
//       </div>
//     </ReportPageWrapper>
//   );
// }
