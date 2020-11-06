import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import BookList from "../components/BookList";
import { getBookList } from "../lib/api/Book";
import Responsive from '../components/common/Responsive';

const SearchBookForm = styled.form`
  margin-top: 60px;
  text-align: center;
  & > input {
    color: white;
    background-color: transparent;
    border: none;
    border-bottom: 5px solid #fff;
    outline: none;
    min-width: 338px;
  }
  & > button {
    display: none;
  }
`;

const BookMessage = styled.p`
  color: #fff;
  font-size: 3rem;
`;

const BookSearchPage = () => {
  const [items, setItems] = useState<any[] | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(10);
 
  const getData = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      if (e) {
        e.preventDefault();
      }
      if (query === "") {
        alert("검색어를 입력해주십시오.");
        return;
      }

      try {
        setLoading(true);
        const {
          data: { items: data },
        } = await getBookList(query, display);
        setItems(data);
        setDisplay(prevState => prevState + 10);
        console.log(display);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    },
    [query, display]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const getDocumentHeight = () => {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  };

  const getScrollTop = () => {
    return window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body)
          .scrollTop;
  };

  useEffect(() => {
    setDisplay(10);
  }, [query]) 

  useEffect(() => {
    const scrollHandler = () => {
      if (items) {
        if (getScrollTop() >= getDocumentHeight() - window.innerHeight) {
          // console.log(`스크롤 트리거 ON, items.length: ${items.length}`);
          // const nextDisplay = items.length + 10;
          // console.log(`nextDisplay: ${nextDisplay}`);
          // setDisplay(nextDisplay);
          // console.log(`setDisplay 작동, display: ${display}`);
          getData();
        }
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [items, getData, display]);

  return (
    <Responsive>
      <SearchBookForm onSubmit={getData}>
        <input onChange={onInputChange} value={query} />
        <button type="submit">검색</button>
      </SearchBookForm>
      {items ? (
        <BookList items={items} />
      ) : (
        <BookMessage>검색을 해 주십시오</BookMessage>
      )}
    </Responsive>
  );
};

export default BookSearchPage;
