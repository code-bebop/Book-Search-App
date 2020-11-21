import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { getPostAsync } from '../../modules/post';

import Post from '../../components/post/Post';

type PostParams = {
    id: string
}

const PostContainer = () => {
    const { post, nextPost, prevPost } = useSelector(({ post }: RootState) => ({
        post: post.post,
        nextPost: post.nextPost,
        prevPost: post.prevPost
    }));
    const dispatch = useDispatch();
    const { id }: PostParams = useParams();

    useEffect(() => {
        dispatch(getPostAsync.request({ id }));
    }, [dispatch, id]);

    console.log(post);
    return (
        <>
            {post ? <Post post={post} nextPost={nextPost} prevPost={prevPost} /> : <p>해당 ID의 포스트가 없습니다.</p>}
        </>
    )
}

export default PostContainer;