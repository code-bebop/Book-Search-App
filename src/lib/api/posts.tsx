import axios from "axios";

export const getPost = async () => (
    await axios.get("/api/posts")
);

export type writePostArg = {
    title: string,
    body: string
}

export const writePost = async ({ title, body }: writePostArg) => (
    await axios.post("/api/posts", { title, body })
)