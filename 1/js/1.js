
var y;
var liIndex;
var flag = 0;
var selectIndex;
$(function(){
	disableSelectText();
	dragTheElement();
})
function disableSelectText(){
	if(document.all){
    	document.onselectstart= function(){return false;}; //for ie
	}else{
	    document.onmousedown= function(){return false;};
	    document.onmouseup= function(){return true;};
	}
	document.onselectstart = new Function('event.returnValue=false;');
}
function dragTheElement(){
	var t = -$(".wrap ul li").outerHeight();
	$(".wrap .copy").css("top",t+"px");
	$(".wrap ul li").on("mousedown",function(){
		$(this).css({"opacity":"0.5"});
		$(this).clone(true).appendTo(".copy");
		
		liIndex = $(this).index();
		selectIndex = liIndex;
		flag = 1;
	})
	$(".wrap .close").click(function(){
		$(this).parent("li").remove();
	})
	$(".wrap ul li").click(function(){
		$(this).addClass("liSelectColor").siblings().removeClass("liSelectColor");
	})
	$(document).on("mouseup",function(){
		$(".wrap li").not(":eq(liIndex)").css({"opacity":"1"});
		$(".copy").css({"display":"none","top":t+"px"});
		$(".copy").html("");
		flag = 0;
	})
	$(".wrap ul li").mouseenter(function(){
		if(flag === 0){
			$(this).children(".close").css("display","block");
		}
	}).mouseleave(function(){
		$(this).children(".close").css("display","none");
	})
	
	$(document).mousemove(function(e){
		if(flag === 1){
			y = e.pageY - $(".wrap").offset().top;
			if(y<-$(".copy").height()){
				y = -$(".copy").height();
			}
			if(y>$(".wrap").height()){
				y = $(".wrap").height();
			}
			if(y>$(".wrap ul li").eq(selectIndex).offset().top-$(".wrap").offset().top+$(".wrap ul li").eq(selectIndex).outerHeight()
			|| y<$(".wrap ul li").eq(selectIndex).offset().top-$(".wrap").offset().top){
			  	$(".copy").css({"display":"block"});
			}
			$(".copy").css({"top":y});
			if(liIndex < $(".wrap ul li").length-1){
				if(y>$(".wrap ul li").eq(liIndex+1).offset().top-$(".wrap").offset().top+$(".wrap ul li").eq(liIndex+1).outerHeight()/2){
					$(".wrap ul li").eq(liIndex).insertAfter($(".wrap ul li").eq(liIndex+1));
					liIndex++;
				}
			}
			if(liIndex > 0){
				if(y<$(".wrap ul li").eq(liIndex-1).offset().top-$(".wrap").offset().top+$(".wrap ul li").eq(liIndex-1).outerHeight()/2){
					$(".wrap ul li").eq(liIndex).insertBefore($(".wrap ul li").eq(liIndex-1));
					liIndex--;
				}
			}
		}
	})
}

function sub(){
	$(".wrap li").css("background-color","white");
	var fso, tf;
	fso = new ActiveXObject("Scripting.FileSystemObject");
	tf = fso.CreateTextFile("D:\\3130407106\3130407106wxc\me.txt", true);
	tf.write(document.documentElement.outerHTML);
	tf.Close();
	alert("success");
}
