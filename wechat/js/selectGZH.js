var FXZ_WXJS_READY_FLAG = 0; //微信JS配置完毕标志,0未完成,1完成
var wxopenid = ""; //粉小猪全局变量,,当前用户openid
var access_code = "";
var username = "";

FastClick.attach(document.body);

getopenid();
config_wxjs();

$.ajax({
	type: "get",
	url: "http://testwx.nbguohe.top/index.php/user/user/getGHs?openid="+wxopenid,
	async: true,
	dataType: "json",
	success: function(data) {
		var str = "";
		for(var i = 0; i < data.length; i++) {
			str = str + "<li onclick='getAdmin(\"" + data[i].user_name + "\")'><img class='headImg' src=" + data[i].head_img + " /><div class='nickname'>" + data[i].nick_name + "</div><div class='zuojiantou'>></div></li>";
		}
		$(".GZH-list ul").html(str);
	}
});

$("#bg").on("touchstart", function() {
	$("#bg").css("display", "none");
	$("#adminList").css({
		"opacity": "0",
		"top": "500px"
	});
	$("#adminList p").css("display","none");
});
$("#addAdmin").on("click", function() {
	fxz_share();
});

function getAdmin(user) {
	$.ajax({
		type: "get",
		url: "http://testwx.nbguohe.top/index.php/user/user/getAdministratorsByUsername",
		async: true,
		data: {
			username: user
		},
		dataType: "json",
		success: function(data) {
			username=user;
			$("#bg").fadeIn(200);
			var str = "";
			for(var i = 0; i < data.length; i++) {
				str = str + "<li><img class='headImg' src=" + data[i].headimgurl + " /><div class='nickname'>" + data[i].nickname + "</div><button>权限设置</button></li>";
			}

			$("#adminList ul").html(str);
			$("#adminList").animate({
				"top": "100px",
				"opacity": "1"
			}, 200);
		}
	});
}

function getopenid() {

	wxopenid = getcookie('wxopenid');
	access_code = GetQueryString('code');
	if(wxopenid == "") {
		if(access_code == null) {
			var fromurl = location.href;
			var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb76b3437a5b415b9&redirect_uri=' + fromurl + '&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';
			window.location.href = url;
		} else {
			$.ajax({
				type: 'get',
				url: 'http://testwx.nbguohe.top/index.php/user/user/oauth',
				async: false,
				cache: false,
				data: {
					code: access_code
				},
				dataType: 'json',
				success: function(result) {
					if(result != null && result.hasOwnProperty('openid') && result.openid != "") {
						addcookie('wxopenid', result.openid, 360000);
						getlogininfo(result.openid);
						wxopenid = result.openid;
						//config_wxjs();
					} else {
						window.location.href = fromurl;
					}
				}
			});
		}
	} else {
		//config_wxjs();
	}

}

/***配置微信js***/
function config_wxjs() {
	/***配置微信js***/
	var mysignature = "";
	$.ajax({
		type: 'get',
		async: false,
		url: FXZ_URL + '/index.php/guohe/weixinjs/getSignature?username=gh_34d563b3398c',
		data: {
			"url": window.location.href
		},

		success: function(data) {
			mysignature = data;
		},

		error: function() {}
	});
	wx.config({
		debug: true,
		appId: 'wxb76b3437a5b415b9', // 必填，公众号的唯一标识
		timestamp: 1414587457, // 必填，生成签名的时间戳
		nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
		signature: mysignature + "", // 必填，签名，见附录1
		jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	wx.ready(function() {
		FXZ_WXJS_READY_FLAG = 1;
		alert(111);
	});
}

function fxz_share() {
	var fxz_code = get_fxz_code();
	wx.onMenuShareTimeline({
		title: '成为粉小猪管理员邀请', // 分享标题
		link: FXZ_URL + '/web/fxz/admin/admins2.html?openid=' + wxopenid + '&fxz_code=' + fxz_code+'&username='+username, // 分享链接
		imgUrl: FXZ_URL + '/logo.png', // 分享图标
		success: function() {
			fxz_share();
			if($("#adminList p").css("display") == "none"){
				$("#adminList p").css("display","block");
			}
		},
		cancel: function() {}
	});
	wx.onMenuShareAppMessage({
		title: '成为粉小猪管理员邀请', // 分享标题
		desc: '成为管理员', // 分享描述
		link: FXZ_URL + '/web/fxz/admin/admins2.html?openid=' + wxopenid + '&fxz_code=' + fxz_code+'&username='+username, // 分享链接
		imgUrl: FXZ_URL + '/logo.png', // 分享图标
		type: 'link', // 分享类型,music、video或link，不填默认为link
		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function() {
			fxz_share();
			if($("#adminList p").css("display") == "none"){
				$("#adminList p").css("display","block");
			}
		},
		cancel: function() {}
	});
}