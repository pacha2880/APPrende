const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(publicPath));

const routes = require('./routes');
app.use('/apiApprende', routes );



app.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});