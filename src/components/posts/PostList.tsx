import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PostListBlock = styled.ul`
    color: #fff;
`;

type PostListProps = {
    posts: Array<any>
}

const PostList = ({ posts }: PostListProps) => {
    return (
        <PostListBlock>
            {posts.map((post, i) => {
                return (
                    <li key={i}>
                        <Link to={`/post/${post._id}`}>{post.title}</Link>
                    </li>
                )
            })}
        </PostListBlock>
    )
}

export default PostList;