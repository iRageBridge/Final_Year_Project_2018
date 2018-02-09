<?php
$uploaddir = "uploads/";
//$uploaddir = "D:\Documents\GitHub\Final_Year_Project_2018\data";
$uploadFile = $uploaddir.'/'.($_FILES['upload']['name']);
var_dump($uploadFile);

if(move_uploaded_file($_FILES['upload']['temp_name'], $uploadFile)){
    echo "File Uploaded";
}
?>