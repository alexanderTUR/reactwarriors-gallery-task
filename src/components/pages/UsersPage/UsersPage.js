import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Spinner,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withGallery } from '../../../hoc/withGallery';

class UsersPageView extends Component {
  componentDidMount() {
    this.props.fetchUsersData();
  }

  render() {
    const { usersIsErrored, usersIsLoading, users } = this.props;

    if (usersIsErrored) {
      return (
        <Container className="pt-3 pb-3">
          <Row className="justify-content-center">
            <Col md="auto">
              <Alert variant="danger">
                Sorry! There was an error loading users.
              </Alert>
            </Col>
          </Row>
        </Container>
      );
    }

    if (usersIsLoading) {
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
          {users.map((user) => (
            <Col key={user.id}>
              <Card bg="secondary" text="white" className="mt-3 mb-3 user-card">
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>{`Username: ${user.username}`}</Card.Text>
                  <LinkContainer to={`/user/${user.id}/albums`}>
                    <Button variant="outline-light" size="sm" block>
                      Show Albums
                    </Button>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export const UsersPage = withGallery(UsersPageView);
