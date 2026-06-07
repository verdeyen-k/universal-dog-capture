const http = require('http');
const fs   = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 3001;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
};

const httpServer = http.createServer((req, res) => {
  const file = req.url === '/' ? 'index.html' : req.url.replace(/^\//, '');
  const filePath = path.join(__dirname, file);
  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });
});

// ── WebSocket relay ────────────────────────────────────────────────
const rooms = new Map();
const CHARS  = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const genCode = () => Array.from({ length: 4 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', ws => {
  ws.on('message', raw => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    if (msg.t === 'create') {
      let code;
      do { code = genCode(); } while (rooms.has(code));
      rooms.set(code, { p1: ws, p2: null });
      ws.code = code; ws.role = 'p1';
      ws.send(JSON.stringify({ t: 'created', code }));

    } else if (msg.t === 'join') {
      const code = (msg.code || '').toUpperCase();
      const room = rooms.get(code);
      if (!room || room.p2) {
        ws.send(JSON.stringify({ t: 'error', msg: room ? 'Room is full' : 'Room not found' }));
        return;
      }
      room.p2 = ws; ws.code = code; ws.role = 'p2';
      ws.send(JSON.stringify({ t: 'joined' }));
      room.p1.send(JSON.stringify({ t: 'ready' }));

    } else if (msg.t === 'relay') {
      const room = rooms.get(ws.code);
      if (!room) return;
      const other = ws.role === 'p1' ? room.p2 : room.p1;
      if (other && other.readyState === 1) other.send(JSON.stringify(msg));
    }
  });

  ws.on('close', () => {
    if (!ws.code) return;
    const room = rooms.get(ws.code);
    if (!room) return;
    const other = ws.role === 'p1' ? room.p2 : room.p1;
    if (other && other.readyState === 1) other.send(JSON.stringify({ t: 'gone' }));
    rooms.delete(ws.code);
  });
});

httpServer.listen(PORT, () => console.log(`Dog capture running on http://localhost:${PORT}`));
