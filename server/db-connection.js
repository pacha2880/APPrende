const mongoose = require("mongoose");
let db;
module.exports = function(){
    if ( !db ){
        db = mongoose.createConnection("mongodb://localhost/apprende", { useNewUrlParser: true, useUnifiedTopology: true });
    }   
    return db;
}