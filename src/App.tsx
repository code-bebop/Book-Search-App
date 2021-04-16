import React, { useState } from 'react';
import { Link, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import BookSearchPage from './pages/BookSearchPage';
import BookWritePage from './pages/BookWritePage';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';

const LinkWrapper = styled.nav`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background: rgba(15, 15, 16, 0.6);
  backdrop-filter: blur(7px);
  transition: left 0.35s;
  &.on {
    left: 0;
  }
  &.off {
    left: -300px;
  }
`;

const Button = styled.button`
  border: 4px solid #3f3fea;
  border-radius: 10px;
  outline: none;
  background-color: transparent;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const OpenButton = styled(Button)`
  position: fixed;
  top: 60px;
  left: 60px;
  z-index: 2;
  & > div {
    width: 14px;
    height: 3px;
    background: #fff;
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    transition: width 0.35s;
  }
  &::before,
  &::after {
    display: block;
    content: '';
    height: 3px;
    background: #fff;
    position: absolute;
    left: 8px;
    transform: translateY(-50%);
    transition: width 0.35s;
  }
  &::before {
    width: 22px;
    top: 25%;
  }
  &::after {
    width: 18px;
    top: 75%;
  }
  &.on {
    & > div,
    &::before,
    &::after {
      width: 27px;
    }
  }
`;

const LinkList = styled.ul`
  position: absolute;
  top: 170px;
  left: 60px;
  color: #fff;
  font-family: 'DungGeunMo';
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
        background-color: #2424b2;
        transition: width 0.5s;
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
  const pathname = location.pathname;

  const [onNav, setOnNav] = useState(false);

  return (
    <>
      <LinkWrapper className={onNav ? 'on' : 'off'}>
        <LinkList>
          <li>
            <Link
              to="/BookSearch"
              className={pathname === '/BookSearch' ? 'on' : ''}
            >
              책 검색하기
            </Link>
          </li>
          <li>
            <Link
              to="/PostList?page=1"
              className={pathname === '/PostList' ? 'on' : ''}
            >
              추천 책 목록
            </Link>
          </li>
        </LinkList>
      </LinkWrapper>
      <OpenButton
        className={onNav ? 'on' : 'off'}
        onClick={() => {
          setOnNav(!onNav);
        }}
      >
        <div></div>
      </OpenButton>

      <Switch>
        <Route path="/BookSearch" component={BookSearchPage} />
        <Route path="/BookWrite" component={BookWritePage} />
        <Route path="/PostList" component={PostListPage} />
        <Route path="/Post/:id" component={PostPage} />
        <Redirect path="*" to="/BookSearch" />
      </Switch>
    </>
  );
};

export default App;
