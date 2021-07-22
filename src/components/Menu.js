import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history, path }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link className="nav-link" to="/" style={currentTab(history, "/")}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/add-project"
            style={currentTab(history, "/add-project")}
          >
            Add Project
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/add-article"
            style={currentTab(history, "/add-article")}
          >
            Add Article
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/user-dashboard"
            style={currentTab(history, "/user-dashboard")}
          >
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to="/message"
            style={currentTab(history, "/message")}
          >
            Message
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/send-message"
            style={currentTab(history, "/send-message")}
          >
            Send Message
          </Link>
        </li>

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                style={currentTab(history, "/signup")}
              >
                SignUp
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signin"
                style={currentTab(history, "/signin")}
              >
                SignIn
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
              className="nav-link text-warning"
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
