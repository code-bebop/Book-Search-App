import React, { useEffect, useRef } from 'react';
// import styled from 'styled-components';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';

import Responsive from './common/Responsive';

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
    let { title, image, price, author, pubdate } = post;
    title = title.replace(/<b>/gi, "").replace(/<\/b>/gi, "");
    author = author.replace(/<b>/gi, "").replace(/<\/b>/gi, "");

    const quillElement = useRef<HTMLDivElement>(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        if (quillElement.current) {
            quillInstance.current = new Quill(quillElement.current, {
                theme: "bubble",
                placeholder: "여기에 내용을 입력",
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
        <Responsive>
            <ul style={{color: "white"}}>
                <li>{title}</li>
                <li>{image}</li>
                <li>{price}</li>
                <li>{author}</li>
                <li>{pubdate}</li>
            </ul>
            <div ref={quillElement} style={{color: "white"}}></div>
        </Responsive>
    );
}

export default BookWrite;