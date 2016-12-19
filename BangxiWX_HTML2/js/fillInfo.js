var mydate = new Date();
var year = mydate.getFullYear();
var graduateyear = "";
var nowPage = 1;


$.ajax({
	type:"get",
	url:"http://bangxiweixin.fenxiaozhu.top/index3.php/stu/index/getOnesRecorde",
	async:false,
	dataType:"json",
	data:{openid:getCookie("wxopenid")},
	success:function(data){
		if(data.flag == "true"){
			$("#xuexiao").val(data.user.school);
			$("#zhuanye").val(data.user.major);
			$("#xingshi").val(data.user.name);
			if(data.user.tel != ""){
				$("#shoujihao").val(data.user.tel);
				$(".sendCode,.code").css("display","none");
			}
			if(data.user.sex == "0"){
				$("#sex-nan img").attr("src","img/weixuanzhong.png").css({"padding":"10px 10px","width":"18px","height":"18px"});
				$("#sex-nv img").attr("src","img/p6-xuanzhongnv.png").css({"padding":"0","width":"38px","height":"38px"});
				$("#sex").val("0");
			}
			else{
				$("#sex-nv img").attr("src","img/weixuanzhong.png").css({"padding":"10px 10px","width":"18px","height":"18px"});
				$("#sex-nan img").attr("src","img/xuanzhong.png").css({"padding":"0","width":"38px","height":"38px"});
				$("#sex").val("1");
			}
			graduateyear = data.user.graduateyear;
		}
	}
});




for(var i=5;i>0;i--){
	if((year-i) == graduateyear){
		$(".graduation select").append("<option value="+(year-i)+" selected='selected'>"+(year-i)+"</option>");
	}
	else{
		$(".graduation select").append("<option value="+(year-i)+">"+(year-i)+"</option>");
	}
}
if(graduateyear == "" || graduateyear == year){
	$(".graduation select").append("<option value="+year+" selected='selected'>"+year+"</option>");
}
else{
	$(".graduation select").append("<option value="+year+">"+year+"</option>");
}
for(var i=1;i<=5;i++){
	if((year+i) == graduateyear){
		$(".graduation select").append("<option value="+(year+i)+" selected='selected'>"+(year+i)+"</option>");
	}
	else{
		$(".graduation select").append("<option value="+(year+i)+">"+(year+i)+"</option>");
	}
}



$("#sex-nan").on("touchstart",setNan);
$("#sex-nv").on("touchstart",setNv);

function setNan(){
	$("#sex-nv img").attr("src","img/weixuanzhong.png").css({"padding":"10px 10px","width":"18px","height":"18px"});
	$(this).children("img").attr("src","img/xuanzhong.png").css({"padding":"0","width":"38px","height":"38px"});
	$("#sex").val("1");
}

function setNv(){
	$("#sex-nan img").attr("src","img/weixuanzhong.png").css({"padding":"10px 10px","width":"18px","height":"18px"});
	$(this).children("img").attr("src","img/p6-xuanzhongnv.png").css({"padding":"0","width":"38px","height":"38px"});
	$("#sex").val("0");
}




$(".box1 .xiayibu").on("touchstart",function(){
	if($("#zhuanye").val()!="" && $("#xuexiao").val()!="" && $("#xingshi").val()!=""){
		$(".box1").fadeOut(500);
		$(".box2").animate({"left":"15%"},500);
		nowPage++;
	}
})

$(".sub").on("click",function(){
	$.ajax({
		type:"get",
		url:"http://bangxiweixin.fenxiaozhu.top/index3.php/stu/index/updateOnesInfo",
		async:true,
		data:$("#myForm").serialize(),
		dataType:"json",
		success:function(data){
			var url = "chart/chart.html?score1="+data.user.score1+"&score2="+data.user.score2+"&score3="+data.user.score3+"&score4="+data.user.score4+"&score5="+data.user.score5+"&score6="+data.user.score6+"&name="+data.user.name;
			window.location.href = url;
		}
	});
})

$(".back").on("touchstart",function(){
	if(nowPage == 1){
		window.location.href = "page2.html";
	}
	else{
		$(".box1").fadeIn(500);
		$(".box2").animate({"left":"100%"},500);
		nowPage--;
	}
})
