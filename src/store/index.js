import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
	state:{
		cardList:[],
		receiveInfo:[{
      'name': '王某某',
      'phone': '13811111111',
     'areaCode':'010',
     'landLine':'64627856',
     'provinceId': 110000,
     'province':'北京市',
     'cityId': 110100,
     'city':'市辖区',
     'countyId': 110106,
     'county':'海淀区',
     'add':'西二旗',
     'default': true
    },{
     'name':'李某某',
     'phone':'13811111111',
     'areaCode':'010',
     'landLine':'64627856',
     'provinceId': 110000,
     'province':'北京市',
     'cityId': 110100,
     'city':'市辖区',
     'countyId': 110106,
     'county':'海淀区',
     'add':'上地',
     'default': false
    }],
		maxCount:false,
		isCard:false,
		timeOut:null,
		ball:{
			el:'',
			img:'',
			isShow:false
		}
	},
	getters:{
		countTotle (state) {
			let count = 0
			state.cardList.forEach((goods)=>{
				count += goods.count
			})
			return count
		},
		priceTotle (state) {
			let price = 0
			state.cardList.forEach((goods)=>{
				price += goods.price * goods.count
			})
			return price
		},
		allChecked (state) {
			let allChecked = true
			state.cardList.forEach((goods)=>{
				if (goods.checked == false) {
					allChecked = false
					return
				}
			})
			return allChecked
		},
		checkedCount (state) {
			let count = 0
			state.cardList.forEach((goods)=>{
				if (goods.checked) {
					count += goods.count
				}
			})
			return count
		},
		checkedPrice (state) {
			let price = 0
			state.cardList.forEach((goods)=>{
				if (goods.checked) {
					price += goods.count*goods.price
				}
			})
			return price
		},
		checkedGoods (state) {
			let checkeGoods = []
			state.cardList.forEach((goods)=>{
				if (goods.checked) {
					checkeGoods.push(goods)
				}
			})
			return checkeGoods
		}
	},
	mutations:{
		addCardPanel (state,data) {
			var bOff = true//默认是没有
			//判断是否在购物车已存在
			state.cardList.forEach((goods)=>{
				if(goods.sku_id===data.info.sku_id){
					goods.count +=data.count//同样的商品直接增加数量
					bOff = false
					if (goods.count>goods.limit_num) {
						goods.count-=data.count
						state.maxCount = true
						return
					}
					state.isCard = true
				}
			})
			
			if (bOff) {
				var goodsList = data.info
				Vue.set(goodsList,'count',data.count)
				Vue.set(goodsList,'checked',true)
				state.cardList.push(goodsList)
				state.isCard = true
			}
			//event,点击的事件对象event.path,事件所涉及到的所有对象
			state.ball.img = data.info.ali_image
			state.ball.el = event.path[0]
			state.ball.isShow = true
			
		},
		deleCardPanel (state,id) {
			state.cardList.forEach((goods,index)=>{
				if(goods.sku_id===id){
					state.cardList.splice(index,1)
				}
			})
		},
		addCarNum (state,id) {
			state.cardList.forEach((goods,index)=>{
				if(goods.sku_id===id){
					if (goods.count >= goods.limit_num) {
						return
					}
					goods.count ++
					return
				}
			})
		},
		subCarNum (state,id) {
			state.cardList.forEach((goods,index)=>{
				if(goods.sku_id===id){
					if (goods.count <= 1) {
						return
					}
					goods.count --
					return
				}
			})
		},
		checkedCar (state,id) {
			state.cardList.forEach((goods,index)=>{
				if(goods.sku_id===id){
					goods.checked = !goods.checked
					return
				}
			})
		},
		allCheckedCar (state,allChecked) {
			state.cardList.forEach((goods,index)=>{
					goods.checked = !allChecked
			})
		},
		delChecked (state) {
			let i = state.cardList.length
			while (i--) {
				if (state.cardList[i].checked) {
					state.cardList.splice(i,1)
				}
				
			}
//			state.cardList.forEach((goods,index)=>{
//				if (goods.checked) {
//					state.cardList.splice(index,1)
//				}
//			})删除后数组里各项index改变
		},
		closeAlert (state) {
			state.maxCount = false
		},
		openCard (state) {
			state.timeOut = null
			state.isCard = true
		},
		closeCard (state) {
			state.timeOut = setTimeout(()=>{
				state.isCard = false
			},1500)
		}
	}
	
});

export default store
