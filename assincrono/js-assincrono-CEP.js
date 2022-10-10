const apiUrl='https://viacep.com.br/ws/01001000/json/'
const enderecoHTML=document.querySelector('#endereco')

fetch(apiUrl)
  .then(dados=>dados.json())
  .then(resposta=>{
    enderecoHTML.innerHTML=`<p>${resposta.logradouro}</p>`
  })
.catch(resposta=>enderecoHTML.innerHTML="<p>Erro</p>")
