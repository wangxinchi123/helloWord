
function onload() {
	FastClick.attach(document.getElementsByClassName("pingjia")[0]);
//	getWeiXinUserInfo();
	for(var i = 1;i<=8;i++){
		$("#page"+i+" .line1").css("width",12.5*i+"%");
		$("#page"+i+" .line2").css("width",12.5*(8-i)+"%");
	}
	cssChange();
	for(var i = 1; i <= 6; i++) {

		$("#p1li" + i).bind('touchend ', {
			id: i
		}, touchendli);
		$("#p8li" + i).bind('touchend ', {
			id: i
		}, touchendp8li);
	}
	for(var i = 1; i <= 9; i++) {

		$("#p2li" + i).bind('touchend ', {
			id: i
		}, touchendp2li);
		$("#p3li" + i).bind('touchend ', {
			id: i
		}, touchendp3li);
		$("#p4li" + i).bind('touchend ', {
			id: i
		}, touchendp4li);
		$("#p5li" + i).bind('touchend ', {
			id: i
		}, touchendp5li);
		$("#p6li" + i).bind('touchend ', {
			id: i
		}, touchendp6li);
		$("#p7li" + i).bind('touchend ', {
			id: i
		}, touchendp7li);

	}

}




function test(d) {
	alert(d.data.id);
}

function cssChange() {

	$(".content1").css("height", $(window).width() * 0.9 / 3 * 2 + "px");
	$(".content1").css("width", $(window).width() * 0.9 + "px");

	$(".p1li").css("height", ($(window).width() * 0.9 - 18) / 3 + "px");
	$(".p1li").css("width", ($(window).width() * 0.9 - 18) / 3 + "px");

	$(".p1span").css("height", ($(window).width() * 0.9 - 18) / 3 - 25 + "px");
	$(".p1span").css("line-height",
		($(window).width() * 0.9 - 18) / 3 - 25 + "px");
	$(".p1span").css("font-size",
		($(window).width() * 0.9 - 18) / 3 - 35 + "px");

	// 页面2
	$(".content2").css("height", $(window).width() * 0.9 / 3 * 2 + "px");
	$(".content2").css("width", $(window).width() * 0.9 + "px");

	$(".p2li").css("height", ($(window).width() * 0.9 - 18) / 3 + "px");
	$(".p2li").css("width", ($(window).width() * 0.9 - 18) / 3 + "px");

	$(".p2span").css("height", ($(window).width() * 0.9 - 18) / 3 - 25 + "px");
	$(".p2span").css("line-height",
		($(window).width() * 0.9 - 18) / 3 - 25 + "px");
	$(".p2span").css("font-size",
		($(window).width() * 0.9 - 18) / 3 - 35 + "px");

}

function nextpage(id) {
	var last = id - 1;
	$("#page" + id).removeClass("divnone");
	$("#page" + last).addClass("divnone");
}

function lastpage(id) {
	var last = id + 1;
	$("#page" + id).removeClass("divnone");
	$("#page" + last).addClass("divnone");
}

/** **********************页面1*********************************** */

var flag = [0, 0, 0, 0, 0, 0, 0];
var num = 1;

function touchendli(d) {

	var id = d.data.id;
	$("#p1liinput" + id).val(myImg[id][2]);
	if(flag[id] == 0) {

		flag[id] = 1;
		$("#p1spans" + id).addClass("p1spangreen");

		$("#p1span" + id).css("display", "block");

		$("#p1span" + id).html(num);
		if($("#p1liinput" + id).val().length == 1)
			$("#p1liinput" + id).val($("#p1liinput" + id).val() + num);
		else {
			$("#p1liinput" + id).val(
				$("#p1liinput" + id).val().substr(0, 1) + num);
		}
		num++;

	} else {
		flag = [0, 0, 0, 0, 0, 0, 0];
		num = 1;
		for(var i = 1; i <= 6; i++) {
			$("#p1spans" + i).removeClass("p1spangreen");
			$("#p1span" + i).css("display", "none");
			$("#p1span" + id).html();
		}
	}
	if(num == 7) {
		$(".btnnext").css("display", "block");
	} else {
		$(".btnnext").css("display", "none");
	}

}

/** **********页面2*************************** */

var flag2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function touchendp2li(d) {

	var id = d.data.id;
	if(flag2[id] == 0) {
		flag2[id] = 1;
		$("#p2spans" + id).addClass("p2spangreen");
		$("#p2span" + id).css("display", "block");

		$("#p2liinput" + id).val($("#p2liinput" + id).val().substr(0, 1) + 1);

	} else {

		flag2[id] = 0;
		$("#p2spans" + id).removeClass("p2spangreen");
		$("#p2span" + id).css("display", "none");

		$("#p2liinput" + id).val($("#p2liinput" + id).val().substr(0, 1) + 0);

	}

}

/** **********页面3*************************** */

var flag3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function touchendp3li(id) {
	id = id.data.id;
	if(flag3[id] == 0) {
		flag3[id] = 1;
		$("#p3spans" + id).addClass("p2spangreen");
		$("#p3span" + id).css("display", "block");
		$("#p3liinput" + id).val($("#p3liinput" + id).val().substr(0, 1) + 1);
	} else {
		flag3[id] = 0;
		$("#p3spans" + id).removeClass("p2spangreen");
		$("#p3span" + id).css("display", "none");
		$("#p3liinput" + id).val($("#p3liinput" + id).val().substr(0, 1) + 0);
	}

}

/** **********页面4*************************** */

var flag4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function touchendp4li(id) {
	id = id.data.id;
	if(flag4[id] == 0) {
		flag4[id] = 1;
		$("#p4spans" + id).addClass("p2spangreen");
		$("#p4span" + id).css("display", "block");
		$("#p4liinput" + id).val($("#p4liinput" + id).val().substr(0, 1) + 1);

	} else {
		flag4[id] = 0;
		$("#p4spans" + id).removeClass("p2spangreen");
		$("#p4span" + id).css("display", "none");
		$("#p4liinput" + id).val($("#p4liinput" + id).val().substr(0, 1) + 0);
	}
}

/** **********页面5*************************** */

var flag5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function touchendp5li(id) {
	id = id.data.id;
	if(flag5[id] == 0) {
		flag5[id] = 1;
		$("#p5spans" + id).addClass("p2spangreen");
		$("#p5span" + id).css("display", "block");
		$("#p5liinput" + id).val($("#p5liinput" + id).val().substr(0, 1) + 1);

	} else {
		flag5[id] = 0;
		$("#p5spans" + id).removeClass("p2spangreen");
		$("#p5span" + id).css("display", "none");
		$("#p5liinput" + id).val($("#p5liinput" + id).val().substr(0, 1) + 0);
	}
}
/** **********页面6*************************** */

var flag6 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function touchendp6li(id) {
	id = id.data.id;
	if(flag6[id] == 0) {
		flag6[id] = 1;
		$("#p6spans" + id).addClass("p2spangreen");
		$("#p6span" + id).css("display", "block");
		$("#p6liinput" + id).val($("#p6liinput" + id).val().substr(0, 1) + 1);
	} else {
		flag6[id] = 0;
		$("#p6spans" + id).removeClass("p2spangreen");
		$("#p6span" + id).css("display", "none");
		$("#p6liinput" + id).val($("#p6liinput" + id).val().substr(0, 1) + 0);
	}
}
/** **********页面7*************************** */

var flag7 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function touchendp7li(id) {
	id = id.data.id;
	if(flag7[id] == 0) {
		flag7[id] = 1;
		$("#p7spans" + id).addClass("p2spangreen");
		$("#p7span" + id).css("display", "block");
		$("#p7liinput" + id).val($("#p7liinput" + id).val().substr(0, 1) + 1);

	} else {
		flag7[id] = 0;
		$("#p7spans" + id).removeClass("p2spangreen");
		$("#p7span" + id).css("display", "none");
		$("#p7liinput" + id).val($("#p7liinput" + id).val().substr(0, 1) + 0);
	}
}
/** **********页面8*************************** */

var flag8 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function touchendp8li(id) {
	id = id.data.id;
	if(flag8[id] == 0) {
		flag8[id] = 1;
		$("#p8spans" + id).addClass("p2spangreen");
		$("#p8span" + id).css("display", "block");
		$("#p8liinput" + id).val($("#p8liinput" + id).val().substr(0, 1) + 1);
	} else {
		flag8[id] = 0;
		$("#p8spans" + id).removeClass("p2spangreen");
		$("#p8span" + id).css("display", "none");
		$("#p8liinput" + id).val($("#p8liinput" + id).val().substr(0, 1) + 0);
	}
}




    var page = 1;
    $(document).ready(function () {

        //$('.btnnext').bind('touchend', clickfun1); //下一步
       // $('.btn1').bind('touchend', clickfun2); //上一步
        //$('.btnlast').bind('touchend', clickfun3);//上一步
        $('.td2').on('click', clickfun);

        $('.btnnext,.submitbtn').bind('touchend', touchendfun); //下一步
        $('.btnnext,.submitbtn').bind('touchend', touchstartfun); //下一步
        $('.btnnext,.submitbtn').bind('touchend', touchendfun); //下一步
        $('.btnnext,.submitbtn').bind('blur', touchendfun); //下一步

//      $('.btn1').bind('touchend', touchendfun1); //下一步
//      $('.btn1').bind('touchstart', touchstartfun1); //下一步
//      $('.btn1').bind('touchend', touchendfun1); //下一步
//      $('.btn1').bind('blur', touchendfun1); //下一步

    });

    function touchstartfun1() {

    }

    function touchendfun1() {

    }

    function touchstartfun() {

    }

    function touchendfun() {

    }

    function clickfun1() {

        if (page == 8) {

            $('.btnnext').css('display', 'none');
            $('.swiper-container').css('display', 'none');
            $('.pingjia').css('display', 'block');
        }
        page++;
    }

    function clickfun2() {
        if (page == 9) {

            $('.btnnext').css('display', 'block');
            $('.swiper-container').css('display', 'block');
            $('.pingjia').css('display', 'none');
        }

        page--;

    }
    var flagclick = 0;

    var arrayScore = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
        '0', '0', '0'
    ]; //13个,后面12个幼小
    
    function clickfun() {
	        var id = $(this).attr('id').substr(0, 1);
	        var score = $(this).attr('id').substr(1, 1);
	        if (score == 6)
	            return;
	        var left = 0;
	
	        switch (id) {
	            case 'a':
	                arrayScore[10] = score;
	                break;
	            case 'b':
	                arrayScore[11] = score;
	                break;
	            case 'c':
	                arrayScore[12] = score;
	                break;
	            default:
	                arrayScore[id] = score;
	                break;
	        }
	
	        
	
	        left = $(this).position().left;
	
	        var id = $(this).attr('id').substr(0, 1);
	        $("#" + id + "6").css('display', 'block');
	        $("#" + id + "6").stop(true,true).animate({
	            'left': left + 'px'
	        }, 150,function(){
	        	return false;
	        });
    }

    function submitForm() {
        if (score.join("").substr(1, 12).indexOf("0") >= 0) {

            return false;
        } else {
            $('#pingjiainput').val(score.join(""));

            return true;
        }

    }

    function sub() {
        if (submitForm()) {
            $.ajax({
                type: "POST",
                url: "http://bangxiweixin.fenxiaozhu.top/index3.php/stu/index/recievePage1Info",
                data: $('#myForm').serialize(),
                dataType:"json",
                error: function (request) {
                    addErrorDiv();
                },
                success: function (data) {
                    if (data.success == "true") {
                        window.location.href = "page2.html";
                    } else {
                        addErrorDiv();
                    }
                },
            });
        }
    }
    
    

   
var nowPage = 1;

$(".pingjia .back").on("click",function(){
	 $('.btnnext').css('display', 'block');
     $('.swiper-container').css('display', 'block');
     $('.pingjia').css('display', 'none');
     nowPage--;
})

$(".btnnext").on("touchstart",function(){
	if(nowPage < 8){
		$("#page"+nowPage).stop(true,true).animate({"left":"-100%"},{queue:false,duration:300});
		var nextPage = nowPage+1;
		$("#page"+nextPage).stop(true,true).animate({"left":"0"},{queue:false,duration:300});
	}
	else if(nowPage == 8){
		$('.btnnext').css('display', 'none');
        $('.swiper-container').css('display', 'none');
        $('.pingjia').css('display', 'block');
	}
	nowPage++;
});
$(".btn1").on("touchstart",function(){
	if(nowPage>1 && nowPage < 9){
		$("#page"+nowPage).stop(true,true).animate({"left":"100%"},{queue:false,duration:300});
		var prvPage = nowPage-1;
		$("#page"+prvPage).stop(true,true).animate({"left":"0"},{queue:false,duration:300});
	}
	else if(nowPage == 1){
		window.location.href = "index.html";
	}
	else if(nowPage == 9){
		$('.btnnext').css('display', 'block');
        $('.swiper-container').css('display', 'block');
        $('.pingjia').css('display', 'none');
	}
	nowPage--;
});


