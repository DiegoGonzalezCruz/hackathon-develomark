import { FormAnalyticsData, ActivityRecord } from "@/types/siteDetails";
import React from "react";

// Helper to calculate percentage difference
const calculatePercentageDifference = (
  current: number,
  previous: number
): string => {
  if (previous === 0) return "N/A"; // Avoid division by zero
  const difference = ((current - previous) / previous) * 100;
  return `${difference > 0 ? "+" : ""}${difference.toFixed(2)}%`;
};

const FormAnalytics = ({
  formAnalytics,
}: {
  formAnalytics: FormAnalyticsData;
}) => {
  // Sort the data by month (assumes format YYYY-MM-DD for month)
  const sortedAnalytics = [...formAnalytics].sort(
    (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
  );

  // Get the last two months
  const lastMonth = sortedAnalytics[sortedAnalytics.length - 1];
  const previousMonth = sortedAnalytics[sortedAnalytics.length - 2];

  // Ensure data is properly typed and exists
  const metrics: (keyof ActivityRecord)[] = [
    "CLICK_TO_EMAILS",
    "FORM_SUBMITS",
    "CLICK_TO_MAPS",
    "CLICK_TO_CALLS",
  ];

  const comparisons = metrics.map((metric) => ({
    metric,
    current: lastMonth[metric] || 0,
    previous: previousMonth[metric] || 0,
    growth: calculatePercentageDifference(
      lastMonth[metric] || 0,
      previousMonth[metric] || 0
    ),
  }));

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">
        Form Analytics (Comparison: {previousMonth.month} → {lastMonth.month})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comparisons.map(({ metric, current, previous, growth }) => (
          <div key={metric} className="stats shadow">
            <div className="stat">
              <div className="stat-title">{metric.replace(/_/g, " ")}</div>
              <div className="stat-value">{current}</div>
              <div className="stat-desc">
                {growth} compared to {previousMonth.month} ({previous})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormAnalytics;
