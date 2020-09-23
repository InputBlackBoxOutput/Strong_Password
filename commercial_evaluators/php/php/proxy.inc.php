<?php
  /* Reads client request, gets POST data to forward to the real server.
     Answers CORS requests blindly
     Expects POST request with content
     Limitations:
       Only for local use!
       Is known to take CPU 100% for some reasons sometimes, just kill and
       restart (client will re-request)
     */
  while(true) {
    //get connection from client
    echo "Waiting for client\r\n";
    $server->waitClient();
    echo "Got client!\r\n";

    // track connexion status
    $closed = false;
    
    // answer requests from client until he closes it
    // allows pipelining
    while (!$closed) {
      // whether this is a CORS request sent before the actual GET/POST request
      $cors = false;
      $i=0;
      
      do {         
        $cors = false;
        $len = 0;  //content-length
        do {
          // read first line from client
          $clientReq = $server->read();
          // if first line and OPTIONS found, it's a CORS request
          if ($i==0 && substr($clientReq, 0, 7)=="OPTIONS") { 
            $cors = true;
          }
          $i++;
          
          echo ".";
          
          // extract content-length from the header  
          if (preg_match("/Content-Length: ([0-9]+)/", $clientReq, $matches)) {
            $len = $matches[1];
          }
          
        } while ($clientReq != "\r\n" && $clientReq !== false);
        
        echo PHP_EOL;
        
        // if network error
        if ($clientReq === false) break;
        
        // debug
        //echo $cors;
        
        // if CORS request, answer with appropriate permissions */
        if ($cors==true) {
          $answer  = "HTTP/1.1 200 OK\r\n";
          $answer .= "Access-Control-Allow-Origin: *\r\n";
          $answer .= "Access-Control-Allow-Methods: GET, POST\r\n";
          $answer .= "Access-Control-Allow-Headers: X-Custom-Header\r\n";
          $answer .= "Origin: *\r\n";
          $answer .= "Content-Type: text/plain\r\n";
          $answer .= "\r\n";
          $server->write($answer);
          echo "Answered CORS".PHP_EOL;
        }
      } while($cors==true);

      // read payload
      $clientReq = $server->read($len);
      if ($clientReq === false) {
        $closed = true;
        continue;
      }
      echo $clientReq."\r\n";

      // check if already cached, or request it
      if ($cache->check($clientReq)) {
        // get result from cache
        $serverResponse = $cache->get($clientReq);
        echo "(cached) ".$serverResponse."\r\n";
      }
      else
      {
        // proxy the request
        $serverResponse = $curlclient->send($clientReq);
        echo "(reqd) ".$serverResponse."\r\n";
        $cache->put($clientReq, $serverResponse);
      }
      
      // answers client (proxy server reply)
      $response  = "HTTP/1.1 200 OK\r\n";
      $response .= "Connection: keep-alive\r\n";
      $response .= "Content-Type: text/html; charset=UTF-8\r\n";
      $response .= "Content-Length: ".strlen($serverResponse)."\r\n";
      
      // allows browser to receive data!
      $response .= "Access-Control-Allow-Origin: *\r\n";
      
      $response .= "\r\n";
      $response .= $serverResponse;

      if ($server->write($response) === false) {
        $closed = true;
        continue;
      }
    }
    // close connection with client after client closes it
    $server->closeClient();
  }

  // close listening server
  $server->close();
?>
