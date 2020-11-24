import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { RootState } from '../../modules';
import { useLocation } from 'react-router-dom';

import { getPostsAsync } from '../../modules/posts';
import getParameterByName from '../../lib/useGetParameter';

const PostListContainer = () => {
    const { postList } = useSelector(({ posts }: RootState) => ({
        postList: posts.postList
    }));
    const dispatch = useDispatch();
    const location = useLocation();
    
    useEffect(() => {
        const queryPage = getParameterByName(location, "page");
        console.log(queryPage);
        dispatch(getPostsAsync.request({ pageNumber: queryPage }));
    }, [dispatch, location])

    return (
        <>
            { postList ? <PostList posts={postList} /> : <></> }
        </>
    )
}

export default PostListContainer;