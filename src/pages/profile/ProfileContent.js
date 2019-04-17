import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';

import './ProfileContent.css';

export default class ProfileContent extends Component {
  state = {
    isLoading: true,
  };
  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }
  renderList = arr => {
    return arr.map(item => <li key={item}>{item}</li>);
  };
  renderListOfLinks = arr => {
    return arr.map(item => (
      <li key={item.label}>
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          <i>{item.label}</i>
        </a>
      </li>
    ));
  };
  render() {
    const { profile, errorMsg, isFetching } = this.props;
    const { isLoading } = this.state;

    if (errorMsg) {
      return <p>{errorMsg}</p>;
    }
    if (isLoading || isFetching) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <section className="ProfileContent">
            <h3 className="ProfileContent__caption">
              Город: <span>{profile.city}</span>
            </h3>
            <h3 className="ProfileContent__caption">Знание языков:</h3>
            <ul className="ProfileContent__list">
              {this.renderList(profile.languages)}
            </ul>
            <h3 className="ProfileContent__caption">Ссылки:</h3>
            <ul className="ProfileContent__list">
              {this.renderListOfLinks(profile.social)}
            </ul>
          </section>
        </Fragment>
      );
    }
  }
}

ProfileContent.propTypes = {
  profile: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string,
};
