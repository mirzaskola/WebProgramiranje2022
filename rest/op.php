<?php

require_once("dao/BaseDao.class.php");

$op = $_REQUEST['op'];

$dao = new BaseDAo();

switch($op){
    case 'insert':
        $username = $_REQUEST['username'];
        $email = $_REQUEST['email'];
        $password = $_REQUEST['password'];
        $dao->add($id, $username, $email, $password);
        break;

    case 'delete':
        $id = $_REQUEST['id'];
        $result = $dao->delete($id);
        break;

    case 'update':
        $id = $_REQUEST['id'];
        $username = $_REQUEST['username'];
        $email = $_REQUEST['email'];
        $password = $_REQUEST['password'];
        $dao->update($id, $username, $email, $password);
        break;
        
    case 'get':    
    default:
        $result = $dao->get_all();
        print_r($result);
        break;    
}

?>