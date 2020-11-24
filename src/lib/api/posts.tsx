import axios from "axios";

export type getPostsP = {
    pageNumber: string
}

export const getPosts = async ({ pageNumber }) => (
    await axios.get(`/api/posts?page=${pageNumber}`)
);

export type getPostP = {
    id: string
}

export const getPost = async ({ id }) => (
    await axios.get(`/api/posts/${id}`)
)

export type writePostP = {
    title: string,
    body: string
}

export const writePost = async ({ title, body }: writePostP) => (
    await axios.post("/api/posts", { title, body })
)