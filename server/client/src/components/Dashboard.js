import React, { Component } from "react";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";
import { connect } from "react-redux";
import Modal from "react-modal";
import { Button } from "react-materialize";
import styled from "styled-components";
import { deleteSurvey } from "../actions";
import "../index.css";

class Dashboard extends Component {
  // Create local state for reference by the conditional governing display of modal dialog box
  state = {
    modalIsOpen: false,
    count: 0,
    hasCredits: false,
    deleteModalIsOpen: false,
    deleteId: null,
    deleteTitle: null
  };

  componentDidMount() {
    console.log("component did mount - this.props.auth= ", this.props.auth);
    if (this.props.auth) {
      // If user has no credits, display the modal dialog w instructions for testing the app
      if (this.props.auth.credits < 1 && this.state.count === 0) {
        this.setState({ modalIsOpen: true, count: 1 });
        // If user just purchased credits, adjust state so that Add Survey button will render
      } else if (!this.state.hasCredits && this.props.auth.credits > 1) {
        this.setState({ hasCredits: true });
      }
    }
  }

  componentWillReceiveProps() {
    console.log("component will receive props - this.props.auth= ", this.props.auth);
  }

  componentDidUpdate() {
    console.log("component did update - this.props.auth= ", this.props.auth);
    if (this.props) {
      // If user has no credits, display the modal dialog w instructions for testing the app
      if (this.props.auth.credits < 1 && this.state.count === 0) {
        this.setState({ modalIsOpen: true, count: 1 });
        // If user just purchased credits, adjust state so that Add Survey button will render
      } else if (!this.state.hasCredits && this.props.auth.credits > 0) {
        this.setState({ hasCredits: true });
      }
    }
  }

  deleteModalOpen = (id, title) => {
    this.setState({ deleteModalIsOpen: true, deleteId: id, deleteTitle: title });
  };

  deleteModalClose = () => {
    this.setState({ deleteModalIsOpen: false });
  };

  render() {
    // Add Survey button is rendered only if local state indicates user has > 0 credits
    var addButton = null;
    if (this.state.hasCredits) {
      addButton = (
        <div className="fixed-action-btn">
          <Link
            to={"/surveys/new"}
            id="addNewSurveyButton"
            className="btn-floating btn-large pulse waves-effect waves-light waves-circle red lighten-2"
          >
            <i className="large material-icons" style={{ fontSize: "50px" }}>
              add
            </i>
          </Link>
        </div>
      );
    }

    return (
      <div className="dashboardContainer">
        <SurveyList deleteModalOpen={this.deleteModalOpen} />
        {addButton}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          style={modalStyle}
        >
          <div>
            <p style={{ display: "inline-block" }}>
              To test the application, click the
              <ModalImage src={require("../images/modalButton.png")} />button
            </p>
            <p>
              Enter CC# <span style={{ color: "#6A9CB9", fontSize: "24px", margin: "0 7px" }}>
                4242 4242 4242 4242
              </span>{" "}
              & false data for the remaining fields.
            </p>
            <p style={{ display: "inline-block" }}>Once credits have been purchased, click the</p>
            <ModalImage2 src={require("../images/addButton.png")} />button to create a survey
          </div>
          <br />
          <Button
            waves="light"
            style={{ backgroundColor: "#53849F" }}
            onClick={() => this.setState({ modalIsOpen: false })}
          >
            OK
          </Button>
        </Modal>
        <Modal
          isOpen={this.state.deleteModalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={modalStyle2}
          contentLabel="Example Modal"
        >
          <i className="large material-icons" id="stopHand">
            pan_tool
          </i>
          <p style={{ letterSpacing: "0.03em" }} id="warnStatement">
            Permanently delete this survey?{" "}
          </p>
          <h4
            id="deleteTitle"
            style={{
              color: "#FCC2C5",
              fontWeight: "bolder",
              marginTop: "30px",
              letterSpacing: "0.1em",
              backgroundColor: "#6C5455",
              borderRadius: "25px",
              padding: "10px"
            }}
          >
            {this.state.deleteTitle}
          </h4>
          <Button
            waves="light"
            onClick={() => this.setState({ deleteModalIsOpen: false })}
            className="left"
            id="deleteSurveyCancelButton"
          >
            Cancel
          </Button>
          <Button
            waves="light"
            onClick={() => {
              this.setState({ deleteModalIsOpen: false });
              this.props.deleteSurvey(this.state.deleteId);
              console.log("survey to be deleted: " + this.state.deleteId);
            }}
            className="right"
            id="deleteSurveyButton"
          >
            Delete
          </Button>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  console.log("mapped state to props");
  return { auth };
}

export default connect(mapStateToProps, { deleteSurvey })(Dashboard);

const ModalImage = styled.img`
  width: 125px;
  height: auto;
  display: inline-block;
  margin: 0 8px -6px 8px;
`;

const ModalImage2 = styled.img`
  width: 53px;
  height: auto;
  display: inline-block;
  margin: 0 0 -19px 0;
`;

const modalStyle = {
  content: {
    textAlign: "center",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "50px",
    color: "rgb(236,111,117)",
    backgroundColor: "rgba(66,57,58,0.9)",
    border: "1px solid white",
    borderRadius: "10px",
    fontFamily: "IkarosLight",
    fontSize: "20px",
    textTransform: "uppercase"
  }
};

const modalStyle2 = {
  content: {
    textAlign: "center",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "50px",
    color: "rgb(236,111,117)",
    backgroundColor: "rgba(66,57,58,1)",
    border: "1px solid white",
    borderRadius: "10px",
    fontFamily: "IkarosLight",
    fontSize: "20px",
    textTransform: "uppercase"
  }
};
