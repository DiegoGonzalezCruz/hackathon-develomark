import { z } from "zod";

export const SiteDetailsSchema = z.object({
  account_name: z.string(),
  site_domain: z.string(),
  google_tracking_id: z.string(),
  googletagmanager_container_id: z.array(z.string()),
  site_seo: z.object({
    og_image: z.string(),
    title: z.string(),
    description: z.string(),
    no_index: z.boolean(),
  }),
  schemas: z.object({
    local_business: z.object({
      enabled: z.boolean(),
      status: z.nullable(z.string()),
      missing_required_fields: z.nullable(z.string()),
      missing_recommended_fields: z.nullable(z.string()),
    }),
  }),
  editor: z.string(),
  site_business_info: z.object({
    business_name: z.string(),
    phone_number: z.string(),
    email: z.string(),
    opentable_info: z.array(z.unknown()),
  }),
  site_name: z.string(),
  template_id: z.number(),
  site_default_domain: z.string(),
  preview_site_url: z.string(),
  edit_site_url: z.string(),
  overview_site_url: z.string(),
  last_published_date: z.string(),
  first_published_date: z.string(),
  force_https: z.boolean(),
  lang: z.string(),
  fav_icon: z.string(),
  modification_date: z.string(),
  creation_date: z.string(),
  publish_status: z.string(),
  thumbnail_url: z.string(),
  store_status: z.string(),
  store_type: z.string(),
  cookie_notification: z.object({ enabled: z.boolean() }),
  canonical_url: z.string(),
  labels: z.array(z.object({ name: z.string() })),
});

export type SiteDetails = z.infer<typeof SiteDetailsSchema>;
