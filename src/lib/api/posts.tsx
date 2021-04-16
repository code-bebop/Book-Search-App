import axios from 'axios';
import { bookDataType } from '../../modules/bookData';

export type getPostsP = {
  pageNumber: string;
};

export const getPosts = async ({ pageNumber }) =>
  await axios.get(`https://codebebop.tk/api/posts?page=${pageNumber}`);

export type getPostP = {
  id: string;
};

export const getPost = async ({ id }) =>
  await axios.get(`https://codebebop.tk/api/posts/${id}`);

export type writePostP = {
  title: string;
  body: string;
  bookInfo: bookDataType;
};

export const writePost = async ({ title, body, bookInfo }: writePostP) =>
  await axios.post('/api/posts', { title, body, bookInfo });
