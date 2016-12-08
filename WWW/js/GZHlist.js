


var apiurl = "http://testwx.nbguohe.top/index.php/user/user/";

$(".nav-bar .first a").attr("href",$.cookie("url"));
$.ajax({
	type:"get",
	url:apiurl+"getGHs_pc",
	async:true,
	data:{openid:$.cookie("openid")},
	dataType:"json",
	xhrFields: {
            withCredentials: true
       },
	success:function(data){
		console.log(data);
		var str = "";
		for(var i=0;i<data.length;i++){
			var str1 = "<div class='GZHname'><img src="+data[i].head_img+" /><p>"+data[i].nick_name+"</p></div>";
			var str2 = "<div class='vipLevel'>vip3</div>";
			var str3 = "<div class='times'><p>创建时间:2016/10/24</p><p>到期时间:2016/11/25</p><p>升级vip续费</p></div>";
			var str4 = "<div class='operate'><button onclick='jumpToManagePage(\""+data[i].user_name+"\")'>管理</button></div>";
			str = str + "<li>"+str1+str2+str3+str4+"</li>";
			if(i%9 == 0){
				$(".GZHlist ul").append(str);
				str = "";
			}
		}
		$(".GZHlist ul").append(str);
	}
});

function jumpToManagePage(username){
	window.location.href = "manageList.html";
	$.cookie("username",username);
}
