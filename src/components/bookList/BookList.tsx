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
  items: Array<any>,
  onClickCapture: (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => void
}

type ItemType = {
    title: string,
    image: string,
    price: string,
    author: string,
    publisher: string,
    pubdate: string
}

const BookList = ({ items, onClickCapture }: BookListProps) => {
  if (items.length === 0) {
    return <ErrorMessage>검색 결과가 없습니다.</ErrorMessage>;
  }
  return (
    <BookListBlock onClickCapture={onClickCapture}>
      {items.map(
        (item: ItemType, i: number) => (
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
