import {

    HANDLE_ADD_NEW_LOCATION,
    HANDLE_ADD_NEW_LOCATION_DELETE,
    HANDLE_ADD_NEW_LOCATION_COUNTRY_CHANGE,
    HANDLE_ADD_NEW_LOCATION_UP,
    HANDLE_ADD_NEW_LOCATION_DOWN,
    ADD_NEW_SUCCESS,
    ADD_NEW_FAILURE,
} from '../actions';


function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

function routeAddNewLocation(
    state = { locationList: [], success: false },
    action
) {
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
            // arrayMove(e, f, f - 1);
            arraymove(e, f, f - 1);

            return {
                ...state,
                locationList: e,
            };
        case HANDLE_ADD_NEW_LOCATION_DOWN:
            console.log('reducer down');
            let g = [...state.locationList];
            let h = g.findIndex(i => i.num === action.num);
            arraymove(g, h, h + 1);

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
            return {
                ...state,
                locationList: [...state.locationList],
                success: false,
            };
        default:
            return state;
    }
}

export default routeAddNewLocation;