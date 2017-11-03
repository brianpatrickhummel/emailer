// displays form data for user to review

import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = formFields.map(({ label, name }) => {
    return (
      <div key={name} style={{ marginBottom: "30px" }}>
        <label style={{ fontSize: "18px", color: "#ee6e73" }}>{label}</label>
        <div className="white-text">{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div style={{ marginTop: "50px" }}>
      <h5 className="white-text" style={{ marginBottom: "30px" }}>
        Please confirm your entries
      </h5>
      <div>{reviewFields}</div>
      <div style={{ marginTop: "70px" }}>
        <button onClick={onCancel} type="cancel" className="btn yellow darken-3 white-text">
          <i className="material-icons right">arrow_back</i>
          Back
        </button>
        <button
          type="submit"
          onClick={() => submitSurvey(formValues, history)}
          className="btn blue-grey right white-text"
        >
          <i className="material-icons right">email</i>
          Send Survey
        </button>
      </div>
    </div>
  );
};

// Define values from Redux Store to pass as props to this component
function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
