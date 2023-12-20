// 数据拼接
// 相册模板
var template = ''
// 下拉选项
var options = ''
// 所有商品
var allGoods = []
// 计算商品个数
var count = 0
// dom填充
for (var i=0; i<data.length; i++ ) {
	var item = data[i]
	var option = '<option value=' + i +'>' + item.category + '</option>'
	options+= option
	for(var j=0; j<item.goods.length; j++) {
		var flipbookItem = '<div class="flipbook-item" style="background-image:url(pages/'+ item.goods[j].image[0] +')"></div>'
		template+= flipbookItem
		count ++
		item.goods[j].page = count
		item.goods[j].categoryValue = '' + i
		allGoods.push(item.goods[j])
	}
}
console.log(allGoods)
$('.category-select').html($(options))
$('.flipbook').html($(template))

// 初始化数据
$('.goods-title').text(allGoods[0].title)
$('.category-select').val('0')

// 初始化函数
function loadApp() {
	// Create the flipbook
	var width = document.documentElement.clientWidth - 20
	var height = width * 1.3
	var pages = allGoods.length
    var currentPage = 1
	$('.pages').text(pages)
	var flipbook = $('.flipbook').turn({
			width:width,
			height:height,
			elevation: 50,
			gradients: true,
			autoCenter: true,
			display: 'single',
			pages: pages,
			when: {
				turning: function(event,page,view) {
					$('.count').text(page)
                    currentPage = page
                    $('.goods-title').text(allGoods[page - 1].title)
					if ($('.category-select').val() !== allGoods[page - 1].categoryValue) {
						$('.category-select').val(allGoods[page - 1].categoryValue)
					}			
				}
			}

	})
	// setInterval(function() {
	// 	flipbook.turn('next')
	// }, 1000)
	$('.left').on('click', function() {
		flipbook.turn('previous')
	})
	$('.right').on('click', function() {
		flipbook.turn('next')
	})
	$('.previous').on('click', function() {
		flipbook.turn('page', 1)
	})
	$('.next').on('click', function() {
		flipbook.turn('page', pages)
	})
    $('.goods-title').on('click', function() {
        console.log('跳转详情' + currentPage)
    })

	$('.category-select').on('change', function(e) {
		var value = parseInt($('.category-select').val())
		flipbook.turn('page', data[value].goods[0].page)
	})
}

// Load the HTML4 version if there's not CSS transform

yepnope({
	test : Modernizr.csstransforms,
	yep: ['./js/turn.js'],
	nope: ['./js/turn.html4.min.js'],
	both: ['./css/basic.css'],
	complete: loadApp
});