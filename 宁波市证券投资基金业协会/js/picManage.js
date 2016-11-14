
var ext;
var cropStr;

$(function(){
	eventsInAddBox();
	getAllPicMsg();
	addPic();
})

function eventsInAddBox(){
	$("#close1").on("click",function(){
		$("#frame-bg").css("display","none");
		$(".J_addBox").css("display","none");
	})
	$(".J_picTitle").on("focus",function(){
		if($(this).val() == "请输入图片标题"){
			$(this).val("");
		}
		$(this).css({"color":"black"});
		$(".J_addBox .tishi").html("");
	}).on("blur",function(){
		if($(this).val() == ""){
			$(this).val("请输入图片标题");
		}
		$(this).css({"color":"gray"});
	})
	$(".sort input").on("focus",function(){
		if($(this).val() == "请输入数字"){
			$(this).val("");
		}
		$(this).css({"color":"black"});
		$(".J_addBox .tishi").html("");
	}).on("blur",function(){
		if($(this).val() == ""){
			$(this).val("请输入数字");
		}
		$(this).css({"color":"gray"});
	})
	
}
function addPic(){
	var a = /^[0-9]*$/;
	$("#sub").on("click",function(){
		if($(".J_picTitle").val() == "" || $(".J_picTitle").val() == "请输入图片标题"){
			$(".J_addBox .tishi").html("请填写完整信息");
		}
		else if($(".sort input").val() == "" || $(".sort input").val() == "请输入数字"){
			$(".J_addBox .tishi").html("请填写完整信息");
		}
		else if(!(a.test($(".sort input").val()))){
			$(".J_addBox .tishi").html("请在第三栏输入数字");
		}
		else if(cropStr == "" || cropStr == null){
			$(".J_addBox .tishi").html("请选择图片");
		}
		else{
			var url = "guohe/"; //保存路径
//			alert(cropStr);
			$.ajax({
				type:"post",
				url:"http://192.168.50.195/Jijin/Admin/index.php",
				async:true,
				cache:false,
				data:{
					title:$(".J_picTitle").val(),
					place:$(".pic-site option:selected").val(),
					picsort:$(".sort input").val(),
					img: cropStr,
					url: url,
					type: ext
				},
				dataType:"json",
//				jsonp:"callbackparam",
				success:function(data){
					$("#frame-bg").css("display","none");
					$(".J_addBox").css("display","none");
					window.location.reload();
				}
			});
		}
	})
}
function getAllPicMsg(){
	$.ajax({
		type:"get",
		url:"http://192.168.50.195/Jijin/Admin/PictureIndex.php",
		async:true,
		cache:false,
		dataType:"jsonp",
		jsonp: "callbackparam",
		success:function(data){
			for(var i = 0 ; i<data.length ; i++){
				var place;
				if(data[i].place == "a"){
					place = "广告位";
				}
				else if(data[i].place == "b"){
					place = "轮播位";
				}
				var p1 = "<div class='pic-title'>"+data[i].title+"</div>";
				var p2 = "<div class='pic-site'>"+place+"</div>";
				var p3 = "<div class='pic-sort'>"+data[i].picsort+"</div>";
				var p4 = "<button class='pic-delete' onclick='deleteMsg(\""+data[i].picpath+"\")'>删除</button>";
				var p5 = "<button class='pic-select' onclick='selectMsg(\""+data[i].picpath+"\")'>查看</button>";
				$(".J_picInfo").append("<li>"+p1+p2+p3+p4+p5+"</li>");
			}
		}
	});
}
function deleteMsg(picpath){
	$("#promptBox").html("<p>确定删除？</p><button onclick='sureDelete(\""+picpath+"\")'>确认</button><button onclick='cancleDelete()' style='margin-left:8%;'>取消</button>");
	$("#promptBox").append("<div class='closeBox' onclick='cancleDelete()'><img src='img/close.png'/></div>");
	$("#promptBox").css("display","block");
	$("#frame-bg").css("display","block");
}
function sureDelete(picpath){
	$.ajax({
		type:"get",
		url:"http://192.168.50.195/Jijin/Admin/PictureDelete.php",
		async:true,
		cache:false,
		data:{
			picpath:picpath
		},
		dataType:"json",
		success:function(data){
			window.location.reload();
		}
	});
}
function cancleDelete(){
	$("#promptBox").css("display","none");
	$("#frame-bg").css("display","none");
}
function selectMsg(picpath){
	var picpath = "http://192.168.50.195/Jijin/Admin/"+picpath;
	$(".J_picShow img").attr("src",picpath);
	setTimeout(function(){
		if($(".J_picShow").height() != 0 && $(".J_picShow").width() != 0){
			var t = ($(window).height() - $(".J_picShow").height())/2;
			var l = ($(window).width() - $(".J_picShow").width())/2;
			$(".J_picShow").css({"top":t+"px","left":l+"px"});
		}
		$("#frame-bg").css("display","block");
		$(".J_picShow").css("display","block");
		$("#frame-bg,.J_picShow").one("click",function(){
			$("#frame-bg").css("display","none");
			$(".J_picShow").css("display","none");
		})
	},100)	
}
function showAddBox(){
	$("#frame-bg").css("display","block");
	$(".J_addBox").css("display","block");
	$("#frame-bg").unbind();
}

function imgToDate(id) {
	var GlobalimgWidth = 400; //压缩后图片宽度
	var postUrl = "http://192.168.50.195/Jijin/Admin/";
	//        var postUrl="http://localhost/IMGAPI2/";
	var docObj = document.getElementById("doc" + id);
	var file = document.getElementById("doc" + id);
	var filepath = $("#doc" + id).val();
	var extStart = filepath.lastIndexOf(".");
	ext = filepath.substring(extStart, filepath.length)
		.toUpperCase();

	if(ext != ".BMP" && ext != ".PNG" && ext != ".GIF" &&
		ext != ".JPG" && ext != ".JPEG") {
		$("#info" + id).css('color', 'red');
		$("#info" + id).html("图片限于png,gif,jpeg,jpg格式")
		$("#doc" + id).val("");
		return false;
	} else {}
	var imge = new Image();

	imge.src = window.URL.createObjectURL(docObj.files[0]);

	imge.onload = function() {

		var imgWidth = imge.width;
		var imgHeight = imge.height;
		
		var scale = imgWidth / imgHeight;
		height1 = imgHeight;
		width1 = imgWidth;
		if(imgWidth > $(window).width()*0.8){
			imgWidth = $(window).width()*0.8;
			width1 = imgWidth; //压缩后图片宽度
			height1 = imgWidth / scale;
		}
		if(imgHeight > $(window).height()*0.9){
			imgHeight = $(window).height()*0.9;
			height1 = imgHeight;
			width1 = imgHeight * scale;
		}
		

		var canvas = $("#cans" + id);
		canvas[0].width = width1;
		canvas[0].height = height1;
		var ctx = canvas[0].getContext('2d');
		ctx.drawImage(imge, 0, 0, width1,
			height1);
		cropStr = canvas[0].toDataURL("image/jpeg", 1);

		$("#ret").attr("src", imge.src);

	}
}