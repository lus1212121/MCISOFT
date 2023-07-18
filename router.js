const express = require('express');
const router = express.Router();
const conexion = require('./database/db');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const path = require('path');
// ...


// login session //

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 60 * 1000 // Tiempo de expiración de la sesión: 30 minutos
    }
}));

// rutas//

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/error', (req, res) => {
    res.render('Error');
});

router.get('/UDVcreateH', (req, res) => {
    res.render('UDVcreateH');
});



//LOGIN registro//

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

// login //
router.post('/auth', async (req, res) => {
    const { usuario, pass } = req.body;
    if (usuario && pass) {
        conexion.query('SELECT * FROM login WHERE usuario = ?', [usuario], async (error, results) => {
            if (results.length === 0 || !(await bcryptjs.compare(pass, results[0].pass))) {
                res.render('login', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'Usuario y/o Contraseña Incorrectos',
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer: 2000,
                    ruta: 'login'
                });
            } else {
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
            }
        });
    } else {
        res.render('login', {
            alert: true,
            alertTitle: 'Advertencia',
            alertMessage: 'Por favor Ingrese un Usuario y/o Contraseña',
            alertIcon: 'warning',
            showConfirmButton: false,
            timer: 2000,
            ruta: 'login'
        });
    }
});

// logout//
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

// Aplicar el middleware requireRole a las rutas protegidas
router.get('/', requireRole(['1','2','3','4','5','6']), (req, res) => {
    res.render('adminHome', {
        login: true,
        nom: req.session.nom,
    });
});
router.get('/homeUDV',requireRole(['1','2','3','4','5','6']), (req, res) => {
    res.render('homeUDV');
});

router.get('/UDVindexH', requireRole(['1','2','3','4','5','6']), (req, res) => {
    conexion.query('SELECT * FROM infoMinisterio', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('UDVindexH', { results, rol: req.session.rol }); // Asegúrate de pasar la variable `rol`
        }
    });
});


router.get('/UDVedit/:id', requireRole(['1,2,3']), (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM infoMinisterio WHERE id=?', [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('UDVedit', { infoMinisterio: results[0] });
            
        }
    });
});
router.get('/register', requireRole(['1,2']), (req, res) => {
    res.render('register');
});
// Resto de las rutas protegidas...

// tablas//

    const crud = require('./controllers/crud');
    router.post('/save', crud.save);
    router.post('/update', crud.update);



module.exports = router;
