import { createAction, handleActions } from "redux-actions"
import { takeLatest } from "redux-saga/effects"
import * as api from "../lib/api"
import createRequestSaga from "../lib/createRequestSaga"

const GET_ARTICLE = "articles/GET_ARTICLE"
const GET_ARTICLE_SUCCESS = "articles/GET_ARTICLE_SUCCESS"

export const getArticle = createAction(GET_ARTICLE, (text) => text)

const getArticleSaga = createRequestSaga(GET_ARTICLE, api.getArticle)

export function* articlesSaga() {
  yield takeLatest(GET_ARTICLE, getArticleSaga)
}

const initialState = {
  list: null,
}

const articles = handleActions(
  {
    [GET_ARTICLE_SUCCESS]: (state, action) => ({
      ...state,
      list: action.payload,
    }),
  },
  initialState
)

export default articles
