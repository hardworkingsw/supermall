<template>
<div class="cart-list">

  <scroll class="content" :probeType="3" :pullUpLoad="true" ref="scroll">
    <cart-list-item v-for="(item,index) in cartList" :item-info="item" :key="index" @itemClick="itemClick(item)"></cart-list-item>
  </scroll>
</div>
</template>

<script>
import {mapGetters} from "vuex";
import CartListItem from "./CartListItem";
// import store from '../../../store/index'
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "CartList",
  components:{
    Scroll,
    CartListItem,
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  watch:{

  },
  activated() {
    // this.reload
    this.$refs.scroll.refresh()
  },
  data(){
    return{
      // cartList:this.$store.state.cartList
    }
  },
  methods:{
    itemClick(item){
      item.checked = !item.checked
    }


  },


}
</script>

<style scoped>
.cart-list{
  height:90vh;
}
.content{
  height: calc(100% - 44px - 40px - 49px);
  /*color: #fff;*/
}
</style>
