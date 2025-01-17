import React from "react";
import { ReportPageWrapper } from "./report-page-wrapper";
import { SiteDetails } from "@/lib/schemas";
import Image from "next/image";

export default function Overview({ summary }: { summary: SiteDetails }) {
  return (
    <ReportPageWrapper title="Overview" subtitle={`${summary.site_seo.title}`}>
      <div className="rounded-lg px-8 py-6 shadow-md border flex flex-col gap-5">
        <h1 className="font-bold font-title text-2xl @3xl/dashboard:text-4xl">
          Business Overview of {summary.site_business_info.business_name}
        </h1>
        <h2>{summary.site_seo.description}</h2>
        <p className="text-sm">
          <strong>Domain:</strong> {summary.site_domain}
        </p>
        <p className="text-sm">
          <strong>Google Analytics ID:</strong> {summary.google_tracking_id}
        </p>
        <p className="text-sm">
          <strong>Business Contact:</strong>{" "}
          {summary.site_business_info.phone_number},{" "}
          {summary.site_business_info.email}
        </p>
        <p className="text-sm">
          <strong>Published Status:</strong> {summary.publish_status} since{" "}
          {new Date(summary.first_published_date).toLocaleDateString()}
        </p>
        <Image
          src={summary.site_seo.og_image}
          alt="Site Preview"
          className="rounded shadow"
          width={250}
          height={250}
        />
      </div>
    </ReportPageWrapper>
  );
}
