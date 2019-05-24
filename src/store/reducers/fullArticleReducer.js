import { RECEIVE_POST, REQUEST_POST } from "../fullArticleActions";

const fullArticle = (state = {
  isFetching: false,
  post: null,
  commentInput: ""
}, action) => {
  switch(action.type){
    case "COMMENT_INPUT":
      return Object.assign({}, state, {
        commentInput: action.input
      })
    case REQUEST_POST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_POST:
      return Object.assign({}, state, {
        isFetching: false,
        post: action.post,
      })
    default:
      return state;
  }
}

export default fullArticle;
