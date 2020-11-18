import { call, put } from "redux-saga/effects";
import { AsyncActionCreatorBuilder, PayloadAction } from "typesafe-actions";

type TAsyncAction = {
    REQUEST: string,
    SUCCESS: string,
    FAILURE: string
}

// createAsyncActionType
export function createAsyncActionType (actionName: string): TAsyncAction {
    const asyncActionType: Array<String> = ['_REQUEST', '_SUCCESS', '_FAIlURE'];

    return {
       REQUEST: actionName + asyncActionType[0],
       SUCCESS: actionName + asyncActionType[1],
       FAILURE: actionName + asyncActionType[2]
    }
}

// createAsnycSaga

type PromiseCreatorFunction<P, T> =
    | ((payload: P) => Promise<T>)
    | (() => Promise<T>);

// isPayloadAction이 반환하는 값이 true라면 isPayloadAction가 호출된 블록 내에서
// isPayloadAction의 매개변수 action의 type은 PayloadAction type이다.
function isPayloadAction<P> (action: any): action is PayloadAction<string, P> {
    return action.payload !== undefined;
}

// P1 = requestPayload, P2 = successPayload, P3 = failurePayload
function createAsyncSaga<P1, P2, P3> (
    asyncActionCreator: AsyncActionCreatorBuilder<
        [string, [P1, undefined]],
        [string, [P2, undefined]],
        [string, [P3, undefined]]
    >,
    promiseCreator: PromiseCreatorFunction<P1, P2>
) {
    return function* saga(
        action: ReturnType<typeof asyncActionCreator.request>
    ) {
        try {
            const response: P2 = isPayloadAction<P1>(action)
                ? yield call(promiseCreator, action.payload)
                : yield call(promiseCreator);
            yield put(asyncActionCreator.success(response));
        } catch (e) {
            console.log(e);
            yield put (asyncActionCreator.failure(e));
        }
    }
}

export default createAsyncSaga;