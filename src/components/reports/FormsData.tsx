"use client";

import { ReportPageWrapper } from "./report-page-wrapper";
import FormTable from "./FormTable";
import FormAnalytics from "./FormAnalytics";
import { FormAnalyticsData, FormsData } from "@/types/siteDetails";

export default function FormsDataComponent({
  formsData,
  formAnalytics,
}: {
  formsData: FormsData;
  formAnalytics: FormAnalyticsData;
}) {
  return (
    <ReportPageWrapper
      title="Form Submissions"
      subtitle="Details of all submitted forms."
    >
      <div className="rounded-lg px-8 py-6 shadow-md border flex flex-col gap-5">
        <FormAnalytics formAnalytics={formAnalytics} />
        <FormTable formsData={formsData} />
      </div>
    </ReportPageWrapper>
  );
}
