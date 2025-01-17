import { z } from "zod";

// Define the schema for business info
export const BusinessInfoSchema = z.object({
  business_name: z.string(),
  phone_number: z.string(),
  email: z.string(),
  opentable_info: z.array(z.unknown()), // Adjust type as necessary
});

// Define the schema for site SEO
export const SiteSeoSchema = z.object({
  og_image: z.string(),
  title: z.string(),
  description: z.string(),
  no_index: z.boolean(),
});

// Schema for a single visit record
const VisitRecordSchema = z.object({
  VISITORS: z.number(),
  VISITS: z.number(),
  PAGE_VIEWS: z.number(),
});

export const MonthlyVisitsSchema = z.record(
  z.string(),
  z.array(VisitRecordSchema)
);

interface FormMessage {
  [key: string]: string; // Dynamic form fields
}

export interface OverallTrafficProps {
  traffic: Traffic;
  getLast30Days: MonthlyVisits;
}

export interface Form {
  form_title: string;
  message: FormMessage;
  date: string;
  utm_campaign: string;
}
export type FormAnalyticsData = {
  month: string;
  CLICK_TO_CALLS?: number;
  CLICK_TO_EMAILS?: number;
  FORM_SUBMITS?: number;
  CLICK_TO_MAPS?: number;
}[];

export interface ActivityRecord {
  CLICK_TO_CALLS?: number;
  CLICK_TO_EMAILS?: number;
  FORM_SUBMITS?: number;
  CLICK_TO_MAPS?: number;
}

export type FormsData = Form[];

// Schema for the overall traffic data
export const TrafficSchema = z.record(z.string(), z.array(VisitRecordSchema));

// Infer the type from the schema
export type Traffic = z.infer<typeof TrafficSchema>;
export type BusinessInfo = z.infer<typeof BusinessInfoSchema>;
export type SiteSeo = z.infer<typeof SiteSeoSchema>;
export type MonthlyVisits = z.infer<typeof MonthlyVisitsSchema>;
