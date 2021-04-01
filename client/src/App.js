import { Container } from "@material-ui/core";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import {LogInPage} from "./components/LogInPage";
import {TopAndSideBar} from "./components/TopAndSideBar";
import Projects from "./components/Projects";

export default function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
    return (
      // Dev Note: When adding a new Route, make sure to follow redirect examples to ensure login
      // See path="/" for an example

      // Dev Note: When adding a new page, make sure to surround it with <TopAndSideBar>, see path="/" for an example
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
              {loggedIn ? <TopAndSideBar user={user} page="Dashboard"><Dashboard /></TopAndSideBar> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/Projects">
              {loggedIn ? <TopAndSideBar user={user} page="Projects"><Projects /></TopAndSideBar> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </Router>
      </div>
    );
}

