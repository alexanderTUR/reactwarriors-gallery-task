import * as types from './gallery.types';

const initialState = {
  usersIsErrored: false,
  usersIsLoading: false,
  users: [],
  albumsIsErrored: false,
  albumsIsLoading: false,
  albums: [],
  photosIsErrored: {},
  photosIsLoading: {},
  photos: {},
};

const galleryReduccer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USERS_ERROR:
      return {
        ...state,
        usersIsErrored: action.payload,
      };
    case types.FETCH_USERS_LOADING:
      return {
        ...state,
        usersIsLoading: action.payload,
      };
    case types.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case types.FETCH_ALBUMS_BY_USER_ERROR:
      return {
        ...state,
        albumsIsErrored: action.payload,
      };
    case types.FETCH_ALBUMS_BY_USER_LOADING:
      return {
        ...state,
        albumsIsLoading: action.payload,
      };
    case types.FETCH_ALBUMS_BY_USER_SUCCESS:
      return {
        ...state,
        albums: action.payload,
      };
    case types.FETCH_PHOTOS_BY_ALBUM_ERROR:
      return {
        ...state,
        photosIsErrored: {
          ...state.photosIsErrored,
          [action.payload.id]: action.payload.isErrored,
        },
      };
    case types.FETCH_PHOTOS_BY_ALBUM_LOADING:
      return {
        ...state,
        photosIsLoading: {
          ...state.photosIsLoading,
          [action.payload.id]: action.payload.isLoading,
        },
      };
    case types.FETCH_PHOTOS_BY_ALBUM_SUCCESS:
      return {
        ...state,
        photos: {
          ...state.photos,
          [action.payload.id]: action.payload.photos,
        },
      };

    default:
      return state;
  }
};

export default galleryReduccer;
