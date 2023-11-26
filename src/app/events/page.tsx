"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "@/lib/fetch-api";

import Loader from "@/components/layouts/Loader";
import Blog from "@/components/layouts/blog-list";
import PageHeader from "@/components/layouts/PageHeader";
import Image from "next/image";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function Profile() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/events`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          cover: { fields: ["url"] },
          authorsBio: {
            populate: "*",
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      if (start === 0) {
        setData(responseData.data);
      } else {
        setData((prevData: any[]) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="relative overflow-hidden h-[60vh] mb-20">
        <Image
          src="/thumb.jpg"
          width={1280}
          height={720}
          className="w-screen bg-fixed"
          alt="thubnmail of video"
        />
        <div className="absolute top-0 left-0 z-10 flex flex-col px-[25%] text-center justify-end items-center bg-black/70 w-full h-full bg-blend-overlay pb-20 text-white">
          <h1 className="text-5xl tracking-wide font-extrabold leading-[60px]">
            Catch Up With Latest Event
          </h1>
          <p className="text-lg text-gray-300 my-5">
            Explore the latest school events and activities! Dive into a world of exciting
            happenings within our educational community. From sports competitions and cultural
            festivals to workshops and special guest speakers, our school&apos;s dynamic events
            offer something for everyone. Stay up-to-date and get involved in the latest school
            activities.
          </p>
        </div>
      </div>
      <Blog data={data} type={"events"}>
        {meta!.pagination.start + meta!.pagination.limit < meta!.pagination.total && (
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-lg hover:underline dark:bg-gray-900 dark:text-gray-400"
              onClick={loadMorePosts}
            >
              Load more posts...
            </button>
          </div>
        )}
      </Blog>
    </div>
  );
}
