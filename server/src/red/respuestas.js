exports.sucess = (req, res, message, status) => {
    const estado = status 
    const msj = message || []

    console.log('RESPUESTA ESTANDARD DEL SERVIDOR: ' + estado);

    return res.status(estado).json({
        error: false,
        status: estado,
        body: msj
    })
}
exports.error = function (req, res, message, status) {
    const estado = status || 500
    const msjErr = message || `Error interno`
    console.log('_______________ ERROR ESTANDARD_________________', {

        error: true,
        status: estado,
        body: msjErr
    });

    res.status(estado).json({
        error: true,
        status: estado, 
        body: msjErr
    }) 
};