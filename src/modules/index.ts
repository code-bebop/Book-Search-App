import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import bookData from "./bookData";
import write, { writeSaga } from "./write";

const rootReducer = combineReducers({
    bookData,
    write
});

export function* rootSaga() {
    yield all([writeSaga()])
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;