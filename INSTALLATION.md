# 🚀 Instalasi dan Setup CBT EXAM - SMKN 1 KUOK

## 📋 Persyaratan Sistem

### Minimum Requirements:
- **Browser**: Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
- **RAM**: 2 GB (untuk menjalankan browser)
- **Storage**: 10 MB untuk aplikasi
- **Screen**: 320px width minimum (mendukung smartphone)

### Recommended Requirements:
- **Browser**: Chrome/Edge versi terbaru
- **RAM**: 4 GB atau lebih
- **Storage**: 100 MB free space
- **Screen**: 1024px width atau lebih (untuk admin panel)
- **Internet**: Untuk loading fonts (opsional)

## 📦 Cara Instalasi

### Metode 1: Download Langsung (Tanpa Server)

1. **Extract Files**
   ```
   Ekstrak folder CBTEXAM ke lokasi yang diinginkan
   Contoh: D:\CBTEXAM atau C:\Apps\CBTEXAM
   ```

2. **Struktur Folder**
   ```
   CBTEXAM/
   ├── launcher.html          ← BUKA FILE INI
   ├── index.html             (Portal siswa)
   ├── admin.html             (Portal admin)
   ├── css/
   │   ├── styles.css
   │   └── admin.css
   ├── js/
   │   ├── data.js
   │   ├── app.js
   │   └── admin.js
   └── dokumentasi/
   ```

3. **Jalankan Aplikasi**
   - **Cara 1**: Double-click file `launcher.html`
   - **Cara 2**: Klik kanan → Open with → Browser pilihan
   - **Cara 3**: Drag & drop `launcher.html` ke browser

### Metode 2: Local Web Server (Recommended)

#### Menggunakan Python:

```bash
# Python 3
cd d:\CBTEXAM
python -m http.server 8000

# Akses di browser: http://localhost:8000/launcher.html
```

#### Menggunakan PHP:

```bash
cd d:\CBTEXAM
php -S localhost:8000

# Akses di browser: http://localhost:8000/launcher.html
```

#### Menggunakan Node.js (http-server):

```bash
# Install http-server (sekali saja)
npm install -g http-server

# Jalankan server
cd d:\CBTEXAM
http-server -p 8000

# Akses di browser: http://localhost:8000/launcher.html
```

#### Menggunakan Live Server (VS Code):

```bash
1. Install extension "Live Server" di VS Code
2. Buka folder CBTEXAM di VS Code
3. Klik kanan launcher.html → Open with Live Server
```

### Metode 3: Deploy ke Hosting

#### Upload ke Shared Hosting:

1. **Via FTP/cPanel:**
   ```
   1. Login ke cPanel/FTP
   2. Upload semua file ke folder public_html atau subdomain
   3. Pastikan struktur folder tetap sama
   4. Akses via: https://domain.com/launcher.html
   ```

2. **Via GitHub Pages:**
   ```bash
   # Upload ke repository GitHub
   git init
   git add .
   git commit -m "Initial CBT Exam"
   git branch -M main
   git remote add origin https://github.com/username/cbt-exam.git
   git push -u origin main
   
   # Aktifkan GitHub Pages di Settings repository
   # Akses via: https://username.github.io/cbt-exam/launcher.html
   ```

3. **Via Netlify:**
   ```
   1. Daftar di netlify.com
   2. Drag & drop folder CBTEXAM
   3. Site akan online otomatis
   4. Custom domain (opsional)
   ```

## ⚙️ Konfigurasi Awal

### 1. Setup Token Ujian

Edit file `js/data.js`:

```javascript
examTokens: {
    'TOKEN_ANDA': {  // Ganti dengan token unik
        subject: 'Nama Mata Pelajaran',
        teacher: 'Nama Guru',
        duration: 90,  // Durasi dalam menit
        totalQuestions: 50,  // Jumlah soal
        validClasses: ['X APAT', 'XI TO']  // Kelas yang valid
    }
}
```

### 2. Setup Admin Account

Edit file `js/data.js`:

```javascript
admin: {
    username: 'admin_baru',  // Username admin
    password: 'password_kuat_123',  // Password (gunakan hash di production)
    name: 'Nama Admin'
}
```

**⚠️ PENTING**: Untuk production, jangan simpan password plaintext!

### 3. Tambah/Edit Soal

**Cara 1: Via Admin Panel**
1. Login ke admin.html
2. Menu Bank Soal → Tambah Soal
3. Isi form dan simpan

**Cara 2: Edit Manual**

Edit array `questions` di `js/data.js`:

```javascript
questions: [
    {
        id: 1,  // ID unik
        question: 'Pertanyaan Anda?',
        options: {
            A: 'Pilihan A',
            B: 'Pilihan B',
            C: 'Pilihan C',
            D: 'Pilihan D',
            E: 'Pilihan E'  // Opsional
        },
        correctAnswer: 'A',  // Kunci jawaban
        score: 1  // Bobot nilai
    },
    // ... soal lainnya
]
```

## 🔧 Troubleshooting Instalasi

### Problem: Font tidak muncul dengan baik

**Solusi 1**: Pastikan ada koneksi internet untuk load Google Fonts

**Solusi 2**: Download font Inter dan simpan lokal
```
1. Download dari: https://fonts.google.com/specimen/Inter
2. Extract ke folder: fonts/Inter/
3. Update path di HTML: href="fonts/Inter/inter.css"
```

### Problem: File tidak bisa dibuka

**Solusi**:
```
1. Cek ekstensi file (.html, .css, .js)
2. Pastikan tidak ada karakter aneh di nama file
3. Coba browser lain
4. Disable antivirus sementara saat membuka
```

### Problem: LocalStorage tidak bekerja

**Solusi**:
```
1. Pastikan browser mengizinkan LocalStorage
2. Cek di browser settings → Privacy → Allow cookies and site data
3. Jangan gunakan mode Incognito/Private untuk ujian
4. Clear browser cache jika perlu
```

### Problem: Fullscreen tidak bekerja

**Solusi**:
```
1. Fullscreen API memerlukan user interaction (klik tombol)
2. Tidak bekerja di iOS Safari (limitasi browser)
3. Pastikan menggunakan HTTPS jika di hosting
4. Browser harus support Fullscreen API
```

## 🔒 Keamanan dan Best Practices

### Untuk Development/Testing:

✅ Gunakan localhost atau file:// protocol
✅ Data tersimpan di LocalStorage browser
✅ Test dengan data dummy
✅ Admin password sederhana OK

### Untuk Production/Ujian Sebenarnya:

⚠️ **HARUS menggunakan:**
1. HTTPS (SSL Certificate)
2. Backend server (Node.js, PHP, Python)
3. Database (MySQL, PostgreSQL, MongoDB)
4. Hash password dengan bcrypt/Argon2
5. Server-side validation
6. Session management yang aman
7. Regular backup
8. Monitoring dan logging

## 📊 Upgrade ke Production

### Langkah-langkah:

1. **Backend Setup**
   ```
   - Pilih teknologi: Node.js + Express, PHP + Laravel, Python + Django
   - Setup database
   - Buat REST API
   - Implement authentication (JWT/Session)
   ```

2. **Database Schema**
   ```sql
   CREATE TABLE users (
       id INT PRIMARY KEY AUTO_INCREMENT,
       nisn VARCHAR(20) UNIQUE,
       name VARCHAR(100),
       class VARCHAR(20),
       password_hash VARCHAR(255)
   );
   
   CREATE TABLE exams (
       id INT PRIMARY KEY AUTO_INCREMENT,
       title VARCHAR(200),
       subject VARCHAR(100),
       duration INT,
       start_time DATETIME,
       end_time DATETIME,
       token VARCHAR(50) UNIQUE
   );
   
   CREATE TABLE questions (
       id INT PRIMARY KEY AUTO_INCREMENT,
       exam_id INT,
       question TEXT,
       options JSON,
       correct_answer VARCHAR(1),
       score INT
   );
   
   CREATE TABLE answers (
       id INT PRIMARY KEY AUTO_INCREMENT,
       exam_id INT,
       student_id INT,
       question_id INT,
       answer VARCHAR(1),
       timestamp DATETIME
   );
   ```

3. **Deploy**
   ```
   - VPS/Cloud: AWS, DigitalOcean, Heroku
   - Domain: .sch.id untuk sekolah
   - SSL: Let's Encrypt (free)
   - CDN: Cloudflare (opsional)
   ```

## 📱 Testing Checklist

Sebelum ujian sebenarnya, test:

- [ ] Login siswa dengan berbagai data
- [ ] Token validation
- [ ] Timer countdown
- [ ] Autosave jawaban
- [ ] Navigasi soal (prev/next)
- [ ] Mark soal
- [ ] Submit ujian
- [ ] Hasil ujian tampil
- [ ] Admin login
- [ ] Monitoring real-time
- [ ] Responsive di smartphone
- [ ] Responsive di tablet
- [ ] Fullscreen mode
- [ ] Detection perpindahan tab
- [ ] Browser back button
- [ ] Refresh halaman saat ujian
- [ ] Multiple devices bersamaan
- [ ] Koneksi internet putus-nyambung

## 🎓 Training untuk Operator

### Persiapan Operator:

1. **Tech Support** harus paham:
   - Cara reset LocalStorage
   - Troubleshooting browser
   - Backup dan restore data
   - Monitoring system

2. **Guru** harus paham:
   - Cara membuat token
   - Cara menambah soal
   - Cara monitoring siswa
   - Cara export hasil

3. **Siswa** harus paham:
   - Cara login
   - Cara menjawab soal
   - Apa yang tidak boleh dilakukan
   - Apa yang harus dilakukan jika error

## 📞 Support

Untuk bantuan instalasi:

1. Baca dokumentasi: README.md
2. Baca panduan: PANDUAN_PENGGUNAAN.md
3. Hubungi IT support sekolah
4. Check CHANGELOG.md untuk update

## ✅ Verification

Setelah instalasi, pastikan:

✅ Launcher.html terbuka dengan baik
✅ Bisa akses halaman siswa
✅ Bisa akses halaman admin
✅ Login admin berhasil (admin/admin123)
✅ Login siswa berhasil dengan TOKEN2024
✅ Soal demo tampil (40 soal PAI)
✅ Timer berjalan
✅ Jawaban tersimpan
✅ Submit ujian berhasil

---

**Selamat! CBT Exam siap digunakan! 🎉**

Untuk pertanyaan lebih lanjut, hubungi admin sekolah atau IT support.
