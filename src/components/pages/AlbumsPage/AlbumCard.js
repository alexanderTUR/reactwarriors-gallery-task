import React, { Component } from 'react';
import { Alert, Card, Button, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRedux } from '../../../hoc/withRedux';

class AlbumCard extends Component {
  componentDidMount() {
    const { album } = this.props;
    this.props.fetchPhotosByAlbumData(
      `https://jsonplaceholder.typicode.com/albums/${album.id}/photos`,
      album.id
    );
  }

  render() {
    const { album } = this.props;
    const { photos, photosIsErrored, photosIsLoading, userId } = this.props;
    return (
      <Card bg="secondary" text="white" className="mt-3 mb-3 user-card">
        {photosIsErrored[album.id] ? (
          <Card.Body>
            <Alert variant="danger">
              Sorry! There was an error loading album.
            </Alert>
          </Card.Body>
        ) : photosIsLoading[album.id] ? (
          <Card.Body className="text-center">
            <Spinner animation="border" variant="light" />
          </Card.Body>
        ) : (
          Object.keys(photos).length && (
            <>
              <Card.Img variant="top" src={photos[album.id][0].thumbnailUrl} />
              <Card.Body>
                <Card.Title>{photos[album.id][0].title}</Card.Title>
                <Card.Text>{`Photos in album: ${
                  photos[album.id].length
                }`}</Card.Text>
                <LinkContainer to={`/user/${userId}/albums/${album.id}`}>
                  <Button variant="outline-light" size="sm" block>
                    Show Photos
                  </Button>
                </LinkContainer>
              </Card.Body>
            </>
          )
        )}
      </Card>
    );
  }
}

export default withRedux(AlbumCard);
