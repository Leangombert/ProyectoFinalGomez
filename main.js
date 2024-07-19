// Quiero hacer un emulador que calcule el IMC, donde el usuario coloque su peso (en KG) en un prompt y estatura (en m) tambien en un prompt, y esto arroje un resultado mediante un alert. Posteriormente agregar un array.

// Array donde se almacenan los datos
let usuarios = [];

// Funciones esenciales del proceso a simular
function calculadoraDeIMC(pesoEnKg, alturaEnM) {
    return pesoEnKg / (alturaEnM ** 2);
}

function obtenerDatosUsuario() {
    let nombre = prompt("Ingrese su nombre");
    let pesoEnKg = parseFloat(prompt("Ingrese su peso en KG (ejemplo: 75)"));
    let alturaEnM = parseFloat(prompt("Ingrese su estatura en m (ejemplo: 1.80)"));

    return {
        nombre: nombre,
        pesoEnKg: pesoEnKg,
        alturaEnM: alturaEnM,
        imc: calculadoraDeIMC(pesoEnKg, alturaEnM)
    };
}

function clasificarIMC(imc) {
    if (imc < 18.5) {
        return "Bajo Peso";
    } else if (imc < 24.9) {
        return "Peso Normal";
    } else if (imc < 29.9) {
        return "Sobrepeso";
    } else {
        return "Obesidad";
    }
}

// Funcion para agregar usuarios al array
function agregarUsuario(usuario) {
    usuarios.push(usuario);
}

// Funcion para buscar
function buscarUsuarioPorNombre(nombre) {
    return usuarios.find(usuario => usuario.nombre === nombre);
}

// Ejecución del bucle para volver a preguntar un nuevo usuario.
let continuar = true;

while (continuar) {
    let usuario = obtenerDatosUsuario();
    agregarUsuario(usuario);

    alert(`Hola ${usuario.nombre}, tu IMC es: ${usuario.imc.toFixed(2)} (${clasificarIMC(usuario.imc)})`);

    continuar = confirm("¿Desea ingresar los datos de otro usuario?");
}

// Busqueda
let nombreBuscado = prompt("Ingrese el nombre del usuario a buscar");
let usuarioEncontrado = buscarUsuarioPorNombre(nombreBuscado);
if (usuarioEncontrado) {
    alert(`Usuario encontrado: ${usuarioEncontrado.nombre}, IMC: ${usuarioEncontrado.imc.toFixed(2)} (${clasificarIMC(usuarioEncontrado.imc)})`);
} else {
    alert("Usuario no encontrado");
}
