const profesor = require("./profesor");

module.exports = function(){
    var db = require("../db-connection")();
    var schema = require("mongoose").Schema;
    var materia = schema({
        nombre:String,
        tareas:[String]
    });
    return db.model('Materia', materia);
}