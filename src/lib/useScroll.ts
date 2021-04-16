import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../modules';
import { bookListAsync, incDisplay } from '../modules/bookList';

const useScroll = () => {
  const { query, items, display } = useSelector(({ bookList }: RootState) => ({
    query: bookList.query,
    items: bookList.bookList,
    display: bookList.display + 10,
  }));
  const dispatch = useDispatch();

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
      : (document.documentElement || document.body).scrollTop;
  };

  useEffect(() => {
    const scrollHandler = async () => {
      if (items) {
        if (getScrollTop() >= getDocumentHeight() - window.innerHeight) {
          dispatch(incDisplay());
          dispatch(bookListAsync.request({ query, display }));
        }
      }
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [query, items, display, dispatch]);
};

export default useScroll;
