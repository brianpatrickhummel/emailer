// client root-level index.js

import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux"; // named exports.....{ name }
import reduxThunk from "redux-thunk";

import App from "./components/App"; // a default export.....no braces
import reducers from "./reducers";

// Temp for testing SendGrid emails directly from Chrome Console
import axios from "axios";
window.axios = axios;

// Create our Redux Store, pass in reducers, empty state object and the applyMiddleware method
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Wrap our root level component in the Provider tag to connect Redux with React
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
