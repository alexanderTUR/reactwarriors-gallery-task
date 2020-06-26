import { configureStore } from '@reduxjs/toolkit';
import galleryReduccer from './gallery/gallery';
import usersReduccer from './users/users';

const store = configureStore({
  reducer: { users: usersReduccer, gallery: galleryReduccer },
});

export default store;
