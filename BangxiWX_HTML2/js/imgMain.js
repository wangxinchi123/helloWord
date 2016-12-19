/*
 * 第一组图片
 */
var myImg = new Array();
for(var i = 0; i < 6; i++) {
	myImg[i] = new Array();
}

myImg[1][0] = "upload/img/b56757c7.jpg";
myImg[1][1] = "美丽浪漫的";
myImg[1][2] = 2;
myImg[2][0] = "upload/img/c79cffd1.jpg";
myImg[2][1] = "温暖友善的";
myImg[2][2] = 3;
myImg[3][0] = "upload/img/4a8a668d.jpg";
myImg[3][1] = "安静神秘的";
myImg[3][2] = 4;
myImg[4][0] = "upload/img/d3a38830.jpg";
myImg[4][1] = "井然有序的";
myImg[4][2] = 5;
myImg[5][0] = "upload/img/90e6e4df.jpg";
myImg[5][1] = "自然原始的";
myImg[5][2] = 6;
myImg[0][0] = "upload/img/bd45024b.jpg";
myImg[0][1] = "经济发达的";
myImg[0][2] = 1;

//数组打乱
myImg.sort(function() {
	return Math.random() > 0.5 ? -1 : 1;
})

//数组拼接
var myImgTemp = new Array();   
myImgTemp[0]=new Array();  
myImg = myImgTemp.concat(myImg);  

/*
 * 第二组图片
 */
var myImage = new Array();
for(var i = 0; i < 60; i++) {
	myImage[i] = new Array();
}
//第一类
myImage[0][0] = "upload/img/9bc35aef.jpg";
myImage[0][1] = "充满活力";
myImage[0][2] = 1;
myImage[1][0] = "upload/img/a1b93a9e.jpg";
myImage[1][1] = "担任职务";
myImage[1][2] = 1;
myImage[2][0] = "upload/img/91fb6cf6.jpg";
myImage[2][1] = "敢于冒险";
myImage[2][2] = 1;
myImage[3][0] = "upload/img/bc42fc64.jpg";
myImage[3][1] = "关注政治";
myImage[3][2] = 1;
myImage[4][0] = "upload/img/bf275f1b.jpg";
myImage[4][1] = "健谈善辩";
myImage[4][2] = 1;
myImage[5][0] = "upload/img/accf2849.jpg";
myImage[5][1] = "擅长影响";
myImage[5][2] = 1;
myImage[6][0] = "upload/img/26c157d4.jpg";
myImage[6][1] = "体育竞技";
myImage[6][2] = 1;
myImage[7][0] = "upload/img/e38f589b.jpg";
myImage[7][1] = "销售产品";
myImage[7][2] = 1;
myImage[8][0] = "upload/img/6d14359f.jpg";
myImage[8][1] = "指导工作";
myImage[8][2] = 1;
myImage[9][0] = "upload/img/7c64ca70.jpg";
myImage[9][1] = "制定计划";
myImage[9][2] = 1;

//第二类
myImage[10][0] = "upload/img/9867663f.jpg";
myImage[10][1] = "参加演出";
myImage[10][2] = 2;
myImage[11][0] = "upload/img/b9af3216.jpg";
myImage[11][1] = "服装装饰";
myImage[11][2] = 2;
myImage[12][0] = "upload/img/ce2b86ee.jpg";
myImage[12][1] = "精于设计";
myImage[12][2] = 2;
myImage[13][0] = "upload/img/262319b5.jpg";
myImage[13][1] = "美术创作";
myImage[13][2] = 2;
myImage[14][0] = "upload/img/d0d1f149.jpg";
myImage[14][1] = "摄影创作";
myImage[14][2] = 2;
myImage[15][0] = "upload/img/2545e7d5.jpg";
myImage[15][1] = "文学写作";
myImage[15][2] = 2;
myImage[16][0] = "upload/img/d5000bc.jpg";
myImage[16][1] = "欣赏音乐";
myImage[16][2] = 2;
myImage[17][0] = "upload/img/81eb9f86.jpg";
myImage[17][1] = "演奏乐器";
myImage[17][2] = 2;
myImage[18][0] = "upload/img/a352ba4e.jpg";
myImage[18][1] = "阅读小说";
myImage[18][2] = 2;
myImage[19][0] = "upload/img/c57e725e.jpg";
myImage[19][1] = "制图绘画";
myImage[19][2] = 2;

//第三类
myImage[20][0] = "upload/img/9028195d.jpg";
myImage[20][1] = "帮助别人";
myImage[20][2] = 3;
myImage[21][0] = "upload/img/42a544a2.jpg";
myImage[21][1] = "沟通协调";
myImage[21][2] = 3;
myImage[22][0] = "upload/img/6fcc94fe.jpg";
myImage[22][1] = "集体出游";
myImage[22][2] = 3;
myImage[23][0] = "upload/img/41a2eb32.jpg";
myImage[23][1] = "教育儿童";
myImage[23][2] = 3;
myImage[24][0] = "upload/img/ef08c484.jpg";
myImage[24][1] = "结交朋友";
myImage[24][2] = 3;
myImage[25][0] = "upload/img/62e6f998.jpg";
myImage[25][1] = "乐于聊天";
myImage[25][2] = 3;
myImage[26][0] = "upload/img/93ad4da4.jpg";
myImage[26][1] = "社团活动";
myImage[26][2] = 3;
myImage[27][0] = "upload/img/6b98974c.jpg";
myImage[27][1] = "团队合作";
myImage[27][2] = 3;
myImage[28][0] = "upload/img/89a23357.jpg";
myImage[28][1] = "心理知识";
myImage[28][2] = 3;
myImage[29][0] = "upload/img/b0687e03.jpg";
myImage[29][1] = "照顾老人";
myImage[29][2] = 3;

//第四类
myImage[30][0] = "upload/img/b57165c3.jpg";
myImage[30][1] = "产品改良";
myImage[30][2] = 4;
myImage[31][0] = "upload/img/80085aeb.jpg";
myImage[31][1] = "开发软件";
myImage[31][2] = 4;
myImage[32][0] = "upload/img/ddd8b8be.jpg";
myImage[32][1] = "科普读物";
myImage[32][2] = 4;
myImage[33][0] = "upload/img/63f096.jpg";
myImage[33][1] = "科学实验";
myImage[33][2] = 4;
myImage[34][0] = "upload/img/54b4ddc.jpg";
myImage[34][1] = "了解自然";
myImage[34][2] = 4;
myImage[35][0] = "upload/img/cdb8e46f.jpg";
myImage[35][1] = "擅于推理";
myImage[35][2] = 4;
myImage[36][0] = "upload/img/d977b293.jpg";
myImage[36][1] = "数学研究";
myImage[36][2] = 4;
myImage[37][0] = "upload/img/9512d6f1.jpg";
myImage[37][1] = "数字游戏";
myImage[37][2] = 4;
myImage[38][0] = "upload/img/ce2c70a9.jpg";
myImage[38][1] = "调查研究";
myImage[38][2] = 4;
myImage[39][0] = "upload/img/416a8b48.jpg";
myImage[39][1] = "物理化学";
myImage[39][2] = 4;

//第五类
myImage[40][0] = "upload/img/826eed30.jpg";
myImage[40][1] = "办公软件";
myImage[40][2] = 5;
myImage[41][0] = "upload/img/51c68c48.jpg";
myImage[41][1] = "打字速记";
myImage[41][2] = 5;
myImage[42][0] = "upload/img/a153fe90.jpg";
myImage[42][1] = "汇报工作";
myImage[42][2] = 5;
myImage[43][0] = "upload/img/9e758e91.jpg";
myImage[43][1] = "检查收支";
myImage[43][2] = 5;
myImage[44][0] = "upload/img/e7fa3461.jpg";
myImage[44][1] = "善于保管";
myImage[44][2] = 5;
myImage[45][0] = "upload/img/d5bf7947.jpg";
myImage[45][1] = "实务培训";
myImage[45][2] = 5;
myImage[46][0] = "upload/img/b4c2f09b.jpg";
myImage[46][1] = "搜集数据";
myImage[46][2] = 5;
myImage[47][0] = "upload/img/78d1003e.jpg";
myImage[47][1] = "招待来宾";
myImage[47][2] = 5;
myImage[48][0] = "upload/img/119a9d9c.jpg";
myImage[48][1] = "整理文件";
myImage[48][2] = 5;
myImage[49][0] = "upload/img/10997a2b.jpg";
myImage[49][1] = "协助领导";
myImage[49][2] = 5;

//第六类
myImage[50][0] = "upload/img/ac0b8741.jpg";
myImage[50][1] = "材料加工";
myImage[50][2] = 6;
myImage[51][0] = "upload/img/7ad3bade.jpg";
myImage[51][1] = "勘探测评";
myImage[51][2] = 6;
myImage[52][0] = "upload/img/227d3655.jpg";
myImage[52][1] = "烹饪美食";
myImage[52][2] = 6;
myImage[53][0] = "upload/img/468e1685.jpg";
myImage[53][1] = "擅长驾驶";
myImage[53][2] = 6;
myImage[54][0] = "upload/img/3f8f9d9b.jpg";
myImage[54][1] = "手工制作";
myImage[54][2] = 6;
myImage[55][0] = "upload/img/6569cab7.jpg";
myImage[55][1] = "喜好动手";
myImage[55][2] = 6;
myImage[56][0] = "upload/img/1635c72a.jpg";
myImage[56][1] = "修剪树木";
myImage[56][2] = 6;
myImage[57][0] = "upload/img/a8f99df3.jpg";
myImage[57][1] = "装配修理";
myImage[57][2] = 6;
myImage[58][0] = "upload/img/327c0aad.jpg";
myImage[58][1] = "质量检测";
myImage[58][2] = 6;
myImage[59][0] = "upload/img/a314f6e9.jpg";
myImage[59][1] = "调试系统";
myImage[59][2] = 6;

//数组打乱
myImage.sort(function() {
	return Math.random() > 0.5 ? -1 : 1;
}) 
