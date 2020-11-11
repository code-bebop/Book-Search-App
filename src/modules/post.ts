import { AxiosError, AxiosResponse } from "axios";
import { createAsyncAction, createReducer } from "typesafe-actions";
import { takeLatest } from "redux-saga/effects";

import createAsyncSaga, { createAsyncActionType } from "../lib/createAsyncSaga";
import { getPost } from "../lib/api/posts";

const { REQUEST, SUCCESS, FAILURE } = createAsyncActionType("post/FETCH");

export const getPostAsync = createAsyncAction(
    REQUEST,
    SUCCESS,
    FAILURE
)<undefined, AxiosResponse, AxiosError>();

const getPostSaga = createAsyncSaga<undefined, AxiosResponse, AxiosError>(getPostAsync, getPost);

export const postSaga = function*() {
    yield takeLatest(REQUEST, getPostSaga);
}

type postState = {
    postList: Array<any>,
    loading: boolean,
    error: Error | null
}

const initialState = {
    postList: [],
    loading: false,
    error: null
}

const post = createReducer<postState>(initialState, {
    [REQUEST]: (state) => ({
        ...state,
        loading: true
    }),
    [SUCCESS]: (state, { payload: postList }) => ({
        ...state,
        loading: false,
        postList: postList.data
    }),
    [FAILURE]: (state, { payload: error }) => ({
        ...state,
        loading: false,
        error
    })
})

export default post;