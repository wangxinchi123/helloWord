//判断用户的浏览设备是移动设备还是PC
browserRedirect();

function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {

	} else {
		$("#description").css({
			"width": "50%",
			"height": "300px"
		});
		$("body,html").css({
			"height": "auto"
		});

	}
}

//获取微信用户信息
getWeiXinUserInfo();

function getWeiXinUserInfo() {
	var wxopenid = getCookie('wxopenid');
	var access_code = GetQueryString('code');
	var from_id = GetQueryString('from_id');
	var state = GetQueryString('state');

	/**
	 * if cookies中没有wxopenid
	 * else cookies中有OPenid
	 * */
	if(wxopenid == null || wxopenid == undefined || wxopenid == "") {
		if(access_code == null) {
			var fromurl = location.href.split('?')[0] + "?&from_id=" + from_id;
			var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + encodeURIComponent(fromurl) + '&response_type=code&scope=snsapi_base&state=snsapi_base#wechat_redirect';
			location.href = url;
		} else {
			if(state == "snsapi_base") {
				$.ajax({
					type: 'get',
					url: ApiUrl + 'getOpenid',
					async: false,
					cache: false,
					data: {
						code: access_code
					},
					dataType: 'json',
					success: function(result) {
						if(result != null && result.hasOwnProperty('openid') && result.openid != "") {

							if(result.flag == "false") {
								var fromurl = location.href.split('?')[0] + "?&from_id=" + from_id;
								var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + encodeURIComponent(fromurl) + '&response_type=code&scope=snsapi_userinfo&state=snsapi_userinfo#wechat_redirect';
								location.href = url;
							} else {
								$("#content").html(result.user.nickname);
								setCookie('from_id', from_id);
								setCookie('nickname', result.user.nickname);
								setCookie('wxopenid', result.user.openid);
								setCookie('headimgurl', result.user.headimgurl);
								/******
								 * result.user
								 * nickname
								 * openid
								 * headimgurl
								 * **************/

							}
						} else {}
					},
					error: function() {

					}
				});
			} else {
				$.ajax({
					type: 'get',
					url: ApiUrl + 'getUserInfo',
					async: false,
					cache: false,
					data: {
						code: access_code
					},
					dataType: 'json',
					success: function(result) {
						$("#content").html(result.user.nickname);
						setCookie('from_id', from_id);
						setCookie('nickname', result.user.nickname);
						setCookie('wxopenid', result.user.openid);
						setCookie('headimgurl', result.user.headimgurl);

						/******
						 * result.user
						 * nickname
						 * openid
						 * headimgurl
						 * **************/
					}
				});
			}
		}
	} else {

//		alert(getCookie('nickname'));
//		alert(getCookie('wxopenid'));
//		alert(getCookie('headimgurl'))

	}
}

var des = [];
des[0] = "五险一金";
des[1] = "周末双休";
des[2] = "年底双薪";
des[3] = "节日福利";
des[4] = "丰厚奖金";
des[5] = "领导nice";
des[6] = "一年四次涨薪";
des[7] = "三餐免费";
des[8] = "弹性上班";
des[9] = "携宠上班";
des[10] = "带薪年假";
des[11] = "出境游";
des[12] = "世界500强";
des[13] = "免费班车";
des[14] = "宽松环境";
des[15] = "提供住宿";
des[16] = "鸟哥team";
des[17] = "升职空间大";
des[18] = "超长春节假";
des[19] = "开放式办公";
des[20] = "高颜值团队";
des[21] = "月薪上万";
des[22] = "免费下午茶";
des[23] = "萌妹纸多";
des[24] = "CBD办公";
des[25] = "校园式工作氛围";
des[26] = "大小周聚餐";
des[27] = "早十晚七";

var x = [];
var y = [];

x[0] = "20";
y[0] = "40";
x[1] = "180";
y[1] = "60";
x[2] = "30";
y[2] = "100";
x[3] = "200";
y[3] = "110";
x[4] = "130";
y[4] = "80";
x[5] = "90";
y[5] = "130";

$("body").on("touchmove", function(event) {
	event.preventDefault();
});

intermingleArray();
drawText();

function drawText() {
	var canvas = document.getElementById("description");
	var context = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;
	context.beginPath();
	for(var i = 0; i < 6; i++) {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		context.fillStyle = "rgb(" + r + " ," + g + " ," + b + ")";
		var fs = Math.floor(Math.random() * 10 + 14);
		context.font = "bold " + fs + "px Microsoft YaHei";
		context.fillText(des[i], x[i], y[i]);
	}
	context.closePath();
}

function intermingleArray() {
	des.sort(function() {
		return 0.5 - Math.random()
	});
}

$(".go-test img").on("touchstart",function(){
	window.location.href="page1.html";
})
