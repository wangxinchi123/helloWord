var index = 0;
var lastindex = 0;
var startX, startY, endX, endY;
window.onload = function() {
	//控制.info高度
	srtHeight();
	//绑定屏幕滑动事件
	pageTouch();
	//绑定导航栏点击事件
	menubarClick();
}

function srtHeight() {
	$(".info").height($(".J_page0").height());
}

function pageTouch() {
	var content = document.getElementById("content");
	content.addEventListener("touchstart", touchStart, false);
	content.addEventListener("touchend", touchEnd, false);
}

function removeTouch() {
	document.removeEventListener("touchstart", touchStart, false);
	document.removeEventListener("touchend", touchEnd, false);
}

function touchStart(event) {
	if(event.touches.length == 1) {
		var touch = event.touches[0];
		startY = touch.clientY;
		startX = touch.clientX;
	}
}

function touchEnd(event) {
	var touch = event.changedTouches[0];
	endY = touch.clientY;
	endX = touch.clientX;
	if(startX - endX < 0) {
		var x = endX - startX;
		var y = Math.abs(startY - endY);
		if(x > y) {
			if(index != 0) {
				index--;
				scrollRight()
			}
		}
	} else if(startX - endX > 0) {
		var x = startX - endX;
		var y = Math.abs(startY - endY);
		if(x > y) {
			if(index != 2) {
				index++;

				scrollLeft()
			}
		}
	}
}

function scrollLeft() {
	$(".info").height($(".J_page" + index).height());
	$(".page").eq(lastindex).stop(true, true).animate({
		"left": "-100%"
	}, 500);
	$(".page").eq(index).stop(true, true).animate({
		"left": "0"
	}, 500);
	$(".listpoint li").eq(index).addClass("active-li").siblings().removeClass("active-li");
	$(".long-line").animate({
		"margin-left": "+=33.3%"
	}, 500);
	lastindex = index;
}

function scrollRight() {
	$(".info").height($(".J_page" + index).height());
	$(".page").eq(lastindex).stop(true, true).animate({
		"left": "100%"
	}, 500);
	$(".page").eq(index).stop(true, true).animate({
		"left": "0"
	}, 500);
	$(".listpoint li").eq(index).addClass("active-li").siblings().removeClass("active-li");
	$(".long-line").animate({
		"margin-left": "-=33.3%"
	}, 500);
	lastindex = index;
}
/********************************************/
function menubarClick() {
	$(".menubar .menu").on("click", function() {
		index = $(".menubar .menu").index(this);
		if(index != lastindex) {
			if(Math.abs(index - lastindex) < 2) {
				if(index > lastindex) {

					scrollLeft();
				} else {

					scrollRight();
				}
			} else {
				if(index > lastindex) {
					$(".long-line").stop(true, true).animate({
						"margin-left": "66.6%"
					}, 500);
					$(".info").height($(".J_page" + index).height());
					$(".page").eq(lastindex).stop(true, true).animate({
						"left": "-100%"
					}, 500);
					$(".page").eq(index).stop(true, true).animate({
						"left": "0"
					}, 500);
					$(".listpoint li").eq(index).addClass("active-li").siblings().removeClass("active-li");
					lastindex = index;
				} else {
					$(".long-line").stop(true, true).animate({
						"margin-left": "0"
					}, 500);
					$(".info").height($(".J_page" + index).height());
					$(".page").eq(lastindex).stop(true, true).animate({
						"left": "100%"
					}, 500);
					$(".page").eq(index).stop(true, true).animate({
						"left": "0"
					}, 500);
					$(".listpoint li").eq(index).addClass("active-li").siblings().removeClass("active-li");
					lastindex = index;
				}
			}
		}
	})
}