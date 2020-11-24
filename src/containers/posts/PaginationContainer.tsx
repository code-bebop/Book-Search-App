import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import getParameterByName from '../../lib/useGetParameter';
import { useLocation } from 'react-router-dom';

import Pagination from '../../components/posts/Pagination';

const PaginationContainer = () => {
    const { postCount } = useSelector(({ posts }: RootState) => ({
        postCount: posts.postCount
    }));
    const location = useLocation();

    const currentPage = parseInt(getParameterByName(location, "page"), 10);
    return (
        <Pagination postCount={postCount} curPage={currentPage} />
    )
}

export default PaginationContainer;