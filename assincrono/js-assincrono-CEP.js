const apiUrl = 'https://viacep.com.br/ws/01001000/json/'
const enderecoHTML = document.querySelector('#endereco')
const btnGetEndereco = document.querySelector("#getEndereco")

btnGetEndereco.addEventListener('click', (event) => {
  event.preventDefault()
  fetch(apiUrl)
    .then(dados => dados.json())
    .then(resposta => {
      enderecoHTML.innerHTML = `<p>${resposta.logradouro}</p>`
    })
    .catch(resposta => enderecoHTML.innerHTML = "<p>Erro</p>")
})