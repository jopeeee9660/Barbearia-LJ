import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  try {
    console.log('🔄 Conectando ao banco de dados...');
    
    const sql = neon(process.env.DATABASE_URL);
    
    console.log('🏗️  Criando tabelas...\n');
    
    // Criar tabela users
    console.log('📋 Criando tabela users...');
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        role VARCHAR(50) DEFAULT 'client',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Tabela users criada');
    
    // Criar tabela services
    console.log('📋 Criando tabela services...');
    await sql`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        duration_minutes INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Tabela services criada');
    
    // Criar tabela barbers
    console.log('📋 Criando tabela barbers...');
    await sql`
      CREATE TABLE IF NOT EXISTS barbers (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        specialties TEXT[],
        is_available BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Tabela barbers criada');
    
    // Criar tabela appointments
    console.log('📋 Criando tabela appointments...');
    await sql`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        client_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        barber_id INTEGER REFERENCES barbers(id) ON DELETE SET NULL,
        service_id INTEGER REFERENCES services(id) ON DELETE SET NULL,
        appointment_date DATE NOT NULL,
        appointment_time TIME NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Tabela appointments criada');
    
    // Criar tabela business_hours
    console.log('📋 Criando tabela business_hours...');
    await sql`
      CREATE TABLE IF NOT EXISTS business_hours (
        id SERIAL PRIMARY KEY,
        day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
        open_time TIME NOT NULL,
        close_time TIME NOT NULL,
        is_closed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Tabela business_hours criada');
    
    // Criar índices
    console.log('\n📊 Criando índices...');
    try {
      await sql`CREATE INDEX IF NOT EXISTS idx_appointments_client ON appointments(client_id)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_appointments_barber ON appointments(barber_id)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
      console.log('✅ Índices criados');
    } catch (e) {
      console.log('⚠️  Alguns índices já existiam');
    }
    
    console.log('\n🎉 Banco de dados configurado com sucesso!');
    console.log('\n✅ Tabelas disponíveis:');
    console.log('   - users (usuários)');
    console.log('   - services (serviços)');
    console.log('   - barbers (barbeiros)');
    console.log('   - appointments (agendamentos)');
    console.log('   - business_hours (horários de funcionamento)');
    console.log('\n💡 Agora você pode:');
    console.log('   1. Criar uma conta em /register');
    console.log('   2. Fazer login com email e senha');
    console.log('   3. O sistema só aceita credenciais válidas do banco! 🔒\n');
    
  } catch (error) {
    console.error('❌ Erro ao configurar banco:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

setupDatabase();
