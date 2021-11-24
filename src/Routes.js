import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import Article from "./features/Article/Article"

const queryClient = new QueryClient()

const Routes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route exact path="/" component={Article} />
          {/* <Route exact path="/article/" component={Article} /> */}
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Routes
