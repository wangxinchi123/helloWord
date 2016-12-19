
var t = ($(".pingjiaContent .td2").height()-$(".pingjiaContent .td2 img").height())/2;
var l = ($(".pingjiaContent .td2").width()-$(".pingjiaContent .td2 img").width())/2;
$(".pingjiaContent .td2 img").css({"top":t+"px"});
$(".pingjiaContent .td2 img").css({"left":l+"px"});
$(".pingjiaContent .td2 img").css({"width":"15px","height":"15px"});
$("#line").css("height",$(".pingjia").height());

$(".pingjiaContent .td2").on("click",function(){
	var index = $(this).attr("id").substr(0,1);
	for(var i = 1;i<=5;i++){
		$("#"+index+""+i).children("img").attr("src","img/weixuanzhong.png").css({"width":"15px","height":"15px","left":l+"px","top":t+"px"});
	}
	$(this).children("img").attr("src","img/xuanzhong.png").css({"width":"80%","height":"80%","left":"10%","top":"10%"});
})

var hang = [];
for(var i = 0; i < 13; i++) {
	hang[i] = "";
}
var score = [];
var lastPointX = "";
var lastPointY = "";

$(".td2").on("click", function() {
	$("#line").empty();
	var pointNum = 0;
	var index1 = $(this).attr("id").substr(0, 1);
	var x = $(this)[0].offsetLeft + $(this).width()/2;
	var y = $(this)[0].offsetTop + $(this).height()/2;
	if(index1 == "a") {
		hang[10] = x + "," + y;
	} else if(index1 == "b") {
		hang[11] = x + "," + y;
	} else if(index1 == "c") {
		hang[12] = x + "," + y;
	} else {
		hang[index1] = x + "," + y;
	}
	score[index1] = $(this).attr("id").substr(1, 1);
	var height = $(".pingjia").height();
	var str = "<svg width='100%' height=" + height + " version='1.1' xmlns='http://www.w3.org/2000/svg'><g><path d='";
	for(var i = 0; i < 13; i++) {
		if(hang[i] != "") {
			var x = hang[i].split(",")[0];
			var y = hang[i].split(",")[1];
			pointNum++;
			if(pointNum > 1) {
				str = str + " M" + lastPointX + "," + lastPointY + " L" + x + "," + y;
			}
			lastPointX = x;
			lastPointY = y;
		}
	}
	str = str + "' stroke='#74b6e2' stroke-width='2' /></g></svg>";
	$("#line").append(str);
})


