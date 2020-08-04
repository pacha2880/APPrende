module.exports = function(){
    var db = require("../db-connection")();
    var schema = require("mongoose").Schema;
    var profesor = schema({
        materias:[String]
    });
    return db.model('Profesor', profesor);
}