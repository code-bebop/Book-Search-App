import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PostListBlock = styled.div`
    color: #fff;
    background-color: #0F0F10;
    height: 100vh;
    padding: 107px 95px 0 95px;
    & > .board {
        display: flex;
        height: 90px;
        border-top: 1px solid #DDD;
        & > li {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-basis: 0px;
            font-size: 18px;
        }
        & > .board_title {
            flex-grow: 7;
            &--bold {
                font-weight: bold;
            }
            & > a {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
            }
        }
        & > .board_date {
            flex-grow: 3;
            &--bold {
                font-weight: bold;
            }
        }
    }
`;

type PostListProps = {
    posts: Array<any>
}

const PostList = ({ posts }: PostListProps) => {
    return (
        <PostListBlock>
            <ul className="board">
                <li className="board_title board_title--bold">제목</li>
                <li className="board_date board_date--bold">작성일자</li>
            </ul>
            {posts.map(({ _id, title, publishedDate }, i) => {
                publishedDate = publishedDate.substring(0, publishedDate.indexOf("T"));
                return (
                    <ul key={i} className="board">
                        <li className="board_title">
                            <Link to={`/Post/${_id}`}>{title}</Link>
                        </li>
                        <li className="board_date">
                            {publishedDate}
                        </li>
                    </ul>
                )
            })}
        </PostListBlock>
    )
}

export default PostList;