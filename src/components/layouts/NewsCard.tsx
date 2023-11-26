import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import moment from "moment";
import { Button, buttonVariants } from "../ui/button";
import { getStrapiMedia } from "@/lib/api-helpers";
import Link from "next/link";

const NewsCard: FC<{
  news: {
    title: string;
    slug: string;
    description: string;
    createdAt: string;
    cover: { data: { attributes: { url: string } } };
  };
}> = ({ news }) => {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>{news.title}</CardTitle>
        <CardDescription>
          {moment(new Date(news.createdAt)).fromNow()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={
            getStrapiMedia(news.cover.data.attributes.url) || "/no-image.jpg"
          }
          width={650}
          height={910}
          alt="news"
          className="h-[200px] object-cover"
        />
        <p className="text-gray-800 mt-3">{news.description}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link className={buttonVariants()} href={"/news/" + news.slug}>
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
