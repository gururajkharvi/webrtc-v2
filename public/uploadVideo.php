<?php
  echo("upload video !")
if(isset($_FILES["video"])){
    // Define a name for the file
    echo("upload video !")
    $fileName = "myvideo.webm";

    // In this case the current directory of the PHP script
    $uploadDirectory = './'. $fileName;
    echo("upload video !",uploadDirectory);
    // Move the file to your server
    if (!move_uploaded_file($_FILES["video"]["tmp_name"], $uploadDirectory)) {
        echo("Couldn't upload video !");
    }
}else{
    echo "No file uploaded";
}
 
?>