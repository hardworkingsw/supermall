<template>
  <div class="cart">

    <nav-bar class="nav-bar">
      <template v-slot:center><div>购物车({{length}})</div></template>

    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>

</template>

<script>

  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar,
    },
    computed:{
      // ...mapGetters(['cartLength','cartList'])
      ...mapGetters({
        length:'cartLength',
        list:'cartList',
      })
    },

    data(){
      return{

      }
    }
  }
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  position: relative;
  z-index: 9;
}
</style>
