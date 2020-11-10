import { AxiosError, AxiosResponse } from "axios";
import { ActionType, createAction, createAsyncAction, createReducer } from "typesafe-actions";
import { takeLatest } from "redux-saga/effects";

import createAsyncSaga, { createAsyncActionType } from "../lib/createAsyncSaga";
import { writePost, writePostP } from "../lib/api/posts";

const INITIALIZE = "write/INITIALIZE";
const CHANGE_FIELD = "write/CHANGE_FIELD";

export const initialize = createAction(INITIALIZE)();
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({ key, value }))();

const { REQUEST, SUCCESS, FAILURE } = createAsyncActionType("write/WRITE");

export const writeAsync = createAsyncAction(
    REQUEST,
    SUCCESS,
    FAILURE
)<writePostP, AxiosResponse, AxiosError>();

const writePostSaga = createAsyncSaga<writePostP, AxiosResponse, AxiosError>(writeAsync, writePost);

export const writeSaga = function*() {
    yield takeLatest(REQUEST, writePostSaga);
}

const actions = {
    initialize,
    changeField
}

type writeActions = ActionType<typeof actions>;
type writeState = {
    post: {
        title: string,
        body: string
    },
    loading: boolean
    error: Error | null
}

const initialState = {
    post: {
        title: '',
        body: ''
    },
    loading: false,
    error: null,
}

const write = createReducer<writeState, writeActions>(initialState, {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value} }) => ({
        ...state,
        post: {
            ...state.post,
            [key]: value
        }
    }),
    [REQUEST]: (state) => ({
        ...state,
        loading: true,
    }),
    [SUCCESS]: (state) => ({
        ...state,
        loading: false,
        error: null,
    }),
    [FAILURE]: (state, { payload: error }) => ({
        ...state,
        loading: false,
        error
    })
});

export default write;