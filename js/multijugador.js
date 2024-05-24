let jugador = true;
let maquina = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

let cuadros = document.getElementsByClassName("button-option");

let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Matriz de patrones ganadores
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

function usarmovimiento(e) {
  let cuadroValue = e.target.innerHTML;
  if (!cuadroValue.length) {
    e.target.innerHTML = jugador ? "🗡️" : "❤️";
    let row = Math.floor(Array.prototype.indexOf.call(cuadros, e.target) / 3);
    let col = Array.prototype.indexOf.call(cuadros, e.target) % 3;
    maquina[row][col] = jugador ? "❤️" : "🗡️";
    if (victoria()) {
      document.getElementById("message").innerHTML = !jugador ? "❤️ gana!" : "🗡️ gana!";
      document.getElementById("message").classList.remove("hidden");
      disableAllButtons();
    } else if (maquina.flat().every(cell => cell !== "")) {
      document.getElementById("message").innerHTML = "¡Es un empate!";
      document.getElementById("message").classList.remove("hidden");
    } else {
      jugador = !jugador;
    }
  }
}



function victoria() {
  let flatMaquina = maquina.flat();
  for (let pattern of jugadasGanadoras) {
    const [a, b, c] = pattern;
    if (flatMaquina[a] && flatMaquina[a] === flatMaquina[b] && flatMaquina[a] === flatMaquina[c]) {
      return true;
    }
  }
  return false;
}

function disableAllButtons() {
  for (let cuadro of cuadros) {
    cuadro.removeEventListener("click", usarmovimiento);
  }
}

document.getElementById("restart").addEventListener("click", restartGame);

function restartGame() {
  for (let cuadro of cuadros) {
    cuadro.innerHTML = "";
    cuadro.addEventListener("click", usarmovimiento);
  }
  maquina = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  document.getElementById("message").classList.add('hidden');
  jugador = true;


  
  
}