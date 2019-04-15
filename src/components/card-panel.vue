<template>
	<li class="nav-cart" @mouseenter="openCard" @mouseleave="closeCard">
		<a href="javascript:;" class="car">购物车</a>
		<!--根据class改变颜色-->
		<span class="cart-empty-num" :class="{'cart-num':numTotle>0}">
			<i>{{numTotle}}</i>
		</span>
		<div class="nav-cart-wrapper" v-if="isCard">
			<div class="nav-cart-list">
				<div class="empty" v-if='numTotle<=0'>
					<h3>购物车为空</h3>
					<p>您还没有选购任何商品，现在前往商城选购吧!</p>
				</div>
				<div class="full">
					<div class="nav-cart-items">
						<ul>
							<li class="clear" v-for='item,index in carData'>
								<div class="cart-item js-cart-item cart-item-sell">
									<div class="cart-item-inner">
										<div class="item-thumb">
											<img :src="item.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'">
										</div>
										<div class="item-desc">
											<div class="cart-cell">
												<h4> 
													<a href="#/item/100027401">{{item.title}}</a>
												</h4>
												<p class="attrs">
													<span>{{item.spec_json.show_name}}</span>
												</p>
												<h6>
													<span class="price-icon">¥</span><span class="price-num">{{item.price}}</span><span class="item-num">x {{item.count}}</span>
												</h6>
											</div>
										</div>
										<div class="del-btn" @click="delCard(item.sku_id)">删除</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="nav-cart-total">
						<p>共 <strong class="ng-binding">{{numTotle}}</strong> 件商品</p>
						<h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{priceCTotle}}</span></h5>
						<h6>
							<router-link class="nav-cart-btn" to="/carList">去购物车</router-link>
						</h6>
					</div>
				</div>
			</div>
		</div>
		<transition name='ball' v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
			<div class='addcart-mask' v-show='ball.isShow'>
				<img class='mask-item'>
			</div>
		</transition>
	</li>
</template>
<script>
	export default {
		computed:{
			carData () {
				return this.$store.state.cardList
			},
			numTotle () {
				return this.$store.getters.countTotle
			},
			priceCTotle () {
				return this.$store.getters.priceTotle
			},
			isCard () {
				return this.$store.state.isCard
			},
			ball () {
				return this.$store.state.ball
			}
		},
		methods:{
			delCard (id) {
				return this.$store.commit('deleCardPanel',id)
			},
			openCard () {
				return this.$store.commit('openCard')
			},
			closeCard () {
				return this.$store.commit('closeCard')
			},
			beforeEnter (el) {
				console.log(el)
		        let rect = this.ball.el.getBoundingClientRect()
		        let rectEl = document.getElementsByClassName('car')[0].getBoundingClientRect()
		        let ball = document.getElementsByClassName('mask-item')[0]
		        let x = (rectEl.left + 16) - (rect.left + rect.width/2)
		        let y = rect.top + rect.height/2 - rectEl.top + 5
		        console.log(rect.top + rect.height/2)
		        el.style.transform = 'translate3d(0,'+y+'px,0)'
		        
		        ball.style.transform = 'translate3d(-'+x+'px,0,0)'
		        ball.src = this.ball.img
		        },
		    enter (el) {
		       	let rf = el.offsetHeight
		        let ball = document.getElementsByClassName('mask-item')[0]
		        this.$nextTick(() => {
		          el.style.transform = 'translate3d(0,0,0)'
		          ball.style.transform = 'translate3d(0,0,0)'
		        })
		    },
		    afterEnter (el) {
		        this.ball.isShow = false
		    }
		}		
	}
</script>
<style>
  .ball-enter-active{
    transition: .5s cubic-bezier(.15,.69,.6,1.29);
  }
  .ball-enter-active .mask-item{
    transition: .5s cubic-bezier(0,0,1,1);
  }
  .addcart-mask{width:24px;height:24px;border-radius:50%}
  .mask-item{width:24px;height:24px;border-radius:50%}
</style>