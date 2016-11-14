
var nowExpressionIndex;
var imgText = "";


$(function(){
	initAndBind();
})

function initAndBind(){
	addQQexpression();
	$(".nav-list").css("margin-left",(window.innerWidth-13*3)/2+"px");
	$(".nav-list li").eq(0).css("background-color","gray");
	$(".content").css("min-height",window.innerHeight-60+"px");
	$("#expression").css("height",window.innerHeight*0.3+"px");
	$(".pic").click(function(){
		var timer = setInterval(function(){window.scrollTo(0,document.body.scrollHeight);},10);
		$("#blankBox").animate({"height":window.innerHeight*0.3+"px"},300);
		$(".foot").animate({"bottom":"30%"},300);
		$("#expression").animate({"top":"70%"},300,function(){
			clearInterval(timer);
		});
		
	});
	$(".content").click(function(){
		$("#blankBox").animate({"height":"0"},300);
		$(".foot").animate({"bottom":"0"},300);
		$("#expression").animate({"top":"100%"},300);
	});
}

function addQQexpression(){
	var p = 1;
	nowExpressionIndex = 1;
	var expressionBox = "expressionBox"+p;
	var startX,endX;
	for(var i = 1 ;i<50;i++){
		if(i%24 == 1){
			if(i!=1){
				p++;
				expressionBox = "expressionBox"+p;
			}	
			if(p == 1){
				$("#expression").append("<div class="+expressionBox+" style='position:absolute;width:100%;overflow:hidden;top:0;left:0'></div>");
			}
			else{
				$("#expression").append("<div class="+expressionBox+" style='position:absolute;width:100%;overflow:hidden;top:0;left:100%'></div>");
			}
			$("#expression")[0].addEventListener("touchstart",touchStart,false);
			$("#expression")[0].addEventListener("touchend",touchEnd,false);
		}
		$("."+expressionBox).append("<li onclick='addPicInText("+i+")'><img src='QQexpression/"+i+".gif' /></li>");
	}
}
function touchStart(event) {
	if(event.touches.length == 1) {
		var touch = event.touches[0];
		startX = touch.clientX;
	}
}
function touchEnd(e){
	endX = e.changedTouches[0].pageX;
	if(startX - endX > 0){
		if(nowExpressionIndex+1<4){
			$(".expressionBox"+nowExpressionIndex).animate({"left":"-100%"},500);
			nowExpressionIndex++;
			$(".expressionBox"+nowExpressionIndex).animate({"left":"0"},500);
		}
	}
	else if(startX - endX < 0){
		if(nowExpressionIndex-1 > 0){
			$(".expressionBox"+nowExpressionIndex).animate({"left":"100%"},500);
			nowExpressionIndex--;
			$(".expressionBox"+nowExpressionIndex).animate({"left":"0"},500);
		}
	}
	$(".nav-list li").css("background-color","lightgray");
	$(".nav-list li").eq(nowExpressionIndex-1).css("background-color","gray");
}
function addPicInText(i){
	imgText = imgText + "/图片"+i
	$(".enter-word input").val(imgText);
}
