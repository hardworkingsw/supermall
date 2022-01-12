<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center><div>购物街</div></template>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
      ref="tabControl1"
      @tabClick = 'tabClick'
      class="tab-control"
      v-show="isTabFixed">

    </tab-control>

    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      :pull-up-load="true">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <home-recommend-view :recommends="recommends"></home-recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']"
          ref="tabControl2"
          @tabClick = 'tabClick'
        >

        </tab-control>
        <goods-list :goods="goods[currentType].list"></goods-list>
    </Scroll>

  <back-top @click="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureView from "./childComps/FeatureView";

import TabControl from "components/content/tabControl/TabControl";
import NavBar from "components/common/navbar/NavBar";
import GoodsList from "components/content/goods/GoodsList";
import {getHomeMultdata,
        getHomeGoods}
  from "network/home";//没有用default导出，所以要用大括号\
// import BScroll from "better-scroll";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";


export default {
    name: "Home",
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0, list:[]},
          'new':{page:0, list:[]},
          'sell':{page:0, list:[]},
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,

      }
    },
    components: {
      BackTop,
      Scroll,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
    },
    created() {
      //1.请求多个数据
      this.getHomeMultdata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      //3.监听item图片加载完成
      // this.$bus.$on('itemImageLoad',()=>{
      //   this.$refs.scroll.refresh()
      // })

    },
    mounted() {
      //所有的组件都有一个属性是用于获取组件的元素的

    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y

    },
  methods:{
      tabClick(index){
        switch (index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      getHomeMultdata(){
        getHomeMultdata().then(res=>{
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },

      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
          // console.log(this.goods[type].list)
          this.$refs.scroll.finishPullUp()
        })
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position){
        // console.log(position);
        this.isShowBackTop= (-position.y) > 1000
        //吸顶
        this.isTabFixed =(-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.tabOffsetTop);
      },



    }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
  position: relative;

}
.home-nav{
  background-color: var(--color-tint);
  color: #f6f6f6;
  /*在使用浏览器原生滚动时，为了让导航栏不要一起滚动*/
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
/*.tab-control{*/
/*  position: sticky;*/
/*  top:44px;*/
/*  z-index:9;*/
/*}*/
/*.content{*/
/*  height: calc(100% - 93px);*/
/*  overflow: hidden;*/
/*  margin-top: 44px;*/
/*}*/
.content{
  overflow: hidden;
  position: absolute;
  top:44px;
  bottom:49px;
  left: 0;
  right: 0;
}
.tab-control{
  position: relative;
  z-index: 9;
}

</style>
