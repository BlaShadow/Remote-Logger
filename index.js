/** Dependency **/
var socketIO = require('socket.io');
var debug = require('debug')('remote-logger');

/*
 * 
 * @param instance ( could be an socket.io instance or express server )
 *
 * **/
module.exports = function(instance){

    /** Construct **/
    var io = null;
    
    var logType = {
        INFO:"info",
        DEBUG:"debug",
        ERROR:"error",
        FATAL:"fatal"
    };
    
    if(instance instanceof socketIO){ 
        io = instance;
    }else{
        io = socketIO(instance);
    }
    
    io.on('connection',function(socket){
        log(optionsBuilder('New client connected'));
    });
    
    io.on('disconnect',function(){
        log(optionsBuilder('Client left')); 
    });
    
    /*
     * Send those event logs  
     * @param data - Option Object
     *
     * **/
    var emitLog = function(data){
        
        /** Set date when the error is emited **/
        data.date = new Date().toGMTString();
        
        io.emit("log", data);
        
        io.emit("log-" + data.log_type, data);
    };
     
    /*
     * Log events using debug and web sockets.
     * @param data - Option Object
     *
     * **/
    var log = function(data){
        debug("Log emitted " + data.message);
        
        emitLog(data);
    };
    
    /* 
     * Option log builder
     * @param message
     * @param log-type
     * @param extraArgument (Object)
     *
     * **/
    var optionsBuilder = function(message, type, extraArguments){
        
        type = type == undefined? logType.INFO:type;
        
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
            log(optionsBuilder(format, logType.INFO, params));    
        },
        debug: function(format, params){
            log(optionsBuilder(format, logType.DEBUG, params));
        },
        error: function(format, params){
            log(optionsBuilder(format, logType.ERROR, params));
        },
        fatal: function(format, params){
            log(optionsBuilder(format, logType.FATAL, params));
        }
    };
};


