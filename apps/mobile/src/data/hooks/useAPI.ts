import { useCallback } from "react";

const baseURL = process.env.API_URL;

export default function useAPI() {
  const httpGet = useCallback(async function (path: string) {
    const uri = path.startsWith("/") ? path : `/${path}`;
    const fullUrl = `${baseURL}${uri}`;
    const response = await fetch(fullUrl);
    return getData(response);
  }, []);

  const httpPost = useCallback(async function (path: string, body: any) {
    const uri = path.startsWith("/") ? path : `/${path}`;
    const fullUrl = `${baseURL}${uri}`;

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return getData(response);
  }, []);

  async function getData(response: Response) {
    let content = "";
    try {
      content = await response.text();
      return JSON.parse(content);
    } catch (e) {
      return content;
    }
  }

  return { httpGet, httpPost };
}
