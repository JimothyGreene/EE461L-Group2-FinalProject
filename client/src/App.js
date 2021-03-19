import { Container } from "@material-ui/core";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {LogInPage} from "./components/LogInPage";
import CheckOut from "./components/CheckOut";
export default function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
    return (
      // Dev Note: When adding a new Route, make sure to follow redirect examples to ensure login
      // See path="/" for an example
      <div className="wrapper">
        <Router>
          <Switch>
            <Route exact path="/login">
              {loggedIn ? <Redirect to="/" /> 
              : <LogInPage loginUser={(user) => {
                setUser(user);
                setLoggedIn(true);
              }} />}
            </Route>
            <Route exact path="/home">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/checkout" />/*<h1>Homepage</h1>*/ : <Redirect to="/login" />}
            </Route>
            <Route exact path="/checkout">
              {loggedIn ? <CheckOut checkOutUser={user}  /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </Router>
      </div>
    );
}