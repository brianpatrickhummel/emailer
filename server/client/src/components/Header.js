import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
            <a href="/api/logout">LogOut</a>
          </li>
        );
    }
  }

  render() {
    // test value of auth prop received from state
    // console.log(this.props);
    return (
      <nav>
        {
          <div className="nav-wrapper">
            <Link
              to={this.props.auth ? "/surveys" : "/"}
              className="left brand-logo"
            >
              Emailer
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
