import { CART_IS_OPEN, ADD_TO_CART, CART_ON_REFRESH, CHECK_OUT } from "../cartActions";

const totalPrice = (list) => {
  let total = 0;
  list.forEach(item => {
    let sum = item.qty * item.p_price;
    total += sum;
  })
  return total;
}

const cart = (state = {
  cartIsOpen: false,
  selected: [],
  totalPrice: 0,
  checkout: false
}, action) => {
  switch(action.type){
    case CART_IS_OPEN:
      return Object.assign({}, state, {
        cartIsOpen: !state.cartIsOpen 
      });
    case CART_ON_REFRESH:
      return Object.assign({}, state, {
        selected: [...action.list],
        totalPrice: totalPrice(action.list)
      })
    case ADD_TO_CART:
      let selected = JSON.parse(localStorage.getItem("selected"));
      if(!selected){
        console.log("!")
        selected = [];
      }
      console.log(selected);
      let list = selected.map(obj => obj.p_sid);
      let updatedList = null;
      if(list.includes(action.item.p_sid)){
        for(let obj of selected){
          if(obj.p_sid === action.item.p_sid){
            console.log(action.qty);
            let updatedQty = Number(obj.qty) + Number(action.qty);
            obj.qty = updatedQty;
            if(obj.qty === 0){
              updatedList = selected.filter(obj => obj.p_sid !== action.item.p_sid);
              break;
            }
            updatedList = selected;
            break;
          }
        }
        localStorage.setItem("selected", JSON.stringify(updatedList));
        return Object.assign({}, state, {
          selected: [...updatedList],
          totalPrice: totalPrice(updatedList)
        });
      }else{
        action.item.qty = action.qty;
        selected.push(action.item);
        let updatedList = selected;
        localStorage.setItem("selected", JSON.stringify(updatedList));
        return Object.assign({}, state, {
          selected: [...updatedList],
          totalPrice: totalPrice(updatedList)
        });
      }
    case CHECK_OUT:
      return Object.assign({}, state, {
        checkout: action.checkout
      })
    default:
      return state
  }
}

export default cart;
    
