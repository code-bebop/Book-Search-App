import React from 'react';
import { Link } from 'react-router-dom';
import styled  from 'styled-components';

const PostBlock = styled.div`
    background-color: #0F0F10;
    color: #fff;
    height: 100vh;
    padding: 135px 73px 0 73px; 
`;

const PostContent = styled.div`
    padding-bottom: 170px;
    margin-bottom: 100px;
    border-bottom: 1px solid #FFF;
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

const PostButtons = styled.div`
    display: flex;
    justify-content: space-between;
    & > {
        .LinkContainer {
            width: 300px;
            height: 130px;
            background-color: #080838;
            border-radius: 20px;
            &--right {
                text-align: right;
                justify-content: flex-end;
            }
            &--left {
                justify-content: flex-start;
            }
            & > a {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 100%;
                height: 100%;
                padding: 0 35px;               
            }
            .Link_des {
                font-size: 18px;
            }
            .Link_title {
                font-size: 22px;
                margin-top: 15px;
            }
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
    nextPost: {
        _id: string,
        title: string
    },
    prevPost: {
        _id: string,
        title: string
    }
}


const Post = ({ post, nextPost, prevPost }: PostProps) => {
    let { publishedDate, title, body } = post;
    console.log(prevPost, nextPost);
    
    publishedDate = publishedDate.substring(0, publishedDate.indexOf("T"));
    body = body.replace(/<p>/gi, "").replace(/<\/p>/gi, "");
    return (
        <PostBlock>
            <PostContent>
                <h1 className="PostBlock_title">{title}</h1>
                <p className="PostBlock_date">{publishedDate}</p>
                <p className="PostBlock_body">{body}</p>
            </PostContent>
            <PostButtons>
                <div className="LinkContainer LinkContainer--left">
                    <Link to={`/Post/${nextPost._id}`}>
                        <span className="Link_des">다음 포스트</span>
                        <h3 className="Link_title">{nextPost.title}</h3>
                    </Link>
                </div>
                <div className="LinkContainer LinkContainer--right">
                    <Link to={`/Post/${prevPost._id}`}>
                        <span className="Link_des">이전 포스트</span>
                        <h3 className="Link_title">{prevPost.title}</h3>
                    </Link>
                </div>
            </PostButtons>
        </PostBlock>
    )
}

export default Post;