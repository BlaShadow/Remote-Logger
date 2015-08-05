/** Dependency **/
var socketIO = require('socket.io');
var debug = require('debug')('remote-logger');

module.exports = function(app){

    /** Construct **/
    var io = socketIO(app);
    
    io.on('connection',function(socket){
        log('New client connected');
    });
    
    io.on('disconnect',function(){
       log('Client left'); 
    });
    
    /*
     * Send those event logs  
     * @param data - Option Object
     *
     * **/
    var emitLog = function(data){
        
        /** Set date when the error is emited **/
        data.date = new Date().toISOString();
        
        io.emit("log", data);
        
        io.emit("log".data.log_type, data);
    };
     
    /*
     * Log events using debug and web sockets.
     *
     * **/
    var log = function(data){
        debug(data.message);
        
        emitLog(data);
    };
    
    /* 
     * Option log builder
     *
     * **/
    var optionsBuilder = function(message, type, extraArguments){
        return {
            message: message,
            log_type: type,
            extra: extraArguments,
            date: null
        };
    };
    
    /** Public methods **/
    return {
        info: function(format, params){
            log(optionsBuilder(format, "INFO", params));    
        },
        debug: function(format, params){
            log(optionsBuilder(format, "INFO", params));
        },
        error: function(format, params){
            log(optionsBuilder(format, "INFO", params));
        },
        fatal: function(format, params){
            log(optionsBuilder(format, "FATAL", params));
        }
    };
};


