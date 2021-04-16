import React, { useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../modules';
import {
  changeQuery,
  bookListAsync,
  initDisplay,
} from '../../modules/bookList';

import BookListSearchForm from '../../components/bookList/BookListSearchForm';

const BookListSearchFormContainer = () => {
  const queryRef = useRef('');

  const { query, display } = useSelector((state: RootState) => ({
    query: state.bookList.query,
    display: 10,
  }));
  const dispatch = useDispatch();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeQuery(e.target.value));
    },
    [dispatch]
  );

  const getData = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (queryRef.current === '') {
        queryRef.current = query;
      }
      if (queryRef.current !== query) {
        dispatch(initDisplay());
      }
      dispatch(bookListAsync.request({ query, display }));
    },
    [dispatch, query, display]
  );

  return (
    <BookListSearchForm onChange={onChange} getData={getData} query={query} />
  );
};

export default BookListSearchFormContainer;
