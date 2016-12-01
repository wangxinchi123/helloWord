

var FXZ_WXJS_READY_FLAG = 0; //微信JS配置完毕标志,0未完成,1完成
var wxopenid = ""; //粉小猪全局变量,,当前用户openid
var access_code = "";

getopenid();


FastClick.attach(document.body);

$.ajax({
	type: "get",
	url: "http://testwx.nbguohe.top/index.php/user/user/getGHs2?openid="+wxopenid,
	async: true,
	dataType: "json",
	success: function(data) {
		var str = "";
		for(var i = 0; i < data.length; i++) {
			if(data[i].flag_media_moren == "1"){
				str = str + "<li><img class='headImg' src=" + data[i].head_img + " /><div class='nickname'>" + data[i].nick_name + "</div><button data-username="+data[i].user_name+" onclick='changeDefaultGZH(this)' style='color:#1aad19;'>已为默认</button></li>";
			}
			else{
				str = str + "<li><img class='headImg' src=" + data[i].head_img + " /><div class='nickname'>" + data[i].nick_name + "</div><button data-username="+data[i].user_name+" onclick='changeDefaultGZH(this)'>设为默认</button></li>";
			}
			
		}
		$(".GZH-list ul").html(str);
	}
});

function changeDefaultGZH(obj){
	$.ajax({
		type:"get",
		url:"http://testwx.nbguohe.top/index.php/user/user/editMediaMoren",
		data:{
			openid:wxopenid,
			wx_username:$(obj).attr("data-username")
		},
		async:true,
		dataType:"json",
		success:function(data){
			$(".GZH-list li button").css({"color":"gray"});
			$(".GZH-list li button").html("设为默认");
			$(obj).css({"color":"#1aad19"});
			$(obj).html("已为默认");
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