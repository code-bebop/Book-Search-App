import React from 'react';
import { Link, Switch, Route, Redirect } from "react-router-dom";
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
        &:nth-child(n + 2) {
            padding-top: 48px;
        }
    }
`;

const App = () => {
    return (
        <>
            <LinkWrapper>
                <LinkList>
                    <li>
                        <Link to="/BookSearch">책 검색하기</Link>
                    </li>
                    <li>
                        <Link to="/PostList?page=1">추천 책 목록</Link>
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
