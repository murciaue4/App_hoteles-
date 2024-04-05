function obtenerCalificacionTexto(promedio, totalRates) {
    if (totalRates === 0) {
        return "Sin calificar";
    }

    let calificacionTexto = "";

    
    if (promedio >= 9.0) {
        calificacionTexto = "Excelente";
    } else if (promedio >= 8.0) {
        calificacionTexto = "Muy bueno";
    } else if (promedio >= 7.0) {
        calificacionTexto = "Bueno";
    } else if (promedio >= 6.0) {
        calificacionTexto = "Aceptable";
    } else {
        calificacionTexto = "Regular";
    }

    return calificacionTexto;
}
