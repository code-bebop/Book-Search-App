import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { savePost } from "../modules/postdata";

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

type ItemType = {
    title: string,
    image: string,
    price: string,
    author: string,
    pubdate: string
}

const BookList = ({ items }: BookListProps) => {
  const item = useSelector((state: RootState) => ( state.postData.item ));
  const dispatch = useDispatch();

  const onSavePost = (item: ItemType) => {
    dispatch(savePost(item));
  };

  if (items.length === 0) {
    return <ErrorMessage>검색 결과가 없습니다.</ErrorMessage>;
  }
  return (
    <BookListBlock onClickCapture={(e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
      const id = e.target["id"];
      if(!id) return;
      console.log(`클릭된 버튼의 제목: ${items[id].title}`);
      onSavePost(items[id]);
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
