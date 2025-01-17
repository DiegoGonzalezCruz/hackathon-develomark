import DashboardLayout from "@/app/layout";
import { ReportPageWrapper } from "../src/components/reports/report-page-wrapper";
import "./tailwind.css";

export function App() {
  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}
