import Vue from 'vue'
import Toast from "./Toast";
const obj ={}

const toastConstructor = Vue.extend(Toast)
obj.install=function (Vue){
  // document.body.appendChild(Toast.$el)
  // // console.log('执行了obj的install',Vue);
  //1.创建组件构造器
  console.log(Vue);

  //2.new的方式创建对象
  const toast = new toastConstructor()
  //3.将组件对象手动挂载
  toast.$mount(document.createElement('div'))
  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = Toast
}
export default obj
