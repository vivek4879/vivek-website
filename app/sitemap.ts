import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getLabDetailSlugs } from "@/lib/lab";

const SITE_URL = "https://vivek-website-five.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/lab`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00`),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const labRoutes: MetadataRoute.Sitemap = Array.from(getLabDetailSlugs()).map(
    (id) => ({
      url: `${SITE_URL}/lab/${id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }),
  );

  return [...staticRoutes, ...postRoutes, ...labRoutes];
}
