import React from 'react';
import { Link, Switch, Route, Redirect } from "react-router-dom";

import BookSearchPage from './pages/BookSearchPage';
import BookWritePage from './pages/BookWritePage';

const App = () => {
    return (
        <>
            <Link to="/BookSearch">책 검색하기</Link>
            <Link to="/BookWrite">이 책 추천하기</Link>
            <Switch>
                <Route path="/BookSearch" component={BookSearchPage} />
                <Route path="/BookWrite" component={BookWritePage} />
                <Redirect path="*" to="/" />
            </Switch>
        </>
    );
}

export default App;
