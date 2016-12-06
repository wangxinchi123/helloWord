var openid = window.location.href.split("?")[1].split("&")[1].split("=")[1];
var username = window.location.href.split("?")[1].split("&")[0].split("=")[1];
var appid = window.location.href.split("?")[1].split("&")[2].split("=")[1];

var firstId = 1;
var lastId = 1;
var time1;
var nowExpressionIndex; //当前页数
//var openid = "o8J2PwiYrse4M8QucNE4ZAliPZzo";
//var openid = "o8J2PwgqBdE0IQ6ZwtcyfnqYNcfw";
//var username = "gh_3e8703d7490f";
var startX, endX, startY, endY; //坐标
var db;
var theFirstTime = 1; //第一次进入页面  
var morentouxiang = "img/fenxiaozhu.png"; //默认头像
var headimgUrl = "img/fenxiaozhu.png"; //头像地址
var listInfo;

$(function() {
	weixinjs();
	FastClick.attach(document.body);
	init();
	initAndBind();
	getCacheByPulldown();
	yidong();
})

function getNowContactInfo() {
	$.ajax({
		type: "get",
		url: apiUrl + "getOneFensiInfo",
		async: false,
		data: {
			username: username,
			openid: openid
		},
		dataType: "json",
		success: function(data) {
			var $body = $('body');
			document.title = data[0].nickname;
			var $iframe = $("<iframe src='/favicon.ico'></iframe>");
			$iframe.on('load', function() {
				setTimeout(function() {
					$iframe.off('load').remove();

				}, 0);
			}).appendTo($body);
			if(data[0].headimgurl) {
				headimgUrl = data[0].headimgurl;
			}
		}
	});
}

function init() {
	if(window.openDatabase == undefined) {
		alert("浏览器不支持Web Database!");
		return;
	} else {
		getNowContactInfo();
		db = openDatabase("weixin", "1.0", "weixinshuju", 6 * 1024 * 1024);
		db.transaction(function(tx) {
			//  		tx.executeSql("DROP TABLE o8J2PwiYrse4M8QucNE4ZAliPZzo1");
			tx.executeSql("create table if not exists \"" + openid + "\" (id unique, p1, p2, p3, mark)");
			getinfo(tx);
		});
	}
}

function initAndBind() {
	var screenH = window.innerHeight;
	addQQexpression();
	var picOrKey = 0; //图片和软键盘切换的标识
	$(".nav-list").css("margin-left", (window.innerWidth - 13 * 3) / 2 + "px");
	$(".nav-list li").eq(0).css("background-color", "gray");
	$(".upload-pic").css("height", $(".others").width() * 0.25 + "px");
	$(".pic").click(function() {
		$(".press-speak").css("display", "none");
		if(picOrKey == 1) {
			$("#expression").css({
				"height": "60px"
			});
			$(".enter-word textarea").focus();
		} else {
			if($(".others").css("display") == "block") {
				$(".sendMsg").css("display", "block");
				$(".others").animate({
					"top": "260px"
				}, 300, function() {
					$(this).css({
						"display": "none",
						"top": "60px"
					});
				});
				picOrKey = 1;
			} else {
				setTimeout(function() {
					$(".sendMsg").css("display", "block");
					$("#expression").animate({
						"height": "260px"
					}, 200, function() {
						$(".content").animate({
							"top": "-200px"
						}, 300);
						picOrKey = 1;
					});
				}, 200);
			}
		}

	});

	$("#expression .sendMsg").click(function() {
		sendMessage();
	});

	$(".content").on("touchstart", function(event) {
		$(".press-speak").css("display", "none");
		$(".enter-word textarea").blur();
		$(".sendMsg").css("display", "none");
		$("#fansList").fadeOut(300, function() {
			$("#fansList").css({
				"left": "100%"
			});
			$(".content").animate({
				"top": "0"
			}, 300);
		});
		$("#expression").animate({
			"height": "60px"
		}, 300, function() {
			$(".others").css("display", "none");
		});
		picOrKey = 0;
	});
	$(".enter-word textarea").on("touchstart", function() {
		$("#expression").css({
			"height": "60px"
		});
		$(this).focus();
	});
	$(".enter-word textarea").on("focus", function() {

		$(".content").css({
			"top": "0"
		});
		$(".sendMsg").css("display", "block");
		$("#fansList").css("display", "none");
		$(".others").css("display", "none");
		picOrKey = 0;
	}).on("blur", function() {});
	$(".enter-word textarea").keypress(function(e) {
		if(e.keyCode === 13) {
			// 处理相关逻辑
			e.preventDefault();
			sendMessage();
		}
	});
	$("#xuanfu").click(function() {
		$(".content").animate({
			"top": "0"
		}, 300);
		$("#fansList").css("display", "block");
		$("#expression").animate({
			"height": "60px"
		}, 300, function() {
			$("#fansList").animate({
				"left": "50%"
			}, 300);
		});
	});

	$(".yuyin").click(function() {
		if($(".press-speak").css("display") == "none") {
			$(".press-speak").fadeIn(300);
		} else {
			$(".press-speak").fadeOut(300);
		}
		if($("#expression").height() > 60) {
			$(".content").animate({
				"top": "0"
			}, 300);
			$("#expression").animate({
				"height": "60px"
			}, 300);
			picOrKey = 0;
		}
	});
	$(".upload").click(function() {
		$(".press-speak").css("display", "none");
		$(".others").css("display", "block");

		$("#expression").animate({
			"height": "260px"
		}, 200, function() {
			$(".content").animate({
				"top": "-200px"
			}, 300);
		});

	});
	$("#showBigPic").on("click",function(){
		$(this).css("display","none");
		$("#showBigPic img").css("display","none");
	});
	//	InputBoxChange();
}

function addQQexpression() {
	$(".biaoqing")[0].addEventListener("touchstart", touchStart, true);
	$(".biaoqing")[0].addEventListener("touchend", touchEnd, true);
	$(".biaoqing")[0].addEventListener("touchmove", touchMove, true);
	var p = 1;
	nowExpressionIndex = 1;
	var expressionBox = "expressionBox" + p;
	var str = "";
	for(var i = 1; i < 50; i++) {
		if(i % 24 == 1) {
			if(i != 1) {
				$("." + expressionBox).append(str);
				p++;
				expressionBox = "expressionBox" + p;
				str = "";
			}
			if(p == 1) {
				$(".biaoqing").append("<div class=" + expressionBox + " style='position:absolute;width:100%;height:200px;top:0;left:0;'></div>");
			} else {
				$(".biaoqing").append("<div class=" + expressionBox + " style='position:absolute;width:100%;height:200px;top:0;left:100%;'></div>");
			}
		}
		str = str + "<li onclick='addPicInText(" + i + ")'><img src='QQexpression/" + i + ".gif' /></li>";
	}
	$("." + expressionBox).append(str);
}

function touchMove(e) {
	e.preventDefault();
}

function touchStart(e) {
	if(e.touches.length == 1) {
		startX = e.changedTouches[0].pageX;
		startY = e.changedTouches[0].pageY;
	}
}

function touchEnd(e) {
	endX = e.changedTouches[0].pageX;
	endY = e.changedTouches[0].pageY;
	//	e.preventDefault();
	if(Math.abs(startX - endX) > Math.abs(startY - endY)) {
		if(startX - endX > 40) {
			if(nowExpressionIndex + 1 < 4) {
				$(".expressionBox" + nowExpressionIndex).stop(true, true).animate({
					"left": "-100%"
				}, 500);
				nowExpressionIndex++;
				$(".expressionBox" + nowExpressionIndex).stop(true, true).animate({
					"left": "0"
				}, 500);
			}
		} else if(startX - endX < -40) {
			if(nowExpressionIndex - 1 > 0) {
				$(".expressionBox" + nowExpressionIndex).stop(true, true).animate({
					"left": "100%"
				}, 500);
				nowExpressionIndex--;
				$(".expressionBox" + nowExpressionIndex).stop(true, true).animate({
					"left": "0"
				}, 500);
			}
		}
		$(".nav-list li").css("background-color", "lightgray");
		$(".nav-list li").eq(nowExpressionIndex - 1).css("background-color", "gray");
	}

}

function addPicInText(i) {
	$(".enter-word textarea").val($(".enter-word textarea").val() + imgArray[i]);
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

function sendMessage() {
	var msg = $(".foot .enter-word textarea").val();
	var p1 = "<div class='touxiang'><img src='img/c3d0eab5ff273d6087f181aba9735c14.jpg'/></div>";
	var p2 = "<div class='yousanjiao'></div>";
	var p3 = "<p class='message'>" + msg + "</p>";
	$(".foot .enter-word textarea").val("");
	sendMsgToFans(msg, p1, p2, p3);
}

function getNewMsg() {
	$.ajax({
		type: "get",
		url: apiUrl + "getMessageList",
		async: true,
		data: {
			username: username,
			openid: openid,
			ones_lastID: lastId
		},
		dataType: "json",
		success: function(data) {
			var str1 = "";
			for(var i = 0;; i++) {
				if(data.messageList[i] == null) {
					break;
				}
				lastId = data.nowChatLastID;
				str1 = concreteOfGetInfo(data.messageList[i], str1);
			}
			if(str1 != "") {
				$(".content").append(str1);
				$(".content").scrollTop($(".content")[0].scrollHeight);
			}
		}
	});
}

function sendMsgToFans(content, p1, p2, p3) {
	if(content != "") {
		$.ajax({
			type: "post",
			url: apiUrl + "sendMessageText",
			data: {
				username: username,
				openid: openid,
				content: content
			},
			dataType: "json",
			success: function(data) {
				if(data.errcode == "0") {
					getNewMsg();
					//					window.scrollTo(0,document.body.scrollHeight);
					//					dbObject.put({ p1: p1, p2: p2, p3: p3,mark: "right" },parseInt(data.id));
				}
			}
		});
	}
}

function Tclear() {
	dbObject.clear();
}

function getinfo(tx) {
	var maxid = tx.executeSql("select max(id) from \'" + openid + "\'");
	var minid = tx.executeSql("select min(id) from \'" + openid + "\'");
	tx.executeSql('SELECT * FROM \'' + openid + '\' order by id', [], function(tx, results) {
		var len = results.rows.length,
			i;
		if(len == 0) {

			getInfoFromServer("");
		} else {
			firstId = results.rows.item(len - 1).id;
			var k = 0;
			var str = "";
			for(i = len - 1; i >= 0; i--) {
				if(firstId > minid) {
					if(k == 0) {
						lastId = results.rows.item(i).id;
					}
					k++;
					if(results.rows.item(i).mark == "right") {
						var arr = new Array(2);
						arr[0] = "<div class='info-right'>" + results.rows.item(i).p1 + results.rows.item(i).p2 + cresults.rows.item(i).p3 + "</div>";
						arr[1] = str;
						str = arr.join("");
					} else {
						var arr = new Array(2);
						arr[0] = "<div class='info-left'><div class='touxiang'><img src=" + headimgUrl + "/></div>" + results.rows.item(i).p2 + results.rows.item(i).p3 + "</div>";
						arr[1] = str;
						str = arr.join("");
					}
					if(k >= 10) {
						firstId = results.rows.item(i).id;
						getInfoInCache(str);
						break;
					}
				} else {
					if(k == 0) {
						getInfoFromServer(str);
					} else {
						getInfoInCache(str);
					}
					break;
				}
			}
		}
	});
	time1 = setInterval(function() {
		$.ajax({
			type: "get",
			url: apiUrl + "getMessageList",
			async: true,
			data: {
				username: username,
				openid: openid,
				ones_lastID: lastId
			},
			dataType: "json",
			success: function(data) {
				var str1 = "";
				var str2 = "";
				for(var i = 0;; i++) {
					if(data.messageList[i] == null) {
						break;
					}
					if(data.messageList[i].message_flag == "1") {
						lastId = data.nowChatLastID;
						str1 = concreteOfGetInfo(data.messageList[i], str1);
					}
				}
				if(str1 != "") {
					$(".content").append(str1);
				}
				var myheadimgurl;
				if(theFirstTime == 1) {
					for(var i = 0; i < data.fensiList.length; i++) {
						var obj = analysisXML(data.fensiList[i]);
						if(data.fensiList[i].headimgurl) {
							myheadimgurl = data.fensiList[i].headimgurl;
						} else {
							myheadimgurl = morentouxiang;
						}
						if(obj.msgtype == "text") {
							if(data.fensiList[i].messagenum_noread > 0) {
								str2 = str2 + "<div id=" + obj.fromusername + " onclick='jumpContact(\"" + obj.fromusername + "\")'><img src=" + myheadimgurl + " /><span>" + data.fensiList[i].nickname + "</span><p>" + obj.content + "</p><div class='msg-number'>" + data.fensiList[i].messagenum_noread + "</div></div>";
							} else {
								str2 = str2 + "<div id=" + obj.fromusername + " onclick='jumpContact(\"" + obj.fromusername + "\")'><img src=" + myheadimgurl + " /><span>" + data.fensiList[i].nickname + "</span><p>" + obj.content + "</p></div>";
							}
						} else if(obj.msgtype == "image") {
							if(data.fensiList[i].messagenum_noread > 0) {
								str2 = str2 + "<div id=" + obj.fromusername + " onclick='jumpContact(\"" + obj.fromusername + "\")'><img src=" + myheadimgurl + " /><sapn>" + data.fensiList[i].nickname + "</span><p>[图片]</p><div class='msg-number'>" + data.fensiList[i].messagenum_noread + "</div></div>";
							} else {
								str2 = str2 + "<div id=" + obj.fromusername + " onclick='jumpContact(\"" + obj.fromusername + "\")'><img src=" + myheadimgurl + " /><sapn>" + data.fensiList[i].nickname + "</span><p>[图片]</p></div>";
							}
						}
					}
					$("#fansList").html(str2);
					theFirstTime = 0;
				} else {
					for(var i = data.fensiList.length - 1; i >= 0; i--) {
						if(data.fensiList[i].messagenum_noread > 0 && listInfo.fensiList[i].messagenum_noread != data.fensiList[i].messagenum_noread) {
							if(data.fensiList[i].headimgurl) {
								myheadimgurl = data.fensiList[i].headimgurl;
							} else {
								myheadimgurl = morentouxiang;
							}
							var obj = analysisXML(data.fensiList[i]);
							$("#" + obj.fromusername).remove();
							if(obj.msgtype == "text") {
								$("#fansList").prepend("<div id=" + obj.fromusername + " onclick='jumpContact(\"" + obj.fromusername + "\")'><img src=" + myheadimgurl + " /><span>" + data.fensiList[i].nickname + "</span><p>" + obj.content + "</p><div class='msg-number'>" + data.fensiList[i].messagenum_noread + "</div></div>");
							} else if(obj.msgtype == "image") {
								$("#fansList").prepend("<div id=" + obj.fromusername + " onclick='jumpContact(\"" + obj.fromusername + "\")'><img src=" + myheadimgurl + " /><span>" + data.fensiList[i].nickname + "</span><p>[图片]</p><div class='msg-number'>" + data.fensiList[i].messagenum_noread + "</div></div>");
							}
						}
					}
				}
				listInfo = data;
			}
		});
	}, 5000);
}

function jumpContact(myid) {
	clearInterval(time1);
	openid = myid;
	theFirstTime = 1;
	$(".content").empty();
	headimgUrl = "img/fenxiaozhu.png";
	getNowContactInfo();
	db.transaction(function(tx) {
		tx.executeSql("create table if not exists \"" + openid + "\" (id unique, p1, p2, p3, mark)");
		getinfo(tx);
	});
}

function getInfoInCache(str) {
	$.ajax({
		type: "get",
		url: apiUrl + "getOnesMessages",
		async: false,
		data: {
			username: username,
			openid: openid,
			ones_lastID: lastId
		},
		dataType: "json",
		success: function(data) {
			for(var i = 0;; i++) {
				if(data.messageList[i] == null) {
					break;
				}
				lastId = data.lastID;
				str = concreteOfGetInfo(data.messageList[i], str);
			}
			$(".content").append(str);
			$(".content").scrollTop($(".content")[0].scrollHeight);
		}
	});
}

function getInfoFromServer(str) {
	$.ajax({
		type: "get",
		url: apiUrl + "getOnesMessages2",
		async: false,
		data: {
			username: username,
			openid: openid
		},
		dataType: "json",
		success: function(data) {
			for(var i = 0; i < 20; i++) {
				if(data.messageList[i] == null) {
					break;
				}
				firstId = data.messageList[0].id;
				lastId = data.lastID;
				str = concreteOfGetInfo(data.messageList[i], str);
			}
			$(".content").append(str);
			$(".content").scrollTop($(".content")[0].scrollHeight);
		}
	});
}

function concreteOfGetInfo(data, str) {
	if(data.message_flag == "1") {
		//解析XML
		var obj = analysisXML(data);
		var p1 = "<div class='touxiang'><img src=" + headimgUrl + " /></div>";
		var p2 = "<div class='zuosanjiao'></div>";
		if(obj.msgtype == "text") {
			str = str + "<div class='info-left'><div class='touxiang'><img src=" + headimgUrl + " /></div><div class='zuosanjiao'></div><p class='message'>" + obj.content + "</p></div>";
			var p3 = "<p class='message'>" + obj.content + "</p>";
			db.transaction(function(tx) {
				tx.executeSql('INSERT INTO \'' + openid + '\' (id, p1,p2,p3,mark) VALUES (?, ?,?,?,"left")', [parseInt(data.id), p1, p2, p3]);
			});
		} else if(obj.msgtype == "image") {
			var myurl = getMedia(obj.mediaid, obj.msgtype);
			str = str + "<div class='info-left'><div class='touxiang'><img src=" + headimgUrl + " /></div><div class='zuosanjiao'></div><p class='message' style='padding:0px 0px;background-color:#f6f6f6;'><img onclick='previewPic(this)' style='width:100%;border-radius:5px;' src=" + myurl + " /></p></div>";
			var p3 = "<p class='message' style='padding:0px 0px;background-color:#f6f6f6;'><img onclick='previewPic(this)' style='width:100%;border-radius:5px;' src=" + myurl + " /></p>";
			var p2 = "<div class='zuosanjiao'></div>";
			db.transaction(function(tx) {
				tx.executeSql('INSERT INTO \'' + openid + '\' (id, p1,p2,p3,mark) VALUES (?, ?,?,?,"left")', [parseInt(data.id), p1, p2, p3]);
			});
		} else if(obj.msgtype == "voice") {
			var myurl = getMedia(obj.mediaid, obj.msgtype);
			str = str + "<div class='info-left'><div class='touxiang'><img src=" + headimgUrl + " /></div><div class='zuosanjiao'></div><p class='message' data-url=" + myurl + " onclick='playYuying(this)'><img style='width:30px;' src='img/yuyingMsg.png' /><img class='playVoice' src='img/shengyin.gif' /></p></div>";
			var p3 = "<p class='message' data-url=" + myurl + " onclick='playYuying(this)'><img style='width:30px;' src='img/yuyingMsg.png' /><img class='playVoice' src='img/shengyin.gif' /></p>";
			db.transaction(function(tx) {
				tx.executeSql('INSERT INTO \'' + openid + '\' (id, p1,p2,p3,mark) VALUES (?, ?,?,?,"left")', [parseInt(data.id), p1, p2, p3]);
			});
		}
	} else if(data.message_flag == "2") {
		//		return false;
		if(data.message_type == "text") {
			var content = data.message_value;
			var content1 = data.message_value;
			while(content1.indexOf("[") != -1 && content1.indexOf("]") != -1) {
				var j = imgArray.indexOf(content1.substring(content1.indexOf("["), content1.indexOf("]") + 1));
				if(j != -1) {
					content = content.replace(content1.substring(content1.indexOf("["), content1.indexOf("]") + 1), "<img src='QQexpression/" + j + ".gif' />");
				}
				content1 = content1.replace(content1.substring(content1.indexOf("["), content1.indexOf("]") + 1), "");
			}
			str = str + "<div class='info-right'><div class='touxiang'><img src='img/c3d0eab5ff273d6087f181aba9735c14.jpg'/></div><div class='yousanjiao'></div><p class='message'>" + content + "</p></div>";
			var p1 = "<div class='touxiang'><img src='img/c3d0eab5ff273d6087f181aba9735c14.jpg'/></div>";
			var p2 = "<div class='yousanjiao'></div>";
			var p3 = "<p class='message'>" + content + "</p>";
			db.transaction(function(tx) {
				tx.executeSql('INSERT INTO \'' + openid + '\' (id, p1,p2,p3,mark) VALUES (?, ?,?,?,"right")', [parseInt(data.id), p1, p2, p3]);
			});
		} else if(data.message_type == "image") {
			var myurl = getMedia(data.message_value, "image");
			str = str + "<div class='info-right'><div class='touxiang'><img src='img/c3d0eab5ff273d6087f181aba9735c14.jpg'/></div><div class='yousanjiao' style='border-left-color:white;'></div><p class='message' style='padding:0px 0px;background-color:#f6f6f6;'><img onclick='previewPic(this)' style='width:100%;border-radius:5px;' src=" + myurl + " /></p></div>";
			var p1 = "<div class='touxiang'><img src='img/c3d0eab5ff273d6087f181aba9735c14.jpg'/></div>";
			var p2 = "<div class='yousanjiao' style='border-left-color:white;'></div>";
			var p3 = "<p class='message' style='padding:0px 0px;background-color:#f6f6f6;'><img onclick='previewPic(this)' style='width:100%;border-radius:5px;' src=" + myurl + " /></p>";
			db.transaction(function(tx) {
				tx.executeSql('INSERT INTO \'' + openid + '\' (id, p1,p2,p3,mark) VALUES (?, ?,?,?,"right")', [parseInt(data.id), p1, p2, p3]);
			});
		} else if(data.message_type == "voice") {
			var myurl = getMedia(data.message_value, "voice");
			str = str + "<div class='info-right'><div class='touxiang'><img src='img/c3d0eab5ff273d6087f181aba9735c14.jpg'/></div><div class='yousanjiao'></div><p class='message' data-url=" + myurl + " onclick='playYuying(this)'><img style='width:30px;' src='img/yuyingMsg.png' /><img class='playVoice' src='img/shengyin.gif' /></p></div>";
			var p1 = "<div class='touxiang'><img src='img/c3d0eab5ff273d6087f181aba9735c14.jpg'/></div>";
			var p2 = "<div class='yousanjiao'></div>";
			var p3 = "<p class='message' data-url=" + myurl + " onclick='playYuying(this)'><img style='width:30px;' src='img/yuyingMsg.png' /><img class='playVoice' src='img/shengyin.gif' /></p>";
			db.transaction(function(tx) {
				tx.executeSql('INSERT INTO \'' + openid + '\' (id, p1,p2,p3,mark) VALUES (?, ?,?,?,"right")', [parseInt(data.id), p1, p2, p3]);
			});
		}
	}
	return str;
}

function getCacheByPulldown() {
	$('#fansList').dropload({
		scrollArea: $("#fansList"),
		domUp: {
			domClass: 'dropload-up',
			domRefresh: '',
			domUpdate: '',
			domLoad: ''
		},
		domDown: {
			domClass: 'dropload-down',
			domRefresh: '',
			domLoad: '',
			domNoData: ''
		},
		loadUpFn: function(me) {
			// 无数据
			me.noData();
			me.resetload();
		},
		loadDownFn: function(me) {
			// 无数据
			me.noData();
			me.resetload();
		},
		threshold: 50
	});
	$('.content').dropload({
		scrollArea: $(".content"),
		domUp: {
			domClass: 'dropload-up',
			domRefresh: '<div class="dropload-refresh">↓下拉刷新</div>',
			domUpdate: '<div class="dropload-update">↑获取历史记录</div>',
			domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
		},
		domDown: {
			domClass: 'dropload-down',
			domRefresh: '',
			domLoad: '',
			domNoData: ''
		},
		loadUpFn: function(me) {
			db.transaction(function(tx) {
				var maxid = tx.executeSql("select max(id) from \'" + openid + "\'");
				var minid = tx.executeSql("select min(id) from \'" + openid + "\'");
				tx.executeSql('select * from \"' + openid + '\" order by id', [], function(tx, results) {
					var len = results.rows.length,
						i;
					var k = 0;
					var str = "";
					for(i = len - 1; i >= 0; i--) {
						if(firstId > minid) {
							if(k == 0) {
								lastId = results.rows.item(i).id;
							}
							k++;
							if(results.rows.item(i).mark == "right") {
								var arr = new Array(2);
								arr[0] = "<div class='info-right'>" + results.rows.item(i).p1 + results.rows.item(i).p2 + cresults.rows.item(i).p3 + "</div>";
								arr[1] = str;
								str = arr.join("");
							} else {
								var arr = new Array(2);
								arr[0] = "<div class='info-left'><div class='touxiang'><img src=" + headimgUrl + "/></div>" + results.rows.item(i).p2 + results.rows.item(i).p3 + "</div>";
								arr[1] = str;
								str = arr.join("");
							}
							if(k >= 10) {
								firstId = results.rows.item(i).id;
								setTimeout(function() {
									// 每次数据加载完，必须重置
									me.resetload();
									// 重置索引值，重新拼接more.json数据
									// 解锁
									me.unlock();
									me.noData(false);
								}, 500);
								setTimeout(function() {
									$(".content").prepend(str);
								}, 600);
								break;
							}
						} else {
							//							if(k != 0) {
							//								$(".content").prepend(str);
							//							}
							$.ajax({
								type: "get",
								url: apiUrl + "getTextRecord",
								async: true,
								data: {
									username: username,
									openid: openid,
									firstID: firstId,
									num: 10 - k
								},
								dataType: "json",
								success: function(data) {
									for(var i = 0; i < data.length; i++) {
										if(data[i] == null) {
											break;
										}
										firstId = data[0].id;
										str = concreteOfGetInfo(data[i], str);
									}
									setTimeout(function() {
										me.resetload();
										if(data.length == 0) {
											//											me.lock();
											me.noData();

										} else {
											me.unlock();
											me.noData(false);
										}
									}, 500);
									setTimeout(function() {
										$(".content").prepend(str);
									}, 600);
								}
							});
							break;
						}
					}
				});
			});
		},
		loadDownFn: function(me) {
			// 无数据
			me.noData();
			me.resetload();
		},
		threshold: 50
	});
}

function getMedia(id, type) {
	var myurl;
	$.ajax({
		type: "get",
		url: apiUrl + "getMedia",
		async: false,
		data: {
			username: username,
			type: type,
			mediaID: id
		},
		dataType: "json",
		success: function(data) {
			myurl = data.url;
		}
	});
	return myurl;
}

function weixinjs() {
	var mysignature = "";
	var voice = {
		localId: '',
		serverId: ''
	};
	var picture = {
		localId: '',
		serverId: ''
	};
	$.ajax({
		type: 'get',
		async: false,
		url: 'http://testwx.nbguohe.top/index.php/guohe/weixinjs/getSignature?username=' + username,
		data: {
			"url": window.location.href
		},

		success: function(data) {
			mysignature = data;
		},

		error: function() {}
	});
	wx.config({
//		debug: true,
		appId: appid, // 必填，公众号的唯一标识
		timestamp: 1414587457, // 必填，生成签名的时间戳
		nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
		signature: mysignature + "", // 必填，签名，见附录1
		jsApiList: ['onMenuShareTimeline',
				'startRecord',
				'stopRecord',
				'uploadVoice',
				'chooseImage',
				'uploadImage'
			] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	wx.ready(function() {
		wx.onMenuShareTimeline({
			title: 'ffffffffffffff', // 分享标题
			link: 'http://h.hiphotos.baidu.com/zhidao/pic/item/0eb30f2442a7d9334f268ca9a84bd11372f00159.jpg', // 分享链接
			imgUrl: 'http://h.hiphotos.baidu.com/zhidao/pic/item/0eb30f2442a7d9334f268ca9a84bd11372f00159.jpg', // 分享图标
			success: function() {},
			cancel: function() {},
			fail: function() {}
		});
		$(".press-speak").on("touchstart", function(event) {
			wx.startRecord();
		});
		$(".press-speak").on("touchend", function(event) {
			wx.stopRecord({
				success: function(res) {
					voice.localId = res.localId;
					wx.uploadVoice({
						localId: voice.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
						isShowProgressTips: 1, // 默认为1，显示进度提示
						success: function(res) {
							voice.serverId = res.serverId; // 返回音频的服务器端ID
							$.ajax({
								type: "get",
								url: apiUrl + "sendMessageOther",
								data: {
									username: username,
									openid: openid,
									media_ID: voice.serverId,
									type: "voice"
								},
								async: true,
								success: function(data) {
									getNewMsg();
								}
							});
						},
						fail: function() {}

					});
				}
			});
		});
		$(".upload-pic").click(function() {
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function(res) {
					picture.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
					wx.uploadImage({
						localId: picture.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
						isShowProgressTips: 1, // 默认为1，显示进度提示
						success: function(res) {
							picture.serverId = res.serverId; // 返回图片的服务器端ID
							$.ajax({
								type: "get",
								url: apiUrl + "sendMessageOther",
								data: {
									username: username,
									openid: openid,
									media_ID: picture.serverId,
									type: "image"
								},
								async: true,
								success: function(data) {
									getNewMsg();
								}
							});
						}
					});
				}
			});
		});
	});
}

function playYuying(obj) {
	var audio = document.getElementById("audio");
	audio.volume = 1;
	audio.loop = false;
	audio.src = $(obj).attr("data-url");
	audio.pause();
	audio.play();
	$(obj).children("img").css("display", "none");
	$(obj).children(".playVoice").css("display", "block");
	audio.addEventListener('ended', function() {
		$(obj).children("img").css("display", "block");
		$(obj).children(".playVoice").css("display", "none");
	}, false);
}
var touchFlag = 1;

function yidong() {
	document.addEventListener("touchmove", function(e) {
		if(touchFlag == 0) {
			e.preventDefault();
			e.stopPropagation();
		}
	}, false);

	$("#xuanfu").on("touchstart", function() {
		touchFlag = 0;
	});
	$("#xuanfu")[0].addEventListener("touchmove", touchMove1, true);
	$("#xuanfu").on("touchend", function() {
		touchFlag = 1;
	});
}

function touchMove1(event) {
	var x = event.changedTouches[0].clientX;
	var y = event.changedTouches[0].clientY;
	if(x > $(window).innerWidth() - 35) {
		x = $(window).innerWidth() - 35;
	}
	if(x < 35) {
		x = 35;
	}
	if(y > $("body").height() - 35) {
		y = $("body").height() - 35;
	}
	if(y < 35) {
		y = 35;
	}
	$("#xuanfu").css({
		"top": y - 35 + "px",
		"left": x - 35 + "px"
	});
}

function previewPic(obj){
	$("#showBigPic img").attr("src",$(obj).attr("src"));
	$("#showBigPic").fadeIn(300);
	setTimeout(function(){
		var t = (window.innerHeight-$("#showBigPic img").height())/2;
		var l = (window.innerWidth-$("#showBigPic img").width())/2;
		$("#showBigPic img").css({"margin-left":l+"px","margin-top":t+"px"});
		$("#showBigPic img").fadeIn(100);
	},100);
}
