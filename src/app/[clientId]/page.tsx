import OverallTraffic from "@/components/reports/OverallTraffic";
import Overview from "@/components/reports/Overview";
import {
  getLast30DaysAnalytics,
  getMonthlyVisits,
  getSiteDetails,
} from "@/lib/siteIds";

const siteDetails = await getSiteDetails();
// console.log(siteDetails, "siteDetails");

const traffic = await getMonthlyVisits();
const getLast30Days = await getLast30DaysAnalytics();

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
    </div>
  );
}
