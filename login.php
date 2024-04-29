<?php 
$conn = mysqli_connect('localhost','root','','Petflix');
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


$data = json_decode(file_get_contents('php://input'), true);
if($data['start']!=1){
$login = $_POST['name'];
$pass =$_POST['password'];

$sql = "SELECT * FROM `form` WHERE login = '$login' AND pass ='$pass'";
$result = $conn -> query($sql);
if($result->num_rows > 0){
while($log = $result->fetch_assoc()){
    echo "<script>";
    echo "localStorage.setItem('login', '" . $log['login'] . "');";
    echo "localStorage.setItem('loginEst', '" . 'true' . "');";
    echo "window.location.href = 'index.html';";
    echo "</script>";
    exit;
}

exit;
}
else{
    header("Location: index.html?error=" . urlencode($error));
}
}
else{
    $log = $data['pepsi'];
    $sql = "SELECT * FROM `form` WHERE login = '$log'";
    $result = $conn -> query($sql);
    if ($result->num_rows > 0) {
       
        echo json_encode(array("loginValid" => true));
    } else {
        
        echo json_encode(array("loginValid" => false));
    }
    
}

?>