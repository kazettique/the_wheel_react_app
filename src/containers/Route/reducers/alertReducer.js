import { ALERT_DISAPPEAR, ALERT_APPEAR } from '../actions/';

function alertReducer(
    state = { appear: false, disappear: null, success: null },
    action
) {
    switch (action.type) {
        case ALERT_APPEAR:
            console.log('inreducer');
            return {
                appear: true,
                disappear: false,
                success: action.payload,
            };
        case ALERT_DISAPPEAR:
            return {
                appear: false,
                disappear: true,
                success: null,
            };
        default:
            return state;
    }
}

export default alertReducer;
