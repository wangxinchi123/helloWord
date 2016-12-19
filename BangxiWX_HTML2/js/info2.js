
window.document.addEventListener("touchmove",function(e){e.preventDefault();})
$('#textPhone').val(window.localStorage.getItem("phone"));
    $('#textName').val(window.localStorage.getItem("name"));


    function sexCheck() {
        var id = $(this).attr('id').substr(3, 1);
        if (id == 1) {
            $('#sex0').removeClass('imgborder');
            $('#sex1').addClass('imgborder');
            $('#textSex').val('1');
        } else {
            $('#sex1').removeClass('imgborder');
            $('#sex0').addClass('imgborder');
            $('#textSex').val('2');
        }

    }
    var Code = "";
    var phoneNumCheck = "";

    function sendYZM() {

        var phoneNum = $('#textPhone').val();
        if (checkPhone(phoneNum)) {

            $.ajax({

                type: "get",
                url: "taobao-sdk-PHP/sendSMS.php",
                data: "phoneNum=" + phoneNum + "",
                dataType: "json",
                success: function (data) {
                    if (data.success == 'true') {
                        Code = data.code.toString();
                        phoneNumCheck = phoneNum;
                        btnEnable();
                        $("#li_sex").css('display', 'block');
                    } else if (data.success == 'num0') {
                        alert("短信余额不足!")
                    }
                }
            });
        }
    }
    var time = 60;
    var validCode = true;

    function btnEnable() {

        if (validCode) {
            time = 60;
            validCode = false;

            var t = setInterval(function () {
                $('#btnSendYZM').attr("disabled", true);
                time--;
                $('#btnSendYZM').val("发送成功," + time);

                if (time == 0) {

                    clearInterval(t);
                    $('#btnSendYZM').val("重新获取");
                    $('#btnSendYZM').attr("disabled", false);
                    validCode = true;
                    // code.removeClass("msgs1");

                }
            }, 1000)
        }

    }

    function getRootPath() {
        // 获取当前网址，如： http://localhost:8083/proj/meun.jsp
        var curWwwPath = window.document.location.href;
        // 获取主机地址之后的目录，如： proj/meun.jsp
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        // 获取主机地址，如： http://localhost:8083
        var localhostPath = curWwwPath.substring(0, pos);
        // 获取带"/"的项目名，如：/proj
        var projectName = pathName.substring(0, pathName.substr(1).indexOf(
                        '/') + 1);

        return (localhostPath + projectName);
    }

    /**验证手机号
     * [checkPhone description]
     * @return {[type]} [description]
     */
    function checkPhone(phoneNum) {

        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (!myreg.test(phoneNum)) {
            alert('请输入有效的手机号码！');
            return false;
        } else {
            return true;
        }
    }
    var phoneFlag = "";

    function submitCheck() {

        if ($('#textName').val().trim() == "") {
            alert("请输入姓名!");
            return false;
        }

        if (phoneFlag == "false") {
            if ($('#textPhone').val() != phoneNumCheck) {
                alert("手机号与接受验证码的手机号不一致");
                return false;
            }
            if ($('#textYZM').val() != Code) {


                alert("验证码错误");
                return false;
            }
        }
        localStorage.phone = $('#textPhone').val();
        localStorage.name = $('#textName').val();
        $('#buttonSubmit').attr("disabled", true);

        return true;

    }

    $(document).ready(function () {
        $("#buttonSubmit1" ).bind('touchend ', {

        }, sub);


        $('img').bind('touchend', sexCheck);
        $('#btnSendYZM').bind('click', sendYZM);
        phoneFlag = "false";
//        $.ajax({
//            url: '',
//
//            type: 'get',
//            cache: false,
//            dataType: 'json',
//            success: function (data) {
//                phoneFlag = data.phoneFlag;
//
//                if (phoneFlag == "true" && data.phone != null && data.phone != "") {
//
//                    $("#btnSendYZM").css("display", "none");
//                    $("#phoneYZMli").css("display", "none");
//                    $("#li_sex").css('display', 'block');
//
//                    $('#textPhone').val(data.phone);
//
//                }
//                if (data.url != "null") {
//
//                    var urls = data.url;
//
//                    urls = ".." + urls.substr(2);
//
//                    $("#lastUrl").attr("href", urls);
//                    $("#lastUrl").css("display", "block");
//
//                }
//            },
//            error: function () {
//
//            }
//        });
    })

    function sub() {
        if (submitCheck()==true) {
            $.ajax({
                type: "POST",
                url: "subInfo2.php",
                data: $('#myForm').serialize(),
                error: function (request) {
                    addErrorDiv();
                },
                success: function (data) {
                    eval("var result=" + data);
                    if (result.temp == 1) {
                        window.location.href = "chart/chart.html?name=" + result.name +
                                "&score1=" + result.score1 +
                                "&score2=" + result.score2 +
                                "&score3=" + result.score3 +
                                "&score4=" + result.score4 +
                                "&score5=" + result.score5 +
                                "&score6=" + result.score6;
                    } else {
                        addErrorDiv();
                    }
                },
            });
        }
    }