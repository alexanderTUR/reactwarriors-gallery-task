import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Breadcrumb, Container } from 'react-bootstrap';

class Header extends Component {
  render() {
    const { location } = this.props;
    const albumsPath = /\/user\/(\d+)\/albums\/(\d+)$/;
    return (
      <header>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container>
            <Breadcrumb className="gallery-breadcrumbs">
              <LinkContainer to="/">
                <Breadcrumb.Item>Users</Breadcrumb.Item>
              </LinkContainer>
              {albumsPath.test(location.pathname) && (
                <LinkContainer to={location.pathname.replace(/\/(\d+)$/, '')}>
                  <Breadcrumb.Item>Back to users albums</Breadcrumb.Item>
                </LinkContainer>
              )}
            </Breadcrumb>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(Header);
