import React from 'react';
import { Link, Switch, Route, Redirect, useRouteMatch, useLocation } from "react-router-dom";
import styled from 'styled-components';

import BookSearchPage from './pages/BookSearchPage';
import BookWritePage from './pages/BookWritePage';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';

const LinkWrapper = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 300px;
    height: 100vh;
    background: rgba(15, 15, 16, .6);
    backdrop-filter: blur(7px);
`;

const LinkList = styled.ul`
    position: absolute;
    top: 100px;
    left: 60px;
    color: #fff;
    font-family: "DungGeunMo";
    & > li {
        font-size: 24px;
        line-height: 2em;    
        display: flex;
        align-items: center;
        &:nth-child(n + 2) {
            margin-top: 48px;
        }
        & > a {
            padding-right: 35px;
            padding-left: 10px;
            position: relative;
            &::after {
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                z-index: -1;
                content: '';
                width: 0;
                height: 2em;
                background-color: #2424B2;
                transition: width .5s;
            }
            &.on {
                &::after {
                    width: 100%;
                }
            }
        }
    }
`;

const App = () => {
    const location = useLocation();
    console.info(location);
    const pathname = location.pathname;
    return (
        <>
            <LinkWrapper>
                <LinkList>
                    <li>
                        <Link to="/BookSearch" className={pathname === '/BookSearch' ? 'on' : ''}>책 검색하기</Link>
                    </li>
                    <li>
                        <Link to="/PostList?page=1" className={pathname === '/PostList' ? 'on' : ''}>추천 책 목록</Link>
                    </li>
                </LinkList>
            </LinkWrapper>
            <Switch>
                <Route path="/BookSearch" component={BookSearchPage} />
                <Route path="/BookWrite" component={BookWritePage} />
                <Route path="/PostList" component={PostListPage} />
                <Route path="/Post/:id" component={PostPage} />
                <Redirect path="*" to="/BookSearch" />
            </Switch>
        </>
    );
}

export default App;
