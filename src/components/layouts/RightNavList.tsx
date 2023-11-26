"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}
export const RightNavList: React.FC<{
  links: Array<NavLink>;
}> = ({ links }) => {
  console.log("LENGHTS ", links.length);
  const subtractBy = links.length / 2 === 0 ? 0 : 2;
  return (
    <NavigationMenu className="z-50">
      <NavigationMenuList>
        {links &&
          links.map((link, index) => {
            if (links.length / 2 <= index) {
              return (
                <NavigationMenuItem key={index + 1}>
                  <Link
                    href={link.url}
                    target={link.newTab ? "_blank" : "_self"}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {link.text}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            }
          })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
