import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withGallery } from '../../../hoc/withGallery';
import { AlbumCard } from './AlbumCard';
import { Error } from '../../../components/ui/Error';
import { Loader } from '../../../components/ui/Spinner';

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
              <Error>
                <p>Sorry! There was an error loading albums.</p>
              </Error>
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
              <Loader />
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
