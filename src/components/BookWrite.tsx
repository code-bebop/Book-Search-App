import React from 'react';
import styled from 'styled-components';

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
        
    return (
        <Responsive>
            <ul>
                <li>{title}</li>
                <li>{image}</li>
                <li>{price}</li>
                <li>{author}</li>;
                <li>{pubdate}</li>
            </ul>
        </Responsive>
    );
}

export default BookWrite;