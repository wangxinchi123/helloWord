<?php
/**
 * Created by PhpStorm.
 * User: LC
 * Date: 2016/9/25
 * Time: 15:55
 * 根据输入的单位名称与数据库字段 mbCompany 比对 like 查询
 * 返回所有查询的结果
 */
header("Content-Type: text/html;charset=utf-8");
header("Access-Control-Allow-Origin:*");
require_once "MysqlHelper/configInfo.php";
require_once "MysqlHelper/MySQLDB.class.php";

$config = configInfo::$configInfo;
$operate = MySQLDB::GetInstance($config);

/**
 * $temp:
 * 标记量，前端根据此值就行相应操作
 * =true：正常
 * =false:异常
 */
$temp = true;

/**
 * 打开session
 * 获取前端传过来的参数
 * 并进行判断是否为空
 */
$mbCompany = $_GET['mbCompany'];
$start = $_REQUEST['start'];//起始标志
$num = $_GET['num'];//个数
$mbFlag = $_GET['mbFlag'];//类型标志
/**
 * 测试用例
 * $mbCompany='中国';
 */

if (empty($num) || (empty($start) && $start != 0)) {
    $temp = false;
}
$sqlcondition = "";
if (!empty($mbFlag)) {
    $sqlcondition = " and  mbFlag={$mbFlag} ";
}
/**
 * 当$temp=true：查询数据库输出结果和$temp
 * 当$temp=fals：不查询只输出$temp
 */
if ($temp) {
    /**
     * 将中文分割开
     * 然后采用 %字%字% 形式进行查询
     */
    function mbstringToArray($str, $charset)
    {
        $strlen = mb_strlen($str);
        while ($strlen) {
            $array[] = mb_substr($str, 0, 1, $charset);
            $str = mb_substr($str, 1, $strlen, $charset);
            $strlen = mb_strlen($str);
        }
        return $array;
    }

    $ary = mbstringToArray($mbCompany, "utf-8");
    $sql = "select * from db_member where 1=1  {$sqlcondition}        "; //  mbCompany like '%";
    $sql2 = "select count(*)  from db_member where  1= 1 {$sqlcondition}  ";     //mbCompany like '%";
    $sqlTemp = '';

    if (!empty($mbCompany)) {
        $sqlTemp = ' and  mbCompany like \'%';

        foreach ($ary as $value) {
            $sqlTemp .= $value . "%";
        }
        $sqlTemp.="' ";
    }

    $sql = $sql . $sqlTemp . " order by mbId asc  limit {$start},{$num} ";
    $sql2 = $sql2 . $sqlTemp ;


    $result = $operate->GetRows($sql);
    $result2 = $operate->GetOneData($sql2);

    $ary = array(
        'flag' => $temp,//是否成功标志
        'total' => $result2,//总数
        'result' => $result,//返回结果数据
    );
} else {
    $ary = array(
        'flag' => $temp
    );
}
echo json_encode($ary);