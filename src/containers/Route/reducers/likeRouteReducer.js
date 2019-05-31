import { ADD_TO_LIKE_SUCCESS } from "../actions";

function likeRouteReducer(state = { liked: [] }, action) {
  switch (action.type) {
    case ADD_TO_LIKE_SUCCESS:
      return {
        liked: action.payload
      };
    default:
      return state;
  }
}
export default likeRouteReducer;
