import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../modules";

import { writeAsync, changeField, initialize } from "../../modules/write";

import BookWrite from '../../components/bookWrite/BookWrite';

const BookWriteContainer = () => {
    const { bookData, post } = useSelector((state: RootState) => ({
         bookData: state.bookData.item,
         post: state.write.post
    }));
    const dispatch = useDispatch();

    const onWrite = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(writeAsync.request(post));
    }, [dispatch, post])
    const onChange = useCallback((payload) => {
        dispatch(changeField(payload));
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(initialize());
        }
    }, [dispatch])
    return (
        <>
            {bookData ? (<BookWrite bookData={bookData} post={post} onWrite={onWrite} onChange={onChange} />) : (<p>포스트가 없습니다.</p>)}
        </>
    );
}

export default BookWriteContainer;
