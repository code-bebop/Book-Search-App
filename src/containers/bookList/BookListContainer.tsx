import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { saveBook } from '../../modules/bookData';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../modules';
import useScroll from '../../lib/useScroll';

import BookList from '../../components/bookList/BookList';

const BookListContainer = () => {
    const { items } = useSelector((state: RootState) => ({
        items: state.bookList.bookList
    }));
    const dispatch = useDispatch();
    const history = useHistory();

    const onClickCapture= useCallback((e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        const id = e.target["id"];
        if(!id) return;
        dispatch(saveBook(items[id]));
        history.push("/BookWrite");
    }, [dispatch, history, items]);
    
    useScroll();

    return (
        <>
            { items ? <BookList items={items} onClickCapture={onClickCapture} /> : <></> }
        </>
    )
}

export default BookListContainer;