// Variable que indica el turno del jugador (true para jugador humano, false para máquina)
let jugador = true;

// Matriz que representa el estado del tablero
let maquina = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

// Selección de los cuadros del tablero
let cuadros = document.getElementsByClassName("button-option");

// Referencias a los elementos del DOM para mostrar mensajes y reiniciar el juego
let msgRef = document.getElementById("message");
let restartBtn = document.getElementById("restart");

// Patrones de jugadas ganadoras
let jugadasGanadoras = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Agregar eventos de clic a los cuadros
for (let index = 0; index < cuadros.length; index++) {
  cuadros[index].addEventListener("click", usarmovimiento);
}

// Función que maneja el movimiento del jugador
function usarmovimiento(e) {
                              // innerHTML devuelve o establece la sintaxis HTML describiendo los descendientes del elemento.
                //e.target se refiere elemento clickado
  let cuadroValue = e.target.innerHTML; // Obtiene el contenido del cuadro
  if (!cuadroValue.length) { // Verifica que el cuadro esté vacío
    e.target.innerHTML = jugador ? "🗡️" : "❤️"; // Asigna el símbolo correspondiente

                  //Math.floor Devuelve el máximo entero menor o igual a un número.
    let row = Math.floor(Array.prototype.indexOf.call(cuadros, e.target) / 3); // Calcula la fila
    let col = Array.prototype.indexOf.call(cuadros, e.target) % 3; // Calcula la columna
    maquina[row][col] = jugador ? "🗡️" : "❤️"; // Actualiza la matriz del tablero
    if (victoria()) { // Verifica si hay un ganador
      document.getElementById("message").innerHTML = !jugador ? "❤️ gana!" : "🗡️ gana!"; // Muestra el mensaje del ganador
      document.getElementById("message").classList.remove("hidden"); // Muestra el mensaje
      disableAllButtons(); // Desactiva los botones
    } else if (maquina.flat().every(cell => cell !== "")) { // Verifica si hay empate
      document.getElementById("message").innerHTML = "¡Es un empate😒!";
      document.getElementById("message").classList.remove("hidden"); // classList es una forma práctica de acceder a la lista de clases de un elemento como una cadena de texto delimitada por espacios a través de element.className.
    } else {
      jugador = !jugador; // Cambia el turno
      if (!jugador) { // Si es el turno de la máquina
        setTimeout(movimientoMaquina, 500); // Espera medio segundo antes de que la máquina haga su movimiento
      }
    }
  }
}

// Función que maneja el movimiento de la máquina
function movimientoMaquina() {
  let emptyCells = []; // Array para almacenar las celdas vacías
  for (let i = 0; i < 9; i++) { // Recorre todas las celdas del tablero
    let row = Math.floor(i / 3);
    let col = i % 3;
    if (maquina[row][col] === "") { // Si la celda está vacía
      emptyCells.push({ row, col, index: i }); // La agrega al array de celdas vacías
    }
  }
  if (emptyCells.length > 0) { // Si hay celdas vacías
    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)]; // Selecciona una celda vacía al azar
    maquina[move.row][move.col] = "❤️"; // Actualiza la matriz del tablero
    cuadros[move.index].innerHTML = "❤️"; // Actualiza el contenido del cuadro en el DOM
    if (victoria()) { // Verifica si hay un ganador
      document.getElementById("message").innerHTML = "❤️ gana!";
      document.getElementById("message").classList.remove("hidden");
      disableAllButtons(); // Desactiva los botones
    } else if (maquina.flat().every(cell => cell !== "")) { // Verifica si hay empate
      document.getElementById("message").innerHTML = "¡Es un empate!";
      document.getElementById("message").classList.remove("hidden");
    } else {
      jugador = !jugador; // Cambia el turno
    }
  }
}

// Función que verifica si hay un ganador
function victoria() {         //flat crea una nueva matriz con todos los elementos de sub-array concatenados recursivamente hasta la profundidad especificada.
  let flatMaquina = maquina.flat(); // Convierte la matriz del tablero en un array plano
  for (let pattern of jugadasGanadoras) { // Recorre los patrones de jugadas ganadoras
    const [a, b, c] = pattern; // Desestructura el patrón
    if (flatMaquina[a] && flatMaquina[a] === flatMaquina[b] && flatMaquina[a] === flatMaquina[c]) { // Verifica si hay una combinación ganadora
      return true;
    }
  }
  return false; // Si no hay ganador, devuelve false
}

// Función que desactiva todos los botones del tablero
function disableAllButtons() {
  for (let cuadro of cuadros) {
    cuadro.removeEventListener("click", usarmovimiento); // Elimina el evento de clic de cada cuadro
  }
}

// Evento para reiniciar el juego
document.getElementById("restart").addEventListener("click", restartGame);

// Función que reinicia el juego
function restartGame() {
  for (let cuadro of cuadros) {
    cuadro.innerHTML = ""; // Limpia el contenido de cada cuadro
    cuadro.addEventListener("click", usarmovimiento); // Vuelve a agregar el evento de clic a cada cuadro
  }
  maquina = [ // Reinicia la matriz del tablero
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  document.getElementById("message").classList.add('hidden'); // Oculta el mensaje
  jugador = true; // Vuelve a poner el turno del jugador en true
}