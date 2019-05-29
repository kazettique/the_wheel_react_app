import {
    HANDLE_ADD_NEW_LOCATION,
    HANDLE_ADD_NEW_LOCATION_DELETE,
    HANDLE_ADD_NEW_LOCATION_COUNTRY_CHANGE,
    HANDLE_ADD_NEW_LOCATION_UP,
    HANDLE_ADD_NEW_LOCATION_DOWN,
    ADD_NEW_SUCCESS,
    ADD_NEW_FAILURE,
    ALERT_DISAPPEAR,
} from '../actions';

function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

function routeAddNewLocation(state = { locationList: [] }, action) {
    switch (action.type) {
        case HANDLE_ADD_NEW_LOCATION:
            return {
                ...state,
                locationList: [
                    ...state.locationList,
                    { num: +new Date(), areas: [] },
                ],
            };
        case HANDLE_ADD_NEW_LOCATION_DELETE:
            let b = [...state.locationList].filter(
                i => i.num !== action.payload
            );

            return {
                ...state,
                locationList: b,
            };
        case HANDLE_ADD_NEW_LOCATION_COUNTRY_CHANGE:
            let c = [...state.locationList].findIndex(
                i => i.num === action.num
            );

            let d = [...state.locationList];
            d[c].areas = action.payload;
            return {
                ...state,
                locationList: d,
            };
        case HANDLE_ADD_NEW_LOCATION_UP:
            console.log('reducer up');
            let e = [...state.locationList];
            let f = e.findIndex(i => i.num === action.num);
            if (f !== 0) {
                arraymove(e, f, f - 1);
            }
            // arrayMove(e, f, f - 1);

            return {
                ...state,
                locationList: e,
            };
        case HANDLE_ADD_NEW_LOCATION_DOWN:
            console.log('reducer down');
            let g = [...state.locationList];
            let h = g.findIndex(i => i.num === action.num);
            if (h !== g.length) {
                arraymove(g, h, h + 1);
            }

            return {
                ...state,
                locationList: g,
            };
        case ADD_NEW_SUCCESS:
            return {
                locationList: [],
                success: true,
            };
        case ADD_NEW_FAILURE:
            let errmsg = action.payload.slice(6);
            return {
                ...state,
                locationList: [...state.locationList],
                success: false,
                error: errmsg,
            };
        case ALERT_DISAPPEAR:
            return (state = {
                locationList: [...state.locationList],
                successType: action.successType,
            });
        default:
            return state;
    }
}

export default routeAddNewLocation;
