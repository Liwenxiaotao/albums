
// 所有商品
const allGoods = []
// 计算商品个数
let count = 0
// 数据处理
for (let i=0; i<data.length; i++ ) {
	let item = data[i]
	for(let j=0; j<item.goods.length; j++) {
		count ++
		item.goods[j].page = count
		item.goods[j].categoryValue = '' + i
		allGoods.push(item.goods[j])
	}
}


// 初始化vue
const app = new Vue({
    el: '#app',
    data() {
        return {
           data: data, // 放置在data.js中
           allGoods: allGoods,
           selectCatagory: '0',
           pages: allGoods.length,
           currentPage: 1,
           goodsTitle: allGoods[0].title
        }
    },
    mounted() {
        // 初始化相册
        this.initFlipbook()
    },
    methods: {
        initFlipbook() {
            const width = document.documentElement.clientWidth - 20
            const height = width * 1.3
            const vm = this
            this.flipbook = $('.flipbook').turn({
                width:width,
                height:height,
                elevation: 50,
                gradients: true,
                autoCenter: true,
                display: 'single',
                pages: vm.pages,
                when: {
                    turning: function(event,page,view) {
                        vm.currentPage = page
                        vm.goodsTitle = allGoods[page - 1].title
                        if (vm.selectCatagory !== allGoods[page - 1].categoryValue) {
                            vm.selectCatagory = allGoods[page - 1].categoryValue
                        }			
                    }
                }
    
            })
        },
        previous() {
            this.flipbook.turn('previous')
        },
        next() {
            this.flipbook.turn('next')
        },
        turnFirst() {
            this.flipbook.turn('page', 1)
        },
        turnLast() {
            this.flipbook.turn('page', this.pages)
        },
        goDetail() {
            console.log('跳转详情' + this.currentPage)
        },
        cataChange() {
            const value = parseInt(this.selectCatagory)
		    this.flipbook.turn('page', data[value].goods[0].page)
        }
    }
})
