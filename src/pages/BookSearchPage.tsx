import React from "react";

import Responsive from '../components/common/Responsive';
import BookListContainer from "../containers/bookList/BookListContainer";
import BookListSearchFormContainer from "../containers/bookList/BookListSearchFromContainer";

const BookSearchPage = () => {
  return (
    <Responsive>
      <BookListSearchFormContainer />
      <BookListContainer />
    </Responsive>
  );
};

export default BookSearchPage;
