import {
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,

} from '../actions';

const INITIAL_STATE = { postsList: { posts: [], error: null, loading: false } };

function routeReducer(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                postsList: {
                    posts: [...state.postsList.posts, ...action.payload],
                    error: null,
                    loading: false,
                    page: action.page,
                },
            };
        case FETCH_POSTS_FAILURE:
            error = action.payload || { message: action.payload.message };
            return {
                ...state,
                postsList: { posts: [], error: error, loading: false },
            };
        default:
            return state;
    }
}
export default routeReducer;