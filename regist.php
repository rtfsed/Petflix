<?php 
$conn = mysqli_connect('localhost','root','','Petflix');
$login = $_POST['name'];
$pass =$_POST['password'];

 $sql = "INSERT INTO `form`(login,pass) VALUES('$login','$pass')";
if($conn -> query($sql) === TRUE){
    header('Location: index.html');
}
else{
    echo "ERROR:".$conn ->error;
}
?>