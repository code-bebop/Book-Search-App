// BookSearchPage에서 검색했을 때 Naver API에서 검색어와 관련된 책을 읽어오는 기능

import { AxiosError, AxiosResponse } from 'axios';
import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from 'typesafe-actions';
import { takeLatest } from 'redux-saga/effects';

import createAsyncSaga, { createAsyncActionType } from '../lib/createAsyncSaga';
import { getBookList, getBookListP } from '../lib/api/Book';

const CHANGE_QUERY = 'bookList/CHANGE_QUERY';
const INIT_DISPLAY = 'bookList/INIT_DISPLAY';
const INC_DISPLAY = 'bookList/INC_DISPLAY';

export const changeQuery = createAction(CHANGE_QUERY, (query) => query)();
export const initDisplay = createAction(INIT_DISPLAY)();
export const incDisplay = createAction(INC_DISPLAY)();

const { REQUEST, SUCCESS, FAILURE } = createAsyncActionType('bookList/FETCH');

export const bookListAsync = createAsyncAction(REQUEST, SUCCESS, FAILURE)<
  getBookListP,
  AxiosResponse,
  AxiosError
>();

const getBookListSaga = createAsyncSaga<
  getBookListP,
  AxiosResponse,
  AxiosError
>(bookListAsync, getBookList);

export const bookListSaga = function* () {
  yield takeLatest(REQUEST, getBookListSaga);
};

const actions = {
  changeQuery,
  initDisplay,
  incDisplay,
};

type bookListActions = ActionType<typeof actions>;
type bookListState = {
  query: string;
  display: number;
  bookList: Array<any>;
  loading: boolean;
  error: Error | null;
};

const initialState = {
  query: '',
  display: 10,
  bookList: [],
  loading: false,
  error: null,
};

const bookList = createReducer<bookListState, bookListActions>(initialState, {
  [CHANGE_QUERY]: (state, { payload: query }) => ({
    ...state,
    query,
  }),
  [INIT_DISPLAY]: (state) => ({
    ...state,
    display: initialState.display,
  }),
  [INC_DISPLAY]: (state) => ({
    ...state,
    display: state.display + 10,
  }),
  [REQUEST]: (state) => ({
    ...state,
    loading: true,
  }),
  [SUCCESS]: (state, { payload: bookList }) => ({
    ...state,
    loading: false,
    bookList: bookList.data.items,
  }),
  [FAILURE]: (state, { payload: error }) => ({
    ...state,
    loading: false,
    error,
  }),
});

export default bookList;
