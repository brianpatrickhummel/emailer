import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux"; // named exports.....{ name }

import App from "./components/App"; // a default export.....no braces
import reducers from './reducers';

// Create our Redux Store, pass in reducers, empty state object and the applyMiddleware method
const store = createStore(reducers, {}, applyMiddleware());

// Wrap our root level component in the Provider tag to connect Redux with React
ReactDOM.render(
  <Provider store={store}><App /></Provider>, 
  document.querySelector("#root")
);