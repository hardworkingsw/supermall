<template>
<div class="bottom-bar">
  <div class="check-content">
    <check-button class="check-button" :is-checked="isSelectAll" @click="checkSelectAll"></check-button>
    <span>全选</span>
  </div>
  <div class="total-price">
    合计：{{totalPrice}}
  </div>
  <div class="calculate" @click="calcClick">
    去计算:({{checkLength}})
  </div>
</div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components:{
    CheckButton,
  },
  methods:{
    filterChecked(list){
      let res = []



      for (var item of list){

        if (item.checked){
          res.push(item)
        }

      }


      return res

    },
    reduceChecked(list){
      let res = 0
      for(var index of list){
        res += index.price * index.count
      }

      return res
    },
    checkSelectAll(){

      if (this.isSelectAll){
        for(var item of this.$store.state.cartList){
          item.checked = false
        }
      }
      else {
        for(var index of this.$store.state.cartList){
          index.checked = true
        }
      }
    },
    calcClick(){
      if(!this.filterChecked(this.$store.state.cartList).length){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  },
  computed:{
    totalPrice(){
      return '￥'+this.reduceChecked(this.filterChecked(this.$store.state.cartList))

    },
    checkLength(){
      return this.filterChecked(this.$store.state.cartList).length
    },
    isSelectAll(){
      if(this.$store.state.cartList.length === 0){
        return false
      }
      return this.filterChecked(this.$store.state.cartList).length === this.$store.state.cartList.length;
    },

  }
}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #eee;
  position: relative;
  bottom: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;


}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.total-price{
  margin-left: 120px;
}
.calculate{
  padding-right: 10px;
  padding-left: 10px;
  background-color: red;
  color: #ffffff;
}
</style>
