<?php
/**
 * Created by PhpStorm.
 * User: djt 974480274
 * Date: 2016/9/26
 * Time: 12:47
 */
header("Content-Type: text/html;charset=utf-8");
header("Access-Control-Allow-Origin:*");
require_once "MysqlHelper/configInfo.php";
require_once "MysqlHelper/MySQLDB.class.php";

$config = configInfo::$configInfo;
$operate = MySQLDB::GetInstance($config);

$mbStrId=$_GET['mbStrId'];

if (empty($mbStrId)) {
    $mbStrId = 0;
}
$sql = " select * from db_member where mbStrId='{$mbStrId}' ";
$ret=$operate->GetOneRow($sql);
$arry=array('flag'=>"true",'info'=>$ret);
echo json_encode($arry);