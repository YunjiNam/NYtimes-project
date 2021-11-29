import React from "react"
import ReactDOM from "react-dom"
import Routes from "./Routes"
import { Provider } from "react-redux"
import { Global } from "@emotion/react"
import { store } from "./app/store"
import reset from "./styles/reset"

ReactDOM.render(
  <Provider store={store}>
    <Global styles={reset} />
    <Routes />
  </Provider>,
  document.getElementById("root")
)
