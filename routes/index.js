const express = require('express');
const router = express.Router();
const conexion = require('../config/db');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const path = require('path');

// Configuración de la sesión
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 60 * 1000 // Tiempo de expiración de la sesión: 30 minutos
    }
}));

// Rutas

router.get('/', ((req, res) => {
    res.redirect('/login');
}))

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/error', (req, res) => {
    res.render('Error');
});

router.get('/UDVcreateH', (req, res) => {
    res.render('../views/UDV/UDVcreateH.ejs');
});

router.get('/register', (req, res) => {
    res.render('register');
});

// Registro de usuario
router.post('/register', async (req, res) => {
    const { usuario, nom, rol, pass } = req.body;
    let passwordHash = await bcryptjs.hash(pass, 8);
    conexion.query('INSERT INTO login SET ?', { usuario, nom, rol, pass: passwordHash }, async (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.render('register', {
                alert: true,
                alertTitle: 'Registro',
                alertMessage: 'Registro Exitoso',
                alertIcon: 'success',
                showConfirmButton: false,
                time: 2000,
                ruta: 'login'
            });
        }
    });
});

// Autenticación de usuario
router.post('/auth', async (req, res) => {
  const { usuario, pass } = req.body;
  if (usuario && pass) {
      conexion.query('SELECT * FROM login WHERE usuario = ?', [usuario], async (error, results) => {
          if (error) {
              console.log(error);
              res.render('login', {
                  alert: true,
                  alertTitle: 'Error',
                  alertMessage: 'Ocurrió un error durante la autenticación',
                  alertIcon: 'error',
                  showConfirmButton: false,
                  timer: 2000,
                  ruta: 'login'
              });
          } else {
              if (results && results.length > 0 && await bcryptjs.compare(pass, results[0].pass)) {
                  req.session.loggedin = true;
                  req.session.nom = results[0].nom;
                  req.session.rol = results[0].rol;
                  res.render('login', {
                      alert: true,
                      alertTitle: 'Conexión Exitosa',
                      alertMessage: 'Login Correcto',
                      alertIcon: 'success',
                      showConfirmButton: false,
                      timer: 1200,
                      ruta: ''
                  });
              } else {
                  res.render('login', {
                      alert: true,
                      alertTitle: 'Error',
                      alertMessage: 'Usuario y/o Contraseña Incorrectos',
                      alertIcon: 'error',
                      showConfirmButton: false,
                      timer: 2000,
                      ruta: 'login'
                  });
              }
          }
      });
  } else {
      res.render('login', {
          alert: true,
          alertTitle: 'Advertencia',
          alertMessage: 'Por favor, ingrese un usuario y/o contraseña',
          alertIcon: 'warning',
          showConfirmButton: false,
          timer: 2000,
          ruta: 'login'
      });
  }
});

// Cerrar sesión
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Middleware para verificar si el usuario ha iniciado sesión y tiene el rol adecuado
const requireRole = (roles) => {
    return (req, res, next) => {
        if (req.session.loggedin && roles.includes(req.session.rol)) {
            // El usuario ha iniciado sesión y tiene el rol adecuado, permitir el acceso a la siguiente ruta
            next();
        } else {
            // El usuario no ha iniciado sesión o no tiene el rol adecuado, redirigir al formulario de inicio de sesión
            res.redirect('/Error');
        }
    };
};

// Rutas protegidas
router.get('/', requireRole(['1', '2', '3', '4', '5', '6']), (req, res) => {
    res.render('../views/homes/homeadmin.ejs', {
        login: true,
        nom: req.session.nom,
    });
});

router.get('/homeUDV', requireRole(['1', '2', '3', '4', '5', '6']), (req, res) => {
    res.render('../views/homes/homeUDV.ejs');
});

router.get('/UDVindexH', requireRole(['1', '2', '3', '4', '5', '6']), (req, res) => {
    conexion.query('SELECT * FROM infoMinisterio', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('../views/UDV/UDVindexH.ejs', { results, rol: req.session.rol });
        }
    });
});

router.get('/UDVedit/:id', requireRole(['1', '2', '3']), (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM infoMinisterio WHERE id=?', [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('../views/UDV/UDVeditH.ejs', { infoMinisterio: results[0] });
        }
    });
});

// Resto de las rutas protegidas...

// Tablas
const crud = require('../middlewares/crud_UDV_info.js');
router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;
