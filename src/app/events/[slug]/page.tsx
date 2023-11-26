// import Post from "@/app/[lang]/views/post";
import Post from "@/components/layouts/Post";
import { fetchAPI } from "@/lib/fetch-api";
import type { Metadata } from "next";

async function getPostBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/events`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      cover: { fields: ["url"] },
      authorsBio: { populate: "*" },
      blocks: { populate: "*" },
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/events`;
  const urlParamsObject = {
    filters: { slug },
    populate: { seo: { populate: "*" } },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const meta = await getMetaData(params.slug);
  const metadata = meta[0].attributes.seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export default async function PostRoute({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const data = await getPostBySlug(slug);
  if (data.data.length === 0) return <h2>no post found</h2>;
  return <Post data={data.data[0]} />;
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/events`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const articleResponse = await fetchAPI(path, {}, options);
  console.log("articleResponse", articleResponse);

  return articleResponse.data.map(
    (article: {
      attributes: {
        slug: string;
      };
    }) => ({ slug: article.attributes.slug })
  );
}
