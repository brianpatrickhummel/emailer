// shows SurveyForm and SurveyFormReview components

import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  // make use of component-based state to manage rendering of sub-components
  state = { showFormReview: false, labelActive: false };

  renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false, labelActive: true })} />;
    } else if (this.state.labelActive) {
      return (
        <SurveyForm
          onSurveySubmit={() => this.setState({ showFormReview: true })}
          addActive={() => {
            var d = document.getElementsByClassName("labels");
            for (var i = 0; i < d.length; i++) {
              d[i].className += " active";
            }
          }}
        />
      );
    }
    return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({ form: "surveyForm" })(SurveyNew);
