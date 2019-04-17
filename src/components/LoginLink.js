import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logOut } from 'modules/login';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

export class LoginLink extends Component {
  renderTemplate = () => {
    const { isAuth, logOut } = this.props;

    if (isAuth) {
      return (
        <Link to="/login" className="Header__link" onClick={logOut}>
          Выйти
        </Link>
      );
    }

    return (
      <Link to="/login" className="Header__link">
        Войти
      </Link>
    );
  };
  render() {
    return <Fragment>{this.renderTemplate()}</Fragment>;
  }
}

LoginLink.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
});

export default connect(
  null,
  mapDispatchToProps
)(LoginLink);
