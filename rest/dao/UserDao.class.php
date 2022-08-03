<?php
class UserDao{

    private $conn;

    public function __construct(){
        $servername = "localhost";
        $username = "root";
        $password = "0000";
        $schema = "blogdb";

        $this->conn = new PDO("mysql:host=$servername;dbname=$schema", $username, $password);
        // set the PDO error mode to exception
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
    }
    public function get_all(){
        $stmt = $this->conn->prepare("SELECT * FROM user");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }  
    public function get_by_id($id){
        $stmt = $this->conn->prepare("SELECT * FROM user WHERE id=:id");
        $stmt->execute(['id' => $id]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return reset($result);
    }  
    public function add($data){
        $stmt = $this->conn->prepare("INSERT INTO user (user_name, user_mail, user_password) VALUES (:user_name,  :user_mail, :user_password);");
        // $stmt->execute(['username' => $username, 'email' => $email, 'password' => $password]);
        $stmt->execute($data);
        $data['id'] = $this->conn->lastInsertId();
        return $data;
    }  
    public function delete($id){
        $stmt = $this->conn->prepare("DELETE FROM user WHERE id=:id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
    }
    public function update($data){
        $stmt = $this->conn->prepare("UPDATE user SET user_name=:user_name, user_mail=:user_mail, user_password=:user_password WHERE id=:id;");
        // $stmt->execute(['id' => $id, 'username' => $username, 'email' => $email, 'password' => $password]);
        $stmt->execute($data);
    }

}
?>