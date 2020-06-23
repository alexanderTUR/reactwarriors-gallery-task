import React, { Component } from 'react';
import { withGallery } from '../../../hoc/withGallery';
import { Container, Row, Col, Modal, Carousel, Card } from 'react-bootstrap';
import { Error } from '../../../components/ui/Error';
import { Loader } from '../../../components/ui/Spinner';

class PhotosPageView extends Component {
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
    const { albumId } = this.props.match.params;

    this.props.fetchPhotosByAlbumData(albumId);
  }

  photosLoadingInProgress = () => {
    const {
      photosIsLoading,
      match: { params },
    } = this.props;
    return (
      Object.keys(photosIsLoading).length === 0 ||
      photosIsLoading[params.albumId]
    );
  };

  render() {
    const { albumId } = this.props.match.params;
    const photos = this.props.photos[albumId];
    const { photosIsErrored } = this.props;

    if (photosIsErrored[albumId]) {
      return (
        <Container className="pt-3 pb-3">
          <Row className="justify-content-center">
            <Col md="auto">
              <Error>Sorry! There was an error loading photos.</Error>
            </Col>
          </Row>
        </Container>
      );
    }

    if (this.photosLoadingInProgress()) {
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
      <>
        <Container className="pt-3 pb-3">
          <Row xs={1} md={2} lg={4}>
            {photos.map((photo, index) => (
              <Col key={photo.id}>
                <Card
                  bg="secondary"
                  text="white"
                  className="mt-3 mb-3 photo-card"
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
        </Container>
      </>
    );
  }
}

export const PhotosPage = withGallery(PhotosPageView);
