// action creators index.js
// redux-thunk is already loaded into our Redux Store as a middleware

import axios from "axios";
import { FETCH_USER } from "./types";
import { FETCH_SURVEYS } from "./types";

// Gather User Model from MongoDB (for credits/survey data)
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  // Pass updated User Model to Redux Store
  dispatch({ type: FETCH_USER, payload: res.data }); // user profile info is stored in .data
};

// Bill user via Stripe, increase credits on User Model
export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  // Pass updated User Model to Redux Store (+ credits)
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Upload new survey, send email, decrease credits on User Model
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post("/api/surveys", values);

  // Redirect via history object provided by withRouter helper
  history.push("/surveys");

  // Pass updated User Model to Redux Store (- credits, new Survey)
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
