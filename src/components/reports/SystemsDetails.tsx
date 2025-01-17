"use client";
import React, { useEffect, useState } from "react";
import { SystemsDetailsProps } from "@/types/siteDetails";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ReportPageWrapper } from "./report-page-wrapper";
import { summarizeDevices } from "@/lib/analytics";

ChartJS.register(ArcElement, Tooltip, Legend);

const SystemsDetails: React.FC<SystemsDetailsProps> = ({ devicesDetails }) => {
  const [summary, setSummary] = useState<{
    totalVisitors: number;
    breakdown: {
      deviceType: string;
      count: number;
      percentage: number;
    }[];
  } | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchSummary() {
      try {
        const data = await summarizeDevices(devicesDetails);
        if (isMounted) {
          setSummary(data);
        }
      } catch (err) {
        console.error("Failed to fetch summary:", err);
      }
    }

    fetchSummary();

    return () => {
      isMounted = false;
    };
  }, [devicesDetails]);

  if (!summary) {
    return <div>Loading summary...</div>;
  }

  // Destructure from summary
  const { totalVisitors, breakdown } = summary;

  // Build chart data from `breakdown`
  const chartData = {
    labels: breakdown.map((b) => b.deviceType),
    datasets: [
      {
        label: "Visitors by Device Type",
        data: breakdown.map((b) => b.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ReportPageWrapper title="Overview by Device" subtitle="Details by Device">
      <div className="rounded-lg px-8 py-6 shadow-md border">
        <h2 className="text-lg font-medium mb-4">BY DEVICE TYPE:</h2>
        <p className="mb-4">TOTAL VISITORS: {totalVisitors}</p>

        <div className="flex flex-row gap-5">
          {/* Pie Chart */}
          <div className="w-1/2">
            <Pie data={chartData} />
          </div>

          {/* Table */}
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">
                  Device Type
                </th>
                <th className="border border-gray-300 px-4 py-2">Visitors</th>
                <th className="border border-gray-300 px-4 py-2">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.map(({ deviceType, count, percentage }) => (
                <tr key={deviceType} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {deviceType}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{count}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ReportPageWrapper>
  );
};

export default SystemsDetails;
