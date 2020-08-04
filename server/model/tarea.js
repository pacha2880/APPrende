module.exports = function(){
    var db = require("../db-connection")();
    var schema = require("mongoose").Schema;
    var tarea = schema({
        nombre:String,
        estado:String,
        descripcion:String,
        fechaLimite:String,
        documentos:[String],
        comentarios:[String]
    });
    return db.model('Tarea', tarea);
}