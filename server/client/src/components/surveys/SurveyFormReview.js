// displays form data for user to review

import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = formFields.map(({ label, name }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>{reviewFields}</div>
      <button onClick={onCancel} type="cancel" className="btn-flat yellow darken3 white-text">
        <i className="material-icons right">arrow_back</i>
        Back
      </button>
      <button
        type="submit"
        onClick={() => submitSurvey(formValues, history)}
        className="btn-flat green right white-text"
      >
        <i className="material-icons right">email</i>
        Send Survey
      </button>
    </div>
  );
};

// Define values from Redux Store to pass as props to this component
function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
