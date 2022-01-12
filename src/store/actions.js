import {
  ADD_COUNTER,ADD_TO_CART
} from "./mutation-types";
export default {
  addCart({state,commit},payload){

    return new Promise((resolve) =>{
      let product = state.cartList.find(function (item){
        return item.iid === payload.iid
      })
      if(product){
        commit(ADD_COUNTER,product)
        resolve('当前的商品数量+1')
      }else {
        payload.count =1
        commit(ADD_TO_CART,payload)
        resolve('添加了新的商品')
      }
    })


  }
}
