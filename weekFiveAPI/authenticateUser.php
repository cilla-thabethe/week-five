<?php

    include 'db_connection.php';

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');

    $request_data = file_get_contents('php://input');
    $data = json_decode($request_data);

    $username = $data -> username;

    if($username === ""){;
        echo ("")
    } else {
        $sql = "SELECT * FROM users WHERE username = '$username';";
        $result = mysqli_query($conn, $sql);

        //we don't care about the information. we care about the number of rows returned
        $resultCheck = mysqli_num_rows($result);

        if($result_check > 0){
            echo 'Not Available';
        } else {
            echo 'Available';
        }
    }

?>