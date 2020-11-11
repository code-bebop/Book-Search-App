import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { RootState } from '../../modules';

import { getPostAsync } from '../../modules/post';

const PostListContainer = () => {
    const { postList } = useSelector(({ post }: RootState) => ({
        postList: post.postList
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostAsync.request());
    }, [dispatch])

    return (
        <>
            { postList ? <PostList posts={postList} /> : <></> }
        </>
    )
}

export default PostListContainer;