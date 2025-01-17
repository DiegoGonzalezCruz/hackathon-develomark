import React from "react";
import { ReportPageWrapper } from "./report-page-wrapper";
import { BusinessInfo, SiteSeo } from "@/types/siteDetails";

export default function Overview({
  summary,
}: {
  summary: { businessInfo: BusinessInfo; siteSeo: SiteSeo };
}) {
  // console.log(summary, "summary");
  return (
    <ReportPageWrapper
      title="Overview"
      subtitle={`${summary.businessInfo.business_name}`}
    >
      <div className="rounded-lg px-8 py-6 shadow-md border flex flex-col gap-5">
        <h1 className="font-bold font-title text-2xl @3xl/dashboard:text-4xl">
          Business Overview of {summary.businessInfo.business_name}
        </h1>
        <h2>{summary.siteSeo.description}</h2>
      </div>
    </ReportPageWrapper>
  );
}
