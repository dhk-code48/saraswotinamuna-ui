import Image from "next/image";
import React, { FC } from "react";
import Helpers from "./Helpers";
import { Button, buttonVariants } from "../ui/button";
import { getStrapiMedia } from "@/lib/api-helpers";
import Link from "next/link";

const Landing: FC<{
  content: {
    buttons: { url: string; type: string; text: string }[];
    description: string;
    title: string;
    picture: { data: { attributes: { url: string } } };
  };
}> = ({ content }) => {
  const picture: string | null = getStrapiMedia(content.picture.data.attributes.url);

  return (
    <div className="relative overflow-hidden h-screen">
      {picture && (
        <video autoPlay muted controls className="w-screen bg-fixed">
          <source src={picture} type="video/mp4" />
        </video>
      )}
      <div className="absolute top-0 left-0 z-10 flex justify-center items-center bg-black/70 w-full h-screen bg-blend-overlay pb-[112px] text-white">
        <div className="w-[40%] mx-auto text-center">
          <h1
            className="text-5xl tracking-wide font-extrabold leading-[60px]"
            dangerouslySetInnerHTML={{ __html: content.title }}
          ></h1>
          <p className="text-lg text-gray-200 my-5">{content.description}</p>
          <div className="flex gap-4 justify-center">
            {content.buttons.map((button, index) => {
              return (
                <Link
                  key={index}
                  href={button.url}
                  className={buttonVariants({
                    className: `bg-${button.type} text-${button.type}-foreground`,
                  })}
                >
                  {button.text}
                </Link>
              );
            })}
          </div>
        </div>
        <Helpers />
      </div>
    </div>
  );
};

export default Landing;
