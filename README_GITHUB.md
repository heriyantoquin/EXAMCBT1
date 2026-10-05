# 🎓 CBT EXAM - SMKN 1 KUOK

**Ujian Digital yang Mudah, Fokus, dan Profesional**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://heriyantoquin.github.io/cbt-exam-smkn1kuok/launcher.html)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.txt)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](CHANGELOG.md)

Aplikasi Computer Based Test (CBT) modern untuk ujian sekolah dengan interface yang bersih, responsif, dan mudah digunakan.

---

## 🌐 Live Demo

**🚀 Akses Aplikasi:**
- **Landing Page:** [heriyantoquin.github.io/cbt-exam-smkn1kuok/launcher.html](https://heriyantoquin.github.io/cbt-exam-smkn1kuok/launcher.html)
- **Portal Siswa:** [heriyantoquin.github.io/cbt-exam-smkn1kuok/index.html](https://heriyantoquin.github.io/cbt-exam-smkn1kuok/index.html)
- **Portal Admin:** [heriyantoquin.github.io/cbt-exam-smkn1kuok/admin.html](https://heriyantoquin.github.io/cbt-exam-smkn1kuok/admin.html)

**Demo Credentials:**
- **Siswa:** Token `TOKEN2024` | NIS: (apa saja) | Nama: (apa saja) | Kelas: (pilih)
- **Admin:** Username `admin` | Password `admin123`

---

## ✨ Fitur Utama

### 👨‍🎓 Untuk Siswa
- ✅ Login dengan validasi NIS/NISN, nama, kelas, dan token
- ⏱️ Timer countdown dengan peringatan otomatis
- 💾 Autosave - jawaban tersimpan otomatis
- 🔖 Tandai soal untuk review
- 📊 Navigasi soal dengan status indicator
- 🔒 Kiosk mode dengan deteksi pelanggaran
- 📱 Responsive untuk semua device

### 👨‍🏫 Untuk Guru/Admin
- 📊 Dashboard dengan statistik real-time
- 📚 Bank soal management
- 🖥️ Live monitoring peserta ujian
- ⚠️ Tracking pelanggaran siswa
- 📈 Analisis hasil ujian
- 📥 Export hasil (ready for integration)

---

## 🚀 Quick Start

### Akses Langsung (Tanpa Install)
```
1. Buka: https://heriyantoquin.github.io/cbt-exam-smkn1kuok/launcher.html
2. Pilih "Portal Siswa" atau "Panel Admin"
3. Mulai ujian!
```

### Clone & Run Locally
```bash
git clone https://github.com/heriyantoquin/cbt-exam-smkn1kuok.git
cd cbt-exam-smkn1kuok
# Buka launcher.html di browser
```

---

## 📊 Fitur Teknis

### Mode Penyimpanan Data

#### 1. LocalStorage Mode (Default)
- Tanpa setup tambahan
- Data tersimpan di browser
- Cocok untuk testing & demo

#### 2. Supabase Mode (Production Ready)
- Database cloud (PostgreSQL)
- Real-time sync
- Multi-device support
- 500 MB free tier
- [Setup Guide](SUPABASE_SETUP_GUIDE.md)

### Keamanan
- ✅ Token-based access control
- ✅ Session management
- ✅ Kiosk mode enforcement
- ✅ Tab switch detection
- ✅ Violation tracking
- ✅ Autosave protection
- ✅ Row Level Security (Supabase mode)

---

## 🎨 Teknologi

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Database:** LocalStorage / Supabase (PostgreSQL)
- **Hosting:** GitHub Pages (Gratis dengan SSL)
- **Design:** Modern, Clean, Responsive
- **Font:** Inter (Google Fonts)

---

## 📱 Kompatibilitas

| Device | Support | Features |
|--------|---------|----------|
| 💻 Desktop | ⭐⭐⭐⭐⭐ | Full features |
| 📱 Tablet | ⭐⭐⭐⭐☆ | Optimized layout |
| 📱 Smartphone | ⭐⭐⭐⭐☆ | Mobile-friendly |

**Browser:**
- ✅ Chrome 90+ (Recommended)
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

---

## 📖 Dokumentasi

- **[README.md](README.md)** - Dokumentasi lengkap aplikasi
- **[PANDUAN_PENGGUNAAN.md](PANDUAN_PENGGUNAAN.md)** - Panduan untuk siswa & guru
- **[QUICK_START.txt](QUICK_START.txt)** - Quick reference guide
- **[DEPLOY_GITHUB.md](DEPLOY_GITHUB.md)** - Panduan deploy ke GitHub
- **[SUPABASE_SETUP_GUIDE.md](SUPABASE_SETUP_GUIDE.md)** - Setup database cloud
- **[DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)** - Dokumentasi struktur database
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

---

## 🔧 Konfigurasi

### Update Admin Credentials
Edit `js/data.js`:
```javascript
admin: {
    username: 'admin_baru',
    password: 'password_kuat',
    name: 'Nama Admin'
}
```

### Update Token Ujian
Edit `js/data.js`:
```javascript
examTokens: {
    'TOKEN_BARU': {
        subject: 'Mata Pelajaran',
        duration: 90, // menit
        totalQuestions: 50
    }
}
```

### Setup Supabase (Optional)
```javascript
// Edit js/supabase-config.js
const SUPABASE_CONFIG = {
    url: 'https://your-project.supabase.co',
    anonKey: 'your-anon-key'
};
```

---

## 🎯 Use Cases

### ✅ Cocok Untuk:
- Ujian harian/tengah semester/akhir semester
- Kuis online
- Pre-test & post-test
- Try-out
- Latihan soal
- Ujian masuk sekolah

### ✅ Mata Pelajaran:
- PAI (40 soal sudah tersedia)
- Matematika
- Bahasa Indonesia
- IPA/IPS
- Dan semua mata pelajaran lainnya

---

## 📊 Statistik

- **40 Soal PAI** siap pakai
- **7 Database Tables** (Supabase mode)
- **5 SQL Functions** untuk operations
- **2 Real-time Views** untuk monitoring
- **20+ API Methods** tersedia
- **1000+ Lines** dokumentasi

---

## 🤝 Contributing

Kontribusi sangat diterima! Silakan:
1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📞 Support

- **GitHub Issues:** [github.com/heriyantoquin/cbt-exam-smkn1kuok/issues](https://github.com/heriyantoquin/cbt-exam-smkn1kuok/issues)
- **Documentation:** Lihat file dokumentasi di repository
- **Email:** [heriyantoquin@gmail.com](mailto:heriyantoquin@gmail.com)

---

## 📄 License

Distributed under the MIT License. See `LICENSE.txt` for more information.

Free to use for educational purposes.

---

## 🎓 Dibuat Untuk

**SMKN 1 KUOK**
- Lokasi: Kabupaten Kampar, Riau
- Guru: Heriyanto
- Mata Pelajaran: PAI dan Budi Pekerti

---

## 🌟 Acknowledgments

- Font: [Inter](https://fonts.google.com/specimen/Inter) by Google Fonts
- Icons: Unicode Emoji
- Hosting: GitHub Pages
- Database: Supabase (optional)
- Inspiration: Modern CBT systems

---

## 🚀 Roadmap

### Version 1.1 (Planned)
- [ ] Backend API integration
- [ ] Import soal dari Excel
- [ ] Export hasil ke Excel
- [ ] Email notifications
- [ ] SMS gateway untuk token

### Version 2.0 (Future)
- [ ] Essay questions support
- [ ] Image upload in questions
- [ ] Video explanations
- [ ] AI-powered proctoring
- [ ] Mobile app (iOS/Android)

---

## 📸 Screenshots

### Landing Page
![Landing Page](https://via.placeholder.com/800x400?text=Landing+Page+Screenshot)

### Student Interface
![Student Interface](https://via.placeholder.com/800x400?text=Student+Interface+Screenshot)

### Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/800x400?text=Admin+Dashboard+Screenshot)

---

## 💡 Tips

**Untuk Guru:**
- Ganti password admin sebelum production
- Buat token unik per ujian
- Monitor siswa secara real-time
- Backup data regular

**Untuk Siswa:**
- Baca instruksi dengan teliti
- Jangan keluar dari aplikasi
- Tandai soal yang ragu
- Submit sebelum waktu habis

---

## 📈 Status

- ✅ **Version:** 1.0.0
- ✅ **Status:** Production Ready
- ✅ **Last Update:** October 2024
- ✅ **Maintained:** Yes

---

<div align="center">

**⭐ Star repository ini jika bermanfaat! ⭐**

**Dibuat dengan ❤️ untuk pendidikan yang lebih baik**

[Website](https://heriyantoquin.github.io/cbt-exam-smkn1kuok/) • 
[Documentation](README.md) • 
[Issues](https://github.com/heriyantoquin/cbt-exam-smkn1kuok/issues)

---

**SMKN 1 KUOK - CBT EXAM v1.0**

*"Ujian Digital yang Mudah, Fokus, dan Profesional"*

</div>
