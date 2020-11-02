import { createAction, ActionType, createReducer } from "typesafe-actions";

const SAVE_POST = "postData/SAVE_POST";

// export const savePost = createAction(SAVE_POST, (action) => {
//     return (item: object) => action({ item: item });
// })
export const savePost = createAction(SAVE_POST, (item: object) => ({ item: item }))();

type postDataState = {
    item: object|null;
}
const initialState: postDataState = {
    item: null
}

const actions = { savePost };
type postDataActions = ActionType<typeof actions>;

const postData = createReducer<postDataState, postDataActions>(initialState, {
    [SAVE_POST]: (state, {payload: {item}}) => ({ item })
})

export default postData;