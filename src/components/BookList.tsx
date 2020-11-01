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
    <BookListBlock onClickCapture={(e) => {console.log(e.target)}}>
      {items.map(
        (item: object, i) => (
          <BookListItem
            key={i}
            item={item}
            index={i}
          />
        )
      )}
    </BookListBlock>
  );
};

export default React.memo(BookList);