const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

// ordem dos botoes do simon
let order = [];
// ordem dos botoes do jogador
let playerOrder = [];
// contabiliza quantas vezes os botoes tem que acender
let flash;
// contabiliza os pontos ou seja as rodadas
let turn;
// variavel que controla se a rodada foi concluida
let good;
// variavel que controla a vez de computador
let compTurn;
// variavel que controla qual setInterval tá sendo chamado para depois caso necessário parar a funcao usando o clearInterval(intervalId)
let intervalId;
// variavel que controla se o jogador perde em caso se apenas um erro.
let strict = false;
let noise = true;
// variavel que controla se o simon está ligado
let on = false;
// variavel que controla se o jogador ganhou
let win;
// número de rodadas para ganhar o jogo
let level = 10

strictButton.addEventListener('click', (event) => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  // funcao que cria a sequencia de botoes do simon
  for (var i = 0; i < level; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;
  //chama a funcao gameTurn a cada 800ms
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  //seta para falso para o jogador não apertar nenhum botão
  on = false;
  // se toda a sequencia foi concluida ou seja flash igual a rodada
  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}
function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}

function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}

function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}
function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}
function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

// se o jogo ainda nao foi ganho, colocar todas as cores para cores escuras
function resetColors() {
  if (!win) {
    setTimeout(() => {
      clearColor();
    }, 300);
  }
}

topLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    resetColors()
  }
})

topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    resetColors()
  }
})

bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    resetColors()
  }
})

bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    resetColors()
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == level && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();
      // se nao pode errar inicia o jogo do começo
      if (strict) {
        play();
        //senao inicia o jogo de onde parou
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}