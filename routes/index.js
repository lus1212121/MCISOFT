const express = require('express');
const router = express.Router();
const conexion = require('../config/db');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const path = require('path');

// Configuración de la sesión
router.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 60 * 1000, // Tiempo de expiración de la sesión: 30 minutos
    },
  }),
);

// Rutas

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/error', (req, res) => {
  res.render('Error');
});

router.get('/UDVcreateH', (req, res) => {
  res.render('../views/UDV/UDVcreateH.ejs');
});
router.get('/UDVcreateM', (req, res) => {
  res.render('../views/UDVM/UDVcreateM.ejs');
});
router.get('/UDVcreateT', (req, res) => {
  res.render('../views/UDVjovenes/UDVteens/UDVcreateTeens.ejs');
});
router.get('/UDVcreateJ', (req, res) => {
  res.render('../views/UDVjovenes/UDVJovenes 13-17/UDVcreateJovenes.ejs');
});
router.get('/UDVcreateA', (req, res) => {
  res.render('../views/UDVjovenes/UDVadultos/UDVcreateAdultos.ejs');
});
router.get('/Exitoso', (req, res) => {
  res.render('../views/exitoso.ejs');
});

// Registro de usuario
router.post('/register', async (req, res) => {
  const { usuario, nom, rol, pass } = req.body;
  let passwordHash = await bcryptjs.hash(pass, 8);
  conexion().query(
    'INSERT INTO login SET ?',
    { usuario, nom, rol, pass: passwordHash },
    async (error, results) => {
      if (error) {
        console.log(error.message);
      } else {
        res.render('register', {
          alert: true,
          alertTitle: 'Registro',
          alertMessage: 'Registro Exitoso',
          alertIcon: 'success',
          showConfirmButton: false,
          time: 2000,
          ruta: 'login',
        });
      }
    },
  );
});

// Autenticación de usuario
router.post('/auth', async (req, res) => {
  const { usuario, pass } = req.body;
  if (usuario && pass) {
      conexion().query(
      'SELECT * FROM login WHERE usuario = ?',
      [usuario],
      async (error, results) => {
        if (error) {
          console.log(error.stack);
          res.render('login', {
            alert: true,
            alertTitle: 'Error',
            alertMessage: 'Ocurrió un error durante la autenticación',
            alertIcon: 'error',
            showConfirmButton: false,
            timer: 2000,
            ruta: 'login',
          });
        } else {
          if (
            results &&
            results.length > 0 &&
            (await bcryptjs.compare(pass, results[0].pass))
          ) {
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
              ruta: '',
            });
          } else {
            res.render('login', {
              alert: true,
              alertTitle: 'Error',
              alertMessage: 'Usuario y/o Contraseña Incorrectos',
              alertIcon: 'error',
              showConfirmButton: false,
              timer: 2000,
              ruta: 'login',
            });
          }
        }
      },
    );
  } else {
    res.render('login', {
      alert: true,
      alertTitle: 'Advertencia',
      alertMessage: 'Por favor, ingrese un usuario y/o contraseña',
      alertIcon: 'warning',
      showConfirmButton: false,
      timer: 2000,
      ruta: 'login',
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
// pagina principal //
router.get('/', requireRole(['1', '2', '3', '4', '5', '6']), (req, res) => {
  res.render('../views/homes/homeadmin.ejs', {
    login: true,
    nom: req.session.nom,
  });
});
// registro //
router.get('/register', requireRole(['1']), (req, res) => {
  res.render('register');
});
// homes //
router.get(
  '/homeUDV',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
    res.render('../views/homes/homeUDV.ejs');
  },
);
router.get(
  '/homejovenes',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
    res.render('../views/homes/homejovenes.ejs');
  },
);
// soporte// 
router.get(
  '/soporte',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
    res.render('../views/soporte.ejs');
  },
);
// hombres UDV //

router.get(
  '/UDVindexH',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
      conexion().query('SELECT * FROM infoMinisterio', (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDV/UDVindexH.ejs', {
          results,
          rol: req.session.rol,
        });
      }
    });
  },
);
router.get(
  '/UDVinformeH',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
      conexion().query('SELECT * FROM infoMinisterio', (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDV/UDVinformeH.ejs', {
          results,
          rol: req.session.rol,
        });
      }
    });
  },
);

router.get(
  '/UDVasistenciaH',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
      conexion().query('SELECT * FROM infoMinisterio', (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDV/UDVasistenciaH.ejs', {
          results,
          rol: req.session.rol,
        });
      }
    });
  },
);
router.get('/UDVedit/:id', requireRole(['1', '2', '3']), (req, res) => {
  const id = req.params.id;
  conexion().query(
    'SELECT * FROM infoMinisterio WHERE id=?',
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDV/UDVeditH.ejs', { infoMinisterio: results[0] });
      }
    },
  );
});
router.get('/UDVeditAsistenciaH/:id', requireRole(['1', '2', '3']), (req, res) => {
  const id = req.params.id;
  conexion().query(
    'SELECT * FROM infoMinisterio WHERE id=?',
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDV/UDVeditAsistenciaH.ejs', { infoMinisterio: results[0] });
      }
    },
  );
});

//UDV mujeres//
router.get(
  '/UDVindexM',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
      conexion().query('SELECT * FROM infoMinisterioM', (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVM/UDVindexM.ejs', {
          results,
          rol: req.session.rol,
        });
      }
    });
  },
);
router.get('/UDVeditM/:id', requireRole(['1', '2', '3']), (req, res) => {
  const id = req.params.id;
  conexion().query(
    'SELECT * FROM infoMinisterioM WHERE id=?',
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVM/UDVeditM.ejs', { infoMinisterioM: results[0] });
      }
    },
  );
});
router.get(
  '/UDVinformeM',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
      conexion().query('SELECT * FROM infoMinisterioM', (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVM/UDVinformeM.ejs', {
          results,
          rol: req.session.rol,
        });
      }
    });
  },
);
router.get(
  '/UDVasistenciaM',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
      conexion().query('SELECT * FROM infoMinisterioM', (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVM/UDVasistenciaM.ejs', {
          results,
          rol: req.session.rol,
        });
      }
    });
  },
);
router.get('/UDVeditAsistenciaM/:id', requireRole(['1', '2', '3']), (req, res) => {
  const id = req.params.id;
  conexion().query(
    'SELECT * FROM infoMinisterioM WHERE id=?',
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVM/UDVeditAsistenciaM.ejs', { infoMinisterioM: results[0] });
      }
    },
  );
});
//UDV teens//
router.get(
  '/UDVindexT',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
      conexion().query('SELECT * FROM infoMinisterioT', (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVjovenes/UDVteens/UDVindexTeens.ejs', {
          results,
          rol: req.session.rol,
        });
      }
    });
  },
);
router.get('/UDVeditT/:id', requireRole(['1', '2', '3']), (req, res) => {
  const id = req.params.id;
  conexion().query(
    'SELECT * FROM infoMinisterioT WHERE id=?',
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVjovenes/UDVteens/UDVeditTeens.ejs', { infoMinisterioT: results[0] });
      }
    },
  );
});
router.get(
  '/UDVasistenciaT',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
      conexion().query('SELECT * FROM infoMinisterioT', (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVjovenes/UDVteens/UDVasistenciaTeens.ejs', {
          results,
          rol: req.session.rol,
        });
      }
    });
  },
);
router.get('/UDVeditAsistenciaT/:id', requireRole(['1', '2', '3']), (req, res) => {
  const id = req.params.id;
  conexion().query(
    'SELECT * FROM infoMinisterioT WHERE id=?',
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVjovenes/UDVteens/UDVeditAsistenciaTeens.ejs', { infoMinisterioT: results[0] });
      }
    },
  );
});
router.get(
  '/UDVinformeT',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
      conexion().query('SELECT * FROM infoMinisterioT', (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVjovenes/UDVteens/UDVinformeTeens.ejs', {
          results,
          rol: req.session.rol,
        });
      }
    });
  },
);

// Jovenes 13 - 17 UDV//

router.get(
  '/UDVindexJ',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
      conexion().query('SELECT * FROM infoMinisterioJ', (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVjovenes/UDVJovenes 13-17/UDVindexJovenes.ejs', {
          results,
          rol: req.session.rol,
        });
      }
    });
  },
);
router.get('/UDVeditJ/:id', requireRole(['1', '2', '3']), (req, res) => {
  const id = req.params.id;
  conexion().query(
    'SELECT * FROM infoMinisterioJ WHERE id=?',
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVjovenes/UDVJovenes 13-17/UDVeditJovenes.ejs', { infoMinisterioJ: results[0] });
      }
    },
  );
});
router.get(
  '/UDVasistenciaJ',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
      conexion().query('SELECT * FROM infoMinisterioJ', (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVjovenes/UDVJovenes 13-17/UDVasistenciaJovenes.ejs', {
          results,
          rol: req.session.rol,
        });
      }
    });
  },
);
router.get('/UDVeditAsistenciaJ/:id', requireRole(['1', '2', '3']), (req, res) => {
  const id = req.params.id;
  conexion().query(
    'SELECT * FROM infoMinisterioJ WHERE id=?',
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVjovenes/UDVJovenes 13-17/UDVeditAsistenciaJovenes.ejs', { infoMinisterioJ: results[0] });
      }
    },
  );
});
router.get(
  '/UDVinformeJ',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
      conexion().query('SELECT * FROM infoMinisterioJ', (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVjovenes/UDVJovenes 13-17/UDVinformeJovenes.ejs', {
          results,
          rol: req.session.rol,
        });
      }
    });
  },
);
// Adultos Jovenes UDV //


router.get(
  '/UDVindexA',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
      conexion().query('SELECT * FROM infoMinisterioA', (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVjovenes/UDVadultos/UDVindexAdultos.ejs', {
          results,
          rol: req.session.rol,
        });
      }
    });
  },
);
router.get('/UDVeditA/:id', requireRole(['1', '2', '3']), (req, res) => {
  const id = req.params.id;
  conexion().query(
    'SELECT * FROM infoMinisterioA WHERE id=?',
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVjovenes/UDVadultos/UDVeditAdultos.ejs', { infoMinisterioA: results[0] });
      }
    },
  );
});
router.get(
  '/UDVasistenciaA',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
      conexion().query('SELECT * FROM infoMinisterioA', (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVjovenes/UDVadultos/UDVasistenciaAdultos.ejs', {
          results,
          rol: req.session.rol,
        });
      }
    });
  },
);
router.get('/UDVeditAsistenciaA/:id', requireRole(['1', '2', '3']), (req, res) => {
  const id = req.params.id;
  conexion().query(
    'SELECT * FROM infoMinisterioA WHERE id=?',
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVjovenes/UDVadultos/UDVeditAsistenciaAdultos.ejs', { infoMinisterioA: results[0] });
      }
    },
  );
});
router.get(
  '/UDVinformeA',
  requireRole(['1', '2', '3', '4', '5', '6']),
  (req, res) => {
      conexion().query('SELECT * FROM infoMinisterioA', (error, results) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.render('../views/UDVjovenes/UDVadultos/UDVinformeAdultos.ejs', {
          results,
          rol: req.session.rol,
        });
      }
    });
  },
);

// Tablas
const crud = require('../middlewares/crud_UDV_info.js');
router.post('/save', crud.save);
router.post('/update', crud.update);
router.post('/updateA', crud.updateA);
router.post('/saveM', crud.saveM);
router.post('/updateM', crud.updateM);
router.post('/updateM2', crud.updateM2);
router.post('/saveT', crud.saveT);
router.post('/updateT', crud.updateT);
router.post('/updateT2', crud.updateT2);
router.post('/saveJ', crud.saveJ);
router.post('/updateJ', crud.updateJ);
router.post('/updateJ2', crud.updateJ2);
router.post('/saveA', crud.saveA);
router.post('/updateA1', crud.updateA1);
router.post('/updateA2', crud.updateA2);
module.exports = router;
