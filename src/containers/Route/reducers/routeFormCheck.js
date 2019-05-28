import { HANDLE_IS_NOT_PASSED } from '../actions';

function routeFormCheck(
    state = {
        r_name: true,
        r_time: true,
        r_country: true,
        r_depart: true,
        r_arrive: true,
    },
    action
) {
    switch (action.type) {
        case HANDLE_IS_NOT_PASSED:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
export default routeFormCheck;
