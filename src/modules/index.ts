import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import bookData from "./bookData";
import write, { writeSaga } from "./write";
import bookList, { bookListSaga } from "./bookList";

const rootReducer = combineReducers({
    bookData,
    write,
    bookList
});

export function* rootSaga() {
    yield all([writeSaga(), bookListSaga()])
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;