import React from "react";
import { ReportPageWrapper } from "./report-page-wrapper";
import { Traffic } from "@/types/siteDetails";

interface OverallTrafficProps {
  traffic: Traffic;
  getLast30Days: any;
}

export default function OverallTraffic({
  traffic,
  getLast30Days,
}: OverallTrafficProps) {
  console.log(traffic, "traffic");
  console.log(getLast30Days, "getLast30Days");
  return (
    <ReportPageWrapper title="Overall Traffic" subtitle="Cool stats">
      <div className="rounded-lg px-8 py-6 shadow-md border flex flex-col gap-5">
        <div>
          {Object.entries(traffic).map(([date, records]) => (
            <div key={date} className="mb-4">
              <h2 className="text-lg font-semibold">Date: {date}</h2>
              {records.map((record, index) => (
                <ul key={index} className="ml-4">
                  <li>Visitors: {record.VISITORS}</li>
                  <li>Visits: {record.VISITS}</li>
                  <li>Page Views: {record.PAGE_VIEWS}</li>
                </ul>
              ))}
            </div>
          ))}
          {/* Display last 30 days data */}
          {getLast30Days && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Last 30 Days Traffic</h2>
              {Object.entries(getLast30Days).map(([date, records]) => (
                <div key={date} className="mb-4">
                  <h3 className="text-md font-medium">Date: {date}</h3>
                  {records.map((record, index) => (
                    <ul key={index} className="ml-4">
                      <li>Visitors: {record.VISITORS}</li>
                      <li>Visits: {record.VISITS}</li>
                      <li>Page Views: {record.PAGE_VIEWS}</li>
                    </ul>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ReportPageWrapper>
  );
}
