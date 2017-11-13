import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";
import FontAwesome from "react-fontawesome";
import "../index.css";

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
          <li className="payButton" key="1">
            <Payments />
          </li>,
          <li key="2">Credits: {this.props.auth.credits}</li>,
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
            {/* MaterializeCSS collapsible sidebar menu config - initialized in index.html jQuery script */}
            <a data-activates="mobile-demo" className="button-collapse right">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down top-nav">{this.renderContent()}</ul>
            <ul className="side-nav" id="mobile-demo">
              {this.renderContent()}
            </ul>
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
