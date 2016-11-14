$(document).ready(function() {

	var i = 0;

	var clone = $(".banner .img li").first().clone(); //克隆第一张图片
	var width = $(".banner .img li").first().width();
	$(".banner .img").append(clone); //复制到列表最后
	var size = $(".banner .img li").size();
	for(var j = 0; j < size - 1; j++) {
		$(".banner .num").append("<li></li>");
	}

	$(".banner .num li").first().addClass("on");

	/*自动轮播*/

	var t = setInterval(function() {
		i++;
		move();
	}, 2000);

	/*鼠标悬停事件*/

	$(".banner").hover(function() {
		clearInterval(t); //鼠标悬停时清除定时器
	}, function() {
		t = setInterval(function() {
			i++;
			move();
		}, 2000); //鼠标移出时清除定时器
	});

	/*鼠标滑入原点事件*/

	$(".banner .num li").hover(function() {

		var index = $(this).index(); //获取当前索引值
		i = index;
		$(".banner .img").stop().animate({
			left: -index * width
		}, 500);
		$(this).addClass("on").siblings().removeClass("on");
	});

   $(".banner .btn_l").click(function () {
	                  i--;
	                  move();
	              })
	
	              
	              /*向右按钮*/
	              $(".banner .btn_r").click(function () {
	                  i++;
	                  move();
	              })

	/*移动事件*/
	function move() {
		if(i == size) {
			$(".banner .img").css({
				left: 0
			});
			i = 1;
		}
		if(i == -1) {
			$(".banner .img").css({
				left: -(size - 1) * width
			});
			i = size - 2;
		}
		$(".banner .img").stop().animate({
			left: -i * width
		}, 500);

		if(i == size - 1) {
			$(".banner .num li").eq(0).addClass("on").siblings().removeClass("on");
		} else {
			$(".banner .num li").eq(i).addClass("on").siblings().removeClass("on");
		}
	}
});

//会员展示
var time;

$('.vipBox').hover(function() {
	var that = this;
	a();

	function a() {
		$(that).children('.vipcenter').animate({
			width: '34px',
			height: '34px',
			borderRadius: '34px',
			top: '-8px',
			left: '-8px',
			border: 'solid #ffffff',
			opacity: '0.2',
			borderWidth: '6px'
		}, 600, function() {
			$(that).children('.vipcenter').stop(true, true).css({
				width: '26px',
				height: '26px',
				borderRadius: '26px',
				top: '0',
				left: '0',
				border: 'solid #ffffff',
				opacity: '1',
				borderWidth: '0'
			});
		});
		time = setTimeout(function() {
			a();
		}, 1200);
	}

}, function() {
	clearTimeout(time);
	$(this).children('.vipcenter').stop(true, true).css({
		width: '26px',
		height: '26px',
		borderRadius: '26px',
		top: '0',
		left: '0',
		border: 'solid #ffffff',
		opacity: '1',
		borderWidth: '0'
	});
});


//信息展示
$(".area_notice .notice_top_head p").mouseover(function(){
	//列表头更改
	$(this).removeClass("notice_top_head_noclick").addClass("notice_top_head_click").siblings().removeClass("notice_top_head_click").addClass("notice_top_head_noclick");
	//列表信息更改
	$(".area_notice .notice_top_head_content").hide().eq($(this).index()).show();
//	alert($(this).text());
//更多 跟随信息展示
    if($(this).text() === '行业新闻'){
    	$(".area_notice .notice-top-head-more a").attr('href','#')
    }else if($(this).text() === '今日看点'){
    	$(".area_notice .notice-top-head-more a").attr('href','new_file.html')
    }
});

//$(".area_notice2 .notice_top_head p").mouseover(function(){
//	$(this).removeClass("notice_top_head_noclick").addClass("notice_top_head_click").siblings().removeClass("notice_top_head_click").addClass("notice_top_head_noclick");
//	$(".area_notice2 .notice_top_head_content").hide().eq($(this).index()).show();
//});

$(".area_notice3 .notice1 .notice_top_head p").mouseover(function(){
	$(this).removeClass("notice_top_head_noclick").addClass("notice_top_head_click").siblings().removeClass("notice_top_head_click").addClass("notice_top_head_noclick");
	$(".area_notice3 .notice1 .notice_top_head_content").hide().eq($(this).index()).show();
});

$(".area_notice3 .notice2 .notice_top_head p").mouseover(function(){
	$(this).removeClass("notice_top_head_noclick").addClass("notice_top_head_click").siblings().removeClass("notice_top_head_click").addClass("notice_top_head_noclick");
	$(".area_notice3 .notice2 .notice_top_head_content").hide().eq($(this).index()).show();
});