// PostListPage로 이동했을 때 DB에 있는 Post들을 읽어오는 기능

import { AxiosError, AxiosResponse } from "axios";
import { createAsyncAction, createReducer } from "typesafe-actions";
import { takeLatest } from "redux-saga/effects";

import createAsyncSaga, { createAsyncActionType } from "../lib/createAsyncSaga";
import { getPosts, getPostsP } from "../lib/api/posts";

const { REQUEST, SUCCESS, FAILURE } = createAsyncActionType("posts/FETCH");

export const getPostsAsync = createAsyncAction(
    REQUEST,
    SUCCESS,
    FAILURE
)<getPostsP, AxiosResponse, AxiosError>();

const getPostsSaga = createAsyncSaga<getPostsP, AxiosResponse, AxiosError>(getPostsAsync, getPosts);

export const postsSaga = function*() {
    yield takeLatest(REQUEST, getPostsSaga);
}

type postsState = {
    postList: Array<any>,
    postCount: number,
    loading: boolean,
    error: Error | null
}

const initialState = {
    postList: [],
    postCount: 0,
    loading: false,
    error: null
}

const posts = createReducer<postsState>(initialState, {
    [REQUEST]: (state) => ({
        ...state,
        loading: true
    }),
    [SUCCESS]: (state, { payload: res }) => ({
        ...state,
        loading: false,
        postList: res.data.posts,
        postCount: res.data.postCount
    }),
    [FAILURE]: (state, { payload: error }) => ({
        ...state,
        loading: false,
        error
    })
})

export default posts;