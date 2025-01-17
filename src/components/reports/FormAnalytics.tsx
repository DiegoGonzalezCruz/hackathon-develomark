import { FormAnalyticsData } from "@/types/siteDetails";
import React from "react";

const FormAnalytics = ({
  formAnalytics,
}: {
  formAnalytics: FormAnalyticsData;
}) => {
  console.log(formAnalytics, "formAnalytics");
  return (
    <div>
      <div className="overflow-x-auto mt-6">
        <h3 className="text-lg font-medium mb-2">
          Form Analytics (Last 2 Months)
        </h3>
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Month</th>
              <th className="border border-gray-300 px-4 py-2">Form Submits</th>
            </tr>
          </thead>
          <tbody>
            {formAnalytics.map((analytics, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {analytics.month}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {analytics.formSubmits}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormAnalytics;
