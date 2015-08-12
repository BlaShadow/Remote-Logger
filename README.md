# Remote-Logger

Remote-Logger is a tiny library for logging error and info on ours nodejs aplications, its use `DEBUG` library for logging into console and `socketIO` for send those logs message thrown web socket to others users.

Install
--
    npm install git@github.com:BlaShadow/Remote-Logger.git
    

How to use
--
if you're using Socket.io on your project just initialize the library with the instance of `io`.

    var io = ..
    var log = require('Remote-Logger')(io);

With express
--
Like any `socketIO` app  

    var app = require('express').createServer();
    
    var log = require('Remote-Logger')(app);
    
    log.info("Hello world");
    
    log.error("it's failling dude!!!");
    
    log.fatal('this is bad!!',{ some:"data" });
    
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

Clients
--

There's already clients to consume this library after you implement on your nodejs project.

**Android Client**

[PlayStore] (https://play.google.com/store/apps/details?id=org.shadow.remoteloggerclient)

[GitHub] (https://github.com/BlaShadow/Remote-Logger-Android)

