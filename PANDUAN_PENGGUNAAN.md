# 📖 PANDUAN PENGGUNAAN CBT EXAM - SMKN 1 KUOK

## 🎓 Untuk Siswa

### Langkah 1: Persiapan Sebelum Ujian

**Pastikan:**
- ✅ Perangkat (laptop/tablet/smartphone) terisi baterai penuh
- ✅ Browser modern sudah terpasang (Chrome, Firefox, atau Edge)
- ✅ Sudah mendapat **Token Ujian** dari guru
- ✅ Koneksi internet stabil (untuk memuat halaman)
- ✅ Telah mencatat NIS/NISN dan data diri

**Tips:**
- Tutup semua aplikasi lain
- Matikan notifikasi agar tidak terganggu
- Siapkan alat tulis untuk coret-coretan (jika diperlukan)

### Langkah 2: Login ke Sistem

1. **Buka aplikasi CBT Exam**
   - Akses melalui link yang diberikan guru
   - Atau buka file `index.html`

2. **Isi Form Login:**
   ```
   NIS/NISN     : [Nomor induk Anda]
   Nama Lengkap : [Nama sesuai data sekolah]
   Kelas        : [Pilih dari dropdown]
   Token Ujian  : [Token dari guru]
   ```

3. **Klik tombol MASUK UJIAN**

**❌ Jika Muncul Error:**
- "Token ujian tidak valid" → Cek kembali token dari guru
- "Semua data wajib diisi" → Pastikan semua kolom terisi
- "Kelas tidak valid" → Pilih kelas yang sesuai

### Langkah 3: Periksa Informasi Ujian

Setelah login, akan muncul halaman **SELAMAT DATANG** dengan informasi:
- Nama dan kelas Anda
- Mata pelajaran
- Nama guru
- Tanggal ujian
- Durasi ujian (contoh: 60 menit)
- Jumlah soal (contoh: 40 soal)

**Pastikan semua data sudah benar!**

### Langkah 4: Mulai Ujian

1. Klik tombol **MULAI UJIAN**
2. Akan muncul konfirmasi:
   > "Pastikan data Anda benar. Setelah ujian dimulai, waktu akan berjalan."
3. Klik **MULAI UJIAN** untuk melanjutkan
4. Sistem akan otomatis masuk **Fullscreen Mode**
5. Timer akan mulai berjalan

### Langkah 5: Mengerjakan Soal

#### Membaca Soal
- Soal ditampilkan satu per satu
- Nomor soal terlihat di kiri atas: **SOAL 01 / 40**
- Baca soal dengan teliti

#### Memilih Jawaban
- Klik/tap pada pilihan jawaban (A, B, C, D, atau E)
- Pilihan yang dipilih akan **berubah warna biru**
- Jawaban otomatis tersimpan
- Muncul indikator: **✓ Jawaban tersimpan**

#### Navigasi Soal

**Tombol Navigasi:**
- **← SEBELUMNYA**: Ke soal sebelumnya
- **BERIKUTNYA →**: Ke soal berikutnya

**Daftar Soal (Sidebar Kanan):**
- Klik nomor soal untuk langsung ke soal tersebut
- **Hijau (✓)**: Sudah dijawab
- **Abu-abu (—)**: Belum dijawab
- **Kuning (⚠)**: Ditandai untuk ditinjau

#### Menandai Soal

Jika ragu dengan jawaban:
1. Klik tombol **🔖 Tandai Soal**
2. Soal akan ditandai kuning
3. Klik lagi untuk menghapus tanda

**Berguna untuk:**
- Soal yang belum yakin
- Soal yang ingin diperiksa ulang
- Pengingat untuk kembali nanti

#### Memantau Waktu

**Timer di atas tengah:**
- Menunjukkan sisa waktu (contoh: **45:30**)
- **Hijau**: Waktu masih banyak
- **Kuning**: Kurang dari 5 menit (peringatan)
- **Merah berkedip**: Kurang dari 1 menit (bahaya!)

**Timer akan:**
- Terus berjalan meskipun pindah soal
- Tidak berhenti meskipun refresh halaman
- Otomatis mengumpulkan ujian jika waktu habis

### Langkah 6: Mengumpulkan Ujian

#### Selesai Mengerjakan

1. Klik tombol **SELESAI & KUMPULKAN** (di sidebar kanan)
2. Akan muncul ringkasan:
   ```
   Sudah dijawab  : 35
   Belum dijawab  : 5
   Ditandai       : 2
   ```
3. Pilih:
   - **KEMBALI KE UJIAN**: Jika ingin melanjutkan
   - **KUMPULKAN**: Jika yakin ingin mengumpulkan

#### Setelah Dikumpulkan

Akan muncul halaman **UJIAN BERHASIL DIKUMPULKAN** dengan:
- Nama Anda
- Mata pelajaran
- Jumlah soal yang dijawab
- Status: **TERKUMPUL**

**⚠️ PENTING:**
- Setelah dikumpulkan, **tidak bisa kembali** mengubah jawaban
- Pastikan sudah yakin sebelum mengumpulkan

### Langkah 7: Setelah Ujian

- Tunggu pengumuman hasil dari guru
- Nilai mungkin tidak langsung tampil (tergantung pengaturan guru)
- Jangan tutup browser sampai melihat halaman "Terkumpul"

---

## 👨‍🏫 Untuk Guru/Admin

### Login Admin

1. **Buka Panel Admin**
   - Akses file `admin.html`
   - Atau klik link "Admin" di halaman siswa

2. **Login:**
   ```
   Username: admin
   Password: admin123
   ```

3. **Klik MASUK**

### Dashboard

**Statistik yang ditampilkan:**
- 📝 Total Ujian
- 👥 Total Siswa
- 📚 Total Soal
- ✓ Ujian Selesai

**Ujian Aktif:**
- Melihat ujian yang sedang berjalan
- Status peserta
- Aksi cepat (Lihat/Monitor)

### Menu Bank Soal

#### Menambah Soal Baru

1. Klik **+ Tambah Soal**
2. Isi form:
   - **Mata Pelajaran**: Pilih dari dropdown
   - **Pertanyaan**: Tulis pertanyaan
   - **Pilihan A-E**: Isi opsi jawaban
   - **Kunci Jawaban**: Pilih jawaban benar
   - **Bobot**: Nilai soal (default: 1)
   - **Tingkat Kesulitan**: Mudah/Sedang/Sulit
3. Klik **Simpan**

#### Mengedit Soal

1. Di tabel bank soal, klik tombol **Edit**
2. Ubah data yang diperlukan
3. Klik **Simpan**

#### Menghapus Soal

1. Klik tombol **Hapus**
2. Konfirmasi penghapusan
3. Soal akan dihapus dari bank

#### Filter dan Pencarian

- **Kotak Pencarian**: Cari berdasarkan teks soal
- **Filter Mata Pelajaran**: Filter berdasarkan mapel

### Menu Monitoring

**Live Monitoring** menampilkan:

| Data | Keterangan |
|------|------------|
| **Siswa** | Nama peserta |
| **Kelas** | Kelas siswa |
| **Status** | 🟢 Online / 🟡 Offline |
| **Soal** | Progress (contoh: 25/40) |
| **Waktu** | Sisa waktu ujian |
| **Peringatan** | Jumlah pelanggaran |

**Refresh Otomatis:**
- Data diperbarui setiap 5 detik
- Status real-time

**Pelanggaran yang Dicatat:**
- Perpindahan tab
- Keluar dari fullscreen
- Kehilangan fokus window
- Maksimal 3 peringatan

### Menu Hasil

**Melihat Hasil Ujian:**
- Nilai per siswa
- Analisis jawaban
- Statistik kelas
- Export ke Excel/CSV

### Menu Pengaturan

**Yang dapat diatur:**
- Durasi ujian
- Token akses
- Acak soal
- Acak opsi jawaban
- Tampilkan nilai otomatis
- Batas peringatan

---

## ⚙️ Pengaturan Token dan Durasi

### Mengubah Token Ujian

Edit file `js/data.js`:

```javascript
examTokens: {
    'TOKEN_BARU_ANDA': {  // ← Ganti token di sini
        subject: 'Matematika',
        teacher: 'Nama Guru',
        duration: 90,  // ← Ganti durasi (menit)
        totalQuestions: 50,
        validClasses: ['X APAT', 'X TO']
    }
}
```

### Menambah Soal Manual

Edit array `questions` di file `js/data.js`:

```javascript
{
    id: 41,  // ID unik
    question: 'Pertanyaan Anda di sini?',
    options: {
        A: 'Pilihan A',
        B: 'Pilihan B',
        C: 'Pilihan C',
        D: 'Pilihan D',
        E: 'Pilihan E'
    },
    correctAnswer: 'A',  // Kunci jawaban
    score: 1  // Bobot nilai
}
```

---

## 🔒 Keamanan dan Pelanggaran

### Mode Kiosk

**Saat ujian dimulai:**
- ✅ Otomatis fullscreen
- ✅ Disable klik kanan
- ✅ Block shortcut keyboard berbahaya
- ✅ Deteksi perpindahan tab
- ✅ Deteksi kehilangan fokus

### Pelanggaran yang Dicatat

1. **Tab Switch**: Siswa pindah ke tab lain
2. **Window Blur**: Window kehilangan fokus
3. **Exit Fullscreen**: Keluar dari fullscreen

**Sistem Peringatan:**
- Pelanggaran ke-1: ⚠️ Peringatan 1/3
- Pelanggaran ke-2: ⚠️ Peringatan 2/3
- Pelanggaran ke-3: ⚠️ Peringatan 3/3
- Semua dicatat dan dapat dilihat admin

### Tips Menghindari Pelanggaran

**Untuk Siswa:**
- Jangan menekan tombol Windows/Alt+Tab
- Jangan menekan F11 atau Esc
- Jangan klik di luar window browser
- Fokus pada ujian saja

---

## 📱 Panduan Perangkat

### Desktop/Laptop

**Optimal untuk:**
- Layar besar
- Keyboard fisik
- Navigasi cepat

**Tips:**
- Gunakan keyboard: Enter untuk next, Backspace untuk prev
- Sidebar selalu terlihat
- Semua fitur tersedia

### Tablet

**Optimal untuk:**
- Portabilitas
- Touch screen
- Ukuran sedang

**Tips:**
- Mode landscape lebih nyaman
- Gunakan stylus jika ada
- Sidebar dapat ditutup untuk fokus

### Smartphone

**Optimal untuk:**
- Mobilitas tinggi
- Emergency backup

**Tips:**
- Mode portrait atau landscape
- Sidebar otomatis sembunyi
- Tap tombol "📋 0/40" untuk buka daftar soal
- Zoom teks jika perlu

---

## ❓ Troubleshooting

### Masalah Login

**"Token tidak valid"**
- Solusi: Periksa kembali token dari guru
- Pastikan tidak ada spasi di awal/akhir

**"Anda sudah login"**
- Solusi: Ujian masih berlangsung
- Jangan login dua kali dengan akun sama

### Masalah Saat Ujian

**Timer tidak berjalan**
- Solusi: Refresh halaman
- Jawaban tetap tersimpan

**Jawaban tidak tersimpan**
- Solusi: Pastikan klik pilihan jawaban
- Tunggu muncul "✓ Jawaban tersimpan"

**Sidebar tidak muncul (mobile)**
- Solusi: Tap tombol "📋" di pojok kanan bawah

**Keluar dari fullscreen**
- Solusi: Tekan F11 atau klik tombol "Kembali ke Ujian"

### Masalah Teknis

**Halaman blank/tidak muncul**
- Solusi: 
  - Cek koneksi internet
  - Clear cache browser
  - Gunakan browser lain

**Browser crash/tertutup**
- Solusi:
  - Buka kembali aplikasi
  - Login dengan data yang sama
  - Ujian akan dilanjutkan otomatis
  - Jawaban sudah tersimpan

---

## 📞 Bantuan Tambahan

### Kontak

- **Admin Sekolah**: [Hubungi guru/admin sekolah]
- **Tech Support**: [Kontak IT sekolah]

### Dokumen Tambahan

- **README.md**: Dokumentasi teknis
- **PANDUAN_PENGGUNAAN.md**: Panduan ini

### Update dan Pengembangan

Aplikasi ini dapat dikembangkan lebih lanjut dengan:
- Backend server
- Database
- Fitur lanjutan (essay, upload, dll)
- Integrasi dengan sistem sekolah

---

**Selamat menggunakan CBT Exam! Semoga sukses! 🎓**

**SMKN 1 KUOK**
*Ujian Digital yang Mudah, Fokus, dan Profesional*
