import FormsData from "@/components/reports/FormsData";
import OpenAIReport from "@/components/reports/OpenAIReport";
import OverallTraffic from "@/components/reports/OverallTraffic";
import Overview from "@/components/reports/Overview";
import SystemsDetails from "@/components/reports/SystemsDetails";
import {
  getDevicesDetails,
  getFormsData,
  getLast30DaysAnalytics,
  getLastTwoMonthsFormsData,
  getMonthlyVisits,
  getSiteDetails,
} from "@/lib/analytics";
import { createSummary } from "@/lib/openai";

const siteDetails = await getSiteDetails();
// console.log(siteDetails, "siteDetails");

const traffic = await getMonthlyVisits();
const getLast30Days = await getLast30DaysAnalytics();
const formsData = await getFormsData();
const formAnalytics = await getLastTwoMonthsFormsData();
const devicesDetails = await getDevicesDetails();

const AIsummary = await createSummary(
  siteDetails,
  getLast30Days,
  formAnalytics,
  devicesDetails
);

// console.log(AIsummary, "AIsummary");

export const summary = {
  businessInfo: siteDetails.site_business_info,
  siteSeo: siteDetails.site_seo,
};

export default async function Page({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const clientId = (await params).clientId;
  console.log(clientId, "clientId");

  return (
    <div>
      <Overview summary={summary} />
      <OpenAIReport AIsummary={AIsummary as string} />
      <OverallTraffic traffic={traffic} getLast30Days={getLast30Days} />
      <FormsData formsData={formsData} formAnalytics={formAnalytics} />
      <SystemsDetails devicesDetails={devicesDetails} />
    </div>
  );
}
