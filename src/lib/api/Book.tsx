import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export type getBookListP = {
  query: string,
  display: number
}



export const getBookList = async ({ query, display }: getBookListP) =>
  await axios.get(`/v1/search/book.json?query=${query}&display=${display}`, {
    headers: {
      "X-Naver-Client-Id": "VWn8d_Kescc7tCMaYjkx",
      "X-Naver-Client-Secret": process.env.REACT_APP_API_SECRET,
    },
  }); 
  