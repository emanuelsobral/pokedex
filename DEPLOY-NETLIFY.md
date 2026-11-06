# Como Publicar a Pokédex no Netlify com Variáveis de Ambiente

Todas as chaves de API foram **removidas do código HTML** (`pokedex-violet.html` e `index.html`).
Agora o site busca as credenciais de forma segura através da função serverless `/api/config` configurada no [`netlify.toml`](netlify.toml).

---

## Passo 1: Enviar o Projeto para o GitHub (ou Netlify CLI)

Se o seu projeto estiver em um repositório no GitHub:
1. Suba esta pasta para o GitHub (o arquivo `.env` com suas chaves locais será ignorado automaticamente pelo `.gitignore`).

---

## Passo 2: Criar o Site no Netlify

1. Acesse [app.netlify.com](https://app.netlify.com/) e faça login.
2. Clique em **"Add new site"** > **"Import an existing project"**.
3. Selecione **GitHub** e escolha o repositório da Pokédex.
4. Na tela de configuração de build:
   - **Base directory:** (deixe vazio)
   - **Build command:** (deixe vazio)
   - **Publish directory:** `.` (ou deixe o padrão)

---

## Passo 3: Adicionar as Variáveis de Ambiente no Netlify

Antes de clicar em Deploy (ou depois em **Site configuration > Environment variables**):
1. Clique em **"Add a variable"**.
2. Adicione as duas variáveis:

| Key (Nome da Variável) | Value (Valor) |
| :--- | :--- |
| `SUPABASE_URL` | `https://bmeusvchuhaunkiexjjq.supabase.co` |
| `SUPABASE_ANON_KEY` | `sb_publishable_4_RC_VgmGFQ_4cKGwYSbfw_K-6Os6v6` |

3. Salve as variáveis.

---

## Passo 4: Fazer o Deploy

1. Clique em **"Deploy site"**.
2. Em poucos segundos o site estará online em um endereço seguro `https://seu-app.netlify.app`.
3. Ao carregar, a página chamará `/api/config` nos bastidores, receberá as variáveis do Netlify e ativará o botão **"☁ Entrar"** automaticamente, sem nenhuma chave exposta no código-fonte!

---

## Passo 5: Testes Locais

Para testar localmente antes de publicar:
1. Dê dois cliques em **`iniciar-servidor.bat`**.
2. O servidor local lerá as variáveis do arquivo `.env` e responderá em `/api/config` exatamente como o Netlify faz!

