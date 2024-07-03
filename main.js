//* Quiero hacer un emulador que calcule el IMC, donde el usuario coloque su peso (en KG) en un prompt y estatura (en m) tambien en un prompt, y esto arroje un resultado mediante un alert.

//Funcion calculadora de IMC (Formula IMC = (peso KG) / (estatura m^2)
function calculadoraDeIMC (){
    let pesoEnKg = parseFloat(prompt("ingrese su peso en KG (ejemplo: 75)"));
    let alturaEnM = parseFloat(prompt("Ingrese su estatura en m (ejemplo: 1.80)"));

    let imc = pesoEnKg / (alturaEnM ** 2);
    return imc;
}

let IMC = calculadoraDeIMC();
alert (`Tu IMC es : ${IMC}`);

//Clasificacion de IMC para las alertas
if (IMC < 18.5) {
    alert ("Bajo Peso");
}
else if (IMC < 24.9) {
    alert ("Peso Normal");
}
else if (IMC < 29.9) {
    alert ("Sobrepeso")
}
else {
    alert ("Obesidad")
}