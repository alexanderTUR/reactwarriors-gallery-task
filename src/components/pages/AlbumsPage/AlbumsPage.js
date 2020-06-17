import React, { Component } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { withGallery } from '../../../hoc/withGallery';
import { AlbumCard } from './AlbumCard';

class AlbumsPageView extends Component {
  componentDidMount() {
    const { userId } = this.props.match.params;
    this.props.fetchAlbumsByUserData(userId);
  }

  render() {
    const { albumsIsLoading, albumsIsErrored, albums } = this.props;

    if (albumsIsErrored) {
      return (
        <Container className="pt-3 pb-3">
          <Row className="justify-content-center">
            <Col md="auto">
              <Alert variant="danger">
                Sorry! There was an error loading albums.
              </Alert>
            </Col>
          </Row>
        </Container>
      );
    }

    if (albumsIsLoading) {
      return (
        <Container className="pt-3 pb-3">
          <Row className="justify-content-center">
            <Col md="auto">
              <Spinner animation="border" variant="secondary" />
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Container className="pt-3 pb-3">
        <Row xs={1} md={2} lg={4}>
          {albums.map((album) => (
            <Col key={album.id}>
              <AlbumCard
                album={album}
                userId={this.props.match.params.userId}
              ></AlbumCard>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export const AlbumsPage = withGallery(AlbumsPageView);
