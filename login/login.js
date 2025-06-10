function fazerLogin() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  const usuarioSalvo = localStorage.getItem("usuario");
  const senhaSalva = localStorage.getItem("senha");

  if (usuario === usuarioSalvo && senha === senhaSalva) {
    localStorage.setItem("logado", "true");
    alert("Login bem-sucedido!");
    window.location.href = "../index.html";
  } else {
    alert("Usuário ou senha incorretos.");
  }
}

function voltarPagina() {
  window.location.href = "../index.html";
}

function criarConta() {
  window.location.href = "cadastro.html";
}
