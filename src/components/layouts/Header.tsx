"use client";
import Image from "next/image";

import React, { FC } from "react";
import { LeftNavList } from "./LeftNavList";
import { RightNavList } from "./RightNavList";
import { LucideMail, LucideMapPin, LucidePhone } from "lucide-react";
import Link from "next/link";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

const Header: FC<{
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
}> = ({ links, logoUrl, logoText }) => {
  const [scrolled, setScrolled] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, []);

  return (
    <div className="w-screen z-20 fixed top-0 left-0 text-white">
      <div
        className={`${
          scrolled ? "hidden" : "flex"
        } justify-end items-center h-12 text-gray-200 px-20 gap-8`}
      >
        <div className="flex items-center gap-2">
          <LucidePhone size={20} />
          <p>065-412186</p>
        </div>
        <div className="flex items-center gap-2">
          <LucideMail size={20} />
          <p>saraswotinamuna@gmail.com</p>
        </div>

        <div className="flex items-center gap-2">
          <LucideMapPin size={20} />
          Khairenitar, Tanahun, Nepal
        </div>
      </div>
      <header
        className={`h-32 flex items-center justify-center px-32 ${
          scrolled ? "bg-background text-black" : "bg-transparent"
        }`}
      >
        <LeftNavList links={links} />

        {logoUrl && (
          <Link href={"/"}>
            <Image
              className={`mx-20 ${scrolled ? "w-[100px]" : "w-[128px]"}`}
              src={logoUrl}
              alt="school logo"
              width={128}
              height={128}
            />
          </Link>
        )}
        <RightNavList links={links} />
      </header>
    </div>
  );
};

export default Header;
