@echo off
chcp 65001 >nul
title ProGanado — Arranque Automatico (Sin Admin)
cd /d "%~dp0"

echo ============================================================
echo   ProGanado — Sistema de Gestion Ganadera (v4.1)
echo   Modo Usuario Estandar (0 permisos de Administrador)
echo ============================================================
echo.

REM 1. Probar si hay Python real instalado (evitando el alias vacio de Microsoft Store)
python -c "import http.server" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Python detectado. Iniciando servidor local en http://127.0.0.1:8899/index.html
    start "" http://127.0.0.1:8899/index.html
    python servidor.py
    goto :end
)

REM 2. Si no hay Python en la PC del CESDE, probar si hay Node.js
node -v >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node.js detectado. Iniciando servidor local en http://127.0.0.1:8899/index.html
    start "" http://127.0.0.1:8899/index.html
    node -e "const http=require('http'),fs=require('fs'),path=require('path');const codes={};const mimes={'.html':'text/html;charset=utf-8','.css':'text/css;charset=utf-8','.js':'application/javascript;charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml'};http.createServer((req,res)=>{if(req.method==='POST'&&req.url==='/api/enviar-codigo'){let b='';req.on('data',c=>b+=c);req.on('end',()=>{const d=JSON.parse(b||'{}');const c=String(Math.floor(100000+Math.random()*900000));codes[(d.correo||'').toLowerCase()]=c;res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({ok:true,modo_prueba:true,codigo_prueba:c}));});return;}if(req.method==='POST'&&req.url==='/api/verificar-codigo'){let b='';req.on('data',c=>b+=c);req.on('end',()=>{const d=JSON.parse(b||'{}');const k=(d.correo||'').toLowerCase();const ok=codes[k]&&codes[k]===String(d.codigo||'').trim();if(ok)delete codes[k];res.writeHead(ok?200:400,{'Content-Type':'application/json'});res.end(JSON.stringify({ok,msg:ok?'':'Codigo incorrecto'}));});return;}const u=decodeURIComponent(req.url.split('?')[0]);const fp=path.join(process.cwd(),u==='/'?'index.html':u);if(!fp.startsWith(process.cwd())||!fs.existsSync(fp)||fs.statSync(fp).isDirectory()){res.writeHead(404);res.end('Not found');return;}res.writeHead(200,{'Content-Type':mimes[path.extname(fp).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});fs.createReadStream(fp).pipe(res);}).listen(8899,'127.0.0.1',()=>console.log('Servidor Node activo en http://127.0.0.1:8899/index.html'));"
    goto :end
)

REM 3. Fallback directo sin servidor (abre index.html directo en el navegador con 2FA local)
echo [OK] Abriendo ProGanado directamente en el navegador (Modo Local Sin Servidor)...
start "" "%~dp0index.html"

:end
pause