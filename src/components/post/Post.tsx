import React from 'react';
import { Link } from 'react-router-dom';
import styled  from 'styled-components';

import { bookDataType } from '../../modules/bookData';

const PostBlock = styled.div`
    background-color: #0F0F10;
    color: #fff;
    height: auto;
    padding: 135px 73px 80px 73px; 
`;

const PostContent = styled.div`
    margin-bottom: 120px;
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

const PostBookInfo = styled.div`
    display: flex;
    padding: 80px 45px;
    border-top: 1px solid #FFF;
    & > {
        img {
            width: 150px;
            height: 200px;
        }
        dl {
            margin-left: 50px;
            & > {
                dt {
                    font-size: 24px;
                }
                dd {
                    font-size: 18px;
                    margin-top: 34px;
                }
            }
        }
    }
`;

const PostButtons = styled.div`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #FFF;
    padding-top: 100px;
    & > {
        .LinkContainer {
            width: 300px;
            height: 130px;
            background-color: #080838;
            border-radius: 20px;
            &--right {
                text-align: right;
                justify-content: flex-end;
                margin-left: auto;
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
                user-select: none;
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
        body: string,
        bookInfo: bookDataType
    },
    nextPost: {
        _id: string,
        title: string
    },
    prevPost: {
        _id: string,
        title: string
    },
    bookData: bookDataType
}


const Post = ({ post, nextPost, prevPost }: PostProps) => {
    let { title: postTitle, body, publishedDate, bookInfo } = post;
    let { title: bookTitle, author, publisher, price } = bookInfo;
    console.log(prevPost, nextPost);
    
    publishedDate = publishedDate.substring(0, publishedDate.indexOf("T"));
    body = body.replace(/<p>/gi, "").replace(/<\/p>/gi, "");
    bookTitle = bookTitle.replace(/<b>/gi, "").replace(/<\/b>/gi, "");
    author = author.replace(/<b>/gi, "").replace(/<\/b>/gi, "");

    return (
        <PostBlock>
            <PostContent>
                <h1 className="PostBlock_title">{postTitle}</h1>
                <p className="PostBlock_date">{publishedDate}</p>
                <p className="PostBlock_body">{body}</p>
            </PostContent>
            <PostBookInfo>
                <div style={{backgroundColor: '#DDD', width: '150px', height: '200px'}}></div>
                <dl>
                    <dt>{bookTitle}</dt>
                    <dd>{author} | {publisher}</dd>
                    <dd>{price}</dd>
                </dl>
            </PostBookInfo>
            <PostButtons>
                { nextPost ? <div className="LinkContainer LinkContainer--left">
                    <Link to={`/Post/${nextPost._id}`}>
                        <span className="Link_des">다음 포스트</span>
                        <h3 className="Link_title">{nextPost.title}</h3>
                    </Link>
                </div> : <></> }
                { prevPost ? <div className="LinkContainer LinkContainer--right">
                    <Link to={`/Post/${prevPost._id}`}>
                        <span className="Link_des">이전 포스트</span>
                        <h3 className="Link_title">{prevPost.title}</h3>
                    </Link>
                </div> : <></> }
            </PostButtons>
        </PostBlock>
    )
}

export default Post;