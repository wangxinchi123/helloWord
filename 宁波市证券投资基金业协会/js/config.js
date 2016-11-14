var apiurl = "http://demo.claydai.cn/Jijinhui/";

var area = [];
area[20] = "象山市";
area[1]= "海曙区";
area[2] = "鄞州区";
area[3] = "江东区";
area[4] = "江北区";
area[5] = "北仑区";
area[6] = "余姚市";
area[7] = "慈溪市";
area[8] = "奉化市";
area[9] = "宁海县";
area[10] = "其他区域";

var mbstyle = [];
mbstyle[1] = "私募基金管理人";
mbstyle[2] = "基金服务机构";
mbstyle[3] = "会计";
mbstyle[4] = "律所";
mbstyle[5] = "期货";
mbstyle[6] = "证券";
mbstyle[7] = "银行";

$(function(){
	$(".overall").css("min-height",$(window).height() + "px");
})

//会员服务中心
var detectUrl = "huiyuanfuwuzhongxin";
