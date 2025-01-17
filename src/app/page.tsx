import { ReportPageWrapper } from "@/components/reports/report-page-wrapper";

export default function Home() {
  return (
    <div className="wrapper">
      <ReportPageWrapper title="Example Page 1" subtitle="Example Subtitle">
        <div className="rounded-lg px-8 py-6 shadow-md border">
          Example Content
        </div>
      </ReportPageWrapper>
      <ReportPageWrapper title="Example Page 2" subtitle="Example Subtitle">
        <div className="rounded-lg px-8 py-6 shadow-md border">
          Example Content
        </div>
      </ReportPageWrapper>
    </div>
  );
}
