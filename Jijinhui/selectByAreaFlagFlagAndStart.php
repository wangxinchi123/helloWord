<?php
/**
 * Created by PhpStorm.
 * User: LC
 * Date: 2016/9/25
 * Time: 15:55
 * 根据Start参数，每页显示num参数，Flag标记查询
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
$areaFlag = $_GET['areaFlag'];//类型
$start = $_REQUEST['start'];//起始标志
$num = $_GET['num'];//个数

/**
 * 测试用例
 * $mbFlag = '1';
 * $start = 1;
 * $num = 5;
 */


if (empty($areaFlag) || empty($num ) || (empty($start) && $start!=0)) {
    $temp = false;
}
if($areaFlag==20)
{
    $areaFlag=0;
}
/**
 * 当$temp=true：查询数据库输出结果和$temp
 * 当$temp=fals：不查询只输出$temp
 */
if ($temp) {
    $sql = "select * from db_member where areaFlag = '{$areaFlag}' order by mbId asc limit {$start},{$num}";
    $sql2="select count(*) from db_member where areaFlag = '{$areaFlag}' ";
    $result = $operate->GetRows($sql);
    $result2 = $operate->GetOneData($sql2);
    $ary = array(
        'flag' => $temp,
        'total'=>$result2,
        'result' => $result,
    );
} else {
    $ary = array(
        'flag' => $temp
    );
}
echo json_encode($ary);


