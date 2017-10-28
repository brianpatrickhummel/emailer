// Shows form for user input

import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";

const FIELDS = [
  {
    label: "Survey Title",
    name: "title",
    noValueError: "You must give this survey a title"
  },
  {
    label: "Subject Line",
    name: "subject",
    noValueError: "You must provide text for email subject"
  },
  {
    label: "Email Body",
    name: "body",
    noValueError: "You must provide text for email body"
  },
  {
    label: "Recipient List",
    name: "emails",
    noValueError: "You must provide recipient email addresses"
  }
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return <Field key={name} label={label} name={name} type="text" component={SurveyField} />;
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
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
  errors.emails = validateEmails(values.emails || "");

  // For each field in FIELDS object, check if the values object has a corresponding key name, if not then push the respective error message from the FIELDS object to the ERRORS object
  _.each(FIELDS, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  form: "surveyForm"
})(SurveyForm);
