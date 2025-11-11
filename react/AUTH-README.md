# 🔐 Sistema de Autenticação - Barbearia LJ

## ✅ Configuração Concluída

O sistema de login foi configurado para funcionar com banco de dados PostgreSQL (Neon).

## 📋 Passos para Usar

### 1. Configurar Banco de Dados

Edite o arquivo `.env` e adicione sua URL do Neon Database:

```env
DATABASE_URL=sua_url_do_neon_aqui
```

Para obter a URL do banco:
1. Acesse https://neon.tech
2. Crie um projeto (se ainda não tiver)
3. Copie a Connection String
4. Cole no arquivo `.env`

### 2. Criar Tabelas no Banco

Execute o script SQL no seu banco Neon:
- Abra o arquivo `database/schema.sql`
- Execute-o no console SQL do Neon
- Isso criará todas as tabelas necessárias

Opcionalmente, execute também `database/seed.sql` para dados iniciais.

### 3. Iniciar o Servidor Backend

Em um terminal, execute:

```bash
npm run server
```

O servidor será iniciado na porta 3001.

### 4. Iniciar o Frontend

Em outro terminal, execute:

```bash
npm run dev
```

O frontend será iniciado na porta 3000.

## 🎯 Como Funciona

### Registro
1. Acesse http://localhost:3000/register
2. Preencha: Nome, Email, Senha
3. A conta será criada no banco de dados com senha criptografada (bcrypt)

### Login
1. Acesse http://localhost:3000/login
2. Use o email e senha cadastrados
3. **IMPORTANTE**: Agora só funciona com credenciais reais do banco!

### Segurança
- Senhas são criptografadas com bcrypt
- JWT é usado para manter sessão
- Validação de email duplicado
- Validação de campos obrigatórios

## 🔧 Troubleshooting

### Erro: "Erro ao conectar com o servidor"
- Verifique se o servidor backend está rodando (`npm run server`)
- Verifique se está na porta 3001

### Erro: "DATABASE_URL não está definida"
- Configure o arquivo `.env` com sua URL do Neon

### Erro: "Email já cadastrado"
- Use outro email ou faça login com o existente

### Erro: "Email ou senha incorretos"
- Verifique se digitou corretamente
- Lembre-se: agora não aceita mais qualquer senha!

## 📝 Notas Importantes

1. **O login antigo (que aceitava qualquer coisa) foi substituído**
2. Agora é necessário ter o servidor backend rodando
3. Todas as contas são salvas no banco de dados real
4. As senhas são criptografadas e não podem ser recuperadas
5. Use um email válido para registro

## 🚀 Melhorias Implementadas

- ✅ Autenticação real com banco de dados
- ✅ Senhas criptografadas
- ✅ Validação de email e senha
- ✅ Tokens JWT para sessão
- ✅ Mensagens de erro informativas
- ✅ Loading states nos formulários
- ✅ Sistema de usuários completo

---

**Qualquer dúvida, verifique os logs do servidor no terminal!**
