"use server";
import { endpoints } from "@/api/endpoints";
import axios from "axios";
import { SiteDetails, SiteDetailsSchema } from "./schemas";
import { MonthlyVisitsSchema } from "@/types/siteDetails";
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
    console.log(res.data, "Raw API response");

    // Validate the response
    const validatedData = MonthlyVisitsSchema.parse(res.data);
    console.log(validatedData, "Validated Monthly Visits Data");

    return validatedData;
  } catch (error) {
    console.error("Error fetching or validating monthly visits data:", error);
    throw new Error("Failed to fetch monthly visits data");
  }
};

export const getLast30DaysAnalytics = async () => {
  console.log("Fetching last 30 days analytics data");

  const url = `${baseUrl}${endpoints.analytics.pathname}${siteId}`;
  console.log(url, "***** URL *****");

  const params: Record<string, string> = {
    dateGranularity: "MONTHS", // Monthly granularity
  };

  console.log(url, params, "***** Params *****");

  try {
    const res = await axios.get(url, { params });
    console.log(res.data, "Raw API response");

    // Validate the response
    const validatedData = MonthlyVisitsSchema.parse(res.data);
    console.log(validatedData, "Validated Analytics Data for Last Month");

    return validatedData;
  } catch (error) {
    console.error(
      "Error fetching or validating last 30 days analytics data:",
      error
    );
    throw new Error("Failed to fetch last 30 days analytics data");
  }
};
