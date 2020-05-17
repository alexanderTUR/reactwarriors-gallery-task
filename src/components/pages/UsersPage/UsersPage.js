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
import { withRedux } from '../../../hoc/withRedux';

class UsersPage extends Component {
  componentDidMount() {
    this.props.fetchUsersData('https://jsonplaceholder.typicode.com/users');
  }

  render() {
    const { usersIsErrored, usersIsLoading, users } = this.props;
    return (
      <Container className="pt-3 pb-3">
        {usersIsErrored ? (
          <Row className="justify-content-center">
            <Col md="auto">
              <Alert variant="danger">
                Sorry! There was an error loading users.
              </Alert>
            </Col>
          </Row>
        ) : usersIsLoading ? (
          <Row className="justify-content-center">
            <Col md="auto">
              <Spinner animation="border" variant="secondary" />
            </Col>
          </Row>
        ) : (
          <Row xs={1} md={2} lg={4}>
            {users.map((user) => (
              <Col key={user.id}>
                <Card
                  bg="secondary"
                  text="white"
                  className="mt-3 mb-3 user-card"
                >
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
        )}
      </Container>
    );
  }
}

export default withRedux(UsersPage);
