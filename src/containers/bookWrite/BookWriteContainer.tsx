import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from "../../modules";

import { writeAsync, changeField, initialize } from "../../modules/write";

import BookWrite from '../../components/bookWrite/BookWrite';

const BookWriteContainer = () => {
    const { bookData, post } = useSelector((state: RootState) => ({
         bookData: state.bookData.item,
         post: state.write.post
    }));
    const dispatch = useDispatch();
    const history = useHistory();

    const onWrite = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(writeAsync.request(post));
        history.push("/PostList");
    }, [dispatch, post, history])
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
