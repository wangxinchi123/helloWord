$(function(){
	$(".scroll").height($(".scroll").width()*0.25);
	var clearTime = null;
	var $index = 0;
	var $qiandex = 0;
	autoPlay();
	$(".scroll .scroll_list li").eq($index).addClass("changecolor");

//	$(".scroll .attr").eq($index).addClass("hover");
	function autoPlay(){
		//设置时间
		clearTime = setInterval(function(){
			//每次序列号 +1
			$index++;
			
			if($index>3){
				$index = 0;
			}
			//开始滑动
			scrollPlay();
			$qiandex = $index;
		},5000);
	}
	function scrollPlay(){
		//siblings() 通过选择器
		
			$(".scroll .attr").eq($index).stop(true,true).addClass("myhover").siblings().removeClass("myhover");
	
		
			$(".scroll .scroll_list li").stop(true,true).eq($index).addClass("changecolor").siblings().removeClass("changecolor");
		

		//向左滑动
		if($index > $qiandex){
			//.eq() 选择器选取带有指定index值的元素
			//stop(true,true)关闭所有其他附带的动画效果
			$(".scroll .attr").eq($qiandex).stop(true,true).fadeOut(1000);
			$(".scroll .attr").eq($index).stop(true,true).fadeIn(1000);
		}
		else if($index<$qiandex){
			$(".scroll .attr").eq($qiandex).stop(true,true).fadeOut(1000);
			$(".scroll .attr").eq($index).stop(true,true).fadeIn(1000);
		}
	}
	$(".scroll .scroll_list li").click(function(){
		//鼠标停止，图片停止  暂停计时器
		clearInterval(clearTime);
		//获取序列号 index()
		$index = $(this).index();
		scrollPlay();
		
		$qiandex = $index;
		autoPlay();
	});
//	$(".scroll .scroll_list li").mouseover().mouseout(function(){
//		//鼠标移开，继续轮播
//		autoPlay();
//	});
})
