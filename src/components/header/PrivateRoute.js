import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  render() {
    const { component: Profile, isAuth, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          isAuth ? (
            <Profile {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                from: props.location,
              }}
            />
          )
        }
      />
    );
  }
}

function mapStateToProps(store) {
  return {
    isAuth: store.login.isAuth,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
