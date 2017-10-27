// Shows form for user input

import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";

const FIELDS = [
  {
    label: "Survey Title",
    name: "title"
  },
  {
    label: "Subject Line",
    name: "subject"
  },
  {
    label: "Email Body",
    name: "body"
  },
  {
    label: "Recipient List",
    name: "emails"
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

  if (!values.title) {
    errors.title = "You must give this survey a title";
  }
  if (!values.subject) {
    errors.subject = "You must provide text for email subject";
  }
  if (!values.body) {
    errors.body = "You must provide text for email body";
  }
  if (!values.emails) {
    errors.emails = "You must provide a emails";
  }

  return errors;
};

export default reduxForm({
  validate,
  form: "surveyForm"
})(SurveyForm);
