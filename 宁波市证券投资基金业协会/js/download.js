
var downloadlink = [];
var downloadname = [];
downloadAttachment();
function downloadAttachment() {
	$(".download1").after("<div class='download2'></div>");
	var k = 0;

	$(".download1 a").each(function(index) {
		if($(this).attr("href") != "") {
			downloadlink[k] = $(this).attr("href");
			var str = $(this).attr("href").split("/");
			downloadname[k] = str[str.length - 1];
			k++;
			var imgSrc = "/dedeCMS/templets/default/images/附件下载" + k + ".png";
			$(".download2").append("<div class='nyrp5' onclick='sed(this)'><div><img src=" + imgSrc + " height='10' align='center' /></div></div>");
		}
	})
}

function sed(obj) {
	var articleid = $("#aid").val();
	var username = "guohe";
	$.ajax({
		type: "get",
		url: "http://192.168.50.197/Jijin/User/DownloadLog.php",
		async: true,
		data: {
			username: username,
			articleid: articleid,
			downloadname: downloadname[$(obj).index()],
			downloadlink: downloadlink[$(obj).index()]
		},
		dataType: "json",
		success: function() {}
	});
	window.open(downloadlink[$(obj).index()]);
}