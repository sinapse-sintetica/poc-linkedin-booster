const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputPerfil = $('#js-input-perfil');
const btnBuscarPerfil = $('#js-btn-buscar-perfil');

const inputNome = $('#js-input-nome');
const inputheadline = $('#js-input-headline');
const inputLocalizacao = $('#js-input-localizacao');
const inputSobre = $('#js-input-sobre');

const areaDados = $('#js-dados');
const msgErro = $('#js-error');

btnBuscarPerfil.addEventListener('click', () => {
  if (inputPerfil.value !== "") {
    axios({
      method: 'GET',
      url: `http://localhost:3042/linkedin/${inputPerfil.value}`
    })
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          inputNome.value = data.name;
          inputheadline.value = data.headline;
          inputLocalizacao.value = data.location;
          inputSobre.value = data.about;

          areaDados.style.display = "block";
          msgErro.style.display = 'none';
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          msgErro.textContent = 'A página carregada não é uma página de perfil do LinkedIn';
        } else {
          msgErro.textContent = 'Erro ao fazer scraping do LinkedIn';
        }

        inputNome.value = "";
        inputheadline.value = "";
        inputLocalizacao.value = "";
        inputSobre.value = "";
        areaDados.style.display = "none";
        msgErro.style.display = 'block';
      });
  } else {
    inputNome.value = "";
    inputheadline.value = "";
    inputLocalizacao.value = "";
    inputSobre.value = "";
    areaDados.style.display = "none";
    msgErro.style.display = 'block';
    msgErro.textContent = 'Preenchar o campo, por favor!!!';
  }
})
