
var apiurl = "http://192.168.50.195/Jijin/Admin/";
$(function(){
	eventsInAddBox();
	getAllMemberMsg();
	addPic();
})

function getAllMemberMsg(){
	$.ajax({
		type:"get",
		url:apiurl+"UserIndex.php",
		async:true,
		cache:false,
		dataType:"jsonp",
		jsonp: "callbackparam",
		success:function(data){
			for(var i = 0 ; i<data.length ; i++){
				var p1 = "<div class='username'>"+data[i].username+"</div>";
				var p2 = "<div class='password'>"+data[i].password+"</div>";
				var p3 = "<div class='companyname'>"+data[i].companyname+"</div>";
				var p4 = "<div class='phone'>"+data[i].tel+"</div>";
				var p5 = "<button class='member-delete' onclick='deleteMsg(\""+data[i].username+"\")'>删除</button>";
				$(".J_memberinfo").append("<li>"+p1+p2+p3+p4+p5+"</li>");
			}
		}
	});
}
function showAddBox(){
	$("#frame-bg").css("display","block");
	$(".J_addBox").css("display","block");
}
function eventsInAddBox(){
	$("#close1").on("click",function(){
		$("#frame-bg").css("display","none");
		$(".J_addBox").css("display","none");
	})
	$(".J_addBox .username").on("focus",function(){
		if($(this).val() == "请输入用户名"){
			$(this).val("");
		}
		$(this).css({"color":"black"});
		$(".J_addBox .tishi").html("");
	}).on("blur",function(){
		if($(this).val() == ""){
			$(this).val("请输入用户名");
		}
		$(this).css({"color":"gray"});
	})
	$(".J_addBox .password").on("focus",function(){
		if($(this).val() == "请输入密码"){
			$(this).val("");
		}
		$(this).css({"color":"black"});
		$(".J_addBox .tishi").html("");
	}).on("blur",function(){
		if($(this).val() == ""){
			$(this).val("请输入密码");
		}
		$(this).css({"color":"gray"});
	})
	$(".J_addBox .companyname").on("focus",function(){
		if($(this).val() == "请输入公司名"){
			$(this).val("");
		}
		$(this).css({"color":"black"});
		$(".J_addBox .tishi").html("");
	}).on("blur",function(){
		if($(this).val() == ""){
			$(this).val("请输入公司名");
		}
		$(this).css({"color":"gray"});
	})
	$(".J_addBox .phone").on("focus",function(){
		if($(this).val() == "请输入电话号码"){
			$(this).val("");
		}
		$(this).css({"color":"black"});
		$(".J_addBox .tishi").html("");
	}).on("blur",function(){
		if($(this).val() == ""){
			$(this).val("请输入电话号码");
		}
		$(this).css({"color":"gray"});
	})
}

function addPic(){
	var reg= /^(?! +$).+/;
	$("#sub").on("click",function(){
		var username = $(".J_addBox .username").val();
		var password = $(".J_addBox .password").val();
		var companyname = $(".J_addBox .companyname").val();
		var phone = $(".J_addBox .phone").val();
		if(username == "请输入用户名" || !reg.test(username)){
			$(".J_addBox .tishi").html("请填写完整信息");
		}
		else if(password == "请输入密码" || !reg.test(password)){
			$(".J_addBox .tishi").html("请填写完整信息");
		}
		else if(companyname == "请输入公司名" || !reg.test(companyname)){
			$(".J_addBox .tishi").html("请填写完整信息");
		}
		else if(phone == "请输入电话号码" || !reg.test(phone)){
			$(".J_addBox .tishi").html("请填写完整信息");
		}
		else{
			$.ajax({
				type:"get",
				url:apiurl+"Register.php",
				async:true,
				cache:false,
				data:{
					username:username,
					password:password,
					companyname:companyname,
					tel:phone
				},
//				dataType:"json",
//				jsonp: "callbackparam",
				success:function(data){
					if(data == "success"){
						$("#frame-bg").css("display","none");
						$(".J_addBox").css("display","none");
						window.location.reload();
					}
					else{
						$(".J_addBox .tishi").html("用户名已被注册");
					}
				}
			});
		}
	})
}
function deleteMsg(username){
	$("#promptBox").html("<p>确定删除？</p><button onclick='sureDelete(\""+username+"\")'>确认</button><button onclick='cancleDelete()' style='margin-left:8%;'>取消</button>");
	$("#promptBox").append("<div class='closeBox' onclick='cancleDelete()'><img src='img/close.png'/></div>");
	$("#promptBox").css("display","block");
	$("#frame-bg").css("display","block");
}
function sureDelete(username){
	$.ajax({
		type:"get",
		url:apiurl+"UserDelete.php",
		async:true,
		cache:false,
		data:{
			username:username
		},
		success:function(data){
			window.location.reload();
		}
	});
}
function cancleDelete(){
	$("#promptBox").css("display","none");
	$("#frame-bg").css("display","none");
}