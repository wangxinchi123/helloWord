
var apiurl = "http://testwx.nbguohe.top";
var editFlag = 0;
var editMarkFlag = 0;
var trFlag;
var nowGroup;
var addFlag = 0;
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

$("#bg").on("click",function(){
	$(this).css("display","none");
	$("#allFenZu").css("display","none");
	editFlag = 0;
	$("#allFenZu li input").css("display","none");
	$("#allFenZu li img").css("background-color","none");
	$("#allFenZu li img").attr("src","img/edit.png");
	if(addFlag == 1){
		$("#allFenZu li").last().remove();
		addFlag = 0;
	}
	$(".content-right .remark input").remove();
	$(".content-right .remark img").attr("src","img/edit.png");
	editMarkFlag = 0;
});

$("#allFenZu .addGroup").on("click",function(){
	editFlag = 0;
	$("#allFenZu li input").css("display","none");
	$("#allFenZu li img").css({"background-color":"none"});
	$("#allFenZu li img").attr("src","img/edit.png");
	if(addFlag == 0){
		addFlag = 1;
		$("#allFenZu ul").append("<li><p></p><img onclick='addgroup(this)' src='img/sign-check-icon.png' /><input type='text' style='display:block;' /></li>");
		$("#allFenZu li").last().children("input").focus();
	}
});

getgroup(1);

bindEdit();

function getgroup(flag){
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
//			$("#allFenZu ul").empty();
//			$("#allFenZu ul").append("<li><p>未分组</p></li>");
			data = data.tags;
			var str = "";
			for(var i=0;i<data.length;i++){
				group[data[i].id] = data[i].name;
				if(data[i].id>=100){
					str = str + "<li data-id="+data[i].id+"><p>"+data[i].name+"</p><img src='img/edit.png' /><input type='text' /></li>";
				}
				else{
					str = str + "<li data-id="+data[i].id+"><p>"+data[i].name+"</p></li>";
				}
			}
			if(flag == 1){
				$("#allFenZu ul").append(str);
			}
		}
	});
}

function addgroup(obj){
	if($(obj).next().val()!=""){
		$.ajax({
			type:"get",
			url:apiurl+"/index.php/fxz/tags/create",
			async:true,
			xhrFields: {
			    withCredentials: true
			},
			dataType:"json",
			data:{username:$.cookie("username"),name:$(obj).next().val()},
			success:function(data){
				addFlag = 0;
				$(obj).next().css("display","none");
				$(obj).css("background-color","none");
				$(obj).attr("src","img/edit.png");
				$(obj).prev().html($(obj).next().val());
				$(obj).removeAttr("onclick");
				$("#allFenZu ul").empty();
				$("#allFenZu ul").append("<li><p>未分组</p></li>");
				getgroup(1);
				bindEdit();
				$(".content-right table tr").eq(trFlag).children(".fenzu").click();
			}
		});
	}
}

function bindEdit(){
	$("#allFenZu li img").off("click");
	$("#allFenZu li img").on("click",function(){
		nowGroup = $(this).parent("li").index();
		if($(this).next().css("display") == "none"){
			editFlag = 1;
			$("#allFenZu li input").css("display","none");
			$("#allFenZu li img").css("background-color","none");
			$("#allFenZu li img").attr("src","img/edit.png");
			$(this).next().css("display","block");
			$(this).next().focus();
			$(this).css({"background-color":"white"});
			$(this).attr("src","img/sign-check-icon.png");
			if(addFlag == 1){
				$("#allFenZu li").last().remove();
				addFlag = 0;
			}
		}
		else{
			if($(this).next().val()!=""){
				$.ajax({
					type:"get",
					url:apiurl+"/index.php/fxz/tags/update",
					async:true,
					xhrFields: {
					    withCredentials: true
					},
					dataType:"json",
					data:{
						username:$.cookie("username"),
						name:$(this).next().val(),
						tagid:$(this).parent("li").attr("data-id")
					},
					success:function(data){
						if(data.errcode == 0){
							$("#allFenZu li").eq(nowGroup).children("p").html($("#allFenZu li").eq(nowGroup).children("input").val());
							getgroup(0);
						}
					}
				});
			}
			editFlag = 0;
			$(this).next().css("display","none");
			$(this).css({"background-color":"none"});
			$(this).attr("src","img/edit.png");
		}
	});
}


//$("#allFenZu li").on("click",function(){
//	editFlag = 0;
//})

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
	data:{username:$.cookie("username")},
	success:function(data){
		data = data.data;
		var str = "";
		for(var i=0;i<data.length;i++){
			var k = i+1;
			str = str + "<tr onclick='changeColor(this)'><td class='bianhao'>"+k+"</td><td class='leixing'>"+QRCodeType[data[i].type]+"</td><td class='fenzu' data-scene="+data[i].scene+" onclick='changeFenZu(this,event)'>"+group[data[i].groupid]+"<img src='img/edit.png' /></td><td class='remark' title='"+data[i].remark+"&#10;"+data[i].time1+"' data-scene="+data[i].scene+" onclick='updateRemark(this)'>"+data[i].remark+"<img src='img/edit.png' /></td><td class='erweima'><button onclick='getQRCode(\""+data[i].url+"\",\""+data[i].scene+"\")'>查看二维码</button></td><td>数据统计</td></tr>";
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
		data:{groupid:-1,username:$.cookie("username")},
		success:function(data){
			alert(data.success);
		}
	});
});

function changeColor(obj){
	$(obj).addClass("color").siblings().removeClass("color");
	trFlag = $(obj).index();
}

function changeFenZu(obj,event){
	$("#allFenZu li p").off("click");
	$("#allFenZu").css({"top":event.clientY,"left":event.clientX,"display":"block"});
	$("#bg").css("display","block");
	$("#allFenZu li p").on("click",function(){
		if(editFlag == 0){
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
					username:$.cookie("username")
				},
				success:function(data){
					if(data.success == "true"){
						$("#allFenZu").css("display","none");
						$("#bg").css("display","none");
					}
				}
			});
		}
		else{
			editFlag = 0;
			$("#allFenZu li input").css("display","none");
			$("#allFenZu li img").css("background-color","none");
			$("#allFenZu li img").attr("src","img/edit.png");
		}
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

function updateRemark(obj){
	if(editMarkFlag == 0){
		editMarkFlag = 1;
		$("#bg").css("display","block");
		$(obj).children("img").attr("src","img/sign-check-icon.png");
		$(obj).append("<input type='text' />");
		$(obj).children("input").focus();
		$(".content-right .remark img").off("click");
		
		$(obj).children("img").on("click",function(){
			if($(obj).children("input").val()!=""){
				$.ajax({
					type:"get",
					url:apiurl+"/index.php/fxz/qrcode/updateRemark",
					async:true,
					xhrFields: {
			    		withCredentials: true
					},
					dataType:"json",
					data:{
						remark:$(obj).children("input").val(),
						scene:$(obj).attr("data-scene"),
						username:$.cookie("username")
					},
					success:function(data){
						var myDate = new Date();
						$(obj).attr("title",$(obj).children("input").val()+"\n"+myDate.toLocaleString());
						$(obj).html($(obj).children("input").val()+"<img src='img/edit.png' />");
						$("#bg").css("display","none");
						editMarkFlag = 0;
					}
				});
			}
		});
		
	}
}
