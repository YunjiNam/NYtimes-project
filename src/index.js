import React from "react"
import ReactDOM from "react-dom"
import Routes from "./Routes"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import createSagaMiddleware from "redux-saga"
import rootReducer, { rootSaga } from "./modules"
import { composeWithDevTools } from "redux-devtools-extension"
import "./styles/reset.scss"
import { Global } from "@emotion/react"
import reset from "./styles/reset"

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <Global styles={reset} />
    <Routes />
  </Provider>,
  document.getElementById("root")
)
