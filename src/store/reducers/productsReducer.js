import { RECEIVE_PRODUCTS, REQUEST_PRODUCTS } from "../productsActions";

const initialState = {
  isFetching: false,
  productsLists: [],
  page: 1,
  // isFetchingPopular: false,
  // popularList: [],
  search: null,
  filter: null
};

function products(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: false,
        productsLists: [...state.productsLists, ...action.products],
        page: action.page
      });
      // case SEARCH_ON_CHANGE:
      //   return Object.assign({}, state, {
      //     search: action.search,
      //     newsLists: [],
      //     page: 1
      //   });
      // case TYPE_ON_CHANGE:
      //   return Object.assign({}, state, {
      //     filter: action.filter,
      //     newsLists: [],
      //     page: 1
      //   });
      // case CLEAR_ALL_FILTER:
      //   return Object.assign({}, state, {
      //     filter: null,
      //     search: null,
      //     newsLists: [],
      //     page: 1
      //   });
    //   case REQUEST_POPULAR:
    //   return Object.assign({}, state, {
    //     isFetchingPopular: true
    //   });
    // case RECEIVE_POPULAR:
    //   return Object.assign({}, state, {
    //     isFetchingPopular: false,
    //     popularList: [...action.posts]
    //   });
    default:
      return state;
  }
}

export default products;