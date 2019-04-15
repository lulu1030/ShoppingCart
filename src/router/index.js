import Vue from 'vue'
import Router from 'vue-router'
import '@/assets/css/header.css'
import '@/assets/css/reset.css'

Vue.use(Router)
import shop from '@/views/shop'
import goods from '@/views/goods'
import carList from '@/views/carList'
import checkout from '@/views/checkout'

export default new Router({
	routes: [
	  {
	  	path:'/',
	  	name:'Shop',
	  	component:shop
	  },
	  {
	  	path:'/goods',
	  	name:'Goods',
	  	component:goods
	  },
	  {
	  	path:'/carList',
	  	name:'CarList',
	  	component:carList
	  },
	  {
	  	path:'/checkout',
	  	name:'Checkout',
	  	component:checkout
	  }
	]
})
