"use client";
import React from "react";
import { SystemsDetailsProps } from "@/types/siteDetails";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ReportPageWrapper } from "./report-page-wrapper";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define component
const SystemsDetails: React.FC<SystemsDetailsProps> = ({ devicesDetails }) => {
  // Function to classify device type
  const getDeviceType = (os: string) => {
    if (
      os.toLowerCase().includes("windows") ||
      os.toLowerCase().includes("mac os")
    ) {
      return "Desktop";
    } else if (
      os.toLowerCase().includes("android") ||
      os.toLowerCase().includes("ios")
    ) {
      return "Mobile";
    } else if (os.toLowerCase().includes("tablet")) {
      return "Tablet";
    }
    return "Unknown";
  };

  // Aggregate visitors by device type
  const deviceTypeCounts: Record<string, number> = {};
  let totalVisitors = 0;

  devicesDetails.forEach((monthDetail) => {
    monthDetail.details.forEach((detail) => {
      const deviceType = getDeviceType(detail.os);
      deviceTypeCounts[deviceType] =
        (deviceTypeCounts[deviceType] || 0) + detail.visitors;
      totalVisitors += detail.visitors;
    });
  });

  // Chart.js data
  const chartData = {
    labels: Object.keys(deviceTypeCounts),
    datasets: [
      {
        label: "Visitors by Device Type",
        data: Object.values(deviceTypeCounts),
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

  // Calculate percentages
  const deviceTypePercentages = Object.entries(deviceTypeCounts).map(
    ([deviceType, count]) => ({
      deviceType,
      count,
      percentage: ((count / totalVisitors) * 100).toFixed(1), // Round to 1 decimal place
    })
  );

  return (
    <ReportPageWrapper title="Overview by Device" subtitle="Details by Device">
      <div className="rounded-lg px-2 md:px-8 py-6 shadow-md border">
        <h2 className="text-lg font-medium mb-4">BY DEVICE TYPE:</h2>
        <p className="mb-4">TOTAL VISITORS: {totalVisitors}</p>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Pie Chart */}
          <div className="md:w-1/2  w-full ">
            <Pie data={chartData} className="w-full" />
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
              {deviceTypePercentages.map(
                ({ deviceType, count, percentage }) => (
                  <tr key={deviceType} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {deviceType}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {count}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {percentage}%
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ReportPageWrapper>
  );
};

export default SystemsDetails;
