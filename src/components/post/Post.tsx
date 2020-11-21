import React from 'react';
import { Link } from 'react-router-dom';
import styled  from 'styled-components';

const PostBlock = styled.div`
    background-color: #0F0F10;
    color: #fff;
    height: 100vh;
    padding: 135px 73px 0 73px; 
    & > {
        .PostBlock_title {
            font-size: 48px;
            font-weight: bold;
        }
        .PostBlock_date {
            font-size: 14px;
            margin: 40px 0 64px;
        }
        .PostBlock_body {
            font-size: 18px;
        }
    }
`;

export interface PostProps {
    post: {
        _id: string,
        publishedDate: string,
        title: string,
        body: string
    },
    nextPostId: string,
    prevPostId: string
}


const Post = ({ post, nextPostId, prevPostId }: PostProps) => {
    let { publishedDate, title, body } = post;
    
    publishedDate = publishedDate.substring(0, publishedDate.indexOf("T"));
    body = body.replace(/<p>/gi, "").replace(/<\/p>/gi, "");
    return (
        <PostBlock>
            <h2 className="PostBlock_title">{title}</h2>
            <p className="PostBlock_date">{publishedDate}</p>
            <p className="PostBlock_body">{body}</p>
            <Link to={`/Post/${nextPostId}`}>다음 포스트</Link>
            <Link to={`/Post/${prevPostId}`}>이전 포스트</Link>
        </PostBlock>
    )
}

export default Post;