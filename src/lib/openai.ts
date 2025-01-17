"use server";

import { processStats } from "@/components/reports/Traffic/GeneralStats";
import OpenAI from "openai";
const openai = new OpenAI();

export const createSummary = async (siteDetails, stats, formAnalytics) => {
  console.log("Creating summary...");
  const summary = {
    businessInfo: siteDetails.site_business_info,
    siteSeo: siteDetails.site_seo,
  };
  const processedStats = processStats(stats);
  //   console.log(data, "OPEN AI DATA ********");

  const data = {
    processedStats,
    summary,
    formAnalytics,
  };
  const dataString = JSON.stringify(data, null, 2);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "developer",
        content: `
          You are a helpful analytics assistant who summarizes web traffic data, 
          last 30 days of site usage, forms data, form analytics, and devices details.
          Return a short summary focusing on key metrics, trends, and insights.
        `,
      },
      {
        role: "user",
        content: `
          Here is the data (in JSON format):
          ${dataString}

          Please provide a concise summary of the most important points and trends.
        `,
      },
    ],
  });

  console.log(
    completion.choices[0].message.content,
    "OPEN AI RESPONSE ********"
  );

  return completion.choices[0].message.content;
};
