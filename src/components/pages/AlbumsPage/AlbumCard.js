import React, { PureComponent } from 'react';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Error } from '../../../components/ui/Error';
import { Loader } from '../../../components/ui/Spinner';
import { connect } from 'react-redux';
import { fetchPhotosByAlbumData } from '../../../redux/gallery/gallery';

class AlbumCardView extends PureComponent {
  componentDidMount() {
    const { album } = this.props;
    this.props.fetchPhotosByAlbumData(album.id);
  }

  photosLoadingInProgress = () => {
    const { photosIsLoading } = this.props;
    if (typeof photosIsLoading === 'undefined') {
      return true;
    }
    return photosIsLoading;
  };

  render() {
    const { album, photos, photosIsErrored, userId } = this.props;

    if (photosIsErrored) {
      return (
        <Card.Body>
          <Error>
            <p>Sorry! There was an error loading album.</p>
          </Error>
        </Card.Body>
      );
    }

    if (this.photosLoadingInProgress()) {
      return (
        <Card.Body className="text-center">
          <Loader />
        </Card.Body>
      );
    }

    const firstPhoto = photos[0];

    return (
      <Card bg="secondary" text="white" className="mt-3 mb-3 user-card">
        <Card.Img variant="top" src={firstPhoto.thumbnailUrl} />
        <Card.Body>
          <Card.Title>{firstPhoto.title}</Card.Title>
          <Card.Text>{`Photos in album: ${photos.length}`}</Card.Text>
          <LinkContainer to={`/user/${userId}/albums/${album.id}`}>
            <Button variant="outline-light" size="sm" block>
              Show Photos
            </Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    );
  }
}

export const AlbumCard = connect(
  (state, props) => {
    const { album } = props;
    return {
      photos: state.gallery.photos[album.id],
      photosIsLoading: state.gallery.photosIsLoading[album.id],
      photosIsErrored: state.gallery.photosIsErrored[album.id],
    };
  },
  { fetchPhotosByAlbumData }
)(AlbumCardView);
