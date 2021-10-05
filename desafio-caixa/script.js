let quadrado = document.getElementById("caixa");
let velocidade = 10;

document.addEventListener("keydown", function (e) {
  if (e.keyCode == "39") {
    direita();
  }

  if (e.keyCode == "37") {
    esquerda();
  }

  if (e.keyCode == "38") {
    sobe();
  }

  if (e.keyCode == "40") {
    desce();
  }
});

function desce() {
  let pos = getTopValue();
  let newpos = Number(pos) + velocidade;
  quadrado.style.top = newpos + "px";
}

function sobe() {
  let pos = getTopValue();
  let newpos = Number(pos) - velocidade;
  quadrado.style.top = newpos + "px";
}
var esquerda = function () {
  let pos = getLeftValue();
  let newpos = Number(pos) - velocidade;
  quadrado.style.left = newpos + "px";
};

var direita = () => {
  let pos = getLeftValue();
  let newpos = Number(pos) + velocidade;
  quadrado.style.left = newpos + "px";
};

var getTopValue = () => getComputedStyle(quadrado).top.split("px")[0];

var getLeftValue = () => getComputedStyle(quadrado).left.split("px")[0];

document.querySelector("#keyboard_key_down").addEventListener("click", desce);
document.querySelector("#keyboard_key_up").addEventListener("click", sobe);
document
  .querySelector("#keyboard_key_left")
  .addEventListener("click", esquerda);
document
  .querySelector("#keyboard_key_right")
  .addEventListener("click", direita);
