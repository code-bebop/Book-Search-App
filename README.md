# Book-Search-App
Naver 영화 검색 Open API를 사용하여 간단한 책검색 웹앱을 만드는 프로젝트

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
```
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
