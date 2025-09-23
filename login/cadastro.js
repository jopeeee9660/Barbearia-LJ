function salvarConta() {
  const usuario = document.getElementById("novoUsuario").value;
  const senha = document.getElementById("novaSenha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if (!usuario || !senha || !confirmarSenha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  try {
    auth.register(usuario, senha);
    alert("Conta criada com sucesso!");
    window.location.href = "../index.html";
  } catch (error) {
    alert(error.message);
  }
}

function voltarPagina() {
  window.location.href = "login.html";
}
