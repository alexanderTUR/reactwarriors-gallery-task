import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsersData } from '../redux/users/users';

const mapStateToProps = (state) => state.users;

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUsersData }, dispatch);

export const withUsers = (Component) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class withUsers extends React.Component {
      render() {
        return <Component {...this.props} />;
      }
    }
  );
