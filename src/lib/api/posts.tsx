import axios from "axios";

export const getPost = async () => (
    await axios.get("/api/posts")
);

export type writePostP = {
    title: string,
    body: string
}

export const writePost = async ({ title, body }: writePostP) => (
    await axios.post("/api/posts", { title, body })
)