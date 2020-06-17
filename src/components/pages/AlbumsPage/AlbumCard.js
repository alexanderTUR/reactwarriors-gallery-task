import React, { Component } from 'react';
import { Alert, Card, Button, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withGallery } from '../../../hoc/withGallery';

class AlbumCardView extends Component {
  componentDidMount() {
    const { album } = this.props;
    this.props.fetchPhotosByAlbumData(album.id);
  }

  photosLoadingInProgress = () => {
    const { photos, albums, photosIsLoading, album } = this.props;
    return (
      Object.keys(photos).length === 0 ||
      Object.keys(album).length === 0 ||
      Object.keys(albums).length === 0 ||
      photosIsLoading[album.id]
    );
  };

  render() {
    const { album, photos, photosIsErrored, userId } = this.props;

    if (photosIsErrored[album.id]) {
      return (
        <Card.Body>
          <Alert variant="danger">
            Sorry! There was an error loading album.
          </Alert>
        </Card.Body>
      );
    }

    if (this.photosLoadingInProgress()) {
      return (
        <Card.Body className="text-center">
          <Spinner animation="border" variant="light" />
        </Card.Body>
      );
    }

    return (
      <Card bg="secondary" text="white" className="mt-3 mb-3 user-card">
        <Card.Img variant="top" src={photos[album.id][0].thumbnailUrl} />
        <Card.Body>
          <Card.Title>{photos[album.id][0].title}</Card.Title>
          <Card.Text>{`Photos in album: ${photos[album.id].length}`}</Card.Text>
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

export const AlbumCard = withGallery(AlbumCardView);
