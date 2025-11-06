// Exemplos de uso do banco de dados - Barbearia LJ

import { query, transaction } from './config.js';

// ============================================
// EXEMPLOS - USUÁRIOS
// ============================================

/**
 * Criar novo usuário
 */
export async function createUser(userData) {
  const { name, email, passwordHash, phone, role = 'client' } = userData;
  
  const result = await query(
    `INSERT INTO users (name, email, password_hash, phone, role) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING id, name, email, phone, role, created_at`,
    [name, email, passwordHash, phone, role]
  );
  
  return result[0];
}

/**
 * Buscar usuário por email
 */
export async function getUserByEmail(email) {
  const result = await query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  
  return result[0];
}

/**
 * Buscar usuário por ID
 */
export async function getUserById(id) {
  const result = await query(
    'SELECT id, name, email, phone, role, created_at FROM users WHERE id = $1',
    [id]
  );
  
  return result[0];
}

// ============================================
// EXEMPLOS - SERVIÇOS
// ============================================

/**
 * Listar todos os serviços ativos
 */
export async function getActiveServices() {
  const result = await query(
    'SELECT * FROM services WHERE is_active = true ORDER BY name'
  );
  
  return result;
}

/**
 * Buscar serviço por ID
 */
export async function getServiceById(id) {
  const result = await query(
    'SELECT * FROM services WHERE id = $1',
    [id]
  );
  
  return result[0];
}

/**
 * Criar novo serviço
 */
export async function createService(serviceData) {
  const { name, description, durationMinutes, price } = serviceData;
  
  const result = await query(
    `INSERT INTO services (name, description, duration_minutes, price) 
     VALUES ($1, $2, $3, $4) 
     RETURNING *`,
    [name, description, durationMinutes, price]
  );
  
  return result[0];
}

// ============================================
// EXEMPLOS - BARBEIROS
// ============================================

/**
 * Listar todos os barbeiros disponíveis
 */
export async function getAvailableBarbers() {
  const result = await query(
    `SELECT b.id, u.name, u.email, u.phone, b.specialties, b.is_available
     FROM barbers b
     JOIN users u ON b.user_id = u.id
     WHERE b.is_available = true
     ORDER BY u.name`
  );
  
  return result;
}

/**
 * Buscar barbeiro por ID
 */
export async function getBarberById(id) {
  const result = await query(
    `SELECT b.id, u.name, u.email, u.phone, b.specialties, b.is_available
     FROM barbers b
     JOIN users u ON b.user_id = u.id
     WHERE b.id = $1`,
    [id]
  );
  
  return result[0];
}

// ============================================
// EXEMPLOS - AGENDAMENTOS
// ============================================

/**
 * Criar novo agendamento
 */
export async function createAppointment(appointmentData) {
  const { clientId, barberId, serviceId, appointmentDate, appointmentTime, notes } = appointmentData;
  
  const result = await query(
    `INSERT INTO appointments (client_id, barber_id, service_id, appointment_date, appointment_time, notes, status) 
     VALUES ($1, $2, $3, $4, $5, $6, 'pending') 
     RETURNING *`,
    [clientId, barberId, serviceId, appointmentDate, appointmentTime, notes]
  );
  
  return result[0];
}

/**
 * Listar agendamentos por data
 */
export async function getAppointmentsByDate(date) {
  const result = await query(
    `SELECT 
      a.id,
      a.appointment_date,
      a.appointment_time,
      a.status,
      a.notes,
      json_build_object('id', c.id, 'name', c.name, 'email', c.email, 'phone', c.phone) as client,
      json_build_object('id', b.id, 'name', u.name) as barber,
      json_build_object('id', s.id, 'name', s.name, 'duration', s.duration_minutes, 'price', s.price) as service
     FROM appointments a
     JOIN users c ON a.client_id = c.id
     LEFT JOIN barbers b ON a.barber_id = b.id
     LEFT JOIN users u ON b.user_id = u.id
     LEFT JOIN services s ON a.service_id = s.id
     WHERE a.appointment_date = $1
     ORDER BY a.appointment_time`,
    [date]
  );
  
  return result;
}

/**
 * Listar agendamentos de um cliente
 */
export async function getClientAppointments(clientId) {
  const result = await query(
    `SELECT 
      a.*,
      json_build_object('id', b.id, 'name', u.name) as barber,
      json_build_object('id', s.id, 'name', s.name, 'duration', s.duration_minutes, 'price', s.price) as service
     FROM appointments a
     LEFT JOIN barbers b ON a.barber_id = b.id
     LEFT JOIN users u ON b.user_id = u.id
     LEFT JOIN services s ON a.service_id = s.id
     WHERE a.client_id = $1
     ORDER BY a.appointment_date DESC, a.appointment_time DESC`,
    [clientId]
  );
  
  return result;
}

/**
 * Atualizar status do agendamento
 */
export async function updateAppointmentStatus(appointmentId, status) {
  const result = await query(
    `UPDATE appointments 
     SET status = $1, updated_at = CURRENT_TIMESTAMP 
     WHERE id = $2 
     RETURNING *`,
    [status, appointmentId]
  );
  
  return result[0];
}

/**
 * Cancelar agendamento
 */
export async function cancelAppointment(appointmentId) {
  return updateAppointmentStatus(appointmentId, 'cancelled');
}

/**
 * Verificar disponibilidade de horário
 */
export async function checkAvailability(barberId, date, time) {
  const result = await query(
    `SELECT COUNT(*) as count
     FROM appointments
     WHERE barber_id = $1
     AND appointment_date = $2
     AND appointment_time = $3
     AND status NOT IN ('cancelled')`,
    [barberId, date, time]
  );
  
  return result[0].count === 0;
}

// ============================================
// EXEMPLOS - HORÁRIOS DE FUNCIONAMENTO
// ============================================

/**
 * Obter horários de funcionamento
 */
export async function getBusinessHours() {
  const result = await query(
    `SELECT * FROM business_hours ORDER BY day_of_week`
  );
  
  return result;
}

/**
 * Verificar se está aberto em determinado dia
 */
export async function isOpenOnDay(dayOfWeek) {
  const result = await query(
    `SELECT * FROM business_hours WHERE day_of_week = $1 AND is_closed = false`,
    [dayOfWeek]
  );
  
  return result.length > 0 ? result[0] : null;
}

// ============================================
// EXEMPLO DE TRANSAÇÃO
// ============================================

/**
 * Criar agendamento completo com validações (usando transação)
 */
export async function createAppointmentWithValidation(appointmentData) {
  return transaction(async (db) => {
    const { clientId, barberId, serviceId, appointmentDate, appointmentTime, notes } = appointmentData;
    
    // 1. Verificar se o serviço existe e está ativo
    const service = await db(
      'SELECT * FROM services WHERE id = $1 AND is_active = true',
      [serviceId]
    );
    
    if (service.length === 0) {
      throw new Error('Serviço não encontrado ou inativo');
    }
    
    // 2. Verificar se o barbeiro está disponível
    const barber = await db(
      'SELECT * FROM barbers WHERE id = $1 AND is_available = true',
      [barberId]
    );
    
    if (barber.length === 0) {
      throw new Error('Barbeiro não encontrado ou indisponível');
    }
    
    // 3. Verificar conflito de horário
    const conflict = await db(
      `SELECT COUNT(*) as count
       FROM appointments
       WHERE barber_id = $1
       AND appointment_date = $2
       AND appointment_time = $3
       AND status NOT IN ('cancelled')`,
      [barberId, appointmentDate, appointmentTime]
    );
    
    if (conflict[0].count > 0) {
      throw new Error('Horário já está reservado');
    }
    
    // 4. Criar o agendamento
    const appointment = await db(
      `INSERT INTO appointments (client_id, barber_id, service_id, appointment_date, appointment_time, notes, status) 
       VALUES ($1, $2, $3, $4, $5, $6, 'pending') 
       RETURNING *`,
      [clientId, barberId, serviceId, appointmentDate, appointmentTime, notes]
    );
    
    return appointment[0];
  });
}

export default {
  // Users
  createUser,
  getUserByEmail,
  getUserById,
  
  // Services
  getActiveServices,
  getServiceById,
  createService,
  
  // Barbers
  getAvailableBarbers,
  getBarberById,
  
  // Appointments
  createAppointment,
  getAppointmentsByDate,
  getClientAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  checkAvailability,
  createAppointmentWithValidation,
  
  // Business Hours
  getBusinessHours,
  isOpenOnDay
};
