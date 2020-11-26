// PostListPage에서 Post title을 클릭하면 해당 Post를 DB에서 불러오는 기능

import { AxiosError, AxiosResponse } from "axios";
import { createAsyncAction, createReducer } from "typesafe-actions";
import { takeLatest } from "redux-saga/effects";

import createAsyncSaga, { createAsyncActionType } from "../lib/createAsyncSaga";
import { getPost, getPostP } from "../lib/api/posts";
import { bookDataType } from "./bookData";

const { REQUEST, SUCCESS, FAILURE } = createAsyncActionType("post/FETCH");

export const getPostAsync = createAsyncAction(
    REQUEST,
    SUCCESS,
    FAILURE
)<getPostP, AxiosResponse, AxiosError>();

const getPostSaga = createAsyncSaga<getPostP, AxiosResponse, AxiosError>(getPostAsync, getPost);

export const postSaga = function*() {
    yield takeLatest(REQUEST, getPostSaga);
}

// Post Component에서 props의 interface를 정의할 때 재사용 하려고 했는데
// null을 union type으로 같이 지정하면 post의 property를 못 읽는다.
export interface PostT {
    post: {
        _id: string,
        publishedDate: string,
        title: string,
        body: string,
        bookInfo: bookDataType
    } | null
}

interface PostState extends PostT {
    nextPost: {
        _id: string,
        title: string
    },
    prevPost: {
        _id: string,
        title: string
    },
    loading: boolean,
    error: Error | null
}

const initialState = {
    post: null,
    nextPost: {
        _id: '',
        title: ''
    },
    prevPost: {
        _id: '',
        title: ''
    },
    loading: false,
    error: null
}

const post = createReducer<PostState>(initialState, {
    [REQUEST]: (state) => ({
        ...state,
        loading: true
    }),
    [SUCCESS]: (state, { payload: { data: res } }) => ({
        ...state,
        loading: false,
        post: res.post,
        nextPost: res.nextPost[0],
        prevPost: res.prevPost[0]

    }),
    [FAILURE]: (state, { payload: error }) => ({
        ...state,
        loading: false,
        error
    })
})

export default post;