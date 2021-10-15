import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import Home from "./features/Home/Home"
import Article from "./features/Article/Article"

const queryClient = new QueryClient()

const Routes = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/article/" component={Article} />
        </Switch>
    </Router>
    </QueryClientProvider>
  )
}

export default Routes
