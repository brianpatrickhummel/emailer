import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";
import "../../index.css";

class SurveyList extends Component {
  // action creator pulls list of user's surveys from MongoDB each time component mounts
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    console.log("this.props.surveys = ", this.props.surveys);
    return this.props.surveys.map(survey => {
      return (
        <div key={survey._id} className="col s12">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{survey.title}</span>
              <p>{survey.body}</p>
            </div>
            <div className="card-action" style={{ fontFamily: "IkarosLight" }}>
              <a>
                Yes: <span>{survey.yes.toLocaleString()}</span>
              </a>
              <a>
                No: <span>{survey.no.toLocaleString()}</span>
              </a>
              <a style={{ marginBottom: "40px" }}>Sent On: {new Date(survey.dateSent).toLocaleDateString()}</a>
              <a className="black-text right">
                <i
                  className="material-icons deleteSurveyIcon"
                  id={survey._id}
                  onClick={() => {
                    this.props.deleteModalOpen(survey._id, survey.title);
                  }}
                  style={{ fontSize: "1.7em" }}
                >
                  delete
                </i>
              </a>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
