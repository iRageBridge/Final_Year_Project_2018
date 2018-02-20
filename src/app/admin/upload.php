<?php
$uploaddir = 'C:\wamp64\www\uploads';
$uploadFile = $uploaddir.'/'.($_FILES['upload']['name']);
var_dump($uploadFile);

if(move_uploaded_file($_FILES['upload']['temp_name'], "$uploadFile")){
    echo "File Uploaded";
}
?>