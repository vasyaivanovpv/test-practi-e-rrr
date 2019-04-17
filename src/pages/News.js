import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getNews } from 'modules/news';
import { PropTypes } from 'prop-types';

import NewsContent from 'pages/news/NewsContent';

export class News extends Component {
  componentDidMount() {
    const { getNews } = this.props;

    getNews('/news');
  }
  render() {
    const { news } = this.props;
    return (
      <Fragment>
        <h1>News page</h1>

        {news.data && (
          <NewsContent
            news={news.data}
            errorMsg={news.errorMsg}
            isFetching={news.isFetching}
          />
        )}
      </Fragment>
    );
  }
}

News.propTypes = {
  getNews: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  news: store.news,
});

const mapDispatchToProps = dispatch => ({
  getNews: endPoint => dispatch(getNews(endPoint)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
