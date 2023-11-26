import Landing from "@/components/layouts/Landing";
import RecentNews from "@/components/layouts/RecentNews";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getPageBySlug } from "@/strapi/getPageBySlug";
import moment from "moment";
import Image from "next/image";

export default async function Home() {
  const page = await getPageBySlug("home");
  const contentSections = page.data[0].attributes.contentSections;

  return (
    <div>
      <Landing content={contentSections[0]} />
      <div className="w-[75%] mx-auto py-20  border-b border-accent space-y-10">
        <h1 className="text-3xl font-extrabold text-primary">Latest News From School</h1>
        <RecentNews />
      </div>
      <div className="w-[75%] flex mx-auto mt-20  border-b gap-10">
        <div className="w-[60%] space-y-5">
          <h1 className="text-3xl font-extrabold text-primary">A Message From Principal</h1>
          <p className="text-lg leading-8 text-justify text-gray-700">
            Welcome <br />
            It is a great pleasure that I introduce myself, Birendra Khadka, as the new principal of
            Gandaki Boarding School popularly known as GBS all across Nepal. Gandaki Boarding
            School, is situated at Lamachaur, Pokhara. This school has passed a long way since its
            establishment back in 1966. GBS, the only regional school in the nation was established
            By Ministry of Education (MoU), Nepal with the support and management of United Mission
            to Nepal (UMN) and local people. It has been functioning as a not-for-profit educational
            institution and has been registered under Public Education Trust. GBS is an autonomous
            institution. We are delighted that we celebrated the school&apos;s golden jubilee year
            in 2072 BS with a variety of programmes round the year. We have always been driven by
            the mission to be an international centre of academic excellence with the motto -
            Knowledge, Character and Service. Today the school has been able to establish itself as
            one of the finest institutions in the country for the dynamic and holistic learning
            opportunities it offers. My passion for education and the success of all students has
            been shaped over my years serving as a teacher, school principal and Campus Chief. In
            each role, I have sought to ensure the success of each..
          </p>
          <div className="bg-secondary h-[100px] w-fit gap-5 overflow-hidden flex border rounded-lg items-center">
            <Image
              className="w-[100px] bg-secondary"
              src="/principal.png"
              width={206}
              height={206}
              alt="Principal"
            />
            <div className="space-y-1 py-5 pr-32">
              <p className="text-xl font-semibold">Narayan Paudel</p>
              <p className="font-bold text-gray-500">Princiapl, SMSS</p>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Up Comming Events</h4>
          <div className="flex flex-col gap-10">
            <div className="flex gap-5 overflow-hidden h-[150px] bg-card overflow-y-hidden w-[600px]">
              <Image
                src="/no-image.jpg"
                width={150}
                height={100}
                className="object-cover"
                alt="no image"
              />
              <div className="py-3">
                <h4 className="text-lg font-semibold text-gray-800">
                  सुचिकृत हुन् आउने सम्बन्धी सूचना
                </h4>
                <p className="text-gray-600">{moment(new Date("2023/08/26")).fromNow()}</p>
                <p className="mt-2 overflow-ellipsis">
                  सुचिकृत आगमनका सम्बन्धमा सूचना: कृपया यह जानकारी ध्यान में रखें कि आपका सुचिकृत
                  आगमन निश्चित समय में होगा। अधिक जानकारी प्राप्त करने के लिए आधिकारिक स्रोतों का
                  पालन करें।
                </p>
              </div>
            </div>
            <div className="flex gap-5 overflow-hidden w-[600px] h-[150px] bg-card overflow-y-hidden">
              <Image
                src="/no-image.jpg"
                width={150}
                className="object-cover"
                height={100}
                alt="no image "
              />
              <div className="py-3">
                <h4 className="text-lg font-semibold text-gray-800">
                  सुचिकृत हुन् आउने सम्बन्धी सूचना
                </h4>
                <p className="text-gray-600">{moment(new Date("2023/08/26")).fromNow()}</p>
                <p className="mt-2 overflow-ellipsis">
                  सुचिकृत आगमनका सम्बन्धमा सूचना: कृपया यह जानकारी ध्यान में रखें कि आपका सुचिकृत
                  आगमन निश्चित समय में होगा। अधिक जानकारी प्राप्त करने के लिए आधिकारिक स्रोतों का
                  पालन करें।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
