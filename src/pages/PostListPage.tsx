import React from 'react';

import Responsive from '../components/common/Responsive';
import PostListContainer from '../containers/posts/PostListContainer';

const PostListPage = () => {
    return (
        <Responsive>
            <PostListContainer />
        </Responsive>
    )
}

export default PostListPage;