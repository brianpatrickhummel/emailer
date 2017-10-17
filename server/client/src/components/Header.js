import React, { Component } from "react";
import { connect } from "react-redux";

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
        return (
          <li>
            <a>LogOut</a>
          </li>
        );
    }
  }

  render() {
    // test value of auth prop received from state
    // console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="left brand-logo">
            Emailer
          </a>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
