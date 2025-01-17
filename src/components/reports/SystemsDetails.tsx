import { SystemsDetailsProps } from "@/types/siteDetails";
import React from "react";

const SystemsDetails: React.FC<SystemsDetailsProps> = ({ devicesDetails }) => {
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

  // Calculate percentages
  const deviceTypePercentages = Object.entries(deviceTypeCounts).map(
    ([deviceType, count]) => ({
      deviceType,
      count,
      percentage: ((count / totalVisitors) * 100).toFixed(1), // Round to 1 decimal place
    })
  );

  return (
    <div className="rounded-lg px-8 py-6 shadow-md border">
      <h2 className="text-lg font-medium mb-4">BY DEVICE TYPE:</h2>
      <p className="mb-2">TOTAL VISITORS: {totalVisitors}</p>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Device Type</th>
            <th className="border border-gray-300 px-4 py-2">Visitors</th>
            <th className="border border-gray-300 px-4 py-2">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {deviceTypePercentages.map(({ deviceType, count, percentage }) => (
            <tr key={deviceType} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{deviceType}</td>
              <td className="border border-gray-300 px-4 py-2">{count}</td>
              <td className="border border-gray-300 px-4 py-2">
                {percentage}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SystemsDetails;
