"use client";
import { helpersData } from "@/lib/types/helpersData";
import Image from "next/image";
import React, { FC } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TransparentArrow = () => {
  return <></>;
};
const HelpersSlider: FC<{ helpersData: helpersData | null }> = ({
  helpersData,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 10000, // Adjust as needed
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <TransparentArrow />,
    pauseOnHover: true,
    prevArrow: <TransparentArrow />,
  };

  return (
    <Slider {...settings} className="z-50">
      {" "}
      {helpersData && helpersData.data ? (
        helpersData.data.map(({ attributes }, index) => {
          return (
            <div key={index}>
              <div className="flex items-center justify-center gap-4">
                <Image
                  src={attributes.photoURL}
                  alt={`Image ${index + 1}`}
                  width={80}
                  height={80}
                  className="rounded-full w-20 object-cover h-20"
                />

                <div>
                  <h4 className="font-bold text-lg">{attributes.name}</h4>
                  <p>{attributes.amount}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <h1>Loading Data</h1>
          <h1>Loading Data</h1>
        </div>
      )}
    </Slider>
  );
};

export default HelpersSlider;
