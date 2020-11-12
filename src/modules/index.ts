import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import bookData from "./bookData";
import write, { writeSaga } from "./write";
import bookList, { bookListSaga } from "./bookList";
import posts, { postsSaga } from "./posts";
import post, { postSaga } from "./post";

const rootReducer = combineReducers({
    bookData,
    write,
    bookList,
    posts,
    post
});

export function* rootSaga() {
    yield all([writeSaga(), bookListSaga(), postsSaga(), postSaga()])
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;