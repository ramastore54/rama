#!/bin/bash

# Gunakan pesan commit dari argumen, atau gunakan pesan default jika kosong
PESAN=${1:-"Update otomatis server dan node version"}

echo "⏳ Menambahkan perubahan file..."
git add .

echo "💾 Membuat commit: $PESAN"
git commit -m "$PESAN"

echo "🚀 Mengirim ke GitHub..."
git push

echo "✅ Selesai! Silakan cek tab Actions di GitHub."
