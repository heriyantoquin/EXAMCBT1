# CBT EXAM — SMKN 1 KUOK

**Ujian Digital yang Mudah, Fokus, dan Profesional**

Aplikasi CBT (Computer Based Test) modern yang dirancang khusus untuk ujian sekolah dengan antarmuka yang bersih, responsif, dan mudah digunakan.

## 🎯 Fitur Utama

### Untuk Siswa
- ✅ **Login Aman** dengan validasi NIS/NISN, nama, kelas, dan token ujian
- 📝 **Interface Ujian Modern** dengan navigasi soal yang mudah
- ⏱️ **Timer Countdown** dengan peringatan otomatis
- 💾 **Autosave** - Jawaban tersimpan otomatis
- 🔖 **Tandai Soal** untuk ditinjau kembali
- 📊 **Daftar Soal** dengan indikator status (dijawab/belum/ditandai)
- 🔒 **Kiosk Mode** dengan deteksi pelanggaran
- 📱 **Responsive** untuk smartphone, tablet, dan desktop
- 🌙 **Dark Mode** (opsional)

### Untuk Admin/Guru
- 👨‍🏫 **Dashboard Admin** dengan statistik lengkap
- 📚 **Bank Soal** untuk mengelola pertanyaan
- 👥 **Manajemen Peserta** dan kelas
- 🖥️ **Live Monitoring** peserta ujian secara real-time
- 📈 **Analisis Hasil** ujian
- ⚙️ **Pengaturan** sistem yang fleksibel

## 🚀 Cara Menggunakan

### Akses Siswa

1. Buka file `index.html` di browser
2. Masukkan data:
   - **NIS/NISN**: Nomor induk siswa
   - **Nama Lengkap**: Nama siswa
   - **Kelas**: Pilih kelas dari dropdown
   - **Token Ujian**: `TOKEN2024` (contoh)
3. Klik **MASUK UJIAN**
4. Periksa informasi ujian
5. Klik **MULAI UJIAN**
6. Kerjakan soal dengan baik
7. Klik **SELESAI & KUMPULKAN** setelah selesai

### Akses Admin/Guru

1. Buka file `admin.html` di browser
2. Login dengan:
   - **Username**: `admin`
   - **Password**: `admin123`
3. Akses menu:
   - **Dashboard**: Lihat statistik
   - **Bank Soal**: Kelola pertanyaan
   - **Monitoring**: Pantau peserta secara real-time
   - **Hasil**: Lihat hasil ujian

## 📋 Data Demo

### Token Ujian
- **Token**: `TOKEN2024`
- **Mata Pelajaran**: PAI dan Budi Pekerti
- **Guru**: Heriyanto
- **Durasi**: 60 menit
- **Jumlah Soal**: 40 soal
- **Kelas Valid**: Semua kelas (X-XII)

### Akun Admin
- **Username**: `admin`
- **Password**: `admin123`

## 🎨 Fitur Desain

- **Modern & Clean**: Interface bersih dan profesional
- **Card-Based UI**: Tampilan kartu yang rapi
- **Typography**: Font Inter yang mudah dibaca
- **Color Scheme**: Biru profesional dengan aksen seimbang
- **Smooth Animations**: Transisi halus dan responsif
- **Accessible**: Ukuran font nyaman, kontras tinggi

## 🔒 Fitur Keamanan

1. **Validasi Token**: Hanya siswa dengan token valid yang bisa masuk
2. **Session Management**: Sesi tersimpan di browser
3. **Autosave**: Jawaban otomatis tersimpan
4. **Kiosk Mode**: 
   - Fullscreen otomatis
   - Deteksi perpindahan tab
   - Deteksi kehilangan fokus
   - Pencatatan pelanggaran
5. **Prevent Actions**:
   - Disable klik kanan
   - Block shortcut berbahaya
   - Prevent context menu
6. **Server-Side Timer**: Waktu ujian berdasarkan waktu mulai

## 📱 Responsive Design

### Desktop (≥1024px)
- Layout sidebar + konten utama
- Semua fitur terlihat penuh

### Tablet (768px - 1023px)
- Layout compact
- Sidebar dapat ditutup

### Mobile (≤767px)
- Header compact
- Sidebar sebagai overlay
- Navigasi optimized untuk sentuhan
- Tombol aksi mudah dijangkau

## 🛠️ Teknologi

- **HTML5**: Struktur semantik
- **CSS3**: Styling modern dengan CSS Variables
- **JavaScript (Vanilla)**: Logic tanpa framework
- **LocalStorage**: Penyimpanan data lokal (default)
- **Supabase** (Optional): Database cloud untuk production
- **PostgreSQL**: Database relational via Supabase
- **Responsive Design**: Mobile-first approach

## 📂 Struktur File

```
CBTEXAM/
├── index.html          # Halaman siswa
├── admin.html          # Halaman admin
├── css/
│   ├── styles.css      # Style utama
│   └── admin.css       # Style admin panel
├── js/
│   ├── data.js         # Manajemen data
│   ├── app.js          # Logic aplikasi siswa
│   └── admin.js        # Logic admin panel
└── README.md           # Dokumentasi
```

## 🔄 Alur Penggunaan

### Siswa
```
LOGIN → DASHBOARD → KONFIRMASI → UJIAN → SUBMIT → HASIL
```

### Admin
```
LOGIN → DASHBOARD → KELOLA SOAL/UJIAN → MONITORING → HASIL
```

## ⚙️ Pengaturan

### Mengubah Durasi Ujian
Edit di `data.js`:
```javascript
examTokens: {
    'TOKEN2024': {
        duration: 60, // ubah angka (dalam menit)
        ...
    }
}
```

### Menambah Soal
Edit array `questions` di `data.js` atau gunakan panel admin.

### Mengubah Token
Edit `examTokens` di `data.js` dengan token baru.

## 🎓 Contoh Penggunaan di Sekolah

1. **Persiapan**:
   - Admin membuat soal di Bank Soal
   - Admin membuat ujian baru dengan token
   - Admin membagikan token ke siswa

2. **Pelaksanaan**:
   - Siswa login dengan token
   - Admin monitoring dari dashboard
   - Sistem mencatat aktivitas siswa

3. **Setelah Ujian**:
   - Admin melihat hasil
   - Export ke Excel
   - Analisis tingkat kesulitan

## 🚧 Pengembangan Selanjutnya

Untuk mengembangkan menjadi sistem production:

1. **Backend Integration**:
   - Gunakan API (Node.js, PHP, Python)
   - Database (MySQL, PostgreSQL, MongoDB)
   - Authentication yang lebih kuat

2. **Fitur Tambahan**:
   - Upload gambar dalam soal
   - Soal essay dengan auto-scoring
   - Video tutorial
   - Chat dengan pengawas

3. **Deployment**:
   - Hosting di server sekolah
   - HTTPS untuk keamanan
   - CDN untuk performa

4. **Advanced Features**:
   - AI-powered proctoring
   - Adaptive testing
   - Gamification
   - Analytics dashboard

## 📝 Catatan

- **LocalStorage**: Data tersimpan di browser lokal. Jangan clear browser data selama ujian.
- **Browser Support**: Chrome, Firefox, Edge (terbaru)
- **Internet**: Bisa offline setelah halaman dimuat
- **Testing**: Selalu test sebelum ujian sebenarnya

## 📞 Dukungan

Untuk pertanyaan atau bantuan:
- Hubungi admin sekolah
- Dokumentasi lengkap di file README ini

## 📄 Lisensi

Aplikasi ini dibuat untuk SMKN 1 KUOK.
Free to use and modify untuk keperluan pendidikan.

---

**Dikembangkan dengan ❤️ untuk pendidikan yang lebih baik**

**SMKN 1 KUOK - Unggul dalam Prestasi, Santun dalam Budi Pekerti**


---

## 🗄️ Database Integration (Supabase)

Aplikasi ini mendukung 2 mode penyimpanan data:

### Mode 1: LocalStorage (Default)
- ✅ Mudah, tidak perlu setup
- ✅ Gratis dan works offline
- ⚠️ Data per browser, tidak sync antar device
- ⚠️ Kapasitas terbatas (~5-10 MB)

### Mode 2: Supabase Database (Recommended for Production)
- ✅ Data tersimpan di cloud (permanent)
- ✅ Multi-device sync
- ✅ Real-time monitoring
- ✅ Kapasitas besar (500 MB free tier)
- ✅ Backup otomatis
- ✅ Scalable untuk ratusan siswa

### Setup Supabase (5 Menit):

1. **Buat account** di https://supabase.com (free)
2. **Buat project** baru
3. **Run SQL scripts**:
   - `supabase-setup.sql` (create tables)
   - `supabase-insert-questions.sql` (insert 40 soal)
4. **Copy credentials** (URL & anon key)
5. **Update** `js/supabase-config.js`

**📖 Panduan lengkap:** Baca `SUPABASE_SETUP_GUIDE.md`

**File Supabase:**
- `supabase-setup.sql` - Database schema
- `supabase-insert-questions.sql` - Data soal PAI
- `js/supabase-config.js` - API configuration
- `SUPABASE_SETUP_GUIDE.md` - Panduan setup
- `DATABASE_SCHEMA.md` - Dokumentasi database
- `SUPABASE_README.md` - Integration docs

---
