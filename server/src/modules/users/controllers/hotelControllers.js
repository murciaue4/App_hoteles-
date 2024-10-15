const postHoteles = async (req, res) => {
    try {
        const { id, name, email, ...rest } = req.body;

        // Obtener lista de hoteles existentes
        const hoteles = await obtenerHotelesExistentes();

        // Validar duplicados de nombre e id
        const isDuplicateName = hoteles.some(hotel => hotel.name === name);
        const isDuplicateId = hoteles.some(hotel => hotel.id === id);
        const hotelDuplicado = hoteles.find(hotel => hotel.email === email);

        // Construir objeto hotel
        const hotel = { id, name, email, ...rest };

        // Verificar si el nombre del hotel ya existe
        if (isDuplicateName && id === 0) {
            return handleError('Ya existe un HOTEL con este nombre', 401, req, res);
        }

        // Si el hotel ya existe y tiene el mismo id, actualizar su id
        if (isDuplicateId && hotelDuplicado && id === hotelDuplicado.id) {
            hotel.id = id;
        }

        // Insertar o actualizar hotel
        const result = await db.postHotel(T_HOTEL, hotel) ;
        console.log('controller-user/ Resultado de postHotel:', result);

        // Responder con éxito
        return respuestas.sucess(req, res, result, 200);

    } catch (error) {
        return respuestas.error(req, res, error, error.statusCode || 500);
    }
};


