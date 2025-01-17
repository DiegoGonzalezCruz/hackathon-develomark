"use server";
import { endpoints } from "@/api/endpoints";
import axios from "axios";
import { SiteDetails, SiteDetailsSchema } from "./schemas";
import {
  ActivityRecord,
  AggregatedData,
  AnalyticsResponse,
  FormAnalyticsData,
  MonthlyVisitsSchema,
} from "@/types/siteDetails";
import { format } from "date-fns";

const baseUrl = process.env.DEVELOMARK_HOST;
const siteId = "c31672ae";
// console.log(baseUrl, "base url");

export const getSiteDetails = async (): Promise<SiteDetails> => {
  // console.log("getting site details");
  // console.log(siteId, "site id");
  const url = `${baseUrl}${endpoints.siteDetails.pathname}${siteId}`;
  // console.log(url, "url");

  const res = await axios.get(url);
  try {
    const siteDetails = SiteDetailsSchema.parse(res.data);
    // console.log(siteDetails, "Validated Site Details");
    return siteDetails;
  } catch (error) {
    console.error("Validation failed:", error);
    throw new Error("Invalid API response");
  }
};

export const getMonthlyVisits = async (
  fromDate: string = "2024-01-01",
  toDate?: string // Make it optional
) => {
  console.log("Fetching monthly visits data");
  const todayDate = toDate || format(new Date(), "yyyy-MM-dd");

  const url = `${baseUrl}${endpoints.analytics.pathname}${siteId}`;
  console.log(url, "***** URL *****");
  const params: Record<string, string> = {
    from: fromDate, // Always include the 'from' date
    to: todayDate,
    dateGranularity: "MONTHS", // Monthly granularity
  };
  console.log(url, params, "***** Params *****");

  // Only add 'to' to params if it is defined
  if (toDate) {
    params.to = toDate;
  }

  try {
    const res = await axios.get(url, { params });
    // console.log(res.data, "Raw API response");

    // Validate the response
    const validatedData = MonthlyVisitsSchema.parse(res.data);
    // console.log(validatedData, "Validated Monthly Visits Data");

    return validatedData;
  } catch (error) {
    console.error("Error fetching or validating monthly visits data:", error);
    throw new Error("Failed to fetch monthly visits data");
  }
};

export const getLast30DaysAnalytics = async () => {
  console.log("Fetching last 30 days analytics data");

  const url = `${baseUrl}${endpoints.analytics.pathname}${siteId}`;
  // console.log(url, "***** URL *****");

  const params: Record<string, string> = {
    dateGranularity: "MONTHS", // Monthly granularity
  };

  // console.log(url, params, "***** Params *****");

  try {
    const res = await axios.get(url, { params });
    // console.log(res.data, "Raw API response");

    // Validate the response
    const validatedData = MonthlyVisitsSchema.parse(res.data);
    // console.log(validatedData, "Validated Analytics Data for Last Month");

    return validatedData;
  } catch (error) {
    console.error(
      "Error fetching or validating last 30 days analytics data:",
      error
    );
    throw new Error("Failed to fetch last 30 days analytics data");
  }
};

export const getFormsData = async () => {
  console.log("Fetching forms data");
  const url = `${baseUrl}${endpoints.formsAnalytics.pathname}${siteId}`;
  // console.log(url, "***** URL *****");

  try {
    const res = await axios.get(url);
    // console.log(res.data, "Raw API response");
    // Limit the data to the first 100 entries
    const limitedData = res.data.slice(0, 50); // TODO: Fix this limiting logic
    // console.log(limitedData, "Limited Forms Data");
    return limitedData;
  } catch (error) {
    console.error("Error fetching or validating FORMS analytics data:", error);
    throw new Error("Failed to fetch forms analytics data");
  }
};

export async function getLastTwoMonthsFormsData(): Promise<FormAnalyticsData> {
  const response = await axios.get(
    "http://192.168.0.141:3000/api/analytics/site/c31672ae?from=2024-11-17&to=2025-01-17&result=activities&dateGranularity=MONTHS"
  );

  const data = response.data as Record<string, ActivityRecord[]>;

  // Transform the data to include all relevant fields
  const transformedData: FormAnalyticsData = Object.entries(data).map(
    ([month, activities]) => {
      // Initialize the accumulator with default values for all fields
      const aggregatedData = activities.reduce<AggregatedData>(
        (acc, activity) => {
          acc.CLICK_TO_CALLS += activity.CLICK_TO_CALLS || 0;
          acc.CLICK_TO_EMAILS += activity.CLICK_TO_EMAILS || 0;
          acc.FORM_SUBMITS += activity.FORM_SUBMITS || 0;
          acc.CLICK_TO_MAPS += activity.CLICK_TO_MAPS || 0;
          return acc;
        },
        {
          CLICK_TO_CALLS: 0,
          CLICK_TO_EMAILS: 0,
          FORM_SUBMITS: 0,
          CLICK_TO_MAPS: 0,
        } // Initial values
      );

      return {
        month,
        CLICK_TO_CALLS: aggregatedData.CLICK_TO_CALLS,
        CLICK_TO_EMAILS: aggregatedData.CLICK_TO_EMAILS,
        FORM_SUBMITS: aggregatedData.FORM_SUBMITS,
        CLICK_TO_MAPS: aggregatedData.CLICK_TO_MAPS,
      };
    }
  );

  return transformedData;
}

export const getDevicesDetails = async () => {
  console.log("Fetching device details analytics data...");

  const url = `http://192.168.0.141:3000/api/analytics/site/c31672ae?from=2024-11-17&to=2025-01-17&dimension=system&result=traffic&dateGranularity=MONTHS`;
  const params: Record<string, string> = {
    from: "2024-01-01", // Start date
    to: "2025-01-01", // End date
    dimension: "os", // Dimension type: system
    dateGranularity: "MONTHS", // Monthly granularity
  };

  try {
    const response = await axios.get<AnalyticsResponse>(url, { params });
    // console.log(response.data, "Raw API response");

    // Transform and structure the response data
    const transformedData = Object.entries(response.data).map(
      ([month, records]) => {
        return {
          month,
          details: records.map((record) => ({
            browser: record.dimension.browser,
            os: record.dimension.os,
            visitors: record.data.VISITORS,
            visits: record.data.VISITS,
            pageViews: record.data.PAGE_VIEWS,
          })),
        };
      }
    );

    // console.log(transformedData, "Transformed Device Details");
    return transformedData;
  } catch (error) {
    console.error(
      "Error fetching or processing device details analytics data:",
      error
    );
    throw new Error("Failed to fetch device details analytics data");
  }
};
