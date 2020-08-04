module.exports = function(){
    var db = require("../db-connection")();
    var schema = require("mongoose").Schema;
    var alumno = schema({
        email:String,
        pass:String,
        rol:Number,
        nombre:String,
        curso:String,
        materias:[String]
    });
    return db.model('Alumno', alumno);
}