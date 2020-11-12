import React from 'react';
import styled  from 'styled-components';

export interface PostProps {
    post: {
        _id: string,
        publishedDate: Date,
        title: string,
        body: string
    }
}


const Post = ({ post }: PostProps) => {
    const { publishedDate, title, body } = post;
    console.log(post);
    return (
        <ul>
            <li>{publishedDate}</li>
            <li>{title}</li>
            <li>{body}</li>
        </ul>
    )
}

export default Post;