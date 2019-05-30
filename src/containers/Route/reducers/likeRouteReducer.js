import { ADD_TO_LIKE_SUCCESS } from "../actions";

function likeRouteReducer(state = { liked: {} }, action) {
  switch (action.type) {
    case ADD_TO_LIKE_SUCCESS:
      return {
        ...state,
        postsList: {
          posts: [...state.postsList.posts, ...action.payload],
          error: null,
          loading: false,
          page: action.page
        }
      };
    default:
      return state;
  }
}
export default likeRouteReducer;
