import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

async function setupDatabase() {
  try {
    console.log('🔄 Conectando ao banco de dados...');
    
    const sql = neon(process.env.DATABASE_URL);
    
    console.log('📝 Lendo arquivo schema.sql...');
    const schemaPath = join(__dirname, 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf8');
    
    console.log('🏗️  Criando tabelas...');
    
    // Executar cada comando SQL separadamente
    const commands = schema
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));
    
    for (const command of commands) {
      try {
        await sql(command);
        console.log('✅ Comando executado com sucesso');
      } catch (error) {
        // Ignorar erros de "já existe"
        if (!error.message.includes('already exists')) {
          console.error('❌ Erro:', error.message);
        }
      }
    }
    
    console.log('\n🎉 Banco de dados configurado com sucesso!');
    console.log('✅ Tabelas criadas:');
    console.log('   - users (usuários)');
    console.log('   - services (serviços)');
    console.log('   - barbers (barbeiros)');
    console.log('   - appointments (agendamentos)');
    console.log('   - business_hours (horários de funcionamento)');
    console.log('\n💡 Agora você já pode criar contas e fazer login!');
    
  } catch (error) {
    console.error('❌ Erro ao configurar banco:', error);
    process.exit(1);
  }
}

setupDatabase();
