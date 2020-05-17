import React, { Component } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { withRedux } from '../../../hoc/withRedux';
import AlbumCard from './AlbumCard';

class AlbumsPage extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAlbumsByUserData(
      `https://jsonplaceholder.typicode.com/users/${id}/albums`
    );
  }

  render() {
    const { albumsIsLoading, albumsIsErrored, albums } = this.props;
    return (
      <Container className="pt-3 pb-3">
        {albumsIsErrored ? (
          <Row className="justify-content-center">
            <Col md="auto">
              <Alert variant="danger">
                Sorry! There was an error loading albums.
              </Alert>
            </Col>
          </Row>
        ) : albumsIsLoading ? (
          <Row className="justify-content-center">
            <Col md="auto">
              <Spinner animation="border" variant="secondary" />
            </Col>
          </Row>
        ) : (
          <Row xs={1} md={2} lg={4}>
            {albums.map((album) => (
              <Col key={album.id}>
                <AlbumCard
                  album={album}
                  userId={this.props.match.params.id}
                ></AlbumCard>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    );
  }
}

export default withRedux(AlbumsPage);
