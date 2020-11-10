import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { saveBook } from "../../modules/bookData";
import { useHistory } from 'react-router-dom';

import BookListItem from "./BookListItem";

const BookListBlock = styled.ul`
  padding: 57px 0;
`;
const ErrorMessage = styled.p`
  color: #fff;
  font-size: 3rem;
`;

type BookListProps = {
  items: Array<any>
}

type ItemType = {
    title: string,
    image: string,
    price: string,
    author: string,
    pubdate: string
}

const BookList = ({ items }: BookListProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSaveBook = (item: ItemType) => {
    dispatch(saveBook(item));
  };

  if (items.length === 0) {
    return <ErrorMessage>검색 결과가 없습니다.</ErrorMessage>;
  }
  return (
    <BookListBlock onClickCapture={(e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
      const id = e.target["id"];
      if(!id) return;
      console.log(`클릭된 버튼의 제목: ${items[id].title}`);
      onSaveBook(items[id]);
      history.push("/BookWrite");
    }}>
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
