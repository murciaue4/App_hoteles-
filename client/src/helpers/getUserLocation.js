export  const getUserLocation = async () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: {latitude, longitude} }) => {
                resolve([latitude, longitude])
            },
            (err) => {
                alert('No fue posible obtener tu ubicación');
                console.log(err);

                reject();
            }
        )
    })
}