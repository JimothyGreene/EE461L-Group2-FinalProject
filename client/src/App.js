import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Resources from "./components/Resources";
import Dashboard from "./components/Dashboard";
import Dataset from "./components/Dataset";
import Projects from "./components/Projects";
import {LogInPage} from "./components/LogInPage";
import {TopAndSideBar} from "./components/TopAndSideBar";

export const AuthContext = React.createContext();
const initState = {
  isAuth: localStorage.getItem("token") !== null ? true : false,
  user: localStorage.getItem("user"),
  token: localStorage.getItem("token")
};

const reducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
        token: action.payload.token
      };
    
    case "LOGOUT": 
      localStorage.clear();
      return {
        ...state,
        isAuth: false,
        user: null
      };
    
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initState);
    return (
      // Dev Note: When adding a new Route, make sure to follow redirect examples to ensure login
      // See path="/" for an example

      // Dev Note: When adding a new page, make sure to surround it with <TopAndSideBar>, see path="/" for an example
      <AuthContext.Provider
        value={{
          state,
          dispatch
        }}
      >
        <div className="wrapper">
          {state.isAuth ? <AuthApp /> : <UnAuthApp />}
        </div>
      </AuthContext.Provider>
      
    );
}


//Add new pages here
function AuthApp() {
  return (
    <Router>
      <Switch>
        <Route exact path="/home">
          <Redirect to="/" />
        </Route>
        <Route exact path="/">
          <TopAndSideBar page="Dashboard"><Dashboard /></TopAndSideBar>
        </Route>
        <Route exact path="/Resources">
          <TopAndSideBar page="Resources"><Resources /></TopAndSideBar>
        </Route>
        <Route exact path="/Projects">
          <TopAndSideBar page="Projects"><Projects /></TopAndSideBar>
        </Route>
        <Route exact path="/billing">
          <TopAndSideBar page="Billing"><h1>Billing</h1></TopAndSideBar>
        </Route>
        <Route exact path="/datasets">
          <TopAndSideBar page="Datasets"><Dataset /></TopAndSideBar>
        </Route>
        <Route exact path="/login">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  )
}

function UnAuthApp() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LogInPage />
        </Route>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}
