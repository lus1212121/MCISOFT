const conexion = require('../database/db');




exports.save = (req,res)=>{
   const nombre = req.body.nombre;
   const edad = req.body.edad;
   const documento = req.body.documento;
   const telefono = req.body.telefono
   const fecha = req.body.fecha;
   const lider12 = req.body.lider12;
   const lider144 = req.body.lider144;
   const liderCelula = req.body.liderCelula;
   const pago = req.body.pago;
   const forma = req.body.forma;
   const recibo = req.body.recibo;

 conexion.query('INSERT INTO infoMinisterio SET ?', {nombre:nombre, edad:edad, documento:documento, telefono:telefono, fecha:fecha, lider12:lider12, lider144:lider144, liderCelula:liderCelula, pago:pago, recibo:recibo, forma:forma}, (error, results)=>{
    if(error){
        console.log(error);
    }else{
        res.redirect('/UDVindexH');
    }
}); 
}

exports.update = (req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const documento = req.body.documento;
    const telefono = req.body.telefono
    const fecha = req.body.fecha;
    const lider12 = req.body.lider12;
    const lider144 = req.body.lider144;
    const liderCelula = req.body.liderCelula;
    const pago = req.body.pago;
    const forma = req.body.forma;
    const recibo = req.body.recibo;
 
  conexion.query('UPDATE infoMinisterio SET ? WHERE id = ?', [{nombre:nombre, edad:edad, documento:documento, telefono:telefono, fecha:fecha, lider12:lider12, lider144:lider144, liderCelula:liderCelula, pago:pago, recibo:recibo,  forma:forma}, id], (error, results)=>{
     if(error){
         console.log(error);
     }else{
         res.redirect('/UDVindexH');
     }
 }); 
 }



/* conexion.query('INSERT INTO infoMinisterio (nombre, edad, documento, telefono, fecha, lider12, lider144, liderCelula, pago)' + 'VALUES  ('+nombre+', '+edad+', '+documento+', '+telefono+', '+fecha+', '+lider12+', '+lider144+', '+liderCelula+', '+pago+')' , (error, results)=>{
    if(error){
        console.log(error);
    }else{
        res.redirect('/');
    }
});
} */