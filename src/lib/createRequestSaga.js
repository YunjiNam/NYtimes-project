import { call, put } from 'redux-saga/effects';

export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action) {
        try {
            const response = yield call(request, action.payload);
            yield put ({
                type: SUCCESS,
                payload: response.data.response.docs
            });
        } catch (e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true
            });

        }
    };
}