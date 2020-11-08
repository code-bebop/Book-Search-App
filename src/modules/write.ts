import { AxiosError } from "axios";
import { ActionType, createAsyncAction, createReducer } from "typesafe-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { writePost, writePostArg } from "../lib/api/posts";

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

    type writePostArg = {
        title: string,
        body: string
    }

    try {
        const response = yield call(({ title, body }: writePostArg) => {
            return axios.post("/api/posts", { title, body })
        }, action.payload);
        console.log(response);
        yield put(success());
    } catch (e) {
        yield put(failure(e));
    }
}
export const writeSaga = function*() {
    yield takeLatest(WRITE_REQUEST, writePostSaga);
}

const actions = {
    writeAsync
}

type writeActions = ActionType<typeof actions>;
type writeState = {
    response: string,
    loading: boolean
    error: Error | null
}

const initialState = {
    loading: false,
    error: null,
    response: ''
}

const write = createReducer<writeState, writeActions>(initialState, {
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