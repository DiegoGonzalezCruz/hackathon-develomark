import { MonthlyVisits } from "@/types/siteDetails";
import React from "react";

const GeneralStats = ({ stats }: { stats: MonthlyVisits }) => {
  console.log(stats, "stats");
  return (
    <div className="debug2">
      {stats && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Last 30 Days Traffic</h2>
          {Object.entries(stats).map(([date, records]) => (
            <div key={date} className="mb-4">
              <h3 className="text-md font-medium">Date: {date}</h3>
              {records.map((record, index) => (
                <>
                  <div key={record.VISITS + index} className="stats shadow">
                    <div className="stat">
                      <div className="stat-title">Total Page Views</div>
                      <div className="stat-value"> {record.VISITORS}</div>
                      <div className="stat-desc">21% more than last month</div>
                    </div>
                  </div>
                  <div key={index} className="stats shadow">
                    <div className="stat">
                      <div className="stat-title">Total Page Views</div>
                      <div className="stat-value"> {record.VISITS}</div>
                      <div className="stat-desc">21% more than last month</div>
                    </div>
                  </div>
                  <div key={index} className="stats shadow">
                    <div className="stat">
                      <div className="stat-title">Total Page Views</div>
                      <div className="stat-value"> {record.PAGE_VIEWS}</div>
                      <div className="stat-desc">21% more than last month</div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GeneralStats;
