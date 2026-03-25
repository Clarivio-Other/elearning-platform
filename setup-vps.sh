#!/bin/bash
# ============================================================
# Script di setup VPS per Clarivio E-Learning Platform
# Eseguire come root su Ubuntu 24.04 LTS
# ============================================================

set -e

echo "=========================================="
echo "  Clarivio VPS Setup Script"
echo "=========================================="

# 1. Aggiorna il sistema
echo "[1/8] Aggiornamento sistema..."
apt update && apt upgrade -y

# 2. Installa MySQL
echo "[2/8] Installazione MySQL..."
apt install mysql-server -y
systemctl start mysql
systemctl enable mysql

# Configura MySQL
mysql -u root <<EOF
CREATE DATABASE IF NOT EXISTS clarivio;
CREATE USER IF NOT EXISTS 'clarivio_user'@'localhost' IDENTIFIED BY 'Clarivio2026!Secure';
GRANT ALL PRIVILEGES ON clarivio.* TO 'clarivio_user'@'localhost';
FLUSH PRIVILEGES;
EOF
echo "✅ MySQL configurato"

# 3. Installa Node.js 20
echo "[3/8] Installazione Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install nodejs -y
echo "Node.js $(node --version) installato"
echo "npm $(npm --version) installato"

# 4. Installa PM2
echo "[4/8] Installazione PM2..."
npm install -g pm2
echo "✅ PM2 installato"

# 5. Installa Nginx
echo "[5/8] Installazione Nginx..."
apt install nginx -y
systemctl enable nginx
echo "✅ Nginx installato"

# 6. Installa Git
echo "[6/8] Installazione Git..."
apt install git -y

# 7. Clona la repo e installa dipendenze
echo "[7/8] Clonazione repository e setup..."
cd /var/www
if [ -d "clarivio" ]; then
  cd clarivio
  git pull origin master
else
  git clone https://github.com/Fabriziododaro/elearning-platform.git clarivio
  cd clarivio
fi

npm install

# 8. Setup .env
echo "[8/8] Configurazione .env..."
if [ ! -f ".env" ]; then
cat > .env <<ENVEOF
DATABASE_URL="mysql://clarivio_user:Clarivio2026!Secure@localhost:3306/clarivio"
JWT_SECRET="$(openssl rand -base64 48)"
NEXT_PUBLIC_API_URL=""
ENVEOF
echo "✅ File .env creato"
else
echo "⚠️  File .env già presente, non sovrascritto"
fi

# Genera client Prisma e push schema al DB
npx prisma generate
npx prisma db push

# Build Next.js
npm run build

# Setup PM2
pm2 delete clarivio 2>/dev/null || true
pm2 start npm --name "clarivio" -- start
pm2 save
pm2 startup

# Configura Nginx
cat > /etc/nginx/sites-available/clarivio <<NGINXEOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINXEOF

ln -sf /etc/nginx/sites-available/clarivio /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# Configura firewall
echo "Configurazione firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo ""
echo "=========================================="
echo "  ✅ Setup completato!"
echo "=========================================="
echo ""
echo "L'app è raggiungibile su: http://72.60.129.155"
echo ""
echo "Comandi utili:"
echo "  pm2 status          - Stato dell'app"
echo "  pm2 logs clarivio   - Logs dell'app"
echo "  pm2 restart clarivio - Riavvia l'app"
echo ""
echo "Per aggiornare l'app:"
echo "  cd /var/www/clarivio"
echo "  git pull"
echo "  npm install"
echo "  npx prisma db push"
echo "  npm run build"
echo "  pm2 restart clarivio"
echo ""
echo "⚠️  IMPORTANTE: Cambia la password SSH!"
echo "  passwd root"
echo ""
