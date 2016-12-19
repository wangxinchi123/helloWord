/**
 * Created by Administrator on 2016/12/15.
 */
var appid = "wx7194f366b35da46d";
var ApiUrl = "http://bangxiweixin.fenxiaozhu.top/index3.php/stu/index/";

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
								$("#openid").val(result.user.openid);
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
						$("#openid").val(result.user.openid);

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
		$("#openid").val(wxopenid);
//		alert(getCookie('nickname'));
//		alert(getCookie('wxopenid'));
//		alert(getCookie('headimgurl'))

	}
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}