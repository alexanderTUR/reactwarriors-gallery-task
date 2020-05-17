import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as galleryActions from '../redux/gallery/gallery.actions';

const mapStateToProps = (state) => {
  return state.galleryReduccer;
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(galleryActions, dispatch);

export const withRedux = (Component) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class withRedux extends React.Component {
      render() {
        return <Component {...this.props} />;
      }
    }
  );
