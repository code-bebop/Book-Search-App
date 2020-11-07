import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';

import { ResponsiveBlock } from './common/Responsive';

const BookInfoList = styled.ul`
    position: absolute;
    top: 50px;
    right: 50px;
    width: 262px;
    background-color: #0F0F10;
    color: #fff;
    font-family: "DungGeunMo";
    padding: 10px;
    & > li {
        &:nth-child(n+2) {
            margin-top: 5px;
        }
    }
`;

const BookWriteResponsiveBlock = styled(ResponsiveBlock)`
    background-color: #0F0F10;
    color: #fff;
    padding: 0 73px;
`;

const TitleInput = styled.input`
    height: 240px;
    width: 100%;
    outline: none;
    margin-bottom: 70px;
    padding-left: 15px;
    border: none;
    border-bottom: 1px dashed #FFFFFF;
    background-color: #0F0F10;
    color: #fff;
    font-size: 48px;
    font-weight: 700;
`;

const QuillWrapper = styled.div`
    font-family: "DungGeunMo";
    & > .ql-container {
        background-color: inherit;
        color: inherit;
        font-family: inherit;
        font-size: 18px;
        /* 글쓰기 내용 크기 조정 */
        & > .ql-editor {
            height: 969px;
            &::before {
                color: #757575;
            }
        }
    }
`;

type BookWriteProp = {
    post: {
        title: string,
        image: string,
        price: string,
        author: string,
        pubdate: string
    }
}

const BookWrite = ({ post }: BookWriteProp) => {
    let { title, price, author, pubdate } = post;
    title = title.replace(/<b>/gi, "").replace(/<\/b>/gi, "");
    author = author.replace(/<b>/gi, "").replace(/<\/b>/gi, "");

    const quillElement = useRef<HTMLDivElement>(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        if (quillElement.current) {
            quillInstance.current = new Quill(quillElement.current, {
                theme: "bubble",
                placeholder: "[ 여기에 내용 입력 ]",
                modules: {
                    toolbar: [
                      [{ header: '1' }, { header: '2' }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['blockquote', 'code-block', 'link', 'image'],
                    ],
                  },
            });
        }
    }, []);

    return (
        <BookWriteResponsiveBlock>
            <BookInfoList>
                <li>제목: {title}</li>
                <li>가격: {price}원</li>
                <li>저자: {author}</li>
                <li>발행일: {pubdate}</li>
            </BookInfoList>
            <TitleInput placeholder="[ 여기에 제목 입력 ]" />
            <QuillWrapper>
                <div ref={quillElement}></div>
            </QuillWrapper>
        </BookWriteResponsiveBlock>
    );
}

export default BookWrite;