import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoutes from "./auth/PrivateRoutes";
import Home from "./core/Home";
import Signup from "./core/Signup";
import Signin from "./core/Signin";
import Message from "./core/Message";
import Profile from "./core/Profile";
import Project from "./core/Project";
import Article from "./core/Article";
import UserDashboard from "./core/UserDashboard";
import SendMessage from "./core/SendMessage";
import ReadArticle from "./core/ReadArticle";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoutes path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoutes path="/message" exact component={Message} />
        <PrivateRoutes path="/profile" exact component={Profile} />
        <PrivateRoutes path="/add-project" exact component={Project} />
        <PrivateRoutes path="/add-article" exact component={Article} />
        <PrivateRoutes path="/user-dashboard" exact component={UserDashboard} />
        <PrivateRoutes path="/send-message" exact component={SendMessage} />
        <PrivateRoutes path="/read-article" exact component={ReadArticle} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
