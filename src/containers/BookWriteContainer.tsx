import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../modules";

import { writeAsync } from "../modules/write";

import BookWrite from '../components/BookWrite';

const BookWriteContainer = () => {
    const post = useSelector((state: RootState) => ( state.bookData.item ));
    const dispatch = useDispatch();

    const onWrite = (title: string, body: string) => {
        const post = { title, body };
        dispatch(writeAsync.request(post));
    }
    return (
        <>
            {post ? (<BookWrite post={post} onWrite={onWrite} />) : (<p>포스트가 없습니다.</p>)}
        </>
    );
}

export default BookWriteContainer;
