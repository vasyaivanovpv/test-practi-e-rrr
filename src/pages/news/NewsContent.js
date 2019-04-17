import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewsContent.css';

export default class NewsContent extends Component {
  state = {
    isLoading: true,
  };
  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }
  render() {
    const { news, isFetching, errorMsg } = this.props;
    const { isLoading } = this.state;
    if (errorMsg) {
      return <p>{errorMsg}</p>;
    }
    if (isLoading || isFetching) {
      return <p>Loading...</p>;
    } else {
      return (
        <div className="NewsContent">
          {news.map(item => (
            <section key={item.id} className="NewsContent__section">
              <p className="NewsContent__title">{item.title}</p>
              <p className="NewsContent__text">{item.text}</p>
            </section>
          ))}
        </div>
      );
    }
  }
}

NewsContent.propTypes = {
  news: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string,
};
