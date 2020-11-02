import { combineReducers } from "redux";
import postData from "./postdata";

const rootReducer = combineReducers({
    postData
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;