import { createAction, ActionType, createReducer } from "typesafe-actions";

const SAVE_BOOK = "bookData/SAVE_BOOK";


// export const savePost = createAction(SAVE_POST, (action) => {
//     return (item: object) => action({ item: item });
// })
type ItemType = {
    title: string,
    price: string,
    author: string,
    pubdate: string
}
export const savePost = createAction(SAVE_BOOK, (item: ItemType) => ({ item: item }))();

type bookDataState = {
    item: ItemType|null;
}
const initialState: bookDataState = {
    item: null
}

const actions = { savePost };
type bookDataActions = ActionType<typeof actions>;

const bookData = createReducer<bookDataState, bookDataActions>(initialState, {
    [SAVE_BOOK]: (state, {payload: {item}}) => ({ item })
})

export default bookData;