var t;

$(function() {
	getlinks();
	init();
	getmbinfo();
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

function init() {
	t = window.location.search.split("=")[1];
}

function getmbinfo() {
	$.ajax({
		type: "get",
		url: apiurl + "GetOneData.php",
		async: true,
		data: {
			mbStrId: t
		},
		dataType: "json",
		success: function(data) {
			if(data.flag == "true") {
				var u = "http://demo.claydai.cn/Jijinhui/" + data.info.mbLogo;
				$(".J_mb-info").append("<div><img src=" + u + "></div>");
				$(".J_mb-info").append("<div>法人：<p class='p1'>" + data.info.mbCorporation + "</p></div>");
				$(".J_mb-info").append("<div>所属单位名称 ：<p class='p1'>" + data.info.mbCompany + "</p></div>");
				$(".J_mb-info").append("<div>会员简称 ：<p class='p1'>" + data.info.mbCalled + "</p></div>");
				$(".J_mb-info").append("<div>单位类型 ：<p class='p1'>" + mbstyle[data.info.mbFlag] + "</p></div>");
				//				$(".J_mb-info").append("<div>地图 ：<p>"+data.info.mbAddress+"</p></div>");
				$(".J_mb-info").append("<div class='p2'>会员简介 ：<p>" + data.info.mbSummary + "</p></div>");
				setMap(data);
			}
		}
	});
}

//地图
function setMap(data) {
	var x = data.info.mbAddress.split(",")[0];
	var y = data.info.mbAddress.split(",")[1];
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(parseInt(x), parseInt(y));
	var marker = new BMap.Marker(point); // 创建标注
	map.addOverlay(marker); // 将标注添加到地图中
	map.centerAndZoom(point, 12);
	map.enableScrollWheelZoom(true);
	var opts = {
		width: 200, // 信息窗口宽度
		height: 100, // 信息窗口高度
		title: data.info.mbCompany, // 信息窗口标题
		enableMessage: true, //设置允许信息窗发送短息
		message: ""
	}
	var infoWindow = new BMap.InfoWindow(data.info.mbAddress2, opts); // 创建信息窗口对象 
	marker.addEventListener("click", function() {
		map.openInfoWindow(infoWindow, point); //开启信息窗口
	});
}