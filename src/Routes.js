import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import ArticleList from "./pages/ArticleList/ArticleList";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/articlelist" component={ArticleList} />
            </Switch>
        </Router>
    )
}

export default Routes;