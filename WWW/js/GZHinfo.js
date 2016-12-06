var apiUrl = "http://testwx.nbguohe.top/index.php/user/user/";

var username = $.cookie("username");

$.ajax({
	type: "get",
	url: apiUrl + "getGHInfo_pc",
	data: {
		username: $.cookie("username")
	},
	async: true,
	dataType: "json",
	xhrFields: {
		withCredentials: true
	},
	success: function(data) {
		console.log(data);
		$(".gzh-logo img").attr("src", data.head_img);
		$(".gzh-name div").html(data.nick_name);
		$(".message-days div").html(data.days1);
		$(".erweima-days div").html(data.days2);
	}
});

getAdminsNum();
function getAdminsNum() {
	$.ajax({
		type: "get",
		url: apiUrl + "getGHInfo_pc",
		async: true,
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		data: {
			username: username
		},
		success: function(data) {
			$(".gzh-switch .headimg").attr("src", data.head_img);
			$(".gzh-switch .nickname").text(data.nick_name);
		}
	});
}