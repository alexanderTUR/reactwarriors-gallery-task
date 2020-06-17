import React, { Component } from 'react';
import { withRouter, matchPath } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Breadcrumb, Container } from 'react-bootstrap';

class HeaderView extends Component {
  render() {
    const { location } = this.props;
    const isAlbumsPath = matchPath(location.pathname, {
      path: '/user/:userId/albums/:albumsId',
    });

    return (
      <header>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container>
            <Breadcrumb className="gallery-breadcrumbs">
              <LinkContainer to="/">
                <Breadcrumb.Item>Users</Breadcrumb.Item>
              </LinkContainer>
              {isAlbumsPath && (
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

export const Header = withRouter(HeaderView);
