# 🚀 Deploy Guide - Barbearia LJ

## Opções de Deploy

### 1️⃣ Vercel (Recomendado - Grátis)

**Passo a passo:**

```powershell
# Instalar Vercel CLI
npm i -g vercel

# Fazer deploy
cd react
vercel
```

**Configuração automática:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework Preset: Vite

**Domínio customizado**: Configure em Settings → Domains

---

### 2️⃣ Netlify (Alternativa Grátis)

```powershell
# Instalar Netlify CLI
npm i -g netlify-cli

# Fazer deploy
cd react
netlify deploy
```

**Configuração:**
- Build command: `npm run build`
- Publish directory: `dist`

**Redirects**: Criar `public/_redirects`:
```
/* /index.html 200
```

---

### 3️⃣ GitHub Pages

**1. Criar repositório no GitHub**

**2. Adicionar ao package.json:**
```json
{
  "homepage": "https://seuusuario.github.io/barbearia-lj"
}
```

**3. Instalar gh-pages:**
```powershell
npm install --save-dev gh-pages
```

**4. Adicionar scripts:**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**5. Deploy:**
```powershell
npm run deploy
```

---

### 4️⃣ Firebase Hosting

```powershell
# Instalar Firebase CLI
npm i -g firebase-tools

# Login
firebase login

# Inicializar
firebase init hosting

# Deploy
firebase deploy
```

**Configuração (firebase.json):**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

### 5️⃣ Servidor VPS (Ubuntu)

**Requisitos:**
- Ubuntu 20.04+
- Nginx
- Node.js

**Setup:**

```bash
# Conectar via SSH
ssh user@seu-servidor.com

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar Nginx
sudo apt install nginx

# Clonar projeto
git clone https://github.com/seu-usuario/barbearia-lj.git
cd barbearia-lj/react

# Instalar dependências e build
npm install
npm run build

# Copiar para Nginx
sudo cp -r dist/* /var/www/html/

# Configurar Nginx (/etc/nginx/sites-available/default)
server {
    listen 80;
    server_name seu-dominio.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Reiniciar Nginx
sudo systemctl restart nginx
```

---

## 🔒 Configurações de Segurança

### Headers de Segurança (Nginx)

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

### HTTPS (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
```

---

## 📊 Monitoramento

### Google Analytics

Adicionar em `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Sentry (Error Tracking)

```powershell
npm install @sentry/react
```

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

---

## ⚡ Otimizações

### Compressão Gzip (Nginx)

```nginx
gzip on;
gzip_vary on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

### Cache Headers

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## 🔄 CI/CD (GitHub Actions)

Criar `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: cd react && npm install
      - run: cd react && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./react/dist
```

---

## 📝 Checklist Pré-Deploy

- [ ] Build passa sem erros
- [ ] Testar em diferentes navegadores
- [ ] Testar em mobile
- [ ] Otimizar imagens (WebP)
- [ ] Configurar meta tags SEO
- [ ] Adicionar favicon
- [ ] Configurar robots.txt
- [ ] Configurar sitemap.xml
- [ ] Testar performance (Lighthouse)
- [ ] Configurar HTTPS
- [ ] Adicionar analytics

---

**Boa sorte com o deploy! 🚀**
