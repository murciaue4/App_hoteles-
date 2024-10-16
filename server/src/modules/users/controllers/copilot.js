// funcion summr dos numeros
const sum = (a, b) => a + b;

// funcion que recibe un objeto de objetos y los recorre de forma recursiva
const recorrerObjetos = (objeto) => {
  for (let key in objeto) {
    if (typeof objeto[key] === 'object') {
      recorrerObjetos(objeto[key]);
    } else {
      console.log(key, objeto[key]);
    }
  }
};