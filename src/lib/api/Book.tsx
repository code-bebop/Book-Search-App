import axios from 'axios';

declare const NAVER_API_SECRET: String;

export type getBookListP = {
  query: string;
  display: number;
};

export const getBookList = async ({ query, display }: getBookListP) =>
  await axios.get(
    `https://codebebop.tk/api/book?query=${query}&display=${display}`
  );
