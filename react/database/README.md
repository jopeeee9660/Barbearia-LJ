# Banco de Dados - Barbearia LJ

## Estrutura do Banco de Dados

Este projeto utiliza **Neon PostgreSQL** (PostgreSQL serverless) como banco de dados.

### Tabelas

1. **users** - Usuários do sistema (clientes, barbeiros e administradores)
2. **services** - Serviços oferecidos pela barbearia
3. **barbers** - Informações específicas dos barbeiros
4. **appointments** - Agendamentos de clientes
5. **business_hours** - Horários de funcionamento da barbearia

## Configuração

### 1. Criar conta no Neon

1. Acesse [neon.tech](https://neon.tech)
2. Crie uma conta gratuita
3. Crie um novo projeto

### 2. Obter Connection String

No dashboard do Neon, copie a connection string do seu banco de dados.

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz da pasta `react/`:

```env
VITE_DATABASE_URL=postgresql://usuario:senha@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 4. Instalar dependências

```bash
npm install @neondatabase/serverless
```

### 5. Executar Schema

Execute o arquivo `schema.sql` no console SQL do Neon ou usando uma ferramenta como `psql`:

```bash
psql "sua-connection-string" -f database/schema.sql
```

Ou pelo dashboard do Neon:
- Vá em SQL Editor
- Cole o conteúdo de `schema.sql`
- Execute

### 6. Popular dados iniciais (opcional)

Execute o arquivo `seed.sql` da mesma forma:

```bash
psql "sua-connection-string" -f database/seed.sql
```

## Uso no Código

### Importar configuração

```javascript
import { query } from './database/config.js';
```

### Executar queries

```javascript
// Buscar todos os serviços
const services = await query('SELECT * FROM services WHERE is_active = true');

// Criar agendamento
const appointment = await query(
  'INSERT INTO appointments (client_id, barber_id, service_id, appointment_date, appointment_time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
  [clientId, barberId, serviceId, date, time]
);

// Buscar agendamentos por data
const appointments = await query(
  'SELECT * FROM appointments WHERE appointment_date = $1 ORDER BY appointment_time',
  [date]
);
```

## Segurança

⚠️ **IMPORTANTE:**
- Nunca commite o arquivo `.env` no Git
- Altere a senha padrão do admin em produção
- Use hashes bcrypt reais para senhas
- Configure SSL/TLS para conexões em produção

## Backup

O Neon oferece backups automáticos. Configure snapshots regulares no dashboard.

## Migrações

Para alterações futuras no schema:
1. Crie arquivos de migração numerados: `001_add_column.sql`, `002_new_table.sql`, etc.
2. Execute na ordem
3. Documente as mudanças

## Monitoramento

Acesse o dashboard do Neon para:
- Monitorar uso de recursos
- Ver queries lentas
- Configurar alertas
- Analisar performance
