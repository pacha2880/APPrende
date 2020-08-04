var express = require('express');
var session = require('express-session');
var router = express.Router();

var count = 1;

const Usuario   = require('./model/usuario')();
const Materia   = require('./model/materia')();
const Profesor  = require('./model/profesor')();
const Alumno    = require('./model/alumno')();
const Tarea     = require('./model/tarea')();

let usuarios = [
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

let tareas = [
  {
    nombre:       'Hacer la tabla del 2',
    estado:       'Pendiente',
    descripcion:  'Realizar la tabla de multiplicacion del 2',
    documentos:   [],
    comentarios:  []
  },
  {
    nombre:       'Sumar fracciones',
    estado:       'Pendiente',
    descripcion:  'Realizar la suma de 10 fracciones',
    documentos:   [],
    comentarios:  []
  }
]

let mate = {
  nombre: 'Matematicas',
  tareas: ['Hacer la tabla del 2','Sumar fracciones']
}

///Materia.drop();
// Materia.create(mate, (err, user) => {
//   if(err) throw err;
// })

// //Usuario.drop();
// usuarios.forEach(u => {
//   Usuario.create(u, (err, user) => {
//     if(err) throw err;
//   })
// })

// //Tarea.drop();
// tareas.forEach(t => {
//   Tarea.create(t, (err, user) => {
//     if(err) throw err;
//   })
// })

router.get('/', function (req, res) {
  res.json('Obteniendo mensajes');
});
router.post('/logIn',function(req,res){  
	const email = req.body.email;
  const password = req.body.pass;

  

  Usuario.findOne({email: email, pass: password}, function(err,found) { 

    if(err || found == undefined){
      res.redirect('/index.html')
    }else{

      if(found.rol==0){
        res.redirect('/pages/profesor/profesor.html');
      }else if(found.rol==1){
        res.redirect('/pages/estudiante/estudiante.html');
      }

    }
  })
    
})

router.get('/tareasMateria', (req, res) => {
  Materia.findOne({nombre: 'Matematicas'}, (err, found) =>{

    if(err || found == undefined){
      res.redirect('/index.html')
    }else{
      var resTareas;
      found.tareas.forEach(t => {
        let tarea = Tarea.findOne({nombre: t});
        let exp = {
          nombre: tarea.nombre,
          fechaLimite: tarea.fechaLimite,
          descripcion: tarea.descripcion
        }
        resTareas.push(exp)
      });

      res.json(resTareas);
    }

  })
})

router.post('/crearTarea', (req, res) => {
  let body = req.body;

  Tarea.create(body, (err, user) => {
    if(err) throw err;
  })

  res.json(body);
})

router.post('/regAlumno', function (req, res) {
  let body = req.body;

  Alumno.create(body, (err, user) => {
    if(err) throw err;
  })
  Usuario.create(body, (err, user) =>{})

  // Alumno.find({email: 'jpamonzabel@gmail.com'}, function(err,obj) { console.log(obj); });

  res.json(body);

});

router.post('logIn', (req, res) => {
  let body = req.body;

  if( validar(body.email, body.pass) ){
    res.redirect('../../pages/estudiante/estudiante.html');
  }
})


function validar(email, pass){
  var valido = true;

  Alumno.find({email: email}, 
    function functionName(err, obj){
    
      if(obj.pass !== pass)
        valido = false;
    })

  return valido;
}

module.exports = router;