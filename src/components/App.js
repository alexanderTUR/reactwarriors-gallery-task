import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Header } from './Header';
import { UsersPage } from './pages/UsersPage/UsersPage';
import { AlbumsPage } from './pages/AlbumsPage/AlbumsPage';
import { PhotosPage } from './pages/PhotosPage/PhotosPage';

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Header></Header>
          <main>
            <Route exact path="/" component={UsersPage} />
            <Route exact path="/user/:userId/albums" component={AlbumsPage} />
            <Route
              exact
              path="/user/:userId/albums/:albumId"
              component={PhotosPage}
            />
          </main>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
