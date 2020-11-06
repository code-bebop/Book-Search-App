import React from 'react';
import { Link, Switch, Route, Redirect } from "react-router-dom";
import styled from 'styled-components';

import BookSearchPage from './pages/BookSearchPage';
import BookWritePage from './pages/BookWritePage';

const LinkWrapper = styled.ul`
    position: absolute;
    top: 50px;
    left: 50px;
    color: #fff;
    font-family: "DungGeunMo";
`;

const App = () => {
    return (
        <>
            <LinkWrapper>
                <li>
                    <Link to="/BookSearch">책 검색하기</Link>
                </li>
                <li>
                    <Link to="/BookWrite">이 책 추천하기</Link>
                </li>
            </LinkWrapper>
            <Switch>
                <Route path="/BookSearch" component={BookSearchPage} />
                <Route path="/BookWrite" component={BookWritePage} />
                <Redirect path="*" to="/" />
            </Switch>
        </>
    );
}

export default App;
