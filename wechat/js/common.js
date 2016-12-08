/**
 * Created by djt on 2016/11/26.
 */
var FXZ_URL = "http://testwx.nbguohe.top";//粉小猪域名


/*获取粉小猪随机码*/
function get_fxz_code() {
    var ret = "";

    $.ajax({
        type: 'get', async: false,
        url: FXZ_URL + "/index.php/user/user/get_fxz_code",
        data: {"url": window.location.href},

        success: function (data) {
            ret = data;
        },

        error: function () {
        }
    });
    return ret;
}


function addcookie(name, value, expireHours) {
    var cookieString = name + "=" + escape(value) + "; path=/";
    //判断是否设置过期时间
    if (expireHours > 0) {
        var date = new Date();
        date.setTime(date.getTime + expireHours * 3600 * 1000);
        cookieString = cookieString + "; expire=" + date.toGMTString();
    }
    document.cookie = cookieString;
}

function getcookie(name) {
    var strcookie = document.cookie;
    var arrcookie = strcookie.split("; ");
    for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name)return decodeURIComponent(arr[1]); //增加对特殊字符的解析
    }
    return "";
}

function delCookie(name) {//删除cookie
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getcookie(name);
    if (cval != null) document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}


var FXZ_WXJS_READY_FLAG = 0; //微信JS配置完毕标志,0未完成,1完成
var wxopenid = ""; //粉小猪全局变量,,当前用户openid
var access_code = "";

getopenid();

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