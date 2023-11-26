import { fetchAPI } from "@/lib/fetch-api";
import { helpersData } from "@/lib/types/helpersData";

async function fetchHelpers(): Promise<helpersData | null> {
  try {
    const token: string | undefined = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path: string = `/helpers`;
    const urlParamsObject: Record<string, any> = {
      sort: { createdAt: "desc" },
    };
    const options: RequestInit = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const responseData: helpersData = await fetchAPI(
      path,
      urlParamsObject,
      options
    );
    return responseData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default fetchHelpers;
