<template>
  <div class="detail">

    <detail-nav-bar class="detailNavBar" ref="nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" :probeType="3" :pullUpLoad="true" ref="scroll" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment"  :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend"  :goods="recommends"></goods-list>
    </scroll>

    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :show="show"></toast>

  </div>
</template>

<script>
// import {backTopMixin} from "common/mixin" //可以用混入抽取要用的东西，然后封装起来，在mixin里面
import {getDetail,Goods,Shop,GoodsParam} from "network/detail";
import {getRecommend} from "network/detail";
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import BackTop from "components/content/backTop/BackTop";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import {debounce} from "../../utils";
import {mapActions} from "vuex"

import Toast from "components/common/toast/Toast";
export default {
  name: "detail",
  // mixins:[backTopMixin],
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    BackTop,
    Scroll,
    GoodsList,
    Toast,
  },

  data(){
      return {
        iid:null,
        topImages:[],
        goods: {},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTops:[],
        getThemeTops:null,
        currentIndex:0,
        isShowBackTop:false,
        count:0,
        message:'',
        show:false,
    }
  },
  mounted() {

  },

  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res=>{
      //1.获取顶部的轮播数据
      const data = res.result
      this.topImages = data.itemInfo.topImages
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
      //保存商品的详情数据
      this.detailInfo = data.detailInfo
      this.paramInfo = new GoodsParam(data.itemParams.info ,data.itemParams.rule)
      //取出评论信息
      if(data.rate.cRate){
        this.commentInfo = data.rate.list[0]
      }
      // this.$nextTick(()=>{
      //   this.themeTops = []
      //   this.themeTops.push(0);
      //   this.themeTops.push(this.$refs.params.$el.offsetTop-44)
      //   this.themeTops.push(this.$refs.comment.$el.offsetTop-44)
      //   this.themeTops.push(this.$refs.recommend.$el.offsetTop-44)
      //   console.log(this.themeTops)
      // })
      this.getThemeTops = debounce(() => {
        this.themeTops = []
        this.themeTops.push(0);
        this.themeTops.push(this.$refs.params.$el.offsetTop-44)
        this.themeTops.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop-44)
        console.log(this.themeTops)
      })


    })
    getRecommend().then(res=>{
      this.recommends = res.data.list
    })


  },
  updated() {

  },

  methods:{
    ...mapActions(['addCart']),
    imageLoad(){
      this.$refs.scroll.refresh()
      this.getThemeTops()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTops[index],100)
    },
    contentScroll(position){
      this.isShowBackTop= (-position.y) > 1000
      const positionY = -position.y
      let length = this.themeTops.length
      for(let i = 0;i<length;i++){
        if(this.currentIndex !== i && (i<length -1 && positionY>this.themeTops[i] && positionY<this.themeTops[i+1])
          ||(i===length-1&&positionY>=this.themeTops[i])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }

      }
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    addToCart(){
      //1.获取商品的信息
      const product = []
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      product.count = this.count
      this.$store.dispatch('addCart',product).then(res=>{
        this.show = true;
        this.message = res;
        setTimeout(()=>{
          this.show = false
          this.message = ''
        },1500)
        // this.$toast.show(res,2000)
      })
      // this.addCart(product).then(res=>{
      //   console.log(res);
      // }) map了之后可以这么用，mapGetters 就是computes里，mapActions就是methods
      //2.将商品信息添加到购物车

    }

  },
}
</script>

<style scoped>
.detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;

}
.detailNavBar{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px - 49px);
}
</style>
