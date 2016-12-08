
var apiurl = "http://testwx.nbguohe.top";
var group = [];
group[-1] = "未分组";
var QRCodeType = [];
QRCodeType[1] = "临时二维码";
QRCodeType[2] = "永久二维码";

//$("body").on("click",function(){
//	if($("#allFenZu").css("display")=="block"){
//		$("#allFenZu").css("display","none");
//	}
//});
$("#codeBox img").on("click",function(){
	$("#codeBox").css("display","none");
});
$("#allFenZu img").on("click",function(){
	$("#allFenZu").css("display","none");
	$("#bg").css("display","none");
});
$("#bg").on("click",function(){
	$(this).css("display","none");
	$("#allFenZu").css("display","none");
});

$.ajax({
	type:"get",
	url:apiurl+"/index.php/fxz/tags/get",
	async:false,
	xhrFields: {
	    withCredentials: true
	},
	dataType:"json",
	data:{username:$.cookie("username")},
	success:function(data){
		data = data.tags;
		var str = "";
		for(var i=0;i<data.length;i++){
			group[data[i].id] = data[i].name;
			str = str + "<li>"+data[i].name+"</li>";
		}
		$("#allFenZu ul").append(str);
	}
});


if($.cookie("superAdmin") != 1){
	$(".content-right .title button").attr("disabled","disabled");
	$(".content-right .title button").css("opacity","0.5");
	$(".content-right .title button").on("click",function(event){event.preventDefault();});
}

$.ajax({
	type:"get",
	url:apiurl+"/index.php/fxz/qrcode/getStrQRCodes",
	async:true,
	xhrFields: {
	    withCredentials: true
	},
	dataType:"json",
	data:{username:$.cookie("openid")},
	success:function(data){
		data = data.data;
		var str = "";
		for(var i=0;i<data.length;i++){
			var k = i+1;
			str = str + "<tr onclick='changeColor(this)'><td class='bianhao'>"+k+"</td><td class='leixing'>"+QRCodeType[data[i].type]+"</td><td class='fenzu' data-scene="+data[i].scene+" onclick='changeFenZu(this,event)'>"+group[data[i].groupid]+"<img src='img/edit.png' /></td><td class='createtime'>"+data[i].time1+"</td><td class='erweima'><button onclick='getQRCode("+data[i].url+",\""+data[i].scene+"\")'>查看二维码</button></td><td>数据统计</td></tr>";
			if(i%6 == 0){
				$(".content-right table").append(str);
				str = "";
			}
		}
		$(".content-right table").append(str);
	}
});



$(".content-right .title button").on("click",function(){
	
	$.ajax({
		type:"get",
		url:apiurl+"/index.php/fxz/qrcode/addStrQRCode",
		async:true,
		xhrFields: {
	    	withCredentials: true
		},
		dataType:"json",
		data:{groupid:-1,username:$.cookie("openid")},
		success:function(data){
			alert(data.success);
		}
	});
});

function changeColor(obj){
	$(obj).addClass("color").siblings().removeClass("color");
}

function changeFenZu(obj,event){
	$("#allFenZu li").off("click");
	$("#allFenZu").css({"top":event.clientY,"left":event.clientX,"display":"block"});
	$("#bg").css("display","block");
	$("#allFenZu li").on("click",function(){
		for(var i=-1;i<group.length;i++){
			if(group[i] == "" || group[i] == null){
				continue;
			}
			if(String(group[i]).indexOf($(this).text())!=-1){
				var groupid = i;
				break;
			}
		}
		var scene = $(obj).attr("data-scene");
		$(obj).html(group[groupid]+"<img src='img/edit.png' />");
		$.ajax({
			type:"get",
			url:apiurl+"/index.php/fxz/qrcode/updateGroupid",
			async:true,
			xhrFields: {
	    		withCredentials: true
			},
			dataType:"json",
			data:{
				groupid:groupid,
				scene:scene,
				username:$.cookie("openid")
			},
			success:function(data){
				if(data.success == "true"){
					$("#allFenZu").css("display","none");
					$("#bg").css("display","none");
				}
			}
		});
	})
}

function getQRCode(imgurl,scene){
	if(imgurl == 1 || imgurl == "null" || imgurl == null){
		$.ajax({
			type:"get",
			url:apiurl+"/index.php/fxz/qrcode/getQRCodesURL",
			async:true,
			xhrFields: {
	    		withCredentials: true
			},
			data:{
				scene:scene,
				username:$.cookie("username")
			},
			dataType:"json",
			success:function(data){
				$("#QR-code").empty();
				$("#QR-code").qrcode({
					width:150,
					height:150,
					text:data.url
				});
				$("#codeBox").css("display","block");
			}
		});
	}
	else{
		$("#QR-code").empty();
		$("#QR-code").qrcode({
			width:150,
			height:150,
			text:imgurl
		});
		$("#codeBox").css("display","block");
	}
}
