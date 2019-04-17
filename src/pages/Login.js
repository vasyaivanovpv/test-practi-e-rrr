import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logIn, resetWarning } from 'modules/login';
import { PropTypes } from 'prop-types';
import { validateEmail, validatePassword } from 'utils/validateInputs';

import './Login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };
  componentDidMount() {
    const { errorMsg, resetWarning } = this.props;
    if (errorMsg) {
      resetWarning();
    }
  }
  handleChangeInputValue = e => {
    const { id, value } = e.currentTarget;
    this.setState({
      [id]: value,
    });
  };
  validateInputs = value => {
    const { email, password } = this.state;
    if (!validateEmail(email)) {
      return false;
    }
    if (!validatePassword(password)) {
      return false;
    }
    return true;
  };
  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { logIn } = this.props;

    logIn(
      {
        email,
        password,
      },
      () => {
        this.setState({
          password: '',
        });
      }
    );
  };
  render() {
    const { email, password } = this.state;
    const { errorMsg, isAuth, isFetching } = this.props;

    if (isAuth) {
      return <Redirect to="/profile" />;
    }
    return (
      <Fragment>
        <h1>Login page</h1>
        <form onSubmit={this.handleSubmit} className="Login__form">
          <label htmlFor="email" className="Login__label">
            email
          </label>
          <input
            id="email"
            type="text"
            onChange={this.handleChangeInputValue}
            value={email}
            placeholder="example@gmail.com"
            className="Login__input"
          />
          <label htmlFor="password" className="Login__label">
            password
          </label>
          <input
            id="password"
            type="text"
            onChange={this.handleChangeInputValue}
            value={password}
            className="Login__input"
          />
          <button
            type="submit"
            className="Login__button"
            disabled={!this.validateInputs() || isFetching}
          >
            {isFetching ? 'Cheking...' : 'LogIn'}
          </button>
        </form>
        {errorMsg && <p className="Login__warning">{errorMsg}</p>}
      </Fragment>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  resetWarning: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
  errorMsg: store.login.errorMsg,
  isAuth: store.login.isAuth,
  isFetching: store.login.isFetching,
});
const mapDispatchToProps = dispatch => ({
  logIn: (params, cbFail) => dispatch(logIn(params, cbFail)),
  resetWarning: () => dispatch(resetWarning()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
