const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const inputPerfil = $("#js-input-perfil")
const btnBuscarPerfil = $("#js-btn-buscar-perfil")
const linkedinAuthButton = $("#js-btn-conectar-perfil-linkedin")

const inputNome = $("#js-input-nome")
const inputheadline = $("#js-input-headline")
const inputLocalizacao = $("#js-input-localizacao")
const inputSobre = $("#js-input-sobre")
const inputRevisado = $("#js-input-revisado")

const areaDados = $("#js-dados")
const msgErro = $("#js-error")

btnBuscarPerfil.addEventListener("click", () => {
  if (inputPerfil.value !== "") {
    axios({
      method: "GET",
      url: `http://localhost:3042/linkedin/${inputPerfil.value}`,
    })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data
          inputNome.value = data.name
          inputheadline.value = data.headline
          inputLocalizacao.value = data.location
          inputSobre.value = data.about
          inputRevisado.value = data.revised

          areaDados.style.display = "block"
          msgErro.style.display = "none"
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          msgErro.textContent = "A página carregada não é uma página de perfil do LinkedIn"
        } else {
          msgErro.textContent = "Erro ao fazer scraping do LinkedIn"
        }

        inputNome.value = ""
        inputheadline.value = ""
        inputLocalizacao.value = ""
        inputSobre.value = ""
        areaDados.style.display = "none"
        msgErro.style.display = "block"
      })
  } else {
    inputNome.value = ""
    inputheadline.value = ""
    inputLocalizacao.value = ""
    inputSobre.value = ""
    areaDados.style.display = "none"
    msgErro.style.display = "block"
    msgErro.textContent = "Preenchar o campo, por favor!!!"
  }
})

linkedinAuthButton.addEventListener("click", () => {
  // Chame a API de autenticação do LinkedIn aqui.
  const linkedinAuthUrl =
    "https://www.linkedin.com/oauth/v2/authorization" +
    "?response_type=code" +
    "&client_id=77m519bigpjdup" +
    "&redirect_uri=https://www.linkedin.com/developers/tools/oauth/redirect" +
    "&state=[UMA_STRING_RANDOMICA_AQUI]" +
    "&scope=r_liteprofile%20r_emailaddress" // Adicione aqui os escopos que você precisa

  // Redirecione o usuário para a página de login do LinkedIn para conceder permissão à sua aplicação.
  window.location.href = linkedinAuthUrl
})

// Quando o usuário concluir a autenticação, pegue o cookie "li_at" usando a biblioteca de manipulação de cookies do navegador.
const liAtCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("li_at="))
  .split("=")[1]

console.log(liAtCookie)
