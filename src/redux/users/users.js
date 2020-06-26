import { createSlice } from '@reduxjs/toolkit';
import { callApi } from '../../utils/callApi';

const initialState = {
  usersIsErrored: false,
  usersIsLoading: false,
  users: [],
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersError: (state, action) => {
      state.usersIsErrored = action.payload;
    },
    fetchUsersLoading: (state, action) => {
      state.usersIsLoading = action.payload;
    },
    fetchUsersSuccess: (state, action) => {
      state.users = action.payload;
    },
  },
});

export default users.reducer;

const { fetchUsersError, fetchUsersLoading, fetchUsersSuccess } = users.actions;

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
