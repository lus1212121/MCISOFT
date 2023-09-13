const conexion = require('../config/db');

// hombres sistema //

exports.save = (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const documento = req.body.documento;
  const telefono = req.body.telefono;
  const fecha = req.body.fecha;
  const lider12 = req.body.lider12;
  const lider144 = req.body.lider144;
  const liderCelula = req.body.liderCelula;
  const pago = req.body.pago;
  const forma = req.body.forma;
  const recibo = req.body.recibo;
  const ciclo = req.body.ciclo;
  const a1 = req.body.a1;
  const t1 = req.body.t1;
  const a2 = req.body.a2;
  const t2 = req.body.t2;
  const a3 = req.body.a3;
  const t3 = req.body.t3;
  const encuentro = req.body.encuentro;
  const a4 = req.body.a4;
  const t4 = req.body.t4;
  const a5 = req.body.a5;
  const t5 = req.body.t5;
  const a6 = req.body.a6;
  const t6 = req.body.t6;
  const bautismo = req.body.bautismo;

  conexion().query(
    'INSERT INTO infoministerio SET ?',
    {
      nombre: nombre,
      edad: edad,
      documento: documento,
      telefono: telefono,
      fecha: fecha,
      lider12: lider12,
      lider144: lider144,
      liderCelula: liderCelula,
      pago: pago,
      recibo: recibo,
      forma: forma,
      ciclo: ciclo,
      a1: a1,
      t1: t1,
      a2: a2,
      t2: t2,
      a3: a3,
      t3: t3,
      encuentro: encuentro,
      a4: a4,
      t4: t4,
      a5: a5,
      t5: t5,
      a6: a6,
      t6: t6,
      bautismo: bautismo,
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/Exitoso');
      }
    },
  );
};
exports.update = (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const documento = req.body.documento;
  const telefono = req.body.telefono;
  const fecha = req.body.fecha;
  const lider12 = req.body.lider12;
  const lider144 = req.body.lider144;
  const liderCelula = req.body.liderCelula;
  const pago = req.body.pago;
  const forma = req.body.forma;
  const recibo = req.body.recibo;
  const ciclo = req.body.ciclo;

  conexion().query(
    'UPDATE infoministerio SET ? WHERE id = ?',
    [
      {
        nombre: nombre,
        edad: edad,
        documento: documento,
        telefono: telefono,
        fecha: fecha,
        lider12: lider12,
        lider144: lider144,
        liderCelula: liderCelula,
        pago: pago,
        recibo: recibo,
        forma: forma,
        ciclo: ciclo,
      },
      id,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/UDVindexH');
      }
    },
  );
};

exports.updateA = (req, res) => {
  const id = req.body.id;
  const a1 = req.body.a1;
  const t1 = req.body.t1;
  const a2 = req.body.a2;
  const t2 = req.body.t2;
  const a3 = req.body.a3;
  const t3 = req.body.t3;
  const encuentro = req.body.encuentro;
  const a4 = req.body.a4;
  const t4 = req.body.t4;
  const a5 = req.body.a5;
  const t5 = req.body.t5;
  const a6 = req.body.a6;
  const t6 = req.body.t6;
  const bautismo = req.body.bautismo;

  conexion().query(
    'UPDATE infoministerio SET ? WHERE id = ?',
    [
      {
        a1:a1,
        t1:t1,
        a2:a2,
        t2:t2,
        a3:a3,
        t3:t3,
        encuentro:encuentro,
        a4:a4,
        t4:t4,
        a5:a5,
        t5:t5,
        a6:a6,
        t6:t6,
        bautismo:bautismo,
      },
      id,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/UDVasistenciaH');
      }
    },
  );
};

// Mujeres sistema //

exports.saveM = (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const documento = req.body.documento;
  const telefono = req.body.telefono;
  const fecha = req.body.fecha;
  const lider12 = req.body.lider12;
  const lider144 = req.body.lider144;
  const liderCelula = req.body.liderCelula;
  const pago = req.body.pago;
  const forma = req.body.forma;
  const recibo = req.body.recibo;
  const ciclo = req.body.ciclo;
  const a1 = req.body.a1;
  const t1 = req.body.t1;
  const a2 = req.body.a2;
  const t2 = req.body.t2;
  const a3 = req.body.a3;
  const t3 = req.body.t3;
  const encuentro = req.body.encuentro;
  const a4 = req.body.a4;
  const t4 = req.body.t4;
  const a5 = req.body.a5;
  const t5 = req.body.t5;
  const a6 = req.body.a6;
  const t6 = req.body.t6;
  const bautismo = req.body.bautismo;

  conexion().query(
    'INSERT INTO infoministeriom SET ?',
    {
      nombre: nombre,
      edad: edad,
      documento: documento,
      telefono: telefono,
      fecha: fecha,
      lider12: lider12,
      lider144: lider144,
      liderCelula: liderCelula,
      pago: pago,
      recibo: recibo,
      forma: forma,
      ciclo:ciclo,
      a1:a1,
      t1:t1,
      a2:a2,
      t2:t2,
      a3:a3,
      t3:t3,
      encuentro:encuentro,
      a4:a4,
      t4:t4,
      a5:a5,
      t5:t5,
      a6:a6,
      t6:t6,
      bautismo:bautismo,
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/Exitoso');
      }
    },
  );
};

exports.updateM = (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const documento = req.body.documento;
  const telefono = req.body.telefono;
  const fecha = req.body.fecha;
  const lider12 = req.body.lider12;
  const lider144 = req.body.lider144;
  const liderCelula = req.body.liderCelula;
  const pago = req.body.pago;
  const forma = req.body.forma;
  const recibo = req.body.recibo;
  const ciclo = req.body.ciclo;

  conexion().query(
    'UPDATE infoministeriom SET ? WHERE id = ?',
    [
      {
      nombre: nombre,
      edad: edad,
      documento: documento,
      telefono: telefono,
      fecha: fecha,
      lider12: lider12,
      lider144: lider144,
      liderCelula: liderCelula,
        pago: pago,
        recibo: recibo,
        forma: forma,
        ciclo:ciclo,
      },
      id,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/UDVindexM');
      }
    },
  );
};

exports.updateM2 = (req, res) => {
  const id = req.body.id;
  const a1 = req.body.a1;
  const t1 = req.body.t1;
  const a2 = req.body.a2;
  const t2 = req.body.t2;
  const a3 = req.body.a3;
  const t3 = req.body.t3;
  const encuentro = req.body.encuentro;
  const a4 = req.body.a4;
  const t4 = req.body.t4;
  const a5 = req.body.a5;
  const t5 = req.body.t5;
  const a6 = req.body.a6;
  const t6 = req.body.t6;
  const bautismo = req.body.bautismo;

  conexion().query(
    'UPDATE infoministeriom SET ? WHERE id = ?',
    [
      {
        a1:a1,
        t1:t1,
        a2:a2,
        t2:t2,
        a3:a3,
        t3:t3,
        encuentro:encuentro,
        a4:a4,
        t4:t4,
        a5:a5,
        t5:t5,
        a6:a6,
        t6:t6,
        bautismo:bautismo,
      },
      id,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/UDVasistenciaM');
      }
    },
  );
};

// teens sistema //

exports.saveT = (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const documento = req.body.documento;
  const telefono = req.body.telefono;
  const fecha = req.body.fecha;
  const lider12 = req.body.lider12;
  const lider144 = req.body.lider144;
  const liderCelula = req.body.liderCelula;
  const pago = req.body.pago;
  const forma = req.body.forma;
  const recibo = req.body.recibo;
  const ciclo = req.body.ciclo;
  const a1 = req.body.a1;
  const t1 = req.body.t1;
  const a2 = req.body.a2;
  const t2 = req.body.t2;
  const a3 = req.body.a3;
  const t3 = req.body.t3;
  const encuentro = req.body.encuentro;
  const a4 = req.body.a4;
  const t4 = req.body.t4;
  const a5 = req.body.a5;
  const t5 = req.body.t5;
  const a6 = req.body.a6;
  const t6 = req.body.t6;
  const bautismo = req.body.bautismo;

  conexion().query(
    'INSERT INTO infoministeriot SET ?',
    {
      nombre: nombre,
      edad: edad,
      documento: documento,
      telefono: telefono,
      fecha: fecha,
      lider12: lider12,
      lider144: lider144,
      liderCelula: liderCelula,
      pago: pago,
      recibo: recibo,
      forma: forma,
      ciclo:ciclo,
      a1:a1,
      t1:t1,
      a2:a2,
      t2:t2,
      a3:a3,
      t3:t3,
      encuentro:encuentro,
      a4:a4,
      t4:t4,
      a5:a5,
      t5:t5,
      a6:a6,
      t6:t6,
      bautismo:bautismo,
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/Exitoso');
      }
    },
  );
};
exports.updateT = (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const documento = req.body.documento;
  const telefono = req.body.telefono;
  const fecha = req.body.fecha;
  const lider12 = req.body.lider12;
  const lider144 = req.body.lider144;
  const liderCelula = req.body.liderCelula;
  const pago = req.body.pago;
  const forma = req.body.forma;
  const recibo = req.body.recibo;
  const ciclo = req.body.ciclo;

  conexion().query(
    'UPDATE infoministeriot SET ? WHERE id = ?',
    [
      {
      nombre: nombre,
      edad: edad,
      documento: documento,
      telefono: telefono,
      fecha: fecha,
      lider12: lider12,
      lider144: lider144,
      liderCelula: liderCelula,
        pago: pago,
        recibo: recibo,
        forma: forma,
        ciclo:ciclo,
      },
      id,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/UDVindexT');
      }
    },
  );
};

exports.updateT2 = (req, res) => {
  const id = req.body.id;
  const a1 = req.body.a1;
  const t1 = req.body.t1;
  const a2 = req.body.a2;
  const t2 = req.body.t2;
  const a3 = req.body.a3;
  const t3 = req.body.t3;
  const encuentro = req.body.encuentro;
  const a4 = req.body.a4;
  const t4 = req.body.t4;
  const a5 = req.body.a5;
  const t5 = req.body.t5;
  const a6 = req.body.a6;
  const t6 = req.body.t6;
  const bautismo = req.body.bautismo;

  conexion().query(
    'UPDATE infoministeriot SET ? WHERE id = ?',
    [
      {
        a1:a1,
        t1:t1,
        a2:a2,
        t2:t2,
        a3:a3,
        t3:t3,
        encuentro:encuentro,
        a4:a4,
        t4:t4,
        a5:a5,
        t5:t5,
        a6:a6,
        t6:t6,
        bautismo:bautismo,
      },
      id,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/UDVasistenciaT');
      }
    },
  );
};
// JOVENES 13 - 17//

exports.saveJ = (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const documento = req.body.documento;
  const telefono = req.body.telefono;
  const fecha = req.body.fecha;
  const lider12 = req.body.lider12;
  const lider144 = req.body.lider144;
  const liderCelula = req.body.liderCelula;
  const pago = req.body.pago;
  const forma = req.body.forma;
  const recibo = req.body.recibo;
  const ciclo = req.body.ciclo;
  const a1 = req.body.a1;
  const t1 = req.body.t1;
  const a2 = req.body.a2;
  const t2 = req.body.t2;
  const a3 = req.body.a3;
  const t3 = req.body.t3;
  const encuentro = req.body.encuentro;
  const a4 = req.body.a4;
  const t4 = req.body.t4;
  const a5 = req.body.a5;
  const t5 = req.body.t5;
  const a6 = req.body.a6;
  const t6 = req.body.t6;
  const bautismo = req.body.bautismo;

  conexion().query(
    'INSERT INTO infoministerioj SET ?',
    {
      nombre: nombre,
      edad: edad,
      documento: documento,
      telefono: telefono,
      fecha: fecha,
      lider12: lider12,
      lider144: lider144,
      liderCelula: liderCelula,
      pago: pago,
      recibo: recibo,
      forma: forma,
      ciclo:ciclo,
      a1:a1,
      t1:t1,
      a2:a2,
      t2:t2,
      a3:a3,
      t3:t3,
      encuentro:encuentro,
      a4:a4,
      t4:t4,
      a5:a5,
      t5:t5,
      a6:a6,
      t6:t6,
      bautismo:bautismo,
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/Exitoso');
      }
    },
  );
};
exports.updateJ = (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const documento = req.body.documento;
  const telefono = req.body.telefono;
  const fecha = req.body.fecha;
  const lider12 = req.body.lider12;
  const lider144 = req.body.lider144;
  const liderCelula = req.body.liderCelula;
  const pago = req.body.pago;
  const forma = req.body.forma;
  const recibo = req.body.recibo;
  const ciclo = req.body.ciclo;

  conexion().query(
    'UPDATE infoministerioj SET ? WHERE id = ?',
    [
      {
      nombre: nombre,
      edad: edad,
      documento: documento,
      telefono: telefono,
      fecha: fecha,
      lider12: lider12,
      lider144: lider144,
      liderCelula: liderCelula,
        pago: pago,
        recibo: recibo,
        forma: forma,
        ciclo:ciclo,
      },
      id,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/UDVindexJ');
      }
    },
  );
};

exports.updateJ2 = (req, res) => {
  const id = req.body.id;
  const a1 = req.body.a1;
  const t1 = req.body.t1;
  const a2 = req.body.a2;
  const t2 = req.body.t2;
  const a3 = req.body.a3;
  const t3 = req.body.t3;
  const encuentro = req.body.encuentro;
  const a4 = req.body.a4;
  const t4 = req.body.t4;
  const a5 = req.body.a5;
  const t5 = req.body.t5;
  const a6 = req.body.a6;
  const t6 = req.body.t6;
  const bautismo = req.body.bautismo;

  conexion().query(
    'UPDATE infoministerioj SET ? WHERE id = ?',
    [
      {
        a1:a1,
        t1:t1,
        a2:a2,
        t2:t2,
        a3:a3,
        t3:t3,
        encuentro:encuentro,
        a4:a4,
        t4:t4,
        a5:a5,
        t5:t5,
        a6:a6,
        t6:t6,
        bautismo:bautismo,
      },
      id,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/UDVasistenciaJ');
      }
    },
  );
};

// JOVENES ADULTOS //


exports.saveA = (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const documento = req.body.documento;
  const telefono = req.body.telefono;
  const fecha = req.body.fecha;
  const lider12 = req.body.lider12;
  const lider144 = req.body.lider144;
  const liderCelula = req.body.liderCelula;
  const pago = req.body.pago;
  const forma = req.body.forma;
  const recibo = req.body.recibo;
  const ciclo = req.body.ciclo;
  const a1 = req.body.a1;
  const t1 = req.body.t1;
  const a2 = req.body.a2;
  const t2 = req.body.t2;
  const a3 = req.body.a3;
  const t3 = req.body.t3;
  const encuentro = req.body.encuentro;
  const a4 = req.body.a4;
  const t4 = req.body.t4;
  const a5 = req.body.a5;
  const t5 = req.body.t5;
  const a6 = req.body.a6;
  const t6 = req.body.t6;
  const bautismo = req.body.bautismo;

  conexion().query(
    'INSERT INTO infoministerioa SET ?',
    {
      nombre: nombre,
      edad: edad,
      documento: documento,
      telefono: telefono,
      fecha: fecha,
      lider12: lider12,
      lider144: lider144,
      liderCelula: liderCelula,
      pago: pago,
      recibo: recibo,
      forma: forma,
      ciclo:ciclo,
      a1:a1,
      t1:t1,
      a2:a2,
      t2:t2,
      a3:a3,
      t3:t3,
      encuentro:encuentro,
      a4:a4,
      t4:t4,
      a5:a5,
      t5:t5,
      a6:a6,
      t6:t6,
      bautismo:bautismo,
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/Exitoso');
      }
    },
  );
};
exports.updateA1 = (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const documento = req.body.documento;
  const telefono = req.body.telefono;
  const fecha = req.body.fecha;
  const lider12 = req.body.lider12;
  const lider144 = req.body.lider144;
  const liderCelula = req.body.liderCelula;
  const pago = req.body.pago;
  const forma = req.body.forma;
  const recibo = req.body.recibo;
  const ciclo = req.body.ciclo;

  conexion().query(
    'UPDATE infoministerioa SET ? WHERE id = ?',
    [
      {
      nombre: nombre,
      edad: edad,
      documento: documento,
      telefono: telefono,
      fecha: fecha,
      lider12: lider12,
      lider144: lider144,
      liderCelula: liderCelula,
        pago: pago,
        recibo: recibo,
        forma: forma,
        ciclo:ciclo,
      },
      id,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/UDVindexA');
      }
    },
  );
};

exports.updateA2 = (req, res) => {
  const id = req.body.id;
  const a1 = req.body.a1;
  const t1 = req.body.t1;
  const a2 = req.body.a2;
  const t2 = req.body.t2;
  const a3 = req.body.a3;
  const t3 = req.body.t3;
  const encuentro = req.body.encuentro;
  const a4 = req.body.a4;
  const t4 = req.body.t4;
  const a5 = req.body.a5;
  const t5 = req.body.t5;
  const a6 = req.body.a6;
  const t6 = req.body.t6;
  const bautismo = req.body.bautismo;

  conexion().query(
    'UPDATE infoministerioa SET ? WHERE id = ?',
    [
      {
        a1:a1,
        t1:t1,
        a2:a2,
        t2:t2,
        a3:a3,
        t3:t3,
        encuentro:encuentro,
        a4:a4,
        t4:t4,
        a5:a5,
        t5:t5,
        a6:a6,
        t6:t6,
        bautismo:bautismo,
      },
      id,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/UDVasistenciaA');
      }
    },
  );
};
