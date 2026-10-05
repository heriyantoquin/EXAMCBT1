# 🚀 Panduan Deploy ke GitHub Pages

## Username GitHub: **heriyantoquin**
## Repository: **cbt-exam-smkn1kuok**

---

## 📋 LANGKAH-LANGKAH DEPLOY

### LANGKAH 1: Install Git (Jika Belum Ada)

**Cek apakah Git sudah terinstall:**
```powershell
git --version
```

**Jika belum ada, download:**
- Download: https://git-scm.com/download/win
- Install dengan default settings
- Restart terminal/PowerShell

---

### LANGKAH 2: Setup Git Config (Sekali Saja)

Buka PowerShell atau CMD di folder CBTEXAM, lalu jalankan:

```powershell
# Set username (nama Anda)
git config --global user.name "Heriyanto"

# Set email (email GitHub Anda)
git config --global user.email "heriyantoquin@gmail.com"
```

**⚠️ Ganti email dengan email GitHub Anda yang sebenarnya!**

---

### LANGKAH 3: Buat Repository di GitHub

1. **Buka browser**, login ke GitHub: https://github.com/heriyantoquin

2. **Klik tombol** `+` (pojok kanan atas) → **New repository**

3. **Isi form:**
   ```
   Repository name: cbt-exam-smkn1kuok
   Description: Aplikasi CBT Exam untuk SMKN 1 KUOK
   Visibility: Public (agar bisa pakai GitHub Pages gratis)
   
   ☑️ Add a README file: JANGAN CENTANG!
   ☑️ Add .gitignore: JANGAN CENTANG!
   ☑️ Choose a license: JANGAN CENTANG!
   ```

4. **Klik** `Create repository`

5. **Simpan URL** yang muncul:
   ```
   https://github.com/heriyantoquin/cbt-exam-smkn1kuok.git
   ```

---

### LANGKAH 4: Upload Project ke GitHub

**Buka PowerShell/CMD di folder CBTEXAM** (`d:\CBTEXAM`), lalu jalankan perintah ini **SATU PER SATU**:

```powershell
# 1. Initialize Git repository
git init

# 2. Add semua file
git add .

# 3. Commit pertama
git commit -m "Initial commit: CBT Exam SMKN 1 KUOK v1.0"

# 4. Rename branch ke main
git branch -M main

# 5. Connect ke GitHub (GANTI dengan URL Anda!)
git remote add origin https://github.com/heriyantoquin/cbt-exam-smkn1kuok.git

# 6. Push ke GitHub
git push -u origin main
```

**Jika diminta login:**
- Username: `heriyantoquin`
- Password: Gunakan **Personal Access Token** (bukan password biasa)

---

### LANGKAH 5: Setup GitHub Pages

1. **Di browser**, buka repository Anda:
   ```
   https://github.com/heriyantoquin/cbt-exam-smkn1kuok
   ```

2. **Klik** tab `Settings` (⚙️)

3. **Scroll ke bawah**, klik `Pages` di sidebar kiri

4. **Di "Source" section:**
   ```
   Branch: main
   Folder: / (root)
   ```

5. **Klik** `Save`

6. **Tunggu** ~1-2 menit

7. **Refresh halaman**, akan muncul:
   ```
   ✅ Your site is live at https://heriyantoquin.github.io/cbt-exam-smkn1kuok/
   ```

---

### LANGKAH 6: Akses Aplikasi

**URL Aplikasi Anda:**
```
https://heriyantoquin.github.io/cbt-exam-smkn1kuok/launcher.html
```

**URL untuk Siswa:**
```
https://heriyantoquin.github.io/cbt-exam-smkn1kuok/index.html
```

**URL untuk Admin:**
```
https://heriyantoquin.github.io/cbt-exam-smkn1kuok/admin.html
```

---

## 🔐 MEMBUAT PERSONAL ACCESS TOKEN (Jika Diminta)

Jika `git push` meminta password dan password biasa tidak work:

1. **Buka:** https://github.com/settings/tokens

2. **Klik:** `Generate new token` → `Generate new token (classic)`

3. **Isi form:**
   ```
   Note: CBT Exam Deploy
   Expiration: 90 days (atau No expiration)
   
   Centang:
   ☑️ repo (full control)
   ```

4. **Klik:** `Generate token`

5. **COPY TOKEN** (hanya muncul sekali!)
   ```
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

6. **Gunakan token ini** sebagai password saat git push

7. **Simpan token** di tempat aman!

---

## 🔄 UPDATE APLIKASI (Setelah Edit)

Jika Anda ubah kode dan mau update di GitHub:

```powershell
# 1. Add perubahan
git add .

# 2. Commit dengan pesan
git commit -m "Update: deskripsi perubahan"

# 3. Push ke GitHub
git push

# 4. Tunggu ~1-2 menit
# 5. Aplikasi otomatis update di GitHub Pages!
```

---

## ✅ TESTING

Setelah deploy, test:

1. **Buka:** https://heriyantoquin.github.io/cbt-exam-smkn1kuok/launcher.html

2. **Test login siswa:**
   - Token: `TOKEN2024`
   - NIS: (apa saja)
   - Nama: (nama Anda)
   - Kelas: (pilih)

3. **Test admin:**
   - URL: https://heriyantoquin.github.io/cbt-exam-smkn1kuok/admin.html
   - Username: `admin`
   - Password: `admin123`

4. **Test di smartphone** (responsive)

---

## 📱 SHARE KE SISWA

Setelah deploy, share link ini ke siswa:

```
🎓 PORTAL UJIAN CBT EXAM
📝 Link: https://heriyantoquin.github.io/cbt-exam-smkn1kuok/launcher.html

📋 Data yang diperlukan:
- NIS/NISN
- Nama lengkap
- Kelas
- Token ujian: TOKEN2024

⏰ Durasi: 60 menit
📚 Jumlah soal: 40
```

---

## 🌐 CUSTOM DOMAIN (Opsional)

Jika punya domain sendiri (misal: cbt.smkn1kuok.sch.id):

1. **Di GitHub repository** → Settings → Pages

2. **Custom domain:**
   ```
   cbt.smkn1kuok.sch.id
   ```

3. **Update DNS** di domain registrar:
   ```
   Type: CNAME
   Name: cbt
   Value: heriyantoquin.github.io
   ```

4. **Tunggu** DNS propagate (~5-30 menit)

5. **GitHub auto-enable** SSL (HTTPS)

---

## 🔧 TROUBLESHOOTING

### Problem: "git: command not found"
**Solusi:** Install Git dari https://git-scm.com/download/win

### Problem: "Permission denied"
**Solusi:** Gunakan Personal Access Token, bukan password biasa

### Problem: "Page not found (404)"
**Solusi:** 
- Pastikan GitHub Pages sudah enabled
- Tunggu ~2 menit setelah enable
- Akses dengan `/launcher.html` di akhir URL

### Problem: "Failed to push"
**Solusi:**
```powershell
# Cek remote
git remote -v

# Jika salah, hapus dan tambah lagi
git remote remove origin
git remote add origin https://github.com/heriyantoquin/cbt-exam-smkn1kuok.git
git push -u origin main
```

### Problem: Font tidak muncul
**Solusi:** Font Google akan load otomatis dari internet. Pastikan ada koneksi internet saat buka aplikasi.

---

## 📊 STATISTIK GITHUB PAGES

Cek traffic website Anda:

1. **Repository** → **Insights** → **Traffic**

2. Lihat:
   - Views (kunjungan)
   - Unique visitors
   - Top referrers

---

## 🔒 KEAMANAN

### ⚠️ PENTING: Ganti Password Admin!

Sebelum deploy, **WAJIB** ganti password admin:

**Edit file:** `js/data.js`

```javascript
admin: {
    username: 'admin_smkn1kuok',  // ← Ganti
    password: 'password_kuat_123!', // ← Ganti
    name: 'Heriyanto'
}
```

**Lalu commit & push lagi:**
```powershell
git add js/data.js
git commit -m "Update: ganti admin credentials"
git push
```

---

## 📝 NEXT STEPS

Setelah deploy berhasil:

1. ✅ **Test** semua fitur
2. ✅ **Ganti** admin password
3. ✅ **Update** token ujian
4. ✅ **Share** link ke siswa
5. ✅ **Setup** Supabase (opsional, untuk mode database cloud)
6. ✅ **Monitor** via GitHub Insights

---

## 🎉 SELESAI!

Aplikasi CBT Exam Anda sekarang **LIVE** di:

```
🌐 https://heriyantoquin.github.io/cbt-exam-smkn1kuok/launcher.html
```

**Gratis selamanya dengan GitHub Pages!** ✅

---

**Butuh bantuan?**
- GitHub Docs: https://docs.github.com/pages
- Git Tutorial: https://git-scm.com/book/id/v2

**SMKN 1 KUOK - CBT EXAM v1.0**
*Ujian Digital yang Mudah, Fokus, dan Profesional*
