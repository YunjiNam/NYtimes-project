import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import articles, {articlesSaga} from './articles';
import marks from './marks';

const rootReducer = combineReducers({
    articles,
    marks,
})

export function* rootSaga() {
    yield all([articlesSaga()]);
}

export default rootReducer;