// Shows form for user input

import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  componentDidMount() {
    if (this.props.addActive) {
      this.props.addActive();
    }
  }

  renderFields() {
    return formFields.map(({ label, name }) => {
      return <Field key={name} label={label} name={name} type="text" component={SurveyField} />;
    });
  }

  render() {
    return (
      <div>
        {/* calling redux-form handleSubmit method an passing the onSurveySubmit fn passed from SurveyNew.js */}
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <div style={{ marginTop: "65px" }}>
            <Link to="/surveys" className="red btn-flat left white-text">
              Cancel
              <i className="material-icons right">arrow_back</i>
            </Link>
            <button type="Submit" className="teal btn-flat right white-text">
              Next
              <i className="material-icons right">done</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

// Defining the reduxForm validate function to evaluate the "values" from our Form
const validate = values => {
  const errors = {};

  // Pass email string to our validateEmails /utils fn, if returned gets assigned to errors object
  errors.recipients = validateEmails(values.recipients || "");

  // For each field in FIELDS object, check if the values object has a corresponding key name, if not then push the respective error message from the FIELDS object to the ERRORS object
  formFields.forEach(({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
