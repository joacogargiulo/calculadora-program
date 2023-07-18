// Obtenemos los elementos del html
const visor1 = document.querySelector(".visor1");
const visor2 = document.querySelector(".visor2");
const botones = document.querySelectorAll(".boton");
const conversores = document.getElementById("conversores");

const inputHexadecimal = document.getElementById("input-hexadecimal")
const inputDecimal = document.getElementById("input-decimal")
const inputOctal = document.getElementById("input-octal")
const inputBinario = document.getElementById("input-binario")

const inputsBases = document.getElementsByName("input-base")

const spanHexadecimal = document.getElementById("span-input-16")
const spanDecimal = document.getElementById("span-input-10")
const spanOctal = document.getElementById("span-input-8")
const spanBinario = document.getElementById("span-input-2")

const todasLasBases = [spanHexadecimal, spanDecimal, spanOctal, spanBinario]

let spanSeleccionado = spanDecimal


// Declaramos las variables que guardan el estado de la calculadora
let numeroActual = ""; // El número que se está escribiendo
let operacionActual = ""; // La operación completa
let resultado = ""; // El resultado de la operación

// Añadimos un evento click a cada botón
for (let boton of botones) {
    boton.addEventListener("click", function() {
        // Obtenemos el valor del botón presionado
        let valor = boton.textContent;
        ingresarCaracter(valor);
    });
}

window.addEventListener("keydown", (event) => {
    ingresarCaracter(event.key)
})

function ingresarCaracter(valor) {
    
    // Si el valor es un símbolo de operación (+ - × ÷), lo añadimos a la operación actual junto con el número actual y lo mostramos en el visor 2
    if (/[+\-*/]/.test(valor)) {
        operacionActual += numeroActual + " " + valor + " ";
        visor2.textContent = operacionActual;
        numeroActual = ""; // Reiniciamos el número actual
        return
    }

    // Si el valor es el símbolo de igual (=), evaluamos la operación actual con el número actual y mostramos el resultado en el visor 1 y la operación completa en el visor 2
    else if (valor === "=") {
        operacionActual += numeroActual;
        resultado = eval(operacionActual);
        visor1.textContent = resultado;
        visor2.textContent = operacionActual + " =";
        numeroActual = ""; // Reiniciamos el número actual
        operacionActual = ""; // Reiniciamos la operación actual
    }

    // Si el valor es un dígito o una coma, lo añadimos al número actual y lo mostramos en el visor 1
    else if (/[0-9.]/.test(valor)) {
        numeroActual += valor;
        visor1.textContent = numeroActual;
    }

    // Si el valor es el símbolo C, borramos el número actual y el resultado, pero no la operación actual
    else if (valor === "C") {
        numeroActual = ""; // Reiniciamos el número actual
        resultado = ""; // Reiniciamos el resultado
        visor1.textContent = 0; // Mostramos 0 en el visor 1
    }

    // Si el valor es el símbolo CE, borramos todo: el número actual, la operación actual y el resultado
    else if (valor === "CE"||valor === "Escape") {
        numeroActual = ""; // Reiniciamos el número actual
        operacionActual = ""; // Reiniciamos la operación actual
        resultado = ""; // Reiniciamos el resultado
        visor1.textContent = 0; // Mostramos 0 en el visor 1
        visor2.textContent = 0; // Mostramos 0 en el visor 2
    }
    // Borrar el ultimo digito
    else if (valor === "←" || valor === "Backspace") {
        numeroActual = numeroActual.slice(0, -1);
        visor1.textContent = numeroActual;
    }

    convertir(spanSeleccionado.title)
}



conversores.addEventListener("change", (event) => {
    const target = event.target
    const label = target.nextElementSibling
    spanSeleccionado = label.querySelector("span")
        numeroActual = spanSeleccionado.innerText
        visor1.textContent = numeroActual
        convertir(spanSeleccionado.title)
    })


function convertir(base) {
    let numero = numeroActual
    if (numero == '') {
        numero = resultado
    }
    const numeroDecimal = parseInt(numero, parseInt(base))
    todasLasBases.forEach(span => {
        if (isNaN(numeroDecimal)) {
            span.innerText = "0"
            return
        } else {
            span.innerText = numeroDecimal.toString(parseInt(span.title)).toUpperCase()
        }
    });

    
}



window.addEventListener("load", () => {
    inputDecimal.checked = true
})



/*const inputResultados = document.getElementById("input-operaciones")
const inputOperaciones = document.getElementById("input-resultados")


const operadores = ["+", "-", "*", "/", "(", ")"]

let numero


inputResultados.addEventListener("input", () => {
    actualizarNumero()
    console.log("Cambio");
})

function actualizarNumero() {
    numero = inputResultados.value
    spanSeleccionado.innerHTML = numero
    convertir(spanSeleccionado.title)
    inputResultados.value = spanSeleccionado.innerText
}



inputResultados.addEventListener("keydown", (event) => {
    // if (inputResultados.value == 0) {
        //     return
        // }

    if (operadores.includes(event.key)) {
        agregarOperador(event.key)
    } else if (event.key === "Enter") {
        evaluar()
        actualizarNumero()
    } else if (event.key === "Escape") {
        borrarTodo()
        actualizarNumero()
    }
    operadores.forEach(operador => {
        if (inputOperaciones.value.slice(-1) == operador) {
            // inputOperaciones.value = ""
            inputResultados.value = ""
        }
    });
})

function agregarOperador(operador) {
    inputOperaciones.value = inputOperaciones.value + " " + inputResultados.value + " " + operador
    inputResultados.value = inputResultados.value
}

function evaluar() {
    inputOperaciones.value = inputOperaciones.value + " " + inputResultados.value
    inputResultados.value = eval(inputOperaciones.value)
    inputOperaciones.value = inputOperaciones.value + " ="
}

function borrarTodo() {
    inputOperaciones.value = ""
    inputResultados.value = 0
    convertir()
}

inputResultados.addEventListener("blur", () => {
    inputResultados.focus()
})




*/