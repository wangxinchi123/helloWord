
$(function(){
	//logo特效
	teXiao1();
	//判断是否记住密码
	setNameAndPwd();
	//页面切换保持登录状态
	stayLogIn();
	//绑定一些事件
	bindEvents();
	//如果是会员服务中心页面，检测是否会员
	detectMember();
})


function setNameAndPwd(){
	if($.cookie("rememberPwdFlag") == "1"){
		$(".rememberpwd input").attr("checked","checked");
		$(".J_username input").val($.cookie("username"));
		$(".J_password input").val($.cookie("password"));
	}
	else{
		$.cookie("username","",{ expires: -1 ,path:"/"});
		$.cookie("password","",{ expires: -1 ,path:"/"});
	}
}
function bindEvents(){
	//修改按钮绑定点击事件
	$(".J_box2 .log-btn").on("click",function(){
		changePwd();
	})
	//点击小箭头返回登录框
	$(".J_back").on("click",function(){
		$(".J_box1").animate({"left":"0"},500);
		$(".J_box2").animate({"left":"100%"},500);
	})
	//给登录框右上角关闭图片绑定点击事件
	$("#close").on("click",function(){
		//登录框和背景淡出
		$("#layoutbg").fadeOut(300);
		$("#login").fadeOut(300,function(){
			//重置输入框内容样式
			$(".J_box1").css("left","0");
			$(".J_box2").css("left","100%");
			$(".J_box2 input").val("");
			$(".J_box2 input").css("border-color","lightgray");
			$(".J_username input").val("");
			$(".J_password input").val("");
			$(".J_username input").css("border-color","lightgray");
			$(".J_password input").css("border-color","lightgray");
		});
	})
	//用户登录
	$(".j_log-btn").on("click",function(){
		if($(".J_username input").val() == ""){
			$(".J_username input").css("border-color","#E74C3C");
		}
		else if($(".J_password input").val() == ""){
			$(".J_password input").css("border-color","#E74C3C");
		}
		else{
			$.ajax({
				type:"get",
				url:"http://192.168.50.197/Jijin/User/Userlogin.php",
				async:true,
				data:{
					username:$(".J_username input").val(),
					password:$(".J_password input").val()
				},
				dataType:"jsonp",
				jsonp: "callbackparam",
				success:function(data){
					//登录成功
					if(data.loginFlag == "success"){
						var p1 = "<span class='s1'>欢迎&nbsp;&nbsp;&nbsp;</sapn>";
						var p2 = "<span>"+data.companyname+"</span>";
						var p3 = "<span class='s2' onclick='signOut()'>&nbsp;&nbsp;&nbsp;退出</span>";
						$(".J_toped div").html(p1+p2+p3);
						$("#layoutbg").fadeOut(100);
						$("#login").fadeOut(100);
						$.cookie("id",data.id,{ path: "/"});
						$.cookie("username",data.username,{expires: 7 , path: "/" });
						$.cookie("password",$(".J_password input").val(),{expires: 7 , path: "/" });
						$.cookie("companyname",data.companyname,{ path: "/" });
						if($(".rememberpwd input").is(":checked")){
							$.cookie("rememberPwdFlag","1",{expires: 7, path: "/" });
						}
						else{
							$.cookie("rememberPwdFlag","0",{expires: 7, path: "/" });
						}
					}
					//登录失败
					else{
						$("#login .J_box1 .tishi").html("账号或密码错误"); 
					}
				}
			});
		}
	})
	//输入框获得焦点颜色变成蓝色
	$(".username input,.password input").on("focus",function(){
		$(this).css("border-color","#0AC5EF");
		$("#login .tishi").empty();
	})
	//输入框失去焦点变成灰色
	$(".username input,.password input").on("blur",function(){
		$(this).css("border-color","lightgray");
	})
}

//退出登录
function signOut(){
	if($.cookie("rememberPwdFlag") === "0"){
		$.cookie("username","",{expires: -1,path:"/"});
		$.cookie("password","",{expires: -1,path:"/"});
	}
	$.cookie("id",null,{path:"/"});
	$.cookie("companyname",null,{path:"/"});
	$(".J_toped div").html("<span class='s1'>您好，请您先 &nbsp;&nbsp;&nbsp;</sapn><span onclick='signIn()'>登录</span>");
}

//点击“登录”出现登录框
function signIn(){
	$("#layoutbg").fadeIn(300);
	$("#login").fadeIn(300);
}
//保持登录状态
function stayLogIn(){
	if($.cookie("id") != "" && $.cookie("id") != "null" && $.cookie("id") != null){
		var p1 = "<span class='s1'>欢迎&nbsp;&nbsp;&nbsp;</sapn>";
		var p2 = "<span>"+$.cookie("companyname")+"</span>";
		var p3 = "<span class='s2' onclick='signOut()'>&nbsp;&nbsp;&nbsp;退出</span>";
		$(".J_toped div").html(p1+p2+p3);
	}
	else{
		$(".J_toped div").html("<span class='s1'>您好，请您先 &nbsp;&nbsp;&nbsp;</sapn><span onclick='signIn()'>登录</span>");
	}
}

//修改密码
function changePwd(){
	$(".J_box2 input").css("border-color","lightgray");
	var detectPwd = /^[a-zA-Z\d]{6,16}$/;
	if($(".J_box2 .t1").val() == ""){
		$(".J_box2 .t1").css("border-color","#E74C3C");
	}
	else if($(".J_box2 .t2").val() == ""){
		$(".J_box2 .t2").css("border-color","#E74C3C");
	}
	else if(!(detectPwd.test($(".J_box2 .t3").val()))){
		$(".J_box2 .t3").css("border-color","#E74C3C");
		$("#login .J_box2 .tishi").html("请输入6到16位由数字或字母组成的新密码");
	}
	else if($(".J_box2 .t3").val() != $(".J_box2 .t4").val()){
		$(".J_box2 .t4").css("border-color","#E74C3C");
		$("#login .J_box2 .tishi").html("确认密码不一致");
	}
	else{
		$.ajax({
			type:"get",
			url:"http://192.168.50.197/Jijin/User/Userlogin.php",
			async:true,
			data:{
				username:$(".J_box2 .t1").val(),
				password:$(".J_box2 .t2").val()
			},
			dataType:"jsonp",
			jsonp: "callbackparam",
			success:function(data){
				if(data.loginFlag == "success"){
					$.ajax({
						type:"get",
						url:"http://192.168.50.197/Jijin/User/ChangePassword.php",
						async:true,
						data:{
							password:$(".J_box2 .t3").val()
						},
						dataType:"jsonp",
						jsonp: "callbackparam",
						success:function(data){
							if(data.changeFlag == "success"){
								$("#login .J_box2 .tishi").html("修改成功"); 
								$(".J_box2 input").val("");
//								$(".J_box2 .t2").val("");
//								$(".J_box2 .t3").val("");
//								$(".J_box2 .t4").val("");
							}
							else{
								$("#login .J_box2 .tishi").html("修改失败"); 
							}
						}
					});
				}
				else{
					$("#login .J_box2 .tishi").html("账号或密码错误"); 
				}
			}
		});
	}
}
//跳转到修改密码页面
function goBox2(){
	$(".J_box1").animate({"left":"-100%"},500);
	$(".J_box2").animate({"left":"0"},500);
}

function detectMember(){
	if(window.location.href.indexOf(detectUrl) != -1){
		if($.cookie("id") == null || $.cookie("id") == "" || $.cookie("id") == "null"){
			$(".content-right").html("<h3>您的位置：<a href='index.html'>首页</a> >>会员服务中心</h3><p>此页面仅供会员查看</p>");
			signIn();
		}
	}
}

function teXiao1(){
	var k = 0;
	var timer = setInterval(function(){
		$(".J_six-text span").eq(k).animate({"margin-top":"10px"},500,function(){
			$(this).animate({"margin-top":"0"},200);
		});
		k++;
		if(k==6){
			clearInterval(timer);
			setTimeout(function(){
				teXiao2();
			},3000);
		}
	},300);
}
function teXiao2(){
	var k = 5;
	var timer = setInterval(function(){
		$(".J_six-text span").eq(k).animate({"margin-top":"-50px"},500);
		k--;
		if(k<0){
			clearInterval(timer);
			setTimeout(function(){
				teXiao1();
			},2000);
		}
	},300);
}
