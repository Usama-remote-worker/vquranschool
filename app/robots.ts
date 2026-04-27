import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/api/", "/classroom/", "/admin-portal/"],
    },
    sitemap: "https://vquranschool.com/sitemap.xml",
  };
}
