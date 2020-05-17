import * as types from './gallery.types';

export const fetchUsersError = (bool) => {
  return {
    type: types.FETCH_USERS_ERROR,
    payload: bool,
  };
};

export const fetchUsersLoading = (bool) => {
  return {
    type: types.FETCH_USERS_LOADING,
    payload: bool,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: types.FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUsersData = (url) => {
  return (dispatch) => {
    dispatch(fetchUsersLoading(true));

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(fetchUsersLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((users) => dispatch(fetchUsersSuccess(users)))
      .catch(() => dispatch(fetchUsersError(true)));
  };
};

export const fetchAlbumsByUserError = (bool) => {
  return {
    type: types.FETCH_ALBUMS_BY_USER_ERROR,
    payload: bool,
  };
};

export const fetchAlbumsByUserLoading = (bool) => {
  return {
    type: types.FETCH_ALBUMS_BY_USER_LOADING,
    payload: bool,
  };
};

export const fetchAlbumsByUserSuccess = (albums) => {
  return {
    type: types.FETCH_ALBUMS_BY_USER_SUCCESS,
    payload: albums,
  };
};

export const fetchAlbumsByUserData = (url) => {
  return (dispatch) => {
    dispatch(fetchAlbumsByUserLoading(true));

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(fetchAlbumsByUserLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((albums) => dispatch(fetchAlbumsByUserSuccess(albums)))
      .catch(() => dispatch(fetchAlbumsByUserError(true)));
  };
};

export const fetchPhotosByAlbumError = (id, bool) => {
  return {
    type: types.FETCH_PHOTOS_BY_ALBUM_ERROR,
    payload: { id, bool },
  };
};

export const fetchPhotosByAlbumLoading = (id, bool) => {
  return {
    type: types.FETCH_PHOTOS_BY_ALBUM_LOADING,
    payload: { id, bool },
  };
};

export const fetchPhotosByAlbumSuccess = (id, photos) => {
  return {
    type: types.FETCH_PHOTOS_BY_ALBUM_SUCCESS,
    payload: { id, photos },
  };
};

export const fetchPhotosByAlbumData = (url, id) => {
  return (dispatch) => {
    dispatch(fetchPhotosByAlbumLoading(id, true));

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((photos) => dispatch(fetchPhotosByAlbumSuccess(id, photos)))
      .then(() => dispatch(fetchPhotosByAlbumLoading(id, false)))
      .catch(() => dispatch(fetchPhotosByAlbumError(id, true)));
  };
};
