import {
    FETCH_SINGLE_SUCCESS,
    FETCH_SINGLE_FAILURE,

} from '../actions';

function routeSingleReducer(
    state = { data: [], error: null, loading: false },
    action
) {
    let error;
    switch (action.type) {
        case FETCH_SINGLE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
                loading: false,
            };
        case FETCH_SINGLE_FAILURE:
            error = action.payload || { message: action.payload.message };
            return {
                ...state,
                data: [],
                error: error,
                loading: false,
            };
        default:
            return state;
    }
}

export default routeSingleReducer;