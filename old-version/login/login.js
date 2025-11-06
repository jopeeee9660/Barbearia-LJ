function fazerLogin() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  if (!usuario || !senha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  try {
    if (auth.login(usuario, senha)) {
      alert("Login bem-sucedido!");
      window.location.href = "../index.html";
    } else {
      alert("Usuário ou senha incorretos.");
    }
  } catch (error) {
    alert(error.message);
  }
}

function voltarPagina() {
  window.location.href = "../index.html";
}

function criarConta() {
  window.location.href = "cadastro.html";
}
