import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { RootState } from '../../modules';

import { getPostsAsync } from '../../modules/posts';

const PostListContainer = () => {
    const { postList } = useSelector(({ posts }: RootState) => ({
        postList: posts.postList
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostsAsync.request());
    }, [dispatch])

    return (
        <>
            { postList ? <PostList posts={postList} /> : <></> }
        </>
    )
}

export default PostListContainer;