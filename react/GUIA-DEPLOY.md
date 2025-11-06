# 🚀 GUIA DE DEPLOY - BARBEARIA LJ

Como colocar seu site React no ar gratuitamente!

---

## 🎯 OPÇÕES DE DEPLOY GRATUITO

### 1. Vercel (Recomendado) ⭐
- ✅ Deploy automático
- ✅ HTTPS grátis
- ✅ Domínio grátis (.vercel.app)
- ✅ Build otimizado
- ✅ Integração com GitHub

### 2. Netlify
- ✅ Fácil de usar
- ✅ Domínio grátis (.netlify.app)
- ✅ Forms e Functions grátis

### 3. GitHub Pages
- ✅ Hospedagem grátis
- ✅ Integrado com GitHub
- ✅ Domínio .github.io

---

## 🚀 MÉTODO 1: VERCEL (MAIS FÁCIL)

### Passo 1: Criar conta na Vercel
1. Acesse: https://vercel.com
2. Clique em "Sign Up"
3. Use sua conta do GitHub

### Passo 2: Fazer Push para GitHub
```powershell
# Na pasta do projeto
cd C:\Users\joao_poier\Desktop\tcc\Barbearia-LJ

# Inicializar Git (se ainda não fez)
git init
git add .
git commit -m "Migração para React completa"

# Criar repositório no GitHub e fazer push
git remote add origin https://github.com/SEU_USUARIO/barbearia-lj.git
git push -u origin main
```

### Passo 3: Importar no Vercel
1. No Vercel, clique "New Project"
2. Selecione seu repositório "barbearia-lj"
3. Configure:
   - **Framework:** Vite
   - **Root Directory:** `react`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Clique "Deploy"

### Passo 4: Aguardar Deploy
- ⏱️ Leva ~2 minutos
- ✅ URL será: `https://barbearia-lj-SEU_USUARIO.vercel.app`

---

## 🚀 MÉTODO 2: NETLIFY

### Passo 1: Criar conta na Netlify
1. Acesse: https://netlify.com
2. Sign up com GitHub

### Passo 2: Fazer Push para GitHub
(Mesmo procedimento do Vercel acima)

### Passo 3: Importar no Netlify
1. Clique "Add new site" → "Import existing project"
2. Conecte com GitHub
3. Selecione seu repositório
4. Configure:
   - **Base directory:** `react`
   - **Build command:** `npm run build`
   - **Publish directory:** `react/dist`
5. Deploy!

---

## 🚀 MÉTODO 3: GITHUB PAGES

### Passo 1: Instalar gh-pages
```powershell
cd C:\Users\joao_poier\Desktop\tcc\Barbearia-LJ\react
npm install --save-dev gh-pages
```

### Passo 2: Configurar package.json
Adicione ao `package.json`:
```json
{
  "homepage": "https://SEU_USUARIO.github.io/barbearia-lj",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Passo 3: Configurar vite.config.js
Modifique `vite.config.js`:
```javascript
export default defineConfig({
  base: '/barbearia-lj/',
  plugins: [react()]
})
```

### Passo 4: Deploy
```powershell
npm run deploy
```

### Passo 5: Configurar no GitHub
1. Vá em Settings → Pages
2. Source: gh-pages branch
3. Aguarde alguns minutos

URL: `https://SEU_USUARIO.github.io/barbearia-lj`

---

## ⚙️ CONFIGURAÇÕES IMPORTANTES

### Arquivo .gitignore
Certifique-se de ter um `.gitignore` na pasta `react`:
```
node_modules/
dist/
.DS_Store
.env
.env.local
*.log
```

### Variáveis de Ambiente
Se usar API no futuro, crie arquivo `.env`:
```
VITE_API_URL=https://sua-api.com
VITE_API_KEY=sua-chave-secreta
```

No Vercel/Netlify:
1. Vá em Settings → Environment Variables
2. Adicione as variáveis

---

## 🔧 OTIMIZAÇÕES PRÉ-DEPLOY

### 1. Otimizar Imagens
```powershell
# Instalar imagemin
npm install --save-dev vite-plugin-imagemin

# Converter para WebP
# Use: https://squoosh.app/
```

### 2. Configurar vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
})
```

### 3. Adicionar Meta Tags (SEO)
Em `react/index.html`:
```html
<head>
  <meta name="description" content="Barbearia LJ - O melhor estilo para você">
  <meta name="keywords" content="barbearia, corte, barba, cabelo">
  <meta property="og:title" content="Barbearia LJ">
  <meta property="og:description" content="O melhor estilo para você">
  <meta property="og:image" content="/imagens/logo.png">
</head>
```

---

## 🧪 TESTAR ANTES DO DEPLOY

### Build Local
```powershell
cd react
npm run build
npm run preview
```

Acesse: http://localhost:4173

### Checklist Pré-Deploy
- [ ] Build sem erros
- [ ] Preview funcionando
- [ ] Todas as imagens carregam
- [ ] Links funcionam
- [ ] Responsivo em mobile
- [ ] Performance boa (Lighthouse)

---

## 🎯 PÓS-DEPLOY

### 1. Testar o Site Online
- [ ] Todas as páginas funcionam
- [ ] Imagens carregam
- [ ] HTTPS ativo
- [ ] Responsivo funciona

### 2. Configurar Domínio Customizado (Opcional)

#### Na Vercel:
1. Settings → Domains
2. Add Domain
3. Siga instruções de DNS

#### Na Netlify:
1. Domain Settings → Add custom domain
2. Atualizar DNS no seu provedor

### 3. Analytics (Opcional)

#### Google Analytics
```html
<!-- Adicionar em index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

#### Vercel Analytics
```powershell
npm i @vercel/analytics
```

```jsx
// Em App.jsx
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  return (
    <>
      <Analytics />
      {/* resto do app */}
    </>
  )
}
```

---

## 🐛 PROBLEMAS COMUNS

### ❌ 404 em rotas
**Solução:** Adicionar arquivo `_redirects` na pasta `public`:
```
/* /index.html 200
```

### ❌ Imagens não carregam
**Solução:** Verificar caminhos:
- Use `/imagens/foto.jpg` (com barra inicial)
- Imagens devem estar em `public/imagens`

### ❌ Build muito grande
**Solução:**
1. Otimizar imagens
2. Code splitting
3. Tree shaking

---

## 📊 MONITORAMENTO

### Lighthouse Score
```powershell
# Rodar Lighthouse
npx lighthouse https://seu-site.vercel.app --view
```

Objetivos:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### Web Vitals
Monitore no Google Search Console:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

---

## 🎉 SUCESSO!

Após o deploy, você terá:
✅ Site no ar 24/7
✅ HTTPS seguro
✅ URL pública
✅ Deploy automático (Vercel/Netlify)

### Compartilhe:
- 📱 WhatsApp
- 📘 Facebook
- 📸 Instagram
- 💼 LinkedIn

---

## 🔄 ATUALIZAÇÕES FUTURAS

Depois do primeiro deploy:

```powershell
# 1. Fazer mudanças no código
# 2. Commit
git add .
git commit -m "Descrição da mudança"

# 3. Push
git push

# 4. Deploy automático! ✨
# Vercel/Netlify detectam e fazem deploy automaticamente
```

---

## 📞 SUPORTE

### Links Úteis
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Vite Docs: https://vitejs.dev

### Problemas?
1. Verifique os logs de deploy
2. Consulte a documentação
3. Procure no Stack Overflow
4. Discord do Vite/React

---

**Boa sorte com o deploy!** 🚀

*Última atualização: 06/11/2025*
