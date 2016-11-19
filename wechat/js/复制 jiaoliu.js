
//var openid = window.location.href.split("?")[1].split("&")[1].split("=")[1];
//var username = window.location.href.split("?")[1].split("&")[0].split("=")[1];

var firstId=1;
var lastId=1;
var nowExpressionIndex;//当前页数
var openid = "o8J2PwiYrse4M8QucNE4ZAliPZzo";
//var openid = "o8J2PwgqBdE0IQ6ZwtcyfnqYNcfw";
var username = "gh_3e8703d7490f";
var startX,endX,startY,endY;//坐标
var dropDownFlag=1;//判断是否下拉获取历史记录
var db;
var url;//媒体地址

$(function(){
	FastClick.attach(document.body);
	init();
	initAndBind();
	getCacheByPulldown();
})
 function init() {
    if(window.openDatabase==undefined){
		alert("浏览器不支持Web Database!");
		return;
	}
    else{
    	db=openDatabase("weixin","1.0","weixinshuju",1024*1024);
    	db.transaction(function (tx) {
//  		tx.executeSql("DROP TABLE o8J2PwiYrse4M8QucNE4ZAliPZzo");
        	tx.executeSql("create table if not exists "+openid+" (id unique, p1, p2, p3, mark)");  
        	getinfo(tx);
   		});
    }
}

function initAndBind(){
	addQQexpression();
	$(".nav-list").css("margin-left",(window.innerWidth-13*3)/2+"px");
	$(".nav-list li").eq(0).css("background-color","gray");
	$(".content").css("min-height",window.innerHeight-60+"px");
	$("#expression").css("height",window.innerHeight*0.3+"px");
	$(".pic").click(function(){
		if($("#blankBox").css("height") != "0px"){
			$(".enter-word textarea").focus();
		}
		else{
			$(".foot").css("position","absolute");
			var timer = setInterval(function(){window.scrollTo(0,document.body.scrollHeight);},10);
	//		$(".foot").animate({"bottom":"30%"},300);
			$("#blankBox").animate({"height":"200px"},0);
			$("#expression").animate({"bottom":"0"},300,function(){
				clearInterval(timer);
			});
		}

	});
	$("#expression .sendMsg").click(function(){
		sendMessage();
	});
//	$(".content").unbind("");
	$(".content").on("touchstart",function(event){
//		event.preventDefault();
		$(".enter-word textarea").blur();
		$("#expression").animate({"bottom":"-200px"},300);
		$("#blankBox").animate({"height":"0"},0);
		$(".foot").css("position","fixed");	
	});
	$(".enter-word textarea").on("focus",function(){
		$("#expression").css("bottom","-200px");
		$("#blankBox").css("height","0");
		$(".foot").css("position","absolute");
	});
	$(".enter-word textarea").keypress(function(e){
	    if(e.keyCode === 13) {
	    	// 处理相关逻辑
	    	e.preventDefault();
	    	sendMessage();
	    }
	})
//	InputBoxChange();
}

function addQQexpression(){
	$("#expression")[0].addEventListener("touchstart",touchStart,true);
	$("#expression")[0].addEventListener("touchend",touchEnd,true);
	$("#expression")[0].addEventListener("touchmove",touchMove,true);
	var p = 1;
	nowExpressionIndex = 1;
	var expressionBox = "expressionBox"+p;
	var str = "";
	for(var i = 1 ;i<50;i++){
		if(i%24 == 1){
			if(i!=1){
				$("."+expressionBox).append(str);
				p++;
				expressionBox = "expressionBox"+p;
				str = "";
			}	
			if(p == 1){
				$("#expression").append("<div class="+expressionBox+" style='position:absolute;width:100%;overflow:hidden;top:0;left:0'></div>");
			}
			else{
				$("#expression").append("<div class="+expressionBox+" style='position:absolute;width:100%;overflow:hidden;top:0;left:100%'></div>");
			}
		}
		str = str + "<li onclick='addPicInText("+i+")'><img src='QQexpression/"+i+".gif' /></li>";
	}
	$("."+expressionBox).append(str);
}
function touchMove(e){
	e.preventDefault();
}
function touchStart(e) {
	if(e.touches.length == 1) {
		startX = e.changedTouches[0].pageX;
		startY = e.changedTouches[0].pageY;
	}
}
function touchEnd(e){
	endX = e.changedTouches[0].pageX;
	endY = e.changedTouches[0].pageY;
//	e.preventDefault();
	if(Math.abs(startX - endX) > Math.abs(startY-endY)){
		if(startX - endX > 40){
			if(nowExpressionIndex+1<4){
				$(".expressionBox"+nowExpressionIndex).stop(true,true).animate({"left":"-100%"},500);
				nowExpressionIndex++;
				$(".expressionBox"+nowExpressionIndex).stop(true,true).animate({"left":"0"},500);
			}
		}
		else if(startX - endX < -40){
			if(nowExpressionIndex-1 > 0){
				$(".expressionBox"+nowExpressionIndex).stop(true,true).animate({"left":"100%"},500);
				nowExpressionIndex--;
				$(".expressionBox"+nowExpressionIndex).stop(true,true).animate({"left":"0"},500);
			}
		}
		$(".nav-list li").css("background-color","lightgray");
		$(".nav-list li").eq(nowExpressionIndex-1).css("background-color","gray");
	}

}
function addPicInText(i){
	$(".enter-word textarea").val($(".enter-word textarea").val()+imgArray[i]);
}

//function InputBoxChange(){
//	var l = 30;
//	$(".enter-word textarea").on("propertychange input",function(){
//		if($(".enter-word textarea").val().length > l && l<90){
//			$(".enter-word textarea").attr("rows",$(".enter-word textarea").attr("rows")+1);
//			$(".yuyin,.pic,.upload").css({"margin-top":$(".enter-word textarea").height()/2+"px"});	
//			l = l + 30;
//		}
//	})
//}

function sendMessage(){
	var msg = $(".foot .enter-word textarea").val();
//	alert(msg1);
	var p1 = "<div class='touxiang'><img src='img/c3d0eab5ff273d6087f181aba9735c14.jpg'/></div>";
	var p2 = "<div class='yousanjiao'></div>";
	var p3 = "<p class='message'>"+msg+"</p>";
//	$(".content").append("<div class='info-right'>"+p1+p2+p3+"</div>");
	$(".foot .enter-word textarea").val("");
	window.scrollTo(0,document.body.scrollHeight);
	sendMsgToFans(msg,p1,p2,p3);
}

function sendMsgToFans(content,p1,p2,p3){
	$.ajax({
		type:"post",
		url:apiUrl+"sendMessageText",
		data:{
			username:username,
			openid:openid,
			content:content
		},
		dataType:"json",
		success:function(data){
			if(data.errcode == "0"){
//				dbObject.put({ p1: p1, p2: p2, p3: p3,mark: "right" },parseInt(data.id));
			}
		}
	});
}


function Tclear() {
    dbObject.clear();
}

function getinfo(tx){
	    var maxid = tx.executeSql("select max(id) from "+openid);
	    var minid = tx.executeSql("select min(id) from "+openid);
		tx.executeSql('SELECT * FROM '+openid+' order by id', [], function (tx, results) {
            var len = results.rows.length,i;
            if(len == 0){
            	getInfoFromServer("");
            }
            else{
	            firstId = results.rows.item(len-1).id;
	            var k = 0;
	            var str = "";
	            for (i = len-1; i >=0; i--){
	            	if(firstId>minid){
	            		if(k==0){
		        			lastId = results.rows.item(i).id;
			        	}
			        	k++;
			        	if(results.rows.item(i).mark == "right"){
			        		var arr = new Array(2);
			        		arr[0] = "<div class='info-right'>"+results.rows.item(i).p1+results.rows.item(i).p2+cresults.rows.item(i).p3+"</div>";
			        		arr[1] = str;
			        		str = arr.join("");
			        	}
			        	else{
			        		var arr = new Array(2);
			        		arr[0] = "<div class='info-left'>"+results.rows.item(i).p1+results.rows.item(i).p2+results.rows.item(i).p3+"</div>";
			        		arr[1] = str;
			        		str = arr.join("");
			        	}
						if(k>=10){
							firstId = results.rows.item(i).id;
							getInfoInCache(str);
							break;
						}
	            	}
	            	else{
	            		if(k==0){
		            		getInfoFromServer(str);
			            }
			            else{
			            	getInfoInCache(str);
			            }
			            break;
	            	}
	            }
	        }
     });
        setInterval(function(){
        	$.ajax({
			    type:"get",
			    url:apiUrl+"getMessageList",
			    async:true,
			    data:{username:username,openid:openid,ones_lastID:lastId},
			    dataType:"json",
			    success:function(data){
			    	var str1 = "";
				    for(var i=0;;i++){
				        if(data.messageList[i] == null){
				           break;
				        }
				        lastId = data.nowChatLastID;
				       str1 = concreteOfGetInfo(data.messageList[i],str1);
				    }
				    if(str1 != ""){
				    	$(".content").append(str1);
//				    	window.scrollTo(0,document.body.scrollHeight);
				    }
				   
				}
			});
        },2000);
}
function getInfoInCache(str){
	$.ajax({
	    type:"get",
	    url:apiUrl+"getOnesMessages",
	    async:false,
	    data:{username:username,openid:openid,ones_lastID:lastId},
	    dataType:"json",
	    success:function(data){
		    for(var i=0;;i++){
		        if(data.messageList[i] == null){
		           break;
		        }
		        lastId = data.lastID;
		       str = concreteOfGetInfo(data.messageList[i],str);
		    }
		    $(".content").append(str);
		    window.scrollTo(0,document.body.scrollHeight);
		}
	});
}
function getInfoFromServer(str){
	$.ajax({
	    type:"get",
	    url:apiUrl+"getOnesMessages2",
	    async:false,
	    data:{username:username,openid:openid},
	    dataType:"json",
	    success:function(data){
		    for(var i=0;i<20;i++){
		        if(data.messageList[i] == null){
		           break;
		        }
		        firstId = data.messageList[0].id;
		    	lastId = data.lastID;
		        str =concreteOfGetInfo(data.messageList[i],str);
		    }
		    $(".content").append(str);
		    window.scrollTo(0,document.body.scrollHeight);
		}
	});
}

function concreteOfGetInfo(data,str) {
	if(data.message_flag == "1") {
		//解析XML
		var obj = analysisXML(data);
		var p1 = "<div class='touxiang'><img src='img/c3d0eab5ff273d6087f181aba9735c14.jpg'/></div>";
		var p2 = "<div class='zuosanjiao'></div>";
		if(obj.msgtype == "text"){
			str = str + "<div class='info-left'><div class='touxiang'><img src='img/c3d0eab5ff273d6087f181aba9735c14.jpg'/></div><div class='zuosanjiao'></div><p class='message'>" + obj.content + "</p></div>";
			var p3 = "<p class='message'>" + obj.content + "</p>";
			db.transaction(function (tx){
				tx.executeSql('INSERT INTO '+openid+' (id, p1,p2,p3,mark) VALUES (?, ?,?,?,"left")',[parseInt(data.id),p1,p2,p3]);
			});	
		}
		else if(obj.msgtype == "image"){
			getMedia(obj.mediaid,obj.msgtype);
			str = str + "<div class='info-left'><div class='touxiang'><img src='img/c3d0eab5ff273d6087f181aba9735c14.jpg'/></div><div class='zuosanjiao'></div><p class='message'><img style='width:100%;' src=" + url + " /></p></div>";
			var p3 = "<p class='message'><img style='width:100%;' src=" + url + " /></p>";
			db.transaction(function (tx){
				tx.executeSql('INSERT INTO '+openid+' (id, p1,p2,p3,mark) VALUES (?, ?,?,?,"left")',[parseInt(data.id),p1,p2,p3]);
			});
		}
	} else if(data.message_flag == "2") {
//		return false;
		if(data.message_type == "text") {
			var content = data.message_value;
			var content1 = data.message_value;
			while(content1.indexOf("[") != -1 && content1.indexOf("]") != -1) {
				var j =	imgArray.indexOf(content1.substring(content1.indexOf("["), content1.indexOf("]")+1));
				if(j!=-1){
					content = content.replace(content1.substring(content1.indexOf("["), content1.indexOf("]")+1), "<img src='QQexpression/" + j + ".gif' />");
				}
				content1 = content1.replace(content1.substring(content1.indexOf("["), content1.indexOf("]")+1),"");
			}
			str = str + "<div class='info-right'><div class='touxiang'><img src='img/c3d0eab5ff273d6087f181aba9735c14.jpg'/></div><div class='yousanjiao'></div><p class='message'>" + content + "</p></div>";
			var p1 = "<div class='touxiang'><img src='img/c3d0eab5ff273d6087f181aba9735c14.jpg'/></div>";
			var p2 = "<div class='yousanjiao'></div>";
			var p3 = "<p class='message'>" + content + "</p>";
			db.transaction(function (tx){
				tx.executeSql('INSERT INTO '+openid+' (id, p1,p2,p3,mark) VALUES (?, ?,?,?,"right")',[parseInt(data.id),p1,p2,p3]);
			});
		}
	}
	return str;
}

function getCacheByPulldown(){
	
	$(".content")[0].addEventListener("touchstart",function(e){
		startX = e.changedTouches[0].pageX;
		startY = e.changedTouches[0].pageY;
	},false);
	$(".content")[0].addEventListener("touchend",function(e){
		endX = e.changedTouches[0].pageX;
		endY = e.changedTouches[0].pageY;
		if($("body").scrollTop()==0 && dropDownFlag==1){
			if(Math.abs(startY - endY) > Math.abs(startX-endX)){
				if(startY - endY < -80){
    				db.transaction(function (tx) {
						dropDownFlag = 0;
						var maxid = tx.executeSql("select max(id) from "+openid);
	    				var minid = tx.executeSql("select min(id) from "+openid);
						tx.executeSql('select * from '+openid+' order by id', [], function (tx, results) {
				            var len = results.rows.length,i;
				            var k = 0;
				            var str = "";
				            for (i = len-1; i >=0; i--){
				            	if(firstId>minid){
				            		if(k==0){
					        			lastId = results.rows.item(i).id;
						        	}
						        	k++;
						        	if(results.rows.item(i).mark == "right"){
						        		var arr = new Array(2);
						        		arr[0] = "<div class='info-right'>"+results.rows.item(i).p1+results.rows.item(i).p2+cresults.rows.item(i).p3+"</div>";
						        		arr[1] = str;
						        		str = arr.join("");
						        	}
						        	else{
						        		var arr = new Array(2);
						        		arr[0] = "<div class='info-left'>"+results.rows.item(i).p1+results.rows.item(i).p2+results.rows.item(i).p3+"</div>";
						        		arr[1] = str;
						        		str = arr.join("");
						        	}
									if(k>=10){
										firstId = results.rows.item(i).id;
										dropDownFlag = 1;
										break;
									}
				            	}
				            	else{
				            		if(k!=0){
					            		$(".content").prepend(str);
						            }
						            $.ajax({
										type:"get",
										url:apiUrl+"getTextRecord",
										async:true,
										data:{username:username,openid:openid,firstID:firstId,num:10-k},
										dataType:"json",
										success:function(data){
											var mystr = "";
											for(var i=0;i<data.length;i++){
										        if(data[i] == null){
										           break;
										        }
										        firstId = data[0].id;
										        mystr =concreteOfGetInfo(data[i],mystr);
										    }
										    $(".content").prepend(mystr);
										    dropDownFlag = 1;
										}
									});
						            break;
				            	}
				            }
				     });
				    });
				}
			}
		}	
	},false);
}

function getMedia(id,type){
	$.ajax({
		type:"get",
		url:apiUrl+"getMedia",
		async:false,
		data:{username:username,type:type,mediaID:id},
		dataType:"json",
		success:function(data){
			url = data.url;
		}
	});
}
