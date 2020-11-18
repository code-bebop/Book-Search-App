import axios from "axios";

declare const NAVER_API_SECRET: String;


export type getBookListP = {
  query: string,
  display: number
}

export const getBookList = async ({ query, display }: getBookListP) =>
  await axios.get(`/v1/search/book.json?query=${query}&display=${display}`, {
    headers: {
      "X-Naver-Client-Id": "VWn8d_Kescc7tCMaYjkx",
      "X-Naver-Client-Secret": NAVER_API_SECRET,
    },
  });
  