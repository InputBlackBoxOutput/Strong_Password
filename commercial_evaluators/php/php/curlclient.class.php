<?php
  /* cURL client */
  class CurlClient {
    private $url;
    private $ch;

    function __construct($url, $charset="UTF-8") {
      $this->url = $url;
      // create a new cURL resource
      $this->ch = curl_init();
      // set URL and other appropriate options
      // URL
      curl_setopt($this->ch, CURLOPT_URL, $this->url);
      // no ssl check
      curl_setopt($this->ch, CURLOPT_SSL_VERIFYPEER, false);
      // get result
      curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, 1);
      // timeout
      curl_setopt($this->ch, CURLOPT_CONNECTTIMEOUT, 10);
      curl_setopt($this->ch, CURLOPT_TIMEOUT, 5);
      // fix expect: 100-continue
      curl_setopt($this->ch, CURLOPT_HTTPHEADER, array("Expect:"));
      // set content-type
      curl_setopt($this->ch, CURLOPT_HTTPHEADER, array("Content-Type: application/x-www-form-urlencoded; charset=".$charset));
    }

    function  __destruct() {
      $this->close();
    }

    /* sends request and returns result or false (error) */
    function send($data=null) {
      if ($data==null) {
        $method = "GET";
        // no POST data
        curl_setopt($this->ch, CURLOPT_POST, FALSE);
        curl_setopt($this->ch, CURLOPT_POSTFIELDS, null);
      } else {
        $method = "POST";
        // set POST data
        curl_setopt($this->ch, CURLOPT_POST, TRUE);
        curl_setopt($this->ch, CURLOPT_POSTFIELDS, $data);
      }

      $return = curl_exec($this->ch);
      if ($return === false) {
        echo 'Curl error: ' . curl_error($this->ch);
        // found error, retry
        sleep(1);
        return $this->send($data);
      }

      if(curl_errno($this->ch)==CURLE_OPERATION_TIMEOUTED) {
        echo "Timeout\r\n";
        return $this->send($data);
      }

      return $this->check($data, $return);
    }

    /* check if "errore" is found in the result */
    function check($data, $return) {
      if (preg_match("/error/i", $return, $matches)) {
        // found error, retry
        sleep(1);
        return $this->send($data);
      }
      return $return;
    }

    function close() {
      // close cURL resource, and free up system resources
      @curl_close($this->ch);
    }
  }
?>