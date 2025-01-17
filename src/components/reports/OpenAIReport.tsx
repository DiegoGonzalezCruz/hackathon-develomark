import React from "react";
import { ReportPageWrapper } from "./report-page-wrapper";

const OpenAIReport = ({ AIsummary }: { AIsummary: string }) => {
  return (
    <ReportPageWrapper title="Open AI Report" subtitle="Details obtained by AI">
      {AIsummary}
    </ReportPageWrapper>
  );
};

export default OpenAIReport;
