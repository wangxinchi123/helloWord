

var apiurl = "http://testwx.nbguohe.top/index.php/user/user/";

var username = $.cookie("username");
$("header .login").on("mouseenter",function(){
	$("header .login ul").css("display","block");
	$("header .login .shangsanjiao").css("display","block");
}).on("mouseleave",function(){
	$("header .login ul").css("display","none");
	$("header .login .shangsanjiao").css("display","none");
});

$("header .gzh-switch").on("mouseenter",function(){
	$("header .gzh-switch ul").css("display","block");
	$("header .gzh-switch .shangsanjiao").css("display","block");
}).on("mouseleave",function(){
	$("header .gzh-switch ul").css("display","none");
	$("header .gzh-switch .shangsanjiao").css("display","none");
});

$(".content .content-right").css("min-height",document.body.scrollHeight-234+"px");


getgzhList();
function getgzhList(){
	$.ajax({
		type:"get",
		url:apiurl+"getGHs_pc",
		async:true,
		xhrFields: {
	        withCredentials: true
	    },
	    dataType:"json",
	    success:function(data){
	    	$(".gzh-switch ul").empty;
	    	$(".gzh-switch ul").append("<li>切换公众号</li>");
	    	var str = "";
	    	for(var i=0;i<data.length;i++){
	    		str = str + "<li onclick='changeGzh(\""+data[i].user_name+"\")'><img src="+data[i].head_img+" /><span>"+data[i].nick_name+"</sapn></li>";
	    		if(i%8 == 0){
	    			$(".gzh-switch ul").append(str);
	    			str = "";
	    		}
	    	}
	    	$(".gzh-switch ul").append(str);
	    	var url1 = $.cookie("url");
	    	$(".gzh-switch ul").append("<li><a href="+url1+">添加公众号</a></li>");
	    }
	});
}

function changeGzh(name){
	$.cookie("username",name);
	window.location.reload();
}


getManageList();


function getManageList() {
	$.ajax({
		type: "get",
		url: apiurl + "getAdministratorsByUsername_pc",
		data: {
			username: username
		},
		async: true,
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		success: function(data) {
			
			if(data.nowAdmin[0].headimgurl == ""){
				$(".login img").attr("src","img/滑稽.jpg");
				$(".login img").css("display","block");
			}
			else{
				$(".login img").attr("src", data.nowAdmin[0].headimgurl);
				$(".login img").css("display","block");
			}
			$("header .login li").eq(1).html(data.nowAdmin[0].nickname);
		}
	});
}
if($.cookie("headimg") != "" && $.cookie("nickname") != ""){
	$(".gzh-switch .headimg").attr("src",$.cookie("headimg"));
	$(".gzh-switch .headimg").css("display","block");
	$(".gzh-switch .nickname").text($.cookie("nickname"));
}
