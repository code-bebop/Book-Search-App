import { AxiosError } from "axios";
import { ActionType, createAction, createAsyncAction, createReducer } from "typesafe-actions";
import { call, put, takeLatest } from "redux-saga/effects";

import { writePost, writePostArg } from "../lib/api/posts";

const INITIALIZE = "write/INITIALIZE";
const CHANGE_FIELD = "write/CHANGE_FIELD";

export const initialize = createAction(INITIALIZE)();
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({ key, value }))();

const WRITE_REQUEST = "write/WRITE_REQUEST";
const WRITE_SUCCESS = "write/WRITE_SUCCESS";
const WRITE_FAILURE = "write/WRITE_FAILURE";

export const writeAsync = createAsyncAction(
    WRITE_REQUEST,
    WRITE_SUCCESS,
    WRITE_FAILURE
)<writePostArg, undefined, AxiosError>();

function* writePostSaga(action) {
    const { success, failure } = writeAsync;

    try {
        yield call(writePost, action.payload);
        yield put(success());
    } catch (e) {
        yield put(failure(e));
    }
}
export const writeSaga = function*() {
    yield takeLatest(WRITE_REQUEST, writePostSaga);
}

const actions = {
    initialize,
    changeField,
    writeAsync
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
    [CHANGE_FIELD]: (state, { payload: { key, value } } ) => ({
        ...state,
        post: {
            ...state.post,
            [key]: value
        }
    }),
    [WRITE_REQUEST]: (state) => ({
        ...state,
        loading: true,
    }),
    [WRITE_SUCCESS]: (state) => ({
        ...state,
        loading: false,
        error: null,
    }),
    [WRITE_FAILURE]: (state, { payload: error }) => ({
        ...state,
        loading: false,
        error
    })
});

export default write;