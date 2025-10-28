import { useState, useEffect } from 'react'

/**
 * Hook para gerenciar agendamentos
 * Substitui lógica de js/agendamento.js
 */
export function useScheduling() {
  const [schedules, setSchedules] = useState([])

  // Carregar agendamentos do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('agendamentos')
    if (saved) {
      try {
        setSchedules(JSON.parse(saved))
      } catch (error) {
        console.error('Erro ao carregar agendamentos:', error)
      }
    }
  }, [])

  // Criar novo agendamento
  const createSchedule = (scheduleData) => {
    const newSchedule = {
      id: Date.now(),
      ...scheduleData,
      createdAt: new Date().toISOString(),
      status: 'confirmado'
    }

    const updated = [...schedules, newSchedule]
    setSchedules(updated)
    localStorage.setItem('agendamentos', JSON.stringify(updated))
    
    return { success: true, schedule: newSchedule }
  }

  // Cancelar agendamento
  const cancelSchedule = (scheduleId) => {
    const updated = schedules.filter(s => s.id !== scheduleId)
    setSchedules(updated)
    localStorage.setItem('agendamentos', JSON.stringify(updated))
    
    return { success: true }
  }

  // Obter agendamentos do usuário
  const getUserSchedules = (username) => {
    return schedules.filter(s => s.cliente === username)
  }

  // Validar data de agendamento
  const validateScheduleDate = (dateTime) => {
    const scheduleDate = new Date(dateTime)
    const now = new Date()

    if (scheduleDate < now) {
      return { valid: false, error: 'Data deve ser futura' }
    }

    // Verificar horário de funcionamento (9h às 20h)
    const hour = scheduleDate.getHours()
    if (hour < 9 || hour >= 20) {
      return { valid: false, error: 'Horário de funcionamento: 9h às 20h' }
    }

    // Verificar se não é domingo (0 = domingo)
    if (scheduleDate.getDay() === 0) {
      return { valid: false, error: 'Não abrimos aos domingos' }
    }

    return { valid: true }
  }

  return {
    schedules,
    createSchedule,
    cancelSchedule,
    getUserSchedules,
    validateScheduleDate
  }
}
