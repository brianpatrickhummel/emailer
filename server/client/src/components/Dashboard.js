import React, { Component } from "react";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";
import { connect } from "react-redux";
import Modal from "react-modal";
import { Button } from "react-materialize";
import styled from "styled-components";
import "../index.css";

class Dashboard extends Component {
  // Create local state for reference by the conditional governing display of modal dialog box
  state = { modalIsOpen: false, count: 0, hasCredits: false };

  componentDidUpdate() {
    // If user has no credits, display the modal dialog w instructions for testing the app
    if (this.props.auth.credits < 1 && this.state.count === 0) {
      this.setState({ modalIsOpen: true, count: 1 });
      // If user just purchased credits, adjust state so that Add Survey button will render
    } else if (!this.state.hasCredits && this.props.auth.credits > 1) {
      this.setState({ hasCredits: true });
    }
  }

  render() {
    // Add Survey button is rendered only if local state indicates user has > 0 credits
    var addButton = null;
    if (this.state.hasCredits) {
      addButton = (
        <div className="fixed-action-btn">
          <Link
            to={"/surveys/new"}
            className="btn-floating btn-large pulse waves-effect waves-light waves-circle red lighten-2"
            style={{ marginRight: "20px", marginBottom: "20px" }}
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
        <SurveyList />
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
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Dashboard);

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
