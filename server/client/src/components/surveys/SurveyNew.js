// shows SurveyForm and SurveyFormReview components

import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  // make use of component-based state to manage rendering of sub-component
  state = { showFormReview: false, labelActive: false };

  renderContent() {
    // Display SurveyFormReview, coming from SurveyForm
    if (this.state.showFormReview) {
      return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false, labelActive: true })} />;
    } else if (this.state.labelActive) {
      // Display SurveyForm, returning from SurveyFormReview
      return (
        <SurveyForm
          onSurveySubmit={() => this.setState({ showFormReview: true })}
          addActive={() => {
            // Find all label elements on screen and add class name of active
            var d = document.getElementsByClassName("labels");
            for (var i = 0; i < d.length; i++) {
              d[i].className += " active";
            }
          }}
        />
      );
    }
    // Display SurveyForm, coming from Dashboard
    return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({ form: "surveyForm" })(SurveyNew);
