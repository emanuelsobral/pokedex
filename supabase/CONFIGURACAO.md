# Configuração do Supabase (Login & Banco de Dados)

A Pokédex agora conta com suporte nativo a login e sincronização na nuvem via **Supabase**.
Enquanto você não configurar as chaves, o site continua funcionando normalmente em modo local/offline neste navegador.

---

## Passo 1: Criar o Projeto no Supabase (Gratuito)

1. Acesse [supabase.com](https://supabase.com) e faça login ou crie uma conta gratuita.
2. Clique em **"New Project"**.
3. Defina um nome (ex.: `pokedex-violet`), uma senha (Seunomeseralembrado?) para o banco de dados e escolha a região mais próxima (ex.: `Sao Paulo (sa-east-1)`).
4. Aguarde cerca de 1 a 2 minutos até o projeto ser provisionado.

---

## Passo 2: Executar o Script do Banco de Dados

1. No painel do seu projeto no Supabase, clique no menu lateral em **SQL Editor**.
2. Clique em **New query**.
3. Abra o arquivo [`supabase/schema.sql`](schema.sql) deste projeto, copie todo o seu conteúdo e cole no editor do Supabase.
4. Clique no botão verde **Run** (ou aperte `Ctrl + Enter`).
5. A tabela `pokedex_progress` será criada com regras de segurança Row Level Security (RLS), garantindo que cada usuário só possa visualizar e alterar seu próprio progresso.

---

## Passo 3: Obter as Chaves e Configurar

1. No painel do Supabase, clique no ícone de engrenagem no canto inferior esquerdo (**Project Settings**).
2. Vá na aba **API**.
3. Copie os seguintes valores:
   - **Project URL** (ex.: `https://xyzcompany.supabase.co`)
   - **Project API keys** -> pegue a chave **`anon` / `public`** (ela é segura para uso no navegador).

### Opção 1: Direto pelo Navegador (Sem editar código)
1. Abra o `pokedex-violet.html` no seu navegador.
2. Clique no botão **"☁ Entrar"** no topo.
3. Clique em **"⚙ Configuração da conexão (Supabase)"**.
4. Cole o **Project URL** e a **Chave Anon**.
5. Clique em **Salvar e conectar**. Pronto! Suas credenciais ficam salvas no navegador e o login passa a funcionar imediatamente.

### Opção 2: Fixar no Código HTML (Para publicar na web)
Se for hospedar o site no Netlify, Vercel ou GitHub Pages para que qualquer pessoa ou dispositivo já entre configurado:
1. Abra o arquivo [`pokedex-violet.html`](../pokedex-violet.html), localize as constantes:
   ```javascript
   const SUPABASE_URL = 'https://SEU-PROJETO.supabase.co';
   const SUPABASE_ANON_KEY = 'SUA-CHAVE-ANON-PUBLIC-AQUI';
   ```
2. Cole seus valores e salve o arquivo.

---

## Passo 4: Ativar os Provedores de Login

### 1. E-mail e Senha (Já ativo por padrão)
- No menu lateral do Supabase, vá em **Authentication** > **Providers** > **Email**.
- Se preferir que as pessoas possam testar de imediato sem precisar confirmar o e-mail na caixa de entrada, desative a opção **"Confirm email"**.

### 2. Login com Google (Opcional)
> **Atenção:** Provedores OAuth (Google e Discord) exigem que o site esteja rodando em um endereço web (ex.: Netlify, Vercel, GitHub Pages) ou em `http://localhost`. Não funcionam abrindo o arquivo local como `file://`.
1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um projeto e configure as credenciais OAuth 2.0 (Web Application).
3. No Supabase, vá em **Authentication** > **Providers** > **Google**.
4. Copie o **Callback URL** do Supabase e cole no Google Console em "Authorized redirect URIs".
5. Copie o **Client ID** e **Client Secret** do Google e cole no Supabase. Ative o interruptor e salve.

### 3. Login com Discord (Opcional)
1. Acesse o [Discord Developer Portal](https://discord.com/developers/applications).
2. Crie uma nova aplicação e vá na aba **OAuth2**.
3. No Supabase, vá em **Authentication** > **Providers** > **Discord**, copie o **Callback URL** e adicione no Discord Developer Portal em "Redirects".
4. Copie o **Client ID** e **Client Secret** do Discord e cole no Supabase. Ative o interruptor e salve.

---

## Passo 5: Hospedagem Gratuita (Netlify, Vercel ou GitHub Pages)

Para colocar o site no ar e poder acessar de qualquer celular ou PC com sincronização em tempo real:

### Opção A: Netlify Drop (Mais simples, sem terminal)
1. Renomeie `pokedex-violet.html` para `index.html` (ou configure no painel).
2. Acesse [app.netlify.com/drop](https://app.netlify.com/drop).
3. Arraste a pasta onde está o arquivo. O site fica no ar em segundos com endereço HTTPS gratuito.

### Opção B: GitHub Pages
1. Crie um repositório no GitHub e envie o arquivo renomeado para `index.html`.
2. Em **Settings** > **Pages**, selecione a branch `main` e salve.

