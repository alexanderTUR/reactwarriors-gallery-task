import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchAlbumsByUserData,
  fetchPhotosByAlbumData,
} from '../redux/gallery/gallery';

const mapStateToProps = (state) => state.gallery;

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { fetchAlbumsByUserData, fetchPhotosByAlbumData },
    dispatch
  );

export const withGallery = (Component) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class withGallery extends React.Component {
      render() {
        return <Component {...this.props} />;
      }
    }
  );
