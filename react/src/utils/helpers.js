/**
 * Utilitários e helpers diversos
 * Substitui funções espalhadas em script.js
 */

// Tradução i18n (simplificado)
export const translations = {
  pt: {
    welcome: 'Bem-vindo à Barbearia LJ',
    welcomeText: 'Aqui você encontra os melhores profissionais para cuidar do seu visual!',
    services: 'Nossos Serviços',
    about: 'Sobre Nós',
    aboutText: 'Com anos de experiência no mercado, a Barbearia LJ se destaca pela qualidade e profissionalismo.',
    contact: 'Contato',
    address: 'Endereço',
    phone: 'Telefone',
    email: 'Email',
    schedule: 'Agendar',
    login: 'Entrar',
    logout: 'Sair',
    register: 'Criar Conta'
  },
  en: {
    welcome: 'Welcome to Barbearia LJ',
    welcomeText: 'Here you will find the best professionals to take care of your style!',
    services: 'Our Services',
    about: 'About Us',
    aboutText: 'With years of experience in the market, Barbearia LJ stands out for its quality and professionalism.',
    contact: 'Contact',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    schedule: 'Schedule',
    login: 'Login',
    logout: 'Logout',
    register: 'Sign Up'
  },
  es: {
    welcome: 'Bienvenido a Barbearia LJ',
    welcomeText: '¡Aquí encontrarás los mejores profesionales para cuidar tu imagen!',
    services: 'Nuestros Servicios',
    about: 'Sobre Nosotros',
    aboutText: 'Con años de experiencia en el mercado, Barbearia LJ se destaca por su calidad y profesionalismo.',
    contact: 'Contacto',
    address: 'Dirección',
    phone: 'Teléfono',
    email: 'Correo',
    schedule: 'Agendar',
    login: 'Entrar',
    logout: 'Salir',
    register: 'Registrarse'
  }
}

// Formatar data para exibição
export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Formatar preço
export function formatPrice(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

// Validar email
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Validar telefone brasileiro
export function isValidPhone(phone) {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length === 10 || cleaned.length === 11
}

// Formatar número de cartão
export function formatCardNumber(value) {
  const cleaned = value.replace(/\D/g, '')
  const chunks = cleaned.match(/.{1,4}/g) || []
  return chunks.join(' ').substr(0, 19)
}

// Formatar validade do cartão (MM/AA)
export function formatCardExpiry(value) {
  const cleaned = value.replace(/\D/g, '')
  if (cleaned.length >= 2) {
    return cleaned.substr(0, 2) + '/' + cleaned.substr(2, 2)
  }
  return cleaned
}

// Debounce helper
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
