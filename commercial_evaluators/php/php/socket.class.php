<?php
  // adapted from http://php.net/manual/en/function.socket-create-listen.php
  /* Socket to receive data from local evaluator */
  class Socket {
    // Sockets
    private $client;
    private $sock;
    // Port
    private $port;
    // User
    private $user;

    function __construct($port) {
      $this->port = $port;
      $this->user['ip'] = $this->user['port'] = NULL;
      // Create server
      $this->socketListen();
    }

    function  __destruct() {
      $this->close();
    }

    // Create server
    public function socketListen(){
      if ( !( $this->sock = socket_create_listen($this->port) ) ){
        die("Failed to listen on {$this->port}.");
      }
    }

    // Wait for client
    public function waitClient(){
      $this->client = socket_accept($this->sock);
      socket_getpeername($this->client, $raddr, $rport);
      $this->user = array('ip'=>$raddr,'port'=>$rport);           
    }

    // Close socket
    public function close(){
      if( is_resource($this->sock) )
        socket_close($this->sock);
    }

    // Close client connection
    public function closeClient(){
      if( is_resource($this->client) )
        socket_close($this->client);
    }

    // Get info from client
    public function getUserInfo(){
      return $this->user;
    }

    // Send data to client
    public function write($message){
      $num = 0;
      $length = strlen($message);
      do{
        $buff = substr($message, $num);
        $num += socket_write($this->client,$buff);
      }while( $num != $length );
    }

    // Read from client, line by line
    public function read($len = 0){
      $message = '';
      do {
        $buff     = socket_read($this->client,1,PHP_BINARY_READ);
        $message .= $buff;
      } while( (($len==0 && $buff != "\n") || ($len>0 && strlen($message) < $len)) && $buff !== false);
      return ($buff === false) ? false : $message;
    }
  }
?>