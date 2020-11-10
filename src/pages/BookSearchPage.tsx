import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import BookList from "../components/bookList/BookList";
import BookListContainer from "../containers/bookList/BookListContainer";
import { getBookList } from "../lib/api/Book";
import Responsive from '../components/common/Responsive';
import BookListSearchFormContainer from "../containers/bookList/BookListSearchFromContainer";

const BookSearchPage = () => {
  // const getDocumentHeight = () => {
  //   const body = document.body;
  //   const html = document.documentElement;

  //   return Math.max(
  //     body.scrollHeight,
  //     body.offsetHeight,
  //     html.clientHeight,
  //     html.scrollHeight,
  //     html.offsetHeight
  //   );
  // };

  // const getScrollTop = () => {
  //   return window.pageYOffset !== undefined
  //     ? window.pageYOffset
  //     : (document.documentElement || document.body)
  //         .scrollTop;
  // };

  // useEffect(() => {
  //   const scrollHandler = () => {
  //     if (items) {
  //       if (getScrollTop() >= getDocumentHeight() - window.innerHeight) {
  //         // console.log(`스크롤 트리거 ON, items.length: ${items.length}`);
  //         // const nextDisplay = items.length + 10;
  //         // console.log(`nextDisplay: ${nextDisplay}`);
  //         // setDisplay(nextDisplay);
  //         // console.log(`setDisplay 작동, display: ${display}`);
  //         getData();
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", scrollHandler);

  //   return () => {
  //     window.removeEventListener("scroll", scrollHandler);
  //   };
  // }, [items, getData, display]);

  return (
    <Responsive>
      <BookListSearchFormContainer />
      <BookListContainer />
    </Responsive>
  );
};

export default BookSearchPage;
