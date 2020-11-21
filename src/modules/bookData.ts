// BookListPage의 BookListItem의 "이 책 추천하기" 버튼을 누르면 해당 책의 주요 정보를 저장한다.
// 저장된 정보는 BookWritePage에서 사용자가 책 추천 Post를 작성할 때 옆에 나타난다.

import { createAction, ActionType, createReducer } from "typesafe-actions";

const SAVE_BOOK = "bookData/SAVE_BOOK";

type ItemType = {
    title: string,
    price: string,
    author: string,
    pubdate: string
}
export const saveBook = createAction(SAVE_BOOK, (item: ItemType) => ({ item: item }))();

type bookDataState = {
    item: ItemType|null;
}
const initialState: bookDataState = {
    item: null
}

const actions = { saveBook };
type bookDataActions = ActionType<typeof actions>;

const bookData = createReducer<bookDataState, bookDataActions>(initialState, {
    [SAVE_BOOK]: (state, {payload: {item}}) => ({ item })
})

export default bookData;