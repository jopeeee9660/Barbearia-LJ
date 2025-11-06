// Configuração do Banco de Dados - Neon PostgreSQL

import { neon } from '@neondatabase/serverless';

// Função para obter conexão com o banco
export function getDatabase() {
  const databaseUrl = process.env.VITE_DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error(
      'VITE_DATABASE_URL não está definida. Configure no arquivo .env'
    );
  }

  return neon(databaseUrl);
}

// Função helper para executar queries
export async function query(sql, params = []) {
  const db = getDatabase();
  try {
    const result = await db(sql, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Função helper para transações
export async function transaction(callback) {
  const db = getDatabase();
  
  try {
    await db('BEGIN');
    const result = await callback(db);
    await db('COMMIT');
    return result;
  } catch (error) {
    await db('ROLLBACK');
    console.error('Transaction error:', error);
    throw error;
  }
}

export default {
  getDatabase,
  query,
  transaction
};
