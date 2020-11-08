import axios from "axios";

export const getPost = async () => (
    await axios.get("http://localhost:4000/post")
);