import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import { bookDataType } from '../../modules/bookData';

import { ResponsiveBlock } from '../common/Responsive';

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
        border-bottom: 1px dashed #FFFFFF;
        /* 본문 작성 Box의 크기 조정 */
        & > .ql-editor {
            height: 969px;
            &::before {
                color: #757575;
            }
        }
    }
`;

const BookWriteButtons = styled.div`
    padding: 80px 0;
    display: flex;
    justify-content: flex-end;
    & > button {
        width: 125px;
        height: 50px;
        background-color: #2424B2;
        font-size: 24px;
        color: #FFF;
        outline: none;
        border: none;
        cursor: pointer;
        &:nth-child(n+2) {
            margin-left: 30px;
        }
    }
`;

type BookWriteProp = {
    bookData: bookDataType,
    post: {
        title: string,
        body: string
    }
    onWrite: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    onChange: ({ key, value }) => void,
    onCancle: () => void
}

const BookWrite = ({ bookData, post, onWrite, onChange, onCancle }: BookWriteProp) => {
    let { title: bookDataTitle, price, author, publisher } = bookData;
    bookDataTitle = bookDataTitle.replace(/<b>/gi, "").replace(/<\/b>/gi, "");
    author = author.replace(/<b>/gi, "").replace(/<\/b>/gi, "");

    const quillElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (quillElement.current) {
            const quill = new Quill(quillElement.current, {
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
            console.log(quill);
            quill.on("text-change", (delta, oldDelta, source) => {
                if(source === "user") {
                    onChange({ key: "body", value: quill.root.innerHTML});
                }
            });
        }
    }, [onChange]);

    return (
        <BookWriteResponsiveBlock>
            <BookInfoList>
                <li>제목: {bookDataTitle}</li>
                <li>가격: {price}원</li>
                <li>저자: {author} | {publisher}</li>
            </BookInfoList>
            <TitleInput
                placeholder="[ 여기에 제목 입력 ]"
                value={post.title} 
                onChange={(e) => onChange({ key: "title", value: e.target.value})}
            />
            <QuillWrapper>
                <div ref={quillElement}></div>
            </QuillWrapper>
            <BookWriteButtons>
                <button onClick={onWrite}>글 쓰기</button>
                <button onClick={onCancle}>취소</button>
            </BookWriteButtons>
        </BookWriteResponsiveBlock>
    );
}

export default BookWrite;