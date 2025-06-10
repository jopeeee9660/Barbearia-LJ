function salvarConta() {
  const usuario = document.getElementById("novoUsuario").value;
  const senha = document.getElementById("novaSenha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  if (usuario && senha) {
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("senha", senha);
    localStorage.setItem("logado", "true");

    alert("Conta criada com sucesso!");
    window.location.href = "../index.html";
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}

function voltarPagina() {
  window.location.href = "login.html";
}
