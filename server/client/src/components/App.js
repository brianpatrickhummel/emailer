import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import styled from "styled-components";
import "../index.css";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import SurveyFeedback from "./surveys/SurveyFeedback";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser(); // when app launches call the fetchUser action creator
  }

  render() {
    const Wrapper = styled.div`
      font-family: "Cassanet";
      height: 100%;
    `;

    return (
      <div>
        <BrowserRouter>
          {/* Container class adds Materialize margins */}
          <Wrapper className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Route path="/surveys/feedback" component={SurveyFeedback} />
          </Wrapper>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
