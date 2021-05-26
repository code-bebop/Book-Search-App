# Book-Search-App
Naver 검색 Open API를 사용하여 간단한 책 검색 / 책 추천 게시판 웹사이트를 만드는 프로젝트

[Book-Search-App 프로젝트 링크](https://code-bebop.github.io/Book-Search-App)

---

# 제공하는 기능

## 책 검색
사용자가 검색창에 단어를 입력하면, 그 단어와 연관된 책을 표시해준다.

![work_1](https://user-images.githubusercontent.com/57097064/112447050-36437980-8d94-11eb-8135-1ea758e6c593.png)

## 책 추천 게시판
검색된 책의 옆에 "이 작품을 추천" 버튼이 있다. 이 버튼을 누르면 해당 작품을 추천하는 게시글을 작성하는 페이지로 이동하고, 작성된 게시글은 서버에 저장되어 책 추천 게시판이 표시하는 게시글에 추가된다.

![localhost_8080_BookWrite](https://user-images.githubusercontent.com/57097064/112448806-1f058b80-8d96-11eb-8379-39cf30116c4b.png)
![localhost_8080_BookWrite (1)](https://user-images.githubusercontent.com/57097064/112448822-2167e580-8d96-11eb-8560-9bf35297619d.png)
![localhost_8080_BookWrite (2)](https://user-images.githubusercontent.com/57097064/112448835-2462d600-8d96-11eb-9ee7-9751de70aecf.png)

---

# 주로 사용된 기술

## React
React를 사용해서 Presentaion -> api 및 store -> Component 순으로 애플리케이션을 구성하고자 이 프로젝트를 시작했다.
허나 이 프로젝트의 규모는 단지 영화검색뿐이여서 redux를 사용해서 별도의 store를 만들 필요는 없었다.

클래스형 컴포넌트가 아니라 함수형 컴포넌트들로 만들어 Hook을 적극적으로 활용했다.

### React.memo
items만을 props로 받는 BookList 컴포넌트는 React.memo로 감싸 App이 리렌더링되어도 items가 갱신되지 않았다면 리렌더링되지 않게 최적화하였다.

### useEffect
무한 스크롤기능을 구현하기 위해 useEffect의 콜백함수와 반환함수에 각각 window의 scroll 이벤트에 대한 addEventListener와 removeEventListner를 사용했다.

### useCallback
useEffect내부의 window scroll 이벤트리스너는 스크롤이 문서의 끝까지 닿으면 `getData()`를 호출하여 다음 데이터를 읽어온다. 해당 useEffect는 `getData()`을 두 번째 인자인 관계성 배열의 item으로써 갖게 되는데, 만일 `getData()`을 useCallback으로 감싸지 않으면 `getData()`는 매 렌더링마다 새로운 참조를 갖게되고, useEffect는 App이 리렌더링될 때마다 계속해서 실행될 것이다.
그래서 `getData()`를 useCallback으로 감싸주었다.

## 무한 스크롤 기능
스크롤이 문서의 끝까지 닿았음을 감지하는 로직을 이렇게 구성하였다.
```js
const getDocumentHeight = () => {
  const body = document.body;
  const html = document.documentElement;

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
};

const getScrollTop = () => {
  return window.pageYOffset !== undefined
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
};

// trigger ON
if (getScrollTop() >= getDocumentHeight() - window.innerHeight) {
  ... 
}
```
이렇게 구성하는 것 만으로도 크로스 브라우징 외 여러가지 이슈를 피할 수 있었다.

## TypeScript
TypeScript에 대해 개념은 알고 있었으나 사용해본 적이 없어 한 번 적용해보았다.
type을 제한하는 것에 대한 코드를 적용하는 것은 금방 했으나, tsconfig 설정과 compile에 필요한 라이브러리등을 찾아 받는 것이 오래걸렸다. CRA를 할 때에 typescript 옵션을 사용하면 뚝딱이지만, 처음에 TypeScript를 사용할 계획이 없었기 때문에 직접 설정하는 게 힘들었다.
또한 개발환경 설정에 대한 부분은 하다보면 금방 익숙해질 것이라 생각했다.

## Webpack
Webpack또한 개념은 알고 있었으나 직접 사용하여 프로젝트를 build하는 것은 이 처음이었다. webpack.config.js 설정에 대해 배울 것이 너무 많아서 기피했다고 생각한다.
그 우려는 어느 정도 맞았다. 처음 webpack.config을 설정해보는 입장에서 꽤나 복잡했기 때문이다. 하지만 배우고 나서 보니 굉장히 편한 라이브러리였고, 프론트엔드라면 반드시 알아야 하는 라이브러리였다.

## Server
~~게시판 기능을 만드려면 게시물이 저장될 서버도 있어야 한다. 이 프로젝트에서는 node.js의 koa와 mongoDB를 사용해서 서버를 만들었다. (사실 서버라고 하기도 부끄럽다.)
서버가 제공하는 API 기능은  1. 전체 포스트 읽기, 2. 특정 포스트 읽기, 3. 포스트 쓰기 세 가지다.~~

~~그런데 이 서버는 아직 온라인에 호스팅하지 않았다. 다만 [Book_Search-App_RESTAPI라는 이름의 repository](https://github.com/code-bebop/Book-Search-App_RESTAPI)에 코드를 올려놓았다.~~

그래도 작동하는 프로젝트를 보여주고 싶어서 Oracle Cloud에 ubuntu VM을 만들어서 24시간 돌아가는 개인 서버를 만들었다.
개인 서버는 nginx + pm2 + node.js 를 사용해서 만들었다.

---

# 다듬어야 할 부분

## 회원가입 / 로그인 기능
이왕 서버를 만들었으니 회원가입 기능과 로그인 기능도 추가하고 싶은 마음이다. 하지만 이 웹사이트에 회원가입 / 로그인 기능은 딱히 필요하지 않다고 생각되어서 안 만들었는데, 지금 생각해보면 그냥 구현했어도 됐지 싶다.

## 댓글 기능
게시물에 빠질 수 없는 것이 댓글이다. 댓글 기능은 나중에라도 추가할 예정이다.
