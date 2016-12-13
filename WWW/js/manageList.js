
var apiurl = "http://testwx.nbguohe.top/index.php/user/user/";

var time1;

$("#erweima .close").on("click",function(){
	$("#erweima").css("display","none");
	clearInterval(time1);
});

var username = $.cookie("username");
var fxz_code;

//getFxzCode();

function getFxzCode(){
	$.ajax({
		type:"get",
		url:apiurl+"get_fxz_code",
		async:false,
		dataType:"json",
		xhrFields: {
	        withCredentials: true
	    },
	    success:function(data){
	    	fxz_code = data.fxz_code;
	    }
	});
}


getManageList(1);
getAdminsNum();


function getAdminsNum(){
	$.ajax({
		type:"get",
		url:apiurl+"getGHInfo_pc",
		async:true,
		dataType:"json",
		xhrFields: {
	       	withCredentials: true
	   	},
	   	data:{username:username},
	   	success:function(data){
			$(".gzh-switch .headimg").attr("src",data.head_img);
			$(".gzh-switch .nickname").text(data.nick_name);
			$.cookie("headimg",data.head_img);
			$.cookie("nickname",data.nick_name);
	   		$(".managerNum span").eq(0).text(data.adminsnownum);
	   		$(".managerNum span").eq(1).text(data.adminsmaxnum);
	   	}
	});
}


$(".content-right .addManage").on("click",function(){
	getFxzCode();
	$("#erweima .erweima-box").empty();
	var str = "http://testwx.nbguohe.top/web/wechat/authorize.html?username="+username+"&openid="+$.cookie("openid")+"&fxz_code="+fxz_code;
	jQuery('#erweima .erweima-box').qrcode({
		width:256,
		height:256,
		text:str
	});
	$("#erweima").css("display","block");
	var k = 1;
	time1 = setInterval(function(){
		k++;
		if(k>120){
			clearInterval(time1);
			$("#erweima").css("display","none");
		}
		$.ajax({
			type:"get",
			url:apiurl+"check_fxz_code",
			async:true,
			data:{code:fxz_code},
			dataType:"json",
			xhrFields: {
        		withCredentials: true
    		},
			success:function(data){
				if(data.flag == "true"){
					clearInterval(time1);
					$(".content-right .manage-list ul").empty();
					$("#erweima").css("display","none");
					getManageList(0);
					getAdminsNum();
				}
			}
		});
	},1000)
});


function getManageList(pflag){
	$.ajax({
		type:"get",
		url:apiurl+"getAdministratorsByUsername_pc",
		data:{username:username},
		async:true,
		dataType:"json",
		xhrFields: {
	        withCredentials: true
	    },
	    success:function(data){
	    	var str1 = "";
	    	for(var i=0;i<data.admins.length;i++){
	    		if(data.admins[i].headimgurl == ""){
	    			str1 = str1 + "<li><div class='head-img'><img src='img/滑稽.jpg' /></div><div class='nickname'>"+data.admins[i].nickname+"</div><div class='open-upload' onclick='openUpload(this)'><p>打开素材上传</p><span class='small-circle'></div><div class='open-message' onclick='openMessage(this)'><p>打开消息助手</p><span class='small-circle'></sapn></div></li>";
	    		}
	    		else{
	    			str1 = str1 + "<li><div class='head-img'><img src="+data.admins[i].headimgurl+" /></div><div class='nickname'>"+data.admins[i].nickname+"</div><div class='open-upload' onclick='openUpload(this)'><p>打开素材上传</p><span class='small-circle'></div><div class='open-message' onclick='openMessage(this)'><p>打开消息助手</p><span class='small-circle'></sapn></div></li>";
	    		}
	    		if(i%8 == 0){
	    			$(".content-right .manage-list ul").append(str1);
	    			str1 = "";
	    		}
	    	}
	    	$(".content-right .manage-list ul").append(str1);
	    	$.cookie("superAdmin",data.nowAdmin[0].flag);
	    	if(pflag == 1){
		    	if(data.nowAdmin[0].flag == 1){
//		    		var str = "http://testwx.nbguohe.top/web/wechat/authorize.html?username="+username+"&openid="+$.cookie("openid")+"&fxz_code="+fxz_code;
//					jQuery('#erweima').qrcode({
//						width:256,
//						height:256,
//						text:str
//					});
		    	}
		    	else{
		    		$(".content-right .addManage").attr("disabled","disabled");
		    		$(".content-right .addManage").css("opacity","0.5");
		    		$(".content-right .addManage").on("click",function(event){event.preventDefault();})
		    	}
	    	}
	    }
	});
}


function openMessage(obj){
	if($(obj).children("p").text() == "打开消息助手"){
		$(obj).children(".small-circle").animate({"right":$(".open-message").outerWidth()-31+"px"},500);
		$(obj).animate({"padding-left":"40px","padding-right":"20px"},500);
		$(obj).css("background-color","gray");
		$(obj).children("p").text("关闭消息助手");
	}
	else{
		$(obj).children(".small-circle").animate({"right":"1px"},500);
		$(obj).animate({"padding-left":"20px","padding-right":"40px"},500);
		$(obj).css("background-color","#44b549");
		$(obj).children("p").text("打开消息助手");
	}
}
function openUpload(obj){
	if($(obj).children("p").text() == "打开素材上传"){
		$(obj).children(".small-circle").animate({"right":$(".open-message").outerWidth()-31+"px"},500);
		$(obj).animate({"padding-left":"40px","padding-right":"20px"},500);
		$(obj).css("background-color","gray");
		$(obj).children("p").text("关闭素材上传");
	}
	else{
		$(obj).children(".small-circle").animate({"right":"1px"},500);
		$(obj).animate({"padding-left":"20px","padding-right":"40px"},500);
		$(obj).css("background-color","#44b549");
		$(obj).children("p").text("打开素材上传");
	}
}
