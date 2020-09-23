<?php
  /* Cache request for faster load if re-requested */
  class Cache {
    // cache array
    private $cache;
    // cache file pointer
    private $cachePointer;
    // separator
    private $sep;

    function __construct($uri) {
      $this->uri = $uri;
      // Open cache
      $this->sep = "\t-\t";
      $this->readFromCache();
    }

    function  __destruct() {
      $this->close();
    }

    /* load cache file into memory */
    function readFromCache() {
      $this->cache = array();
      
      if (is_readable($this->uri)) {
        // read the file line by line
        $cacheFileContent = file($this->uri, FILE_IGNORE_NEW_LINES);
        // for each line
        foreach($cacheFileContent as $entry) {
          // extract request and result
          list($req, $res) = explode($this->sep, $entry);
          // load array
          $this->cache[$req] = $res;
        }
      }
      
      // resume cache file
      $this->cachePointer = fopen($this->uri, "a+");
    }

    /* returns true if $value is caced */
    function check($value) {
      return array_key_exists(trim($value), $this->cache);
    }

    /* returns the cached result for given request */
    function get($req) {
      if (!$this->check(trim($req))) return false;
      return $this->cache[trim($req)];
    }

    /* store result for given request */
    function put($req, $res) {
      fwrite($this->cachePointer, trim($req).$this->sep.trim($res).PHP_EOL);
      $this->cache[trim($req)] = trim($res);
    }

    function close() {
      @fclose($this->cachePointer);
    }

  }
?>