"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import Loader from "./Loader";
import { fetchAPI } from "@/lib/fetch-api";
import NewsCard from "./NewsCard";

const RecentNews: FC = () => {
  const [data, setData] = useState<
    {
      attributes: {
        title: string;
        description: string;
        slug: string;
        createdAt: string;
        cover: { data: { attributes: { url: string } } };
      };
    }[]
  >([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/articles`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          cover: { fields: ["url"] },
          category: { populate: "*" },
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(0, 3);
  }, [fetchData]);
  useEffect(() => {
    console.log("DATA => ", data);
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-wrap justify-center items-stretch gap-20">
      {data !== null &&
        data.map((news, index) => {
          console.log(news.attributes);
          return <NewsCard news={news.attributes} key={index + 1} />;
        })}
    </div>
  );
};

export default RecentNews;
