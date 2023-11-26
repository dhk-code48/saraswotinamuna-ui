import Image from "next/image";
import React, { FC } from "react";

import Loader from "./Loader";
import fetchHelpers from "@/strapi/getHelpers";
import { helpersData } from "@/lib/types/helpersData";
import HelpersSlider from "./HelpersSlider";

const Helpers: FC = async () => {
  const helperData: helpersData | null = await fetchHelpers();

  return (
    <div className="absolute z-20 bottom-0 text-gray-300 p-3 w-screen left-0 p-5rounded overflow-hidden">
      <h1 className="font-bold text-xl mb-5">अक्षयकोष तथा चन्दादाताः</h1>

      <HelpersSlider helpersData={helperData} />
    </div>
  );
};

export default Helpers;
