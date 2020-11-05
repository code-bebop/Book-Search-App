import React from 'react';

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
        <ul>
            <li>{title}</li>
            <li>{image}</li>
            <li>{price}</li>
            <li>{author}</li>;
            <li>{pubdate}</li>
        </ul>
    );
}

export default BookWrite;