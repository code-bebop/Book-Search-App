import { AxiosError, AxiosResponse } from "axios";
import { createAsyncAction, createReducer } from "typesafe-actions";
import { takeLatest } from "redux-saga/effects";

import createAsyncSaga, { createAsyncActionType } from "../lib/createAsyncSaga";
import { getPost, getPostP } from "../lib/api/posts";

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

type postState = {
    post: {
        _id: string,
        publishedDate: Date,
        title: string,
        body: string
    } | null,
    loading: boolean,
    error: Error | null
}

const initialState = {
    post: null,
    loading: false,
    error: null
}

const post = createReducer<postState>(initialState, {
    [REQUEST]: (state) => ({
        ...state,
        loading: true
    }),
    [SUCCESS]: (state, { payload: post }) => ({
        ...state,
        loading: false,
        postList: post.data
    }),
    [FAILURE]: (state, { payload: error }) => ({
        ...state,
        loading: false,
        error
    })
})

export default post;