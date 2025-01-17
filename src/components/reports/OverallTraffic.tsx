import React from "react";
import { ReportPageWrapper } from "./report-page-wrapper";
import { OverallTrafficProps } from "@/types/siteDetails";
import GeneralStats from "./Traffic/GeneralStats";
import Chart from "./Traffic/Chart";

export default function OverallTraffic({
  traffic,
  getLast30Days,
}: OverallTrafficProps) {
  console.log(traffic, "traffic");
  console.log(getLast30Days, "getLast30Days");
  return (
    <ReportPageWrapper title="Overall Traffic" subtitle="Cool stats">
      <div className="rounded-lg px-8 py-6 shadow-md border flex flex-col gap-5">
        <GeneralStats stats={getLast30Days} />
        <Chart data={traffic} />
      </div>
    </ReportPageWrapper>
  );
}
