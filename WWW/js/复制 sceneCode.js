
var apiurl = "http://testwx.nbguohe.top";
var group1 = [];
var group2 = [];
group1[0] = "-1";
group2[0] = "未分组";

$.ajax({
	type:"get",
	url:apiurl+"/index.php/fxz/tags/get",
	async:false,
	xhrFields: {
	    withCredentials: true
	},
	dataType:"json",
	data:{username:$.cookie("username")},
	success:function(data){
		data = data.tags;
		var str = "";
		for(var i=0;i<data.length;i++){
			group1[i+1] = data[i].id;
			group2[i+1] = data[i].name;
			str = str + "<li>"+data[i].name+"</li>";
		}
		$("#allFenZu ul").append(str);
	}
});


if($.cookie("superAdmin") != 1){
	$(".content-right .title button").attr("disabled","disabled");
	$(".content-right .title button").css("opacity","0.5");
	$(".content-right .title button").on("click",function(event){event.preventDefault();});
}

$.ajax({
	type:"get",
	url:apiurl+"/index.php/fxz/qrcode/getStrQRCodes",
	async:true,
	xhrFields: {
	    withCredentials: true
	},
	dataType:"json",
	data:{username:$.cookie("openid")},
	success:function(data){
		data = data.data;
		var str = "";
		for(var i=0;i<data.length;i++){
			var k = i+1;
			for(var j=0;j<group1.length;j++){
				if(String(group1[j]).indexOf(data[i].groupid)!=-1){
					var nowgroupid = j;
					break;
				}
			}
			str = str + "<tr><td class='bianhao'>"+k+"</td><td class='leixing'>"+data[i].type+"</td><td class='fenzu' data-scene="+data[i].scene+" onclick='changeFenZu(this)'>"+group2[nowgroupid]+"</td><td class='createtime'>"+data[i].time1+"</td><td class='erweima'><button>查看二维码</button></td></tr>";
			if(i%6 == 0){
				$(".content-right table").append(str);
				str = "";
			}
		}
		$(".content-right table").append(str);
	}
});



$(".content-right .title button").on("click",function(){
	
	$.ajax({
		type:"get",
		url:apiurl+"/index.php/fxz/qrcode/addStrQRCode",
		async:true,
		xhrFields: {
	    	withCredentials: true
		},
		dataType:"json",
		data:{groupid:-1,username:$.cookie("openid")},
		success:function(data){
			alert(data.success);
		}
	});
});

function changeFenZu(obj){
	$("#allFenZu").css("display","block");
	$("#allFenZu li").on("click",function(){
		for(var i=0;i<group2.length;i++){
			if(group2[i].indexOf($(this).text())!=-1){
				var groupid = group1[i];
				break;
			}
		}
		var scene = $(obj).attr("data-scene");
		$(obj).text(group2[i]);
		$.ajax({
			type:"get",
			url:apiurl+"/index.php/fxz/qrcode/updateGroupid",
			async:true,
			xhrFields: {
	    		withCredentials: true
			},
			dataType:"json",
			data:{
				groupid:groupid,
				scene:scene,
				username:$.cookie("username")
			},
			success:function(data){
				if(data.success == "true"){
					$("#allFenZu").css("display","none");
				}
			}
		});
	})
}
