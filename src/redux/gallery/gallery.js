import { createSlice } from '@reduxjs/toolkit';
import { callApi } from '../../utils/callApi';

const initialState = {
  albumsIsErrored: false,
  albumsIsLoading: false,
  albums: [],
  photosIsErrored: {},
  photosIsLoading: {},
  photos: {},
};

const gallery = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    fetchAlbumsByUserError: (state, action) => {
      state.albumsIsErrored = action.payload;
    },
    fetchAlbumsByUserLoading: (state, action) => {
      state.albumsIsLoading = action.payload;
    },
    fetchAlbumsByUserSuccess: (state, action) => {
      state.albums = action.payload;
    },
    fetchPhotosByAlbumError: (state, action) => {
      state.photosIsErrored = {
        ...state.photosIsErrored,
        [action.payload.id]: action.payload.isErrored,
      };
    },
    fetchPhotosByAlbumLoading: (state, action) => {
      state.photosIsLoading = {
        ...state.photosIsLoading,
        [action.payload.albumId]: action.payload.isLoading,
      };
    },
    fetchPhotosByAlbumSuccess: (state, action) => {
      state.photos = {
        ...state.photos,
        [action.payload.albumId]: action.payload.photos,
      };
    },
  },
});

export default gallery.reducer;

const {
  fetchAlbumsByUserError,
  fetchAlbumsByUserLoading,
  fetchAlbumsByUserSuccess,
  fetchPhotosByAlbumError,
  fetchPhotosByAlbumLoading,
  fetchPhotosByAlbumSuccess,
} = gallery.actions;

export const fetchAlbumsByUserData = (userId) => {
  return (dispatch) => {
    dispatch(fetchAlbumsByUserLoading(true));

    callApi(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
      .then((albums) => {
        dispatch(fetchAlbumsByUserLoading(false));
        dispatch(fetchAlbumsByUserSuccess(albums));
      })
      .catch(() => dispatch(fetchAlbumsByUserError(true)));
  };
};

export const fetchPhotosByAlbumData = (albumId) => {
  return (dispatch) => {
    dispatch(fetchPhotosByAlbumLoading({ albumId: albumId, isLoading: true }));

    callApi(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      .then((photos) => {
        dispatch(fetchPhotosByAlbumSuccess({ albumId, photos }));
        dispatch(
          fetchPhotosByAlbumLoading({ albumId: albumId, isLoading: false })
        );
      })
      .catch(() =>
        dispatch(fetchPhotosByAlbumError({ albumId: albumId, isErrored: true }))
      );
  };
};
