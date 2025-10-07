#!/bin/bash

echo ""
echo "🔐 Tạo SUPER_ADMIN user"
echo ""

read -p "Email: " email
read -p "Tên (tùy chọn): " name
read -sp "Password: " password
echo ""

if [ -z "$email" ] || [ -z "$password" ]; then
    echo "❌ Email và password là bắt buộc!"
    exit 1
fi

# Hash password using Node.js bcrypt
password_hash=$(node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('$password', 10))")

# Check if user exists
existing=$(npx prisma db execute --stdin <<EOF
SELECT id FROM users WHERE email = '$email';
EOF
)

if [ ! -z "$existing" ]; then
    echo ""
    echo "⚠️  User đã tồn tại. Cập nhật role thành SUPER_ADMIN..."

    npx prisma db execute --stdin <<EOF
UPDATE users
SET role = 'SUPER_ADMIN',
    password_hash = '$password_hash'
    ${name:+, name = '$name'}
WHERE email = '$email';
EOF

    echo "✅ Đã cập nhật user thành SUPER_ADMIN!"
else
    echo ""
    echo "📝 Tạo user mới..."

    npx prisma db execute --stdin <<EOF
INSERT INTO users (id, email, ${name:+name,} password_hash, role, active, created_at, updated_at)
VALUES (
    substring(md5(random()::text) from 1 for 25),
    '$email',
    ${name:+'$name',}
    '$password_hash',
    'SUPER_ADMIN',
    true,
    NOW(),
    NOW()
);
EOF

    echo "✅ Đã tạo SUPER_ADMIN user thành công!"
fi

echo ""
echo "📧 Email: $email"
[ ! -z "$name" ] && echo "👤 Tên: $name"
echo "🔑 Role: SUPER_ADMIN"
echo ""
