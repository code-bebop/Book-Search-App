import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../modules';
import { changeQuery, bookListAsync } from "../../modules/bookList";

import BookListSearchForm from "../../components/bookList/BookListSearchForm";

const BookListSearchFormContainer = () => {
    const { query, display } = useSelector((state: RootState) => ({
       query: state.bookList.query,
       display: state.bookList.display
    }));
    const dispatch = useDispatch();

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeQuery(e.target.value));
    }, [dispatch]);
    const getData = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(bookListAsync.request({ query, display }));
    }, [dispatch, query, display]);

    return (
        <BookListSearchForm onChange={onChange} getData={getData} query={query} />
    )
}

export default BookListSearchFormContainer;