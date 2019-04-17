import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from 'pages/Main';
import News from 'pages/News';
import Profile from 'pages/Profile';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import PrivateRoute from 'components/header/PrivateRoute';

export default class Content extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/news" component={News} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}
