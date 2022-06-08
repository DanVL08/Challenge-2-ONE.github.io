
palabras = [
    "ALURA", "ORACLE", "SCRIPT", "PYTHON", "HTML", "JAVASCRIPT", "JAVA", "DATOS",
    "TECLA", "PROGRAMA", "CSS", "TECLA", "MONITOR", "PROCESADOR", "PLATAFORMA",
    "INTERNET", "NUBE"
];
//VARIABLES

var ctx = document.getElementById('canvasDibujo').getContext('2d');
var letras = [];
var palabraCorrecta = "";
var errores = 9;
var intentos = 0;
var escribir = false;
var mensaje = '';
aciertos = 1;

/**escogerPalabraSecreta()
 * 
 * Esta función escoge la palbra secreta a partir del arreglo con las palabras y
 * la función de Math.random
 */

function escogerPalabraSecreta() {
    var palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabraSecreta = palabra;
    return palabraSecreta;
}

escogerPalabraSecreta();

/**dibujarLineas()
 * 
 * Esta función dibuja las líneas a partir de  el ancho asignado, divido
 * entre la longitud de la palabra escogida, también dibuja la parte inferior
 * del ahorcado
 */
function dibujarLineas() {

    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "white";
    ctx.beginPath();

    var ancho = 600 / palabraSecreta.length; //Obtiene el total de guiones

    for (let i = 0; i < palabraSecreta.length; i++) {
        ctx.moveTo(150 + (ancho * i), 640);
        ctx.lineTo(200 + (ancho * i), 640)

    }
    dibujarAhorcado(0);
    ctx.stroke();
    ctx.closePath();
}

dibujarLineas(escogerPalabraSecreta());

/**escribirLetraCorrecta(posicion)
 * 
 * Esta función escribe la letra correcta en la posición indicada por la función
 * adicionarLetraCorrecta() que tiene la función document.onkeydown()
 */

function escribirLetraCorrecta(posicion) {
    if (intentos <= 9) {
        ctx.font = 'bold 52px Patrick Hand';
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.fillStyle = "orange";

        var ancho = 600 / palabraSecreta.length;
        ctx.fillText(palabraSecreta[posicion], 155 + (ancho * posicion), 620);
    }

}

/**escribirLetraIncorrecta(letra, errorsLeft)
 * 
 * Escribe la letra incorrecta en la parte inferior de las líneas.
 * Está indicada por la función adicionarLetraIncorrecta() que tiene la función
 * document.onkeydown()
 */

function escribirLetraIncorrecta(letra, errorsLeft) {
    if (intentos < 9) {
        ctx.font = '52px Patrick Hand';
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.fillStyle = "yellow";

        ctx.fillText(letra, 150 + (40 * (10 - errorsLeft)), 710, 40);
    }

}
/**verificarLetraClicada(key)
 * Esta función permite verificar la letra presionada, agregando al arreglo de las letras,
 * la "tecla" que ha sido presionada, esta 
 * también se complementacon la función de document.onkeydown() 
 */


function verificarLetraClicada(key) {
    if (letras.length < 1 || letras.indexOf(key) < 0) {

        letras.push(key);
        return false;
    } else {

        letras.push(key)
        return true;
    }

}

/**adicionarletraCorrecta(i)
 * 
 * Adiciona a palabraCorrecta la letra de la palabra secreta en laposicion indicada "i", solo si
 * los intentos aún no se han terminado y una vezque se ha adicionado la letra correcta, verifica
 * si el usuario ganó con la función verificarGandor();
 */


function adicionarletraCorrecta(i) {
    if (intentos <= 9) {
        palabraCorrecta += palabraSecreta[i].toUpperCase();

    }
    verificarGanador();
}
/**verificarGanador()
 * Esta función cuenta los aciertos del usuario y si coinciden con la longitud de la
 * palabra se muestra el mensaje de "Ganaste Felicidades" en la pantalla y se impide
 * al usuario seguir escribiendo letras incorrectas negando la variable 'escribir'. 
 */

function verificarGanador() {
    if (aciertos >= palabraSecreta.length && escribir == true) {
        intentos = 9;
        mensaje = "Ganaste";
        mostrarMensaje(mensaje, 580, 90, "blue");
        mensaje = "Felicidades!"
        mostrarMensaje(mensaje, 580, 150, "blue");

        escribir = false;
    }
}

/**adicionarletraIncorrecta(i)
 * 
 * resta a a la variable los errores del usuario, esto también da sentido de escribir
 * las letras de izquierda a derecha en las letras incorrectas de abajo y ayuda a 
 * adicionar las letras incorrectas una sola vez verificando que la variable 'letter'
 * solo se encuentre una vez ecrita.
 */

function adicionarletraIncorrecta(letter) {
    if (palabraSecreta.indexOf(letter) && intentos < 9) {
        errores -= 1;

    }
}
/**document.onkeydown = (e) => {
 * 
 * Esta función recibe con una función flecha la letra que ha sido presionada
 * en el teclado y si es correcta  verifica que no haya sido escrita antes con
 * !verificarLetraClicada(e.key) y después verifica si la palabra secreta incluye
 * esta letra con if (palabraSecreta.includes(letra)), después con un ciclo busca
 * en que posición escribir la letra correcta en la parte de líneas asignada.
 */

document.onkeydown = (e) => {
    let letra = e.key.toUpperCase();

    if (escribir == true && !verificarLetraClicada(e.key)) {
        if (palabraSecreta.includes(letra)) {
            adicionarletraCorrecta(palabraSecreta.indexOf(letra));
            for (let i = 0; i < palabraSecreta.length; i++) {
                if (palabraSecreta[i] === letra) {
                    escribirLetraCorrecta(i)
                    aciertos++
                }

            }
/**
 * Si las condiciones anteriores no se cumplen entonces escribirá la letra incorrecta
 * y verificará que esta no ha sido escrita antes, sumará otro intento y dibujará el ahorcado
 * en el número que tenga 'intentos'.
 */
        } else {
            if (escribir == true && !verificarLetraClicada(e.key)) return
            adicionarletraIncorrecta(letra);
            escribirLetraIncorrecta(letra, errores);
            intentos++;
            dibujarAhorcado(intentos);

        }
    }
};

/**function dibujarAhorcado(intento)
 * 
 * Dibuja la figura del ahorcado progresivamente utilizando
 * canvas en su contexto 2d, asignado a la variable 'ctx' y dibujará
 * el ahorcado en la posición 'intento'. Una vez la figura termine de
 * dibujarse mostrará el mensaje de 'fin del juego' y bloqueará la
 * función de escribir para evitar que el usuario pueda seguir escribiendo
 * letras correctas.
 */

function dibujarAhorcado(intento) {

    switch (intento) {

        case 0:
            ctx.moveTo(280, 450);
            ctx.lineTo(594, 450);
            break;

        case 1:
            ctx.moveTo(330, 59);     //Soporte
            ctx.lineTo(330, 450);
            break;

        case 2:
            ctx.moveTo(330, 59);
            ctx.lineTo(470, 59);
            break;
        case 3:
            ctx.moveTo(470, 59);     //Cuerda
            ctx.lineTo(470, 106);
            break;
        case 4:
            ctx.arc(470, 136, 30, -20.5, (Math.PI / 180) * 360); //Cabeza
            break;

        case 5:
            ctx.moveTo(470, 170);    //Cuerpo
            ctx.lineTo(470, 290);
            break;

        case 6:

            ctx.moveTo(470, 170);    //Mano 1
            ctx.lineTo(430, 220);
            break;

        case 7:

            ctx.moveTo(470, 170);    //Mano 2
            ctx.lineTo(510, 220);
            break;

        case 8:

            ctx.moveTo(470, 290);    //Pierna 1
            ctx.lineTo(430, 350);
            break;

        case 9:
            ctx.moveTo(470, 290);    //Pierna 2
            ctx.lineTo(510, 350);
            
            mensaje = "Fin del"
            mostrarMensaje(mensaje, 600, 90, "red");
            mensaje = "Juego";
            mostrarMensaje(mensaje, 600, 150, "red");
            escribir = false;
            break;

    }

    ctx.stroke();

}

/**
* mostrarMensaje(mensaje, x, y, color)

* Muestra el mensaje que se le indique en las posiciones x,y de la
* pantalla canvas, también se le puede asignar color al mensaje con
* el mismo parámetro.
*/

function mostrarMensaje(mensaje, x, y, color) {
    if (escribir == true) {
        ctx.font = 'bold 50px Patrick Hand';
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.fillStyle = color;
    
        ctx.fillText(mensaje, x, y);
    }
}


/**desistir()
 * 
 * muestra el mensaje de 'Fin del Juego en la pantalla' y mediante un ciclo
 * escribe la letra correcta con la función escribirLetraCorrecta(i) y
 * dibuja la figura del ahorcado completa con dibujarAhorcadoCompleto(),
 * por último impide al usuario seguir escribiendo negando la variable 'escribir'
 */
function desistir() {
    mensaje = "Fin del"
    mostrarMensaje(mensaje, 600, 90, "red");
    mensaje = "Juego";
    mostrarMensaje(mensaje, 600, 150, "red");



        for (let i = 0; i < palabraSecreta.length; i++) {
            escribirLetraCorrecta(i)
        }

        dibujarAhorcadoCompleto();
        escribir = false;

}

/**dibujarAhorcadoCompleto()
 * 
 * Dibuja toda la figura del ahorcado mediante un ciclo y la función de
 * dibujarAhorcado();
 */


function dibujarAhorcadoCompleto() {

    for (let i = 0; i <= 9; i++) {
        dibujarAhorcado(i);
    }
}

/**
 * mostrarPantallaInicial(),mostrarAgregarPalabra(),mostrarJuegoAhorcado()
 * 
 * Activan o desactivan los elementos de su parte de la página, según los botones sean
 * presionados
 */

function mostrarPantallaInicial() {
    escribir = false;

    //Mostrando elementos
    document.getElementById("#h1").style.display = 'block';
    document.getElementById("btnIniciarJuego").style.display = 'block';
    document.getElementById("btnAgregarPalabra").style.display = 'block';

    //Quitando elementos
    document.getElementById("#addW").style.display = 'none';
    document.getElementById("textoAgregar").style.display = 'none';
    document.getElementById("reglaAgregar").style.display = 'none';
    document.getElementById("btnAgregarPalabra2").style.display = 'none';
    document.getElementById("btnCancelar").style.display = 'none';

    document.getElementById("canvasDibujo").style.display = 'none';
    document.getElementById("btnNuevoJuego").style.display = 'none';
    document.getElementById("btnDesistir").style.display = 'none';
    document.getElementById("canvasDibujo").style.display = 'none';

}
function mostrarAgregarPalabra() {
    //Mostrando Elementos

    escribir = false;
    document.getElementById("#addW").style.display = 'block';
    document.getElementById("textoAgregar").style.display = 'block';
    document.getElementById("reglaAgregar").style.display = 'block';
    document.getElementById("btnAgregarPalabra2").style.display = 'block';
    document.getElementById("btnCancelar").style.display = 'block';

    //Quitando elementos
    document.getElementById("canvasDibujo").style.display = 'none';
    document.getElementById("btnNuevoJuego").style.display = 'none';
    document.getElementById("btnDesistir").style.display = 'none';
    document.getElementById("canvasDibujo").style.display = 'none';
    
    document.getElementById("#h1").style.display = 'none';
    document.getElementById("btnIniciarJuego").style.display = 'none';
    document.getElementById("btnAgregarPalabra").style.display = 'none';
}


function mostrarJuegoAhorcado() {
    escribir = true;
    document.getElementById("canvasDibujo").style.display = 'block';
    document.getElementById("btnNuevoJuego").style.display = 'block';
    document.getElementById("btnDesistir").style.display = 'block';
    document.getElementById("canvasDibujo").style.display = 'block';

    //quitando parte inicial

    document.getElementById("#h1").style.display = 'none';
    document.getElementById("btnIniciarJuego").style.display = 'none';
    document.getElementById("btnAgregarPalabra").style.display = 'none';

    //quitando agregar

    document.getElementById("#addW").style.display = 'none';
    document.getElementById("textoAgregar").style.display = 'none';
    document.getElementById("textoAgregar").style.display = 'none';
    document.getElementById("reglaAgregar").style.display = 'none';
    document.getElementById("btnAgregarPalabra2").style.display = 'none';
    document.getElementById("btnCancelar").style.display = 'none';

}

//PARTE PARA QUITAR EL TEXTO INICIAL DE EL TEXTAREA
textoAgregar.addEventListener('focus', function(){
    if (textoAgregar.value == "Ingrese una palabra") {
        textoAgregar.value = "";
    }

});

//PARTE PARA AGREGAR PALABRAS

/**obtenerTexto()
 * 
 * obtiene la palabra escrita en las partes del textaera de la parte de Agregar Palabra
 * comprueba si no sobrepasa los caracteres indicados y también si la palabra  no se ha
 * repetido, de lo contrario mostrará alertas para cada caso.
 */
function obtenerTexto() {
    var nuevaPalabra = document.getElementById("textoAgregar").value
    nuevaPalabra = nuevaPalabra.toUpperCase();
    
    if (nuevaPalabra.length >= 16 || nuevaPalabra.length <= 3) {
        alert("mínimo 4 caracteres, máximo 15 caracteres");

    } else if(palabras.includes(nuevaPalabra)) {

        alert('Esta palabra ya está agregada!');
    } else {

        palabras.push(nuevaPalabra);
        document.getElementById("textoAgregar").value = "Ingrese una palabra"; 
        alert('palabra agregada: ' + nuevaPalabra);
        mostrarJuegoAhorcado()
        
    }


}

//FUNCION PARA LIMPIAR EL CANVAS Y REINICIAR TODOS LOS VALORES

function nuevoJuego() {
    //REINICIANDO VALORES
    letras = [];
    palabraCorrecta = "";
    errores = 9;
    intentos = 0;
    escribir = true;
    mensaje = '';
    aciertos = 1;
    escogerPalabraSecreta();
    limpiarPantalla();
    mostrarPantallaInicial();
    dibujarLineas();
    
}

function limpiarPantalla () {

    ctx.clearRect(0,0,860,1200);//Limpia la pantalla
}