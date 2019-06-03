import {
  ADD_TO_LIKE_SUCCESS,
  ADD_TO_CHALLENGE_SUCCESS_SUCCESS
} from "../actions";

function likeRouteReducer(state = { liked: [], challengeSuccess: [] }, action) {
  switch (action.type) {
    case ADD_TO_LIKE_SUCCESS:
      return {
        ...state,
        liked: action.payload
      };
    case ADD_TO_CHALLENGE_SUCCESS_SUCCESS:
      return {
        ...state,
        challengeSuccess: action.payload
      };
    default:
      return state;
  }
}
export default likeRouteReducer;
