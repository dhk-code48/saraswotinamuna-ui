import { fetchAPI } from "@/lib/fetch-api";

async function getPostBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      cover: { fields: ["url"] },
      authorsBio: { populate: "*" },
      category: { fields: ["name"] },
      blocks: { populate: "*" },
    },
  };
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}
