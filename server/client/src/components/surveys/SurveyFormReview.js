// displays form data for user to review

import React from "react";
import { connect } from "react-redux";

const SurveyFormReview = ({ onCancel, formValues }) => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <button onClick={onCancel} type="cancel" className="btn-flat yellow darken-3">
        <i className="material-icons right">arrow_back</i>
        Back
      </button>
    </div>
  );
};

// Define values from Redux Store to pass as props to this component
function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps)(SurveyFormReview);
