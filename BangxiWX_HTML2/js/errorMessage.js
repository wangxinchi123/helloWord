/**
 * Created by LC on 2016/9/24.
 * 显示错误提示
 */
function addErrorDiv() {
    var errrorDiv = document.createElement('div');
    errrorDiv.innerHTML = '<h4 style="position:fixed;bottom:10px;width:100%;color: red;font-size: 16px; text-align: center;">服务器繁忙，请重新点击OK</h4>';
    // $(className).css('display','none');
    document.body.appendChild(errrorDiv);
    setTimeout(function () {
        errrorDiv.remove();
        // $(className).css('display','block');
    },3000);
}
