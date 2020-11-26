import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from "../../modules";

import { writeAsync, changeField, initialize } from "../../modules/write";

import BookWrite from '../../components/bookWrite/BookWrite';

const BookWriteContainer = () => {
    const { bookData, post } = useSelector((state: RootState) => ({
         bookData: state.bookData.bookData,
         post: state.write.post
    }));
    const dispatch = useDispatch();
    const history = useHistory();

    const onWrite = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const payload = {
            title: post.title,
            body: post.body,
            bookInfo: bookData
        }
        dispatch(writeAsync.request(payload));
        history.push("/PostList?page=1");
    }, [dispatch, post, history, bookData])
    const onChange = useCallback((payload) => {
        dispatch(changeField(payload));
    }, [dispatch]);
    const onCancle = useCallback(() => {
        history.goBack();
    }, [history])

    useEffect(() => {
        return () => {
            dispatch(initialize());
        }
    }, [dispatch])
    return (
        <>
            {bookData ? (<BookWrite bookData={bookData} post={post} onWrite={onWrite} onChange={onChange} onCancle={onCancle} />) : (<p>포스트가 없습니다.</p>)}
        </>
    );
}

export default BookWriteContainer;
