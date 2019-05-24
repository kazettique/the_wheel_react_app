import axios from "axios";

export const REQUEST_PRODUCTS = "REQUEST_PRODUCTS";
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";

function requestProducts() {
  console.log("requestPost");
  return {
    type: REQUEST_PRODUCTS
  };
}

function receiveProducts(json, page) {
  console.log("receivePost");
  return {
    type: RECEIVE_PRODUCTS,
    products: json.data,
    page: page
  };
}

export function fetchProducts(page, search, filter) {
  return dispatch => {
    console.log(dispatch);
    dispatch(requestProducts());
    return axios
      .get("http://localhost:5000/products_list.api", {
        params: {
          page: page,
          search: search,
          filter: filter
        }
      })
      .then(json => {
        console.log(json);
        dispatch(receiveProducts(json, page));
      }).catch(error => console.log(error));
  };
}