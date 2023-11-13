const error = (message, code) => {
    let err =  new Error(message)
    if(code){
        err.estatusCode = code
    }
    return err.message;
}
module.exports = error;