import React from "react";
import styled from "styled-components";

import BookListItem from "./BookListItem";

const BookListBlock = styled.ul`
  padding: 57px 0;
`;
const ErrorMessage = styled.p`
  color: #fff;
  font-size: 3rem;
`;

type BookListProps = {
  items: any[];
}

const BookList = ({ items }: BookListProps) => {
  console.log(items);
  if (items.length === 0) {
    return <ErrorMessage>검색 결과가 없습니다.</ErrorMessage>;
  }
  return (
    <BookListBlock>
      {items.map(
        ({ title, image, price, author, pubdate }, i) => (
          <BookListItem
            key={i}
            image={image}
            title={title}
            price={price}
            author={author}
            pubdate={pubdate}
          />
        )
      )}
    </BookListBlock>
  );
};

export default React.memo(BookList);
