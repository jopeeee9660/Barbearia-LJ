-- Dados Iniciais - Barbearia LJ

-- Inserir serviços iniciais
INSERT INTO services (name, description, duration_minutes, price) VALUES
('Corte Simples', 'Corte de cabelo tradicional', 30, 35.00),
('Corte + Barba', 'Corte de cabelo e barba completa', 45, 50.00),
('Barba', 'Aparar e modelar barba', 20, 25.00),
('Corte Degradê', 'Corte degradê moderno', 40, 45.00),
('Hidratação Capilar', 'Tratamento de hidratação profunda', 30, 40.00),
('Platinado', 'Descoloração completa', 120, 150.00),
('Luzes', 'Mechas e luzes', 90, 120.00),
('Sobrancelha', 'Design e aparar sobrancelhas', 15, 20.00);

-- Inserir horários de funcionamento
INSERT INTO business_hours (day_of_week, open_time, close_time, is_closed) VALUES
(0, '09:00', '18:00', true),  -- Domingo - Fechado
(1, '09:00', '19:00', false), -- Segunda
(2, '09:00', '19:00', false), -- Terça
(3, '09:00', '19:00', false), -- Quarta
(4, '09:00', '19:00', false), -- Quinta
(5, '09:00', '20:00', false), -- Sexta
(6, '08:00', '18:00', false); -- Sábado

-- Inserir usuário admin padrão
-- Senha padrão: admin123 (deve ser alterada em produção)
-- Hash bcrypt para 'admin123': $2a$10$rQZY5ZYZYZYZYZYZYZYZYuXXXXXXXXXXXXXXXXXXXXXXXXXXXX
INSERT INTO users (name, email, password_hash, phone, role) VALUES
('Administrador', 'admin@barbearia-lj.com', '$2a$10$rQZY5ZYZYZYZYZYZYZYZYuXXXXXXXXXXXXXXXXXXXXXXXXXXXX', '(11) 99999-9999', 'admin');

-- Inserir barbeiros de exemplo
INSERT INTO users (name, email, password_hash, phone, role) VALUES
('Lucas Silva', 'lucas@barbearia-lj.com', '$2a$10$rQZY5ZYZYZYZYZYZYZYZYuXXXXXXXXXXXXXXXXXXXXXXXXXXXX', '(11) 98888-8888', 'barber'),
('João Santos', 'joao@barbearia-lj.com', '$2a$10$rQZY5ZYZYZYZYZYZYZYZYuXXXXXXXXXXXXXXXXXXXXXXXXXXXX', '(11) 97777-7777', 'barber');

-- Associar barbeiros
INSERT INTO barbers (user_id, specialties, is_available)
SELECT id, ARRAY['Corte', 'Barba', 'Degradê'], true
FROM users WHERE email IN ('lucas@barbearia-lj.com', 'joao@barbearia-lj.com');
