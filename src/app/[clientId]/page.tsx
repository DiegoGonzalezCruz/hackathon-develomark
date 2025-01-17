import FormsData from "@/components/reports/FormsData";
import OverallTraffic from "@/components/reports/OverallTraffic";
import Overview from "@/components/reports/Overview";
import {
  getFormsData,
  getLast30DaysAnalytics,
  getLastTwoMonthsFormsData,
  getMonthlyVisits,
  getSiteDetails,
} from "@/lib/analytics";

const siteDetails = await getSiteDetails();
// console.log(siteDetails, "siteDetails");

const traffic = await getMonthlyVisits();
const getLast30Days = await getLast30DaysAnalytics();
const formsData = await getFormsData();
const formAnalytics = await getLastTwoMonthsFormsData();
// console.log(formAnalytics, "formAnalytics");

const summary = {
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
      <OverallTraffic traffic={traffic} getLast30Days={getLast30Days} />
      <FormsData formsData={formsData} formAnalytics={formAnalytics} />
    </div>
  );
}
