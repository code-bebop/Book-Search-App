// BookSearchPage에서 검색했을 때 Naver API에서 검색어와 관련된 책을 읽어오는 기능

import { AxiosError, AxiosResponse } from "axios";
import { ActionType, createAction, createAsyncAction, createReducer } from "typesafe-actions";
import { takeLatest } from "redux-saga/effects";

import createAsyncSaga, { createAsyncActionType } from "../lib/createAsyncSaga";
import { getBookList, getBookListP } from '../lib/api/Book';

const CHANGE_QUERY = "bookList/CHANGE_QUERY";

export const changeQuery = createAction(CHANGE_QUERY, (query) => ( query ))();

const { REQUEST, SUCCESS, FAILURE } = createAsyncActionType("bookList/FETCH");

export const bookListAsync = createAsyncAction(
    REQUEST,
    SUCCESS,
    FAILURE
)<getBookListP, AxiosResponse, AxiosError>();

const getBookListSaga = createAsyncSaga<getBookListP, AxiosResponse, AxiosError>(bookListAsync, getBookList);

export const bookListSaga = function*() {
    yield takeLatest(REQUEST, getBookListSaga);
}

const actions = {
    changeQuery,
}

type bookListActions = ActionType<typeof actions>;
type bookListState = {
    query: string,
    display: number,
    bookList: Array<any>,
    loading: boolean,
    error: Error | null
}

const initialState = {
    query: '',
    display: 10,
    bookList: [],
    loading: false,
    error: null
}

const bookList = createReducer<bookListState, bookListActions>(initialState, {
    [CHANGE_QUERY]: (state, { payload: query }) => ({
        ...state,
        query
    }),
    [REQUEST]: (state) => ({
        ...state,
        loading: true
    }),
    [SUCCESS]: (state, { payload: bookList }) => ({
        ...state,
        loading: false,
        bookList: bookList.data.items,
        display: state.display + 10
    }),
    [FAILURE]: (state, { payload: error }) => ({
        ...state,
        loading: false,
        error
    })
})

export default bookList;