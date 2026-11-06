const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

// Lê arquivo .env local se existir
function loadLocalEnv() {
  const envPath = path.join(__dirname, '.env');
  const env = {};
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx > 0) {
        const k = trimmed.slice(0, idx).trim();
        const v = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
        env[k] = v;
      }
    }
  }
  return env;
}
const localEnv = loadLocalEnv();

const server = http.createServer((req, res) => {
  let file = decodeURIComponent(req.url.split('?')[0].split('#')[0]);

  // Endpoint de configuração simulando a função do Netlify
  if (file === '/api/config') {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({
      url: process.env.SUPABASE_URL || localEnv.SUPABASE_URL || '',
      key: process.env.SUPABASE_ANON_KEY || localEnv.SUPABASE_ANON_KEY || ''
    }));
    return;
  }

  if (file === '/' || file === '') file = '/index.html';
  const fullPath = path.join(__dirname, file);

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Arquivo não encontrado: ' + file);
      return;
    }
    const ext = path.extname(fullPath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`Pokédex Violet rodando com sucesso!`);
  console.log(`Acesse: http://localhost:${PORT}`);
  console.log(`Configuração: ${localEnv.SUPABASE_URL ? 'carregada de .env' : 'modo local'}`);
  console.log(`(Pressione Ctrl + C para encerrar)`);
  console.log(`========================================\n`);

  const cmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  require('child_process').exec(`${cmd} http://localhost:${PORT}`);
});
