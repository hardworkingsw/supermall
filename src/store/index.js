import {createApp} from "vue";
import {createStore} from 'vuex'
import App from "../App";
import mutations from "./mutations";
import actions from "./actions";
import getters from './getters'
const state = {
  cartList: []
}
const store = createStore({
    state,
    mutations,
    actions,
    getters,

})
const app =createApp(App)
app.use(store)
export default store
