var escolhaIa=document.querySelector("#escolha-ia")
var pedra=document.querySelector("#pedra")
var papel=document.querySelector("#papel")
var tesoura=document.querySelector("#tesoura")
var resultadoJogo=document.querySelector("#resultado-jogo")

var imgPedra="images/pedra.png"
var imgPapel="images/papel.png"
var imgTesoura="images/tesoura.png"

let opcoesImg=[imgPedra,imgPapel,imgTesoura]

let opcoes=["pedra","papel","tesoura"]


// escolhaIa.innerHTML=`<img src="${imgPedra}" alt="pedra" srcset="" width="50%">`

function escolher(opcaoJogador){
  let escolhaIa=gerarIaOpcao()
  if(opcaoJogador==escolhaIa){
    resultadoJogo.innerHTML="Jogo empate"
  }else{
    if((opcaoJogador=="pedra" && escolhaIa=="tesoura") || (opcaoJogador=="papel" && escolhaIa=="pedra") || 
    (opcaoJogador=="tesoura" && escolhaIa=="papel") ){
      resultadoJogo.innerHTML="Jogador ganhou"
    }else{
      resultadoJogo.innerHTML="Computador Ganhou"
    }
  }
}


function gerarIaOpcao(){
  let escolha=getRandomInt(3)
  escolhaIa.innerHTML=`<img src="${opcoesImg[escolha]}" alt="pedra" srcset="">`
  return opcoes[escolha]
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

