
var apiurl = "http://testwx.nbguohe.top/index.php/user/user/";

var moveFlag = 0;


FastClick.attach(document.body);
$(".set-time").on("click",function(){
	if($(".seekbar").css("height") == "0px"){
		$(".seekbar").animate({"height":"240px"},300);
	}
	else{
		$(".seekbar").animate({"height":"0"},300);
	}
});

$("body").on("touchmove",function(event){
	if(moveFlag == 1){
		event.preventDefault();
	}
})

$(".seekbar .line span")[0].addEventListener("touchstart",function(){
	moveFlag = 1;
});
$(".seekbar .line span")[0].addEventListener("touchmove",function(event){
	var x = event.changedTouches[0].clientX;
	if(x<19){
		x = 19;
	}
	if(x>window.innerWidth-40){
		x=window.innerWidth-40;
	}
	$(this).css("left",x-20+"px");
	var res = parseInt((x-20)/(window.innerWidth-60)*120);
	$(".seekbar .reply-time span").html(res);
});
$(".seekbar .line span")[0].addEventListener("touchend",function(){
	moveFlag = 0;
});

$(".seekbar .open").on("click",function(){
	$.ajax({
		type:"get",
		url:apiurl+"setOneSet",
		async:true,
		xhrFields: {
		    withCredentials: true
		},
		dataType:"json",
		data:{
			openid:wxopenid,
			messageFlag1:$(".seekbar .reply-time span").html()
		},
		success:function(data){
			if(data.success == "true"){
				$(".set-time .now-reply-time").html($(".seekbar .reply-time span").html()+"分钟");
				$(".seekbar").animate({"height":"0"},300);
			}
		}
	});
});

$(".seekbar .close").on("click",function(){
	$.ajax({
		type:"get",
		url:apiurl+"setOneSet",
		async:true,
		xhrFields: {
		    withCredentials: true
		},
		dataType:"json",
		data:{
			openid:wxopenid,
			messageFlag1:-1
		},
		success:function(data){
			if(data.success == "true"){
				$(".set-time .now-reply-time").html("不接收");
				$(".seekbar").animate({"height":"0"},300);
			}
		}
	});
});

$.ajax({
	type:"get",
	url:apiurl+"getOneSet",
	async:true,
	xhrFields: {
	    withCredentials: true
	},
	dataType:"json",
	data:{openid:wxopenid},
	success:function(data){
		$(".userinfo img").attr("src",data.info.headimgurl);
		$(".userinfo p").html(data.info.nickname);
		if(data.set.messageflag1 == "-1"){
			$(".replyInterval .now-reply-time").html("不接收");
		}
		else{
			$(".replyInterval .now-reply-time").html(data.set.messageflag1+"分钟");
			var l = data.set.messageflag1/120*(window.innerWidth-60);
			$(".seekbar .line span").css("left",l+"px");
			$(".seekbar .reply-time span").html(data.set.messageflag1);
		}
	}
});