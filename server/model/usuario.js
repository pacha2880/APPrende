module.exports = function(){
    var db = require("../db-connection")();
    var schema = require("mongoose").Schema;
    var usuario = schema({
        email:String,
        pass:String,
        rol:Number
    });
    return db.model('Usuario', usuario);
}