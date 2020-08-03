var express = require('express');
var session = require('express-session');
var router = express.Router();


const usuarios = [
    {
      email : 'oscarlopez@gmail.com',
      pass : '123456',
      rol:1
    },
    {
      email : 'juanPablo@gmail.com',
      pass : '12345678',
      rol:0
    },
    {
      email : 'rodrigo@gmail.com',
      pass : '1234567890',
      rol:1
    }];

router.get('/', function (req, res) {
  res.json('Obteniendo mensajes');
});

router.post('/logIn',function(req,res){  
	const email = req.body.email;
  const password = req.body.pass;
  var found = usuarios.find(element => element.email == email && element.pass ==password);
  if(found.rol==0){
    res.redirect('../../pages/profesor/profesor.html');
  }else if(found.rol==1){
    res.redirect('../../pages/estudiante/estudiante.html');
  }
})
module.exports = router;