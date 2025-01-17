import { MonthlyVisits } from "@/types/siteDetails";
import React from "react";

// Helper function to calculate percentage difference
const calculatePercentageDifference = (
  current: number,
  previous: number
): string => {
  if (previous === 0) return "N/A"; // Avoid division by zero
  const difference = ((current - previous) / previous) * 100;
  return `${difference.toFixed(2)}% ${
    difference > 0 ? "more" : "less"
  } than last month`;
};

// Process the stats to include percentage differences
export const processStats = (
  stats: Record<
    string,
    { VISITORS: number; VISITS: number; PAGE_VIEWS: number }[]
  >
) => {
  const dates = Object.keys(stats).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  const latestDate = dates[dates.length - 1];
  const previousDate = dates[dates.length - 2];

  if (!latestDate || !previousDate) return null;

  const current = stats[latestDate][0];
  const previous = stats[previousDate][0];

  return {
    [latestDate]: [
      {
        ...current,
        VISITORS_DIFF: calculatePercentageDifference(
          current.VISITORS,
          previous.VISITORS
        ),
        VISITS_DIFF: calculatePercentageDifference(
          current.VISITS,
          previous.VISITS
        ),
        PAGE_VIEWS_DIFF: calculatePercentageDifference(
          current.PAGE_VIEWS,
          previous.PAGE_VIEWS
        ),
      },
    ],
  };
};

const GeneralStats = ({ stats }: { stats: MonthlyVisits }) => {
  const processedStats = processStats(stats);
  // console.log(stats, "stats");

  return (
    <div className="">
      {processedStats && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Last 30 Days Traffic</h2>
          {Object.entries(processedStats).map(([date, records]) => (
            <div key={date} className="mb-4">
              <h3 className="text-md font-medium">Date: {date}</h3>
              {records.map((record, index) => (
                <div
                  key={index}
                  className="stats shadow  flex flex-col md:flex-row "
                >
                  <div className="stat">
                    <div className="stat-title">Total Visitors</div>
                    <div className="stat-value">{record.VISITORS}</div>
                    <div className="stat-desc">{record.VISITORS_DIFF}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Total Visits</div>
                    <div className="stat-value">{record.VISITS}</div>
                    <div className="stat-desc">{record.VISITS_DIFF}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Total Page Views</div>
                    <div className="stat-value">{record.PAGE_VIEWS}</div>
                    <div className="stat-desc">{record.PAGE_VIEWS_DIFF}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GeneralStats;
