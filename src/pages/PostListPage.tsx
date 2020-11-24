import React from 'react';

import Responsive from '../components/common/Responsive';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';

const PostListPage = () => {
    return (
        <Responsive>
            <PostListContainer />
            <PaginationContainer />
        </Responsive>
    )
}

export default PostListPage;