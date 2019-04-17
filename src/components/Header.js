import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import LoginLink from 'components/LoginLink';

//css
import './Header.css';

export class Header extends Component {
  render() {
    const { isAuth } = this.props;
    return (
      <header className="Header">
        <div className="Header__section">
          <NavLink
            exact
            to="/"
            className="Header__link"
            activeClassName="Header__link_active"
          >
            Главная
          </NavLink>
          <NavLink
            to="/news"
            className="Header__link"
            activeClassName="Header__link_active"
          >
            Новости
          </NavLink>
        </div>
        <div className="Header__section">
          {isAuth && (
            <NavLink
              to="/profile"
              className="Header__link"
              activeClassName="Header__link_active"
            >
              Профиль
            </NavLink>
          )}
          <LoginLink isAuth={isAuth} />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
  isAuth: store.login.isAuth,
});

export default connect(mapStateToProps)(Header);
