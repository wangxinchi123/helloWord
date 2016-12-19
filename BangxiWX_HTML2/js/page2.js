
window.document.addEventListener("touchmove",function(e){e.preventDefault();})
var flag = 1;
    var lis = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    $(document).ready(function() {
        $('li').bind('touchstart', liclick);
        $("#buttonSubmit").attr("disabled", true);
    })
    function liclick() {
        if (flag < 4) {

            var id = $(this).attr('id');

            if (lis[id] == 0) {
                if (flag == 1 || flag == 2)
                {
                    $("#span" + id).html(flag);
                    $("#buttonSubmit").attr("disabled", true);
                }
                else
                {
                    $("#span" + id).html('9');
                    $("#buttonSubmit").attr("disabled", false);
                }

                $("#content").val($("#content").val()+id);
                $("#span" + id).fadeIn('300');
                lis[id] = flag;
                flag++;

            } else {

                for (var i = 1; i <= 9; i++) {

                    $("#span" + i).fadeOut('300');
                    $("#span" + i).html('');
                }
                flag = 1;
                lis = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
                $("#content").val('');
            }
        } else {
            $("#buttonSubmit").attr("disabled", true);
            for (var i = 1; i <= 9; i++) {

                $("#span" + i).fadeOut('300');
                $("#span" + i).html('');
            }
            $("#content").val('');
            flag = 1;
            lis = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        }

        if (flag == 2) {
            $("h4").html('现在,请你选择<a style="color:red;">第二看重的</a>一项');
        } else if (flag == 3) {
            $("h4").html('现在,请你选择<a style="color:red;">最不看重的</a>一项');
        } else if (flag == 4) {
            $("h4")
                    .html(
                            '现在,你可以点击<a style="color:red;">下一步</a>或者<a style="color:red;">重选</a>');
        } else {
            $("h4").html('现在,请你选择<a style="color:red;">最看重的</a>一项');
        }
    }

    function sub() {
        $.ajax({
            type: "POST",
            url:"http://bangxiweixin.fenxiaozhu.top/index3.php/stu/index/recievePage2Info",
            data:$('#myForm').serialize(),
            error: function (request) {
                addErrorDiv();
            },
            dataType:"json",
            success: function (data) {
                if (data.success == "true") {
                    window.location.href = "fillInfo.html";
                } else {
                    addErrorDiv();
                }
            },
        });
    }