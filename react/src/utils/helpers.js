/**
 * Utilitários e helpers diversos
 * Substitui funções espalhadas em script.js
 */

// Tradução i18n completa
export const translations = {
  pt: {
    // Header
    searchServices: 'Pesquise serviços',
    where: 'Onde?',
    login: 'Entrar',
    logout: 'Sair',
    
    // Home
    welcome: 'Bem-vindo à Barbearia LJ',
    welcomeText: 'Aqui você encontra os melhores profissionais para cuidar do seu visual!',
    
    // Services
    services: 'Nossos Serviços',
    haircut: 'Corte de Cabelo',
    haircutDesc: 'Cortes modernos e tradicionais com os melhores profissionais',
    beard: 'Barba',
    beardDesc: 'Aparar e modelar sua barba com técnicas profissionais',
    fullPackage: 'Pacote Completo',
    fullPackageDesc: 'Corte + Barba - A melhor experiência completa',
    schedule: 'Agendar',
    mostPopular: 'Mais Popular',
    
    // About
    about: 'Sobre Nós',
    aboutText: 'Com anos de experiência no mercado, a Barbearia LJ se destaca pela qualidade e profissionalismo. Nossa equipe é composta por profissionais altamente qualificados, prontos para oferecer o melhor serviço para você.',
    
    // Contact
    contact: 'Contato',
    address: 'Endereço',
    addressText: 'Rua Principal, 123 - Centro',
    phone: 'Telefone',
    phoneText: '(11) 99999-9999',
    email: 'Email',
    emailText: 'contato@barbearialj.com',
    hours: 'Horário de Funcionamento',
    hoursText: 'Seg-Sáb: 9h às 20h',
    
    // Modal
    scheduleService: 'Agendar Serviço',
    service: 'Serviço',
    dateTime: 'Data e Hora',
    paymentMethod: 'Método de Pagamento',
    selectPayment: 'Selecione o método de pagamento',
    pix: 'PIX',
    card: 'Cartão de Crédito/Débito',
    pixInstructions: 'Após confirmar, você receberá o QR Code do PIX por e-mail',
    cardNumber: 'Número do Cartão',
    expiry: 'Validade',
    cvv: 'CVV',
    cardName: 'Nome no Cartão',
    confirmSchedule: 'Confirmar Agendamento',
    
    // Footer
    allRightsReserved: 'Todos os direitos reservados',
    
    // Login
    loginTitle: 'Bem-vindo à Barbearia LJ',
    username: 'Usuário',
    password: 'Senha',
    enterUsername: 'Digite seu usuário',
    enterPassword: 'Digite sua senha',
    noAccount: 'Não tem uma conta?',
    createAccount: 'Criar conta',
    backToSite: 'Voltar para o site',
    
    // Register
    registerTitle: 'Criar Conta',
    chooseUsername: 'Escolha um nome de usuário',
    choosePassword: 'Escolha uma senha forte',
    confirmPassword: 'Confirmar Senha',
    retypePassword: 'Digite a senha novamente',
    minChars: 'Mínimo 3 caracteres',
    minPassword: 'Mínimo 6 caracteres',
    hasAccount: 'Já tem uma conta?',
    
    // Menu/Sidebar
    home: 'Início',
    
    // Validation
    selectDate: 'Selecione data e hora',
    selectPaymentMethod: 'Selecione o método de pagamento',
    fillCardData: 'Preencha todos os dados do cartão',
    invalidCard: 'Número do cartão inválido',
    scheduleSuccess: 'Agendamento realizado com sucesso!',
    
    // Days
    sunday: 'Domingo',
    monday: 'Segunda',
    tuesday: 'Terça',
    wednesday: 'Quarta',
    thursday: 'Quinta',
    friday: 'Sexta',
    saturday: 'Sábado'
  },
  en: {
    // Header
    searchServices: 'Search services',
    where: 'Where?',
    login: 'Login',
    logout: 'Logout',
    
    // Home
    welcome: 'Welcome to Barbearia LJ',
    welcomeText: 'Here you will find the best professionals to take care of your style!',
    
    // Services
    services: 'Our Services',
    haircut: 'Haircut',
    haircutDesc: 'Modern and traditional cuts with the best professionals',
    beard: 'Beard',
    beardDesc: 'Trim and shape your beard with professional techniques',
    fullPackage: 'Full Package',
    fullPackageDesc: 'Haircut + Beard - The complete best experience',
    schedule: 'Schedule',
    mostPopular: 'Most Popular',
    
    // About
    about: 'About Us',
    aboutText: 'With years of experience in the market, Barbearia LJ stands out for its quality and professionalism. Our team is composed of highly qualified professionals, ready to offer you the best service.',
    
    // Contact
    contact: 'Contact',
    address: 'Address',
    addressText: 'Main Street, 123 - Downtown',
    phone: 'Phone',
    phoneText: '(11) 99999-9999',
    email: 'Email',
    emailText: 'contact@barbearialj.com',
    hours: 'Business Hours',
    hoursText: 'Mon-Sat: 9am to 8pm',
    
    // Modal
    scheduleService: 'Schedule Service',
    service: 'Service',
    dateTime: 'Date and Time',
    paymentMethod: 'Payment Method',
    selectPayment: 'Select payment method',
    pix: 'PIX',
    card: 'Credit/Debit Card',
    pixInstructions: 'After confirmation, you will receive the PIX QR Code by email',
    cardNumber: 'Card Number',
    expiry: 'Expiry',
    cvv: 'CVV',
    cardName: 'Name on Card',
    confirmSchedule: 'Confirm Appointment',
    
    // Footer
    allRightsReserved: 'All rights reserved',
    
    // Login
    loginTitle: 'Welcome to Barbearia LJ',
    username: 'Username',
    password: 'Password',
    enterUsername: 'Enter your username',
    enterPassword: 'Enter your password',
    noAccount: "Don't have an account?",
    createAccount: 'Create account',
    backToSite: 'Back to site',
    
    // Register
    registerTitle: 'Create Account',
    chooseUsername: 'Choose a username',
    choosePassword: 'Choose a strong password',
    confirmPassword: 'Confirm Password',
    retypePassword: 'Retype password',
    minChars: 'Minimum 3 characters',
    minPassword: 'Minimum 6 characters',
    hasAccount: 'Already have an account?',
    
    // Menu/Sidebar
    home: 'Home',
    
    // Validation
    selectDate: 'Select date and time',
    selectPaymentMethod: 'Select payment method',
    fillCardData: 'Fill in all card details',
    invalidCard: 'Invalid card number',
    scheduleSuccess: 'Appointment successfully scheduled!',
    
    // Days
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday'
  },
  es: {
    // Header
    searchServices: 'Buscar servicios',
    where: '¿Dónde?',
    login: 'Entrar',
    logout: 'Salir',
    
    // Home
    welcome: 'Bienvenido a Barbearia LJ',
    welcomeText: '¡Aquí encontrarás los mejores profesionales para cuidar tu imagen!',
    
    // Services
    services: 'Nuestros Servicios',
    haircut: 'Corte de Cabello',
    haircutDesc: 'Cortes modernos y tradicionales con los mejores profesionales',
    beard: 'Barba',
    beardDesc: 'Recortar y modelar tu barba con técnicas profesionales',
    fullPackage: 'Paquete Completo',
    fullPackageDesc: 'Corte + Barba - La mejor experiencia completa',
    schedule: 'Agendar',
    mostPopular: 'Más Popular',
    
    // About
    about: 'Sobre Nosotros',
    aboutText: 'Con años de experiencia en el mercado, Barbearia LJ se destaca por su calidad y profesionalismo. Nuestro equipo está compuesto por profesionales altamente calificados, listos para ofrecerle el mejor servicio.',
    
    // Contact
    contact: 'Contacto',
    address: 'Dirección',
    addressText: 'Calle Principal, 123 - Centro',
    phone: 'Teléfono',
    phoneText: '(11) 99999-9999',
    email: 'Correo',
    emailText: 'contacto@barbearialj.com',
    hours: 'Horario de Atención',
    hoursText: 'Lun-Sáb: 9h a 20h',
    
    // Modal
    scheduleService: 'Agendar Servicio',
    service: 'Servicio',
    dateTime: 'Fecha y Hora',
    paymentMethod: 'Método de Pago',
    selectPayment: 'Seleccione el método de pago',
    pix: 'PIX',
    card: 'Tarjeta de Crédito/Débito',
    pixInstructions: 'Después de confirmar, recibirá el código QR PIX por correo electrónico',
    cardNumber: 'Número de Tarjeta',
    expiry: 'Vencimiento',
    cvv: 'CVV',
    cardName: 'Nombre en la Tarjeta',
    confirmSchedule: 'Confirmar Cita',
    
    // Footer
    allRightsReserved: 'Todos los derechos reservados',
    
    // Login
    loginTitle: 'Bienvenido a Barbearia LJ',
    username: 'Usuario',
    password: 'Contraseña',
    enterUsername: 'Ingrese su usuario',
    enterPassword: 'Ingrese su contraseña',
    noAccount: '¿No tienes una cuenta?',
    createAccount: 'Crear cuenta',
    backToSite: 'Volver al sitio',
    
    // Register
    registerTitle: 'Crear Cuenta',
    chooseUsername: 'Elige un nombre de usuario',
    choosePassword: 'Elige una contraseña segura',
    confirmPassword: 'Confirmar Contraseña',
    retypePassword: 'Vuelva a escribir la contraseña',
    minChars: 'Mínimo 3 caracteres',
    minPassword: 'Mínimo 6 caracteres',
    hasAccount: '¿Ya tienes una cuenta?',
    
    // Menu/Sidebar
    home: 'Inicio',
    
    // Validation
    selectDate: 'Seleccione fecha y hora',
    selectPaymentMethod: 'Seleccione el método de pago',
    fillCardData: 'Complete todos los datos de la tarjeta',
    invalidCard: 'Número de tarjeta inválido',
    scheduleSuccess: '¡Cita programada con éxito!',
    
    // Days
    sunday: 'Domingo',
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado'
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
