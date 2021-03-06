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
import Billing from "./components/Billing";
import Projects from "./components/Projects";
import {LogInPage} from "./components/LogInPage";
import {TopAndSideBar} from "./components/TopAndSideBar";
import { AuthContext, AuthContextProvider } from "./components/AuthContext";

// export const AuthContext = React.createContext();
// const initState = {
//   isAuth: localStorage.getItem("token") !== null ? true : false,
//   user: localStorage.getItem("user"),
//   token: localStorage.getItem("token"),
//   projectID: localStorage.getItem("projectID"),
//   projectName: localStorage.getItem("projectName")
// };

// const reducer = (state, action) => {
//   switch(action.type) {
//     case "LOGIN":
//       localStorage.setItem("user", JSON.stringify(action.payload.user));
//       localStorage.setItem("token", JSON.stringify(action.payload.token));
//       return {
//         ...state,
//         isAuth: true,
//         user: action.payload.user,
//         token: action.payload.token
//       };
    
//     case "LOGOUT": 
//       localStorage.clear();
//       return {
//         ...state,
//         isAuth: false,
//         user: null,
//         token: null,
//         projectID: null,
//         projectName: null
//       };
    
//     case "PROJECT":
//       localStorage.setItem("projectID", JSON.stringify(action.payload.id));
//       localStorage.setItem("projectName", JSON.stringify(action.payload.name));
//       return {
//         ...state,
//         projectId: action.payload.id,
//         projectName: action.payload.name
//       };
    
//     default:
//       return state;
//   }
// };

export default function App() {
    return (
      // Dev Note: When adding a new Route, make sure to follow redirect examples to ensure login
      // See path="/" for an example

      // Dev Note: When adding a new page, make sure to surround it with <TopAndSideBar>, see path="/" for an example
      <AuthContextProvider>
        <AuthContext.Consumer>
          {({state, dispatch}) => (
            <div className="wrapper">
              {state.isAuth ? <AuthApp /> : <UnAuthApp />}
            </div>
          )}
        </AuthContext.Consumer>
      </AuthContextProvider>
      
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
        <Route exact path="/Billing">
          <TopAndSideBar page="Billing"><Billing /></TopAndSideBar>
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
