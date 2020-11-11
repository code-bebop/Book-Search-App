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