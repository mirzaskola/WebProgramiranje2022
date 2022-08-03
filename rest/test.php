<?php
require_once("dao/BaseDao.class.php");
 
$dao = new BaseDAo();
$result = $dao->update('11', "adogegajjjj", "ag@agggg", "123456");
print_r($result);
?>