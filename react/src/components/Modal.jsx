import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { useScheduling } from '../hooks/useScheduling'
import { formatCardNumber, formatCardExpiry } from '../utils/helpers'

export default function Modal({ open, service, onClose }) {
  const { user } = useAuthContext()
  const { t } = useLanguage()
  const { createSchedule, validateScheduleDate } = useScheduling()
  const [metodo, setMetodo] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) {
      setMetodo('')
      setCardNumber('')
      setExpiry('')
      setError('')
    }
  }, [open])

  // Fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  // Bloquear scroll do body quando modal aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const dataHora = e.target['data-hora'].value
    if (!dataHora) {
      setError(t('selectDate'))
      return
    }

    // Validar data
    const validation = validateScheduleDate(dataHora)
    if (!validation.valid) {
      setError(validation.error)
      return
    }

    if (!metodo) {
      setError(t('selectPaymentMethod'))
      return
    }

    // Validar dados do cartão se necessário
    if (metodo === 'cartao') {
      const numero = e.target['numero-cartao']?.value
      const cvv = e.target['cvv']?.value
      const nome = e.target['nome-cartao']?.value

      if (!numero || !expiry || !cvv || !nome) {
        setError(t('fillCardData'))
        return
      }

      if (numero.replace(/\s/g, '').length !== 16) {
        setError(t('invalidCard'))
        return
      }
    }

    const scheduleData = {
      service,
      dataHora,
      metodo,
      cliente: user
    }

    const result = createSchedule(scheduleData)
    if (result.success) {
      alert(t('scheduleSuccess'))
      onClose()
    }
  }

  if (!open) return null

  return (
    <div className="modal active" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-titulo"
        aria-modal="true"
      >
        <span 
          className="close-modal" 
          onClick={onClose}
          role="button"
          aria-label="Fechar modal"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onClose()}
        >
          &times;
        </span>
        <h2 id="modal-titulo">{t('scheduleService')} - {service}</h2>
        {error && <div className="error-message">{error}</div>}
        <form id="form-agendamento" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="servico-selecionado">{t('service')}:</label>
            <input 
              id="servico-selecionado"
              readOnly 
              value={service}
              aria-readonly="true"
            />
          </div>
          <div className="form-group">
            <label htmlFor="data-hora">{t('dateTime')}:</label>
            <input 
              id="data-hora"
              name="data-hora" 
              type="datetime-local" 
              required 
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="metodo-pagamento">{t('paymentMethod')}:</label>
            <select 
              id="metodo-pagamento"
              value={metodo} 
              onChange={(e) => setMetodo(e.target.value)}
              required
            >
              <option value="">{t('selectPayment')}</option>
              <option value="pix">{t('pix')}</option>
              <option value="cartao">{t('card')}</option>
            </select>
          </div>
          
          {metodo === 'pix' && (
            <div className="pagamento-info pix-info">
              <p>✓ {t('pixInstructions')}</p>
            </div>
          )}
          
          {metodo === 'cartao' && (
            <div className="pagamento-info cartao-info">
              <div className="form-group">
                <label htmlFor="numero-cartao">{t('cardNumber')}:</label>
                <input 
                  id="numero-cartao"
                  name="numero-cartao"
                  placeholder="1234 5678 9012 3456" 
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  required
                />
              </div>
              <div className="card-details">
                <div className="form-group">
                  <label htmlFor="validade">{t('expiry')}:</label>
                  <input 
                    id="validade"
                    placeholder="MM/AA" 
                    maxLength={5}
                    value={expiry}
                    onChange={(e) => setExpiry(formatCardExpiry(e.target.value))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">{t('cvv')}:</label>
                  <input 
                    id="cvv"
                    name="cvv"
                    placeholder="123" 
                    maxLength={4}
                    pattern="[0-9]{3,4}"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="nome-cartao">{t('cardName')}:</label>
                <input 
                  id="nome-cartao"
                  name="nome-cartao"
                  placeholder={t('cardName').toUpperCase()}
                  required
                />
              </div>
            </div>
          )}
          
          <button className="btn-primary" type="submit">
            {t('confirmSchedule')}
          </button>
        </form>
      </div>
    </div>
  )
}
