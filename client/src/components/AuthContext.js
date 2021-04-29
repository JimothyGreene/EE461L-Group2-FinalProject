import React from "react";
import axios from 'axios';
export const AuthContext = React.createContext();
const initState = {
  isAuth: localStorage.getItem("token") !== null ? true : false,
  user: localStorage.getItem("user"),
  token: localStorage.getItem("token"),
  projectID: localStorage.getItem("projectID"),
  projectName: localStorage.getItem("projectName"),
  projectOID: localStorage.getItem("projectOID")
};

const reducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token).replace(/['"]+/g, ''));
      console.log("Bearer Token: ", `Bearer ${JSON.stringify(action.payload.token).replace(/['"]+/g, '')}`);

      //axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(action.payload.token).replace(/['"]+/g, '')}`;
      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
        token: action.payload.token.replace(/['"]+/g, '')
      };
    
    case "LOGOUT": 
      localStorage.clear();
      axios.defaults.headers.common['Authorization'] = "";
      return {
        ...state,
        isAuth: false,
        user: null,
        token: null,
        projectID: null,
        projectName: null,
        projectOID: null,
      };
    
    case "PROJECT":
      localStorage.setItem("projectID", JSON.stringify(action.payload.id));
      localStorage.setItem("projectName", JSON.stringify(action.payload.name));
      localStorage.setItem("projectOID", JSON.stringify(action.payload.oid))
      return {
        ...state,
        projectID: action.payload.id,
        projectName: action.payload.name,
        projectOID: action.payload.oid
      };

    case "CLEAR_PROJECT":
      localStorage.removeItem("projectID");
      localStorage.removeItem("projectName");
      localStorage.removeItem("projectOID");
      return {
        ...state,
        projectID: null,
        projectName: null,
        projectOID: null,
      }
    
    default:
      return state;
  }
};

export const AuthContextProvider = props => {
    const [state, dispatch] = React.useReducer(reducer, initState);

    axios.interceptors.response.use(undefined, function checkToken(err) {
      if(err.response.status === 401 && err.config.url.contains("users/")) {
          alert("Login expired, please login again.");
          dispatch({type: "LOGOUT"});
      }
    });

    return (
        <AuthContext.Provider value={{
            state,
            dispatch
          }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}