import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import NewsList from "./pages/NewsList/NewsList";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/newslist" component={NewsList} />
            </Switch>
        </Router>
    )
}

export default Routes;