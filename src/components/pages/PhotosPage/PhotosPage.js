import React, { Component } from 'react';
import { withRedux } from '../../../hoc/withRedux';
import {
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  Modal,
  Carousel,
  Card,
} from 'react-bootstrap';

class PhotosPage extends Component {
  state = {
    showModal: false,
    activeCarouselIndex: 1,
  };

  toggleModalShow = (index) => {
    this.setState({
      showModal: !this.state.showModal,
      activeCarouselIndex: index,
    });
  };

  handleCarouselSelect = (selectedIndex, e) => {
    this.setState({
      activeCarouselIndex: selectedIndex,
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchPhotosByAlbumData(
      `https://jsonplaceholder.typicode.com/albums/${id}/photos`,
      id
    );
  }

  render() {
    const { id } = this.props.match.params;
    const photos = this.props.photos[id];
    const { photosIsErrored, photosIsLoading } = this.props;
    return (
      <>
        <Container className="pt-3 pb-3">
          {photosIsErrored[id] ? (
            <Row className="justify-content-center">
              <Col md="auto">
                <Alert variant="danger">
                  Sorry! There was an error loading photos.
                </Alert>
              </Col>
            </Row>
          ) : photosIsLoading[id] ? (
            <Row className="justify-content-center">
              <Col md="auto">
                <Spinner animation="border" variant="secondary" />
              </Col>
            </Row>
          ) : (
            <Row xs={1} md={2} lg={4}>
              {photos.map((photo, index) => (
                <Col key={photo.id}>
                  <Card
                    bg="secondary"
                    text="white"
                    className="mt-3 mb-3 user-card"
                  >
                    <Card.Img
                      variant="top"
                      src={photo.thumbnailUrl}
                      onClick={this.toggleModalShow.bind(this, index)}
                    />
                    <Card.Body>
                      <Card.Title>{photo.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
        <Modal
          show={this.state.showModal}
          onHide={this.toggleModalShow}
          centered
        >
          <Carousel
            interval={null}
            indicators={false}
            activeIndex={this.state.activeCarouselIndex}
            onSelect={this.handleCarouselSelect}
          >
            {photos.map((photo) => (
              <Carousel.Item key={photo.id}>
                <img
                  className="d-block w-100"
                  src={photo.url}
                  alt={photo.title}
                />
                <Carousel.Caption>
                  <p>{photo.title}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal>
      </>
    );
  }
}

export default withRedux(PhotosPage);
