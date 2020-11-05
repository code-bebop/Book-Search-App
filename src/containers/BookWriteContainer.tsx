import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../modules";

import BookWrite from '../components/BookWrite';

const BookWriteContainer = () => {
    const post = useSelector((state: RootState) => ( state.postData.item ));

    return (
        <>
            {post ? (<BookWrite post={post} />) : (<p>포스트가 없습니다.</p>)}
        </>
    );
}

export default BookWriteContainer;
