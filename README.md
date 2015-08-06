# Remote-Logger

Remote-Logger is a tiny library for logging error and info on ours nodejs aplications, its use DEBUG library for logging into console and socketIO for send those logs message thrown web socket to others users.

Install
--
    npm install git@github.com:BlaShadow/Remote-Logger.git
    

How To Use with express
--
Like any `socketIO` app  

    var app = require('express').createServer();
    
    var log = require('Remote-Logger')(app);
    
    log.info("Hello world");
    
    log.error("it's failling dude!!!");
    
How to use on client side
--
Its just like include `socket.io` library and listen to `3` mayor events that the library its emiting.

* log
* connection (from socket.io)
* disconnect (from socket.io)

and those events too
* log-info
* log-error
* log-debug
* log-faltal