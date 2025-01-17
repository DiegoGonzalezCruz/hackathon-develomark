import { FormsData } from "@/types/siteDetails";
import React, { useState } from "react";

const FormTable = ({ formsData }: { formsData: FormsData }) => {
  const initialFormTitle = formsData.length > 0 ? formsData[0].form_title : "";
  const [selectedFormTitle, setSelectedFormTitle] =
    useState<string>(initialFormTitle);

  //   const [selectedFormTitle, setSelectedFormTitle] = useState<string>("All");

  // Extract unique form titles for the filter dropdown
  const formTitles = Array.from(
    new Set(formsData.map((form) => form.form_title))
  );

  // Filter forms based on the selected form title
  const filteredForms =
    selectedFormTitle === "All"
      ? formsData
      : formsData.filter((form) => form.form_title === selectedFormTitle);

  // Extract unique field names for table headers
  const allFields = Array.from(
    new Set(filteredForms.flatMap((form) => Object.keys(form.message)))
  );
  return (
    <div>
      {" "}
      {/* Filter Dropdown */}
      <div className="mb-4">
        <label
          htmlFor="formFilter"
          className="block text-sm font-medium text-gray-700"
        >
          Filter by Form Title:
        </label>
        <select
          id="formFilter"
          value={selectedFormTitle}
          onChange={(e) => setSelectedFormTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="All">All</option>
          {formTitles.map((title, index) => (
            <option key={index} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">
                Submission Date
              </th>
              {allFields.map((field, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2">
                  {field}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredForms.map((form, formIndex) => (
              <tr key={formIndex} className="hover:bg-gray-100">
                {/* Submission Date */}
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(form.date).toLocaleString()}
                </td>
                {/* Dynamic Fields */}
                {allFields.map((field, index) => (
                  <td key={index} className="border border-gray-300 px-4 py-2">
                    {form.message[field] || "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormTable;
