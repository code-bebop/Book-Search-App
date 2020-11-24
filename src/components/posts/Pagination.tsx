import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

const PaginationBlock = styled.div`
    background-color: #0F0F10;
    padding: 0 95px 107px;
    color: #FFF;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
`;

const PaginationList = styled.ul`
    display: flex;
    justify-content: center;
    margin: 0 64px;
    & > li {
        border-radius: 100%;
        transition: background-color .3s;
        &.curPage {
            background-color: #2424B2;
        }
        & > a {
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &:nth-child(n+2) {
            margin-left: 54px;
        }
        &:hover {
            background-color: #AAA;
        }
    }
`;

const PaginationButton = styled(Link)`
    background-color: #2424B2;
    width: 100px;
    height: 50px;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DisablePaginationButton = styled.div`
    background-color: #AAA;
    width: 100px;
    height: 50px;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
`;

interface PaginationProps {
    postCount: number,
    curPage: number
}

const Pagination = ({ postCount, curPage }: PaginationProps) => {
    const pageNumbers: Array<any> = [];
    for (let i = 1; i <= Math.ceil(postCount / 10); i++) {
        pageNumbers.push(i);
    }
    const match = useRouteMatch();

    return (
        <PaginationBlock>
            {
                curPage !== 1 ?
                <PaginationButton to={`${match.url}?page=${curPage - 1}`}>이전</PaginationButton> :
                <DisablePaginationButton>이전</DisablePaginationButton>
            }
            <PaginationList>
                {pageNumbers.map(pageNumber => (
                    <li key={pageNumber} className={pageNumber === curPage ? 'curPage' : ''}>
                        <Link to={`${match.url}?page=${pageNumber}`}>
                            {pageNumber}
                        </Link>
                    </li>
                ))}
            </PaginationList>
            {
                curPage !== pageNumbers.length ?
                <PaginationButton to={`${match.url}?page=${curPage + 1}`}>다음</PaginationButton> :
                <DisablePaginationButton>다음</DisablePaginationButton>
            }
        </PaginationBlock>
    )
}

export default Pagination;