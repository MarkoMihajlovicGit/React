//Action Creators here
import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  //use lodash's _.map with getState().posts and an extra argument
  // so now we pull up just the userId's property
  // result will be an array with all this different id's -100 long cause of 100 posts
  //use lodash's _.uniq to return an array with just the unique userIds
  // const userIds = _.uniq(_.map(getState().posts, 'userId'));

  //we dont need to use await here since theres no more code below
  //if we do need it we can do it with Promise.all ...
  // userIds.forEach(id => dispatch(fetchUser(id)));

  //CHAINIG WITH LODASH
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  //DISPATCH ACTION
  dispatch({ type: 'FETCH_USER', payload: response.data });
};

//MEMOIZED APPROACH

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });
