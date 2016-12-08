var apiurl = "http://testwx.nbguohe.top/index.php/user/user/";

var username = $.cookie("username");

$.ajax({
	type: "get",
	url: apiurl + "getGHInfo_pc",
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
