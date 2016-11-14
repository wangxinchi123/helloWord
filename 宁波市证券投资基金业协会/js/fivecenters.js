

var t;

$(function(){
	getlinks();
	init();
	getMemberInfo();
})
function getlinks() {
	$.ajax({
		type: "get",
		url: "http://jijinhui.nitdai.cn/guoheAPI/flink.php",
		async: true,
		dataType: "json",
		success: function(data1) {
			for(var i = 0; i < data1.length; i++) {
				if(data1[i] == null) {
					break;
				}
				$(".J_yqlj ul").append("<li><a href=" + data1[i].url + ">" + data1[i].webname + "</a></li>");
			}
			linksScroll(data1.length);
		}
	});
}

function linksScroll(k) {
	var p = 1;
	var timer1 = setInterval(function() {
		if(p > k - 4) {
			$(".J_yqlj ul").animate({
				"top": "0px"
			}, 500);
			p = 1;
		} else {
			$(".J_yqlj ul").animate({
				"top": "-=27px"
			});
			p++;
		}
	}, 5000);
}
function init(){
	t = window.location.search.split("=")[1];
	if(t == null){
		t = "1";
	}
	if(t == "0"){
		t = "20";
	}
}

function getMemberInfo(){
	$.ajax({
		type:"get",
		url:apiurl+"selectByAreaFlagFlagAndStart.php",
		async:true,
		data:{
			areaFlag:t,
			start:0,
			num:9999
		},
		dataType:"json",
//		jsonp: "callbackparam",
		success:function(data){
			if(data.flag == true){
				if(data.total == "0"){
					$(".J_member-list").html("<h4>"+area[t]+"</h4><div style='text-align:center;line-height:50px;'>没有此类信息</div>");
				}
				else{
					$(".J_member-list h4").html(area[t]);
					setList(data);
				}
			}
		}
	});
}
function setList(data){
	for(var i = 1;i<=data.total;i++){
		var u = "memberinfo.html?mbStrId="+data.result[i-1].mbStrId;
		if(i==1){
			$(".J_member-list table").append("<tr><td rowspan="+data.total+">"+area[data.result[i-1].areaFlag]+"</td><td>"+i+"</td><td><a href="+u+" target='_blank'>"+data.result[i-1].mbCompany+"</a></td><td>"+mbstyle[data.result[i-1].mbFlag]+"</td><td>"+data.result[i-1].mbAddress2+"</td></tr>");
		}
		else{
			$(".J_member-list table").append("<tr><td>"+i+"</td><td><a href="+u+" target='_blank'>"+data.result[i-1].mbCompany+"</a></td><td>"+mbstyle[data.result[i-1].mbFlag]+"</td><td>"+data.result[i-1].mbAddress2+"</td></tr>");
		}
	}
}
