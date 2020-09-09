import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import articles, {articlesSaga} from './articles';

const rootReducer = combineReducers({
    articles,
})

export function* rootSaga() {
    yield all([articlesSaga()]);
}

export default rootReducer;