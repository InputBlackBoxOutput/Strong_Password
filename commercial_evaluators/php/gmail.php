<?php
  require dirname(__FILE__) . DIRECTORY_SEPARATOR . "php" . DIRECTORY_SEPARATOR . "curlclient.class.php";
  $curlclient = new CurlClient("https://accounts.google.com/RatePassword", "UTF-8");
  
  if (count($argv) < 2) {
    die("Usage: {$argv[0]} dictionary [output-file]".PHP_EOL);
  }
  
  if (is_readable($argv[1])) {
    $passwords = file($argv[1]);
  } else {
    die("File '".$argv[1]."' unreadable.".PHP_EOL);
  }
  
  $output = null;
  if (isset($argv[2])) {
    if (is_file($argv[2])) {
      echo "File exists! Going to overwrite it in 3 seconds".PHP_EOL;
      sleep(3);
    }
    $output = fopen($argv[2], "w+");
  }
  
  /* check an array of passwords */
  function check($passwords) {
    GLOBAL $curlclient, $output;
    
    for ($i=0; $i<count($passwords); $i++) {
    // time_nanosleep(0,15600000); 
     // prepare data
      $pass = trim($passwords[$i]);
      
      // JtR comments
      // if (substr($pass,0,9)=="#!comment") continue;

      // execute the request and get back the result
      if (strlen($pass) < 8)
        $data = 0;
      else {
        $data = $curlclient->send("Passwd=".urlencode($pass));
      }

      if ($data === false) {
        echo 'Error occured for "'.$pass.'": ' . curl_error($ch)."\r\n";
        $i--;
        continue;
      }

      // print result
      //print_r( $data );

      //$data = (int)$data;
      switch($data) {
        case '0':
          $status = "Too short";
          break;
        case '1':
          $status = "Weak";
          break;
        case '2':
          $status = "Fair";
          break;
        case '3':
          $status = "Good";
          break;
        case '4':
          $status = "Strong";
          break;
        default:
          $status = "Unknown";
          break;
      }

      echo $pass."\t".$status.PHP_EOL;
      if ($output != null)
        fputs($output, $pass."\t".$status.PHP_EOL);
    }
  }
  
  check($passwords);
  
  $curlclient->close();
  
  if ($output != null) {
    fclose($output);
  }

?>
