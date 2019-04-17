import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getProfile } from 'modules/profile';

import ProfileContent from 'pages/profile/ProfileContent';

import './Profile.css';

export class Profile extends Component {
  componentDidMount() {
    const { getProfile, id } = this.props;

    getProfile(id);
  }
  render() {
    const { user, profile } = this.props;

    return (
      <Fragment>
        <h1>Profile</h1>
        <p className="Profile__greeting">Hello, {user.name}</p>
        {profile.data && (
          <ProfileContent
            profile={profile.data}
            isFetching={profile.isFetching}
            errorMsg={profile.errorMsg}
          />
        )}
      </Fragment>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  user: store.login.user,
  id: store.login.id,
  profile: store.profile,
});

const mapDispatchToProps = dispatch => ({
  getProfile: id => dispatch(getProfile(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
