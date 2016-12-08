




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


}