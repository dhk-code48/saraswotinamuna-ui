import Banner from "@/components/layouts/Banner";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Landing from "@/components/layouts/Landing";
import { getStrapiMedia, getStrapiURL } from "@/lib/api-helpers";
import { FALLBACK_SEO } from "@/lib/constants";
import { fetchAPI } from "@/lib/fetch-api";
import "@/lib/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
    ],
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const meta = await getGlobal(params.lang);

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const global = await getGlobal("en");
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;

  const { notificationBanner, navbar, footer } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url
  );

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data.attributes.url
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header
          links={navbar.links}
          logoUrl={navbarLogoUrl}
          logoText={navbar.navbarLogo.logoText}
        />
        <main className="min-h-scereen">{children}</main>
        <Banner data={notificationBanner} />

        <Footer
          logoUrl={footerLogoUrl}
          logoText={footer.footerLogo.logoText}
          menuLinks={footer.menuLinks}
          categoryLinks={footer.categories.data}
          legalLinks={footer.legalLinks}
          socialLinks={footer.socialLinks}
        />
      </body>
    </html>
  );
}
