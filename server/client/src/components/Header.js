import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";
import styled from "styled-components";
import { Icon } from "react-materialize";
import FontAwesome from "react-fontawesome";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return; // if still processing, leave this area of Header blank
      case false:
        return (
          <li>
            <a href="/auth/google">LogIn With Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="2" style={{ margin: "0 10px 0 25px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="3">
            <a href="/api/logout">LogOut</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav>
        {
          <div className="nav-wrapper">
            <Link to={this.props.auth ? "/surveys" : "/"} className="left brand-logo" style={{ margin: "0 30px" }}>
              <FontAwesome name="paper-plane" />
            </Link>
            <ul className="right">{this.renderContent()}</ul>
          </div>
        }
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
