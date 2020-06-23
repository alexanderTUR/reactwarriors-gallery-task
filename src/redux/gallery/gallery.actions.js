import * as types from './gallery.types';

const callApi = (url) => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json());
};

export const fetchUsersError = (isErrored) => {
  return {
    type: types.FETCH_USERS_ERROR,
    payload: isErrored,
  };
};

export const fetchUsersLoading = (isLoading) => {
  return {
    type: types.FETCH_USERS_LOADING,
    payload: isLoading,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: types.FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUsersData = () => {
  return (dispatch) => {
    dispatch(fetchUsersLoading(true));

    callApi('https://jsonplaceholder.typicode.com/users')
      .then((users) => {
        dispatch(fetchUsersLoading(false));
        dispatch(fetchUsersSuccess(users));
      })
      .catch(() => dispatch(fetchUsersError(true)));
  };
};

export const fetchAlbumsByUserError = (isErrored) => {
  return {
    type: types.FETCH_ALBUMS_BY_USER_ERROR,
    payload: isErrored,
  };
};

export const fetchAlbumsByUserLoading = (isLoading) => {
  return {
    type: types.FETCH_ALBUMS_BY_USER_LOADING,
    payload: isLoading,
  };
};

export const fetchAlbumsByUserSuccess = (albums) => {
  return {
    type: types.FETCH_ALBUMS_BY_USER_SUCCESS,
    payload: albums,
  };
};

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

export const fetchPhotosByAlbumError = ({ albumId, isErrored }) => {
  return {
    type: types.FETCH_PHOTOS_BY_ALBUM_ERROR,
    payload: { id: albumId, isErrored },
  };
};

export const fetchPhotosByAlbumLoading = ({ albumId, isLoading }) => {
  return {
    type: types.FETCH_PHOTOS_BY_ALBUM_LOADING,
    payload: { id: albumId, isLoading },
  };
};

export const fetchPhotosByAlbumSuccess = (albumId, photos) => {
  return {
    type: types.FETCH_PHOTOS_BY_ALBUM_SUCCESS,
    payload: { id: albumId, photos },
  };
};

export const fetchPhotosByAlbumData = (albumId) => {
  return (dispatch) => {
    dispatch(fetchPhotosByAlbumLoading({ albumId: albumId, isLoading: true }));

    callApi(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      .then((photos) => {
        dispatch(fetchPhotosByAlbumSuccess(albumId, photos));
        dispatch(
          fetchPhotosByAlbumLoading({ albumId: albumId, isLoading: false })
        );
      })
      .catch(() =>
        dispatch(fetchPhotosByAlbumError({ albumId: albumId, isErrored: true }))
      );
  };
};
