```markdown
# 🚀 Panduan Setup Supabase untuk CBT EXAM

## 📋 Daftar Isi
1. [Apa itu Supabase?](#apa-itu-supabase)
2. [Kenapa Menggunakan Supabase?](#kenapa-menggunakan-supabase)
3. [Langkah-langkah Setup](#langkah-langkah-setup)
4. [Testing Database](#testing-database)
5. [Update Aplikasi](#update-aplikasi)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Apa itu Supabase?

**Supabase** adalah platform Backend-as-a-Service (BaaS) yang menyediakan:
- ✅ **PostgreSQL Database** - Database relational yang powerful
- ✅ **Authentication** - Sistem login yang aman
- ✅ **Realtime** - Update data secara real-time
- ✅ **Storage** - Penyimpanan file
- ✅ **API Otomatis** - RESTful API dan GraphQL

**Free Tier** mencakup:
- 500 MB Database
- 1 GB File Storage
- 2 GB Bandwidth
- 50,000 Monthly Active Users
- Unlimited API requests

---

## 💡 Kenapa Menggunakan Supabase?

### Keunggulan vs LocalStorage:

| Fitur | LocalStorage | Supabase Database |
|-------|-------------|-------------------|
| **Data Persistence** | Per browser | Cloud (permanent) |
| **Multi-device** | ❌ Tidak | ✅ Ya |
| **Real-time Sync** | ❌ Tidak | ✅ Ya |
| **Data Capacity** | ~5-10 MB | 500 MB (free) |
| **Security** | ⚠️ Client-side | ✅ Server-side |
| **Monitoring** | ❌ Tidak | ✅ Ya |
| **Backup** | ❌ Manual | ✅ Otomatis |
| **Multi-user** | ❌ Tidak | ✅ Ya |

### Cocok untuk Production:
- ✅ Ujian di lab komputer dengan banyak PC
- ✅ Monitoring real-time oleh guru
- ✅ Data aman tersimpan di cloud
- ✅ Tidak hilang meski browser di-clear
- ✅ Dapat diakses dari berbagai device
- ✅ Backup otomatis

---

## 🔧 Langkah-langkah Setup

### Langkah 1: Buat Akun Supabase

1. **Buka** https://supabase.com
2. **Klik** "Start your project"
3. **Sign up** dengan:
   - GitHub account (recommended), atau
   - Email + password
4. **Verifikasi** email jika perlu

### Langkah 2: Buat Project Baru

1. **Klik** "New Project"
2. **Isi form**:
   ```
   Name            : CBT-EXAM-SMKN1KUOK
   Database Password : [buat password kuat, SIMPAN!]
   Region          : Southeast Asia (Singapore) - terdekat ke Indonesia
   Pricing Plan    : Free
   ```
3. **Klik** "Create new project"
4. **Tunggu** ~2 menit sampai project siap

### Langkah 3: Setup Database Schema

1. **Di dashboard project**, klik menu **"SQL Editor"** (ikon ⚡)
2. **Klik** "New query"
3. **Buka file** `supabase-setup.sql` dari folder project
4. **Copy semua** isi file tersebut
5. **Paste** di SQL Editor
6. **Klik** "Run" atau tekan `Ctrl + Enter`
7. **Tunggu** hingga muncul pesan sukses:
   ```
   ✅ CBT EXAM Database Setup - COMPLETED SUCCESSFULLY!
   Tables created: 7
   Functions created: 5
   Views created: 2
   ```

### Langkah 4: Insert Data Soal

1. **Masih di SQL Editor**, klik "New query" lagi
2. **Buka file** `supabase-insert-questions.sql`
3. **Copy semua** isi file
4. **Paste** di SQL Editor
5. **Klik** "Run"
6. **Tunggu** hingga muncul:
   ```
   ✅ 40 Soal PAI berhasil diinsert!
   ```

### Langkah 5: Dapatkan API Credentials

1. **Klik** ⚙️ Settings di sidebar kiri
2. **Klik** "API" di submenu
3. **Copy** 2 nilai ini:

   **Project URL:**
   ```
   https://abcdefghijklmno.supabase.co
   ```

   **anon/public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSI...
   ```

### Langkah 6: Konfigurasi Aplikasi

1. **Buka file** `js/supabase-config.js`
2. **Edit bagian ini:**

   ```javascript
   const SUPABASE_CONFIG = {
       // Ganti dengan URL Anda
       url: 'https://abcdefghijklmno.supabase.co',
       
       // Ganti dengan anon key Anda
       anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
       
       // Options (biarkan default)
       options: {
           auth: {
               autoRefreshToken: true,
               persistSession: true,
               detectSessionInUrl: true
           }
       }
   };
   ```

3. **Save** file

### Langkah 7: Update HTML Files

Tambahkan Supabase library di **index.html** dan **admin.html**:

**Tambahkan sebelum closing `</body>`:**

```html
<!-- Supabase Client Library -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Supabase Config -->
<script src="js/supabase-config.js"></script>

<!-- Existing scripts -->
<script src="js/data.js"></script>
<script src="js/app.js"></script>
```

---

## ✅ Testing Database

### Test 1: Cek Tabel di Supabase

1. **Klik** "Table Editor" di dashboard
2. **Pastikan tabel ini ada:**
   - ✅ users
   - ✅ exams
   - ✅ questions (40 rows)
   - ✅ exam_sessions
   - ✅ answers
   - ✅ violations
   - ✅ admins

### Test 2: Cek Data Exam

1. **Klik tabel** `exams`
2. **Pastikan ada** 1 row dengan:
   - token: `TOKEN2024`
   - subject: `PAI dan Budi Pekerti`
   - is_active: `true`

### Test 3: Cek Soal

1. **Klik tabel** `questions`
2. **Pastikan ada** 40 rows
3. **Check** beberapa soal memiliki:
   - ✅ question text
   - ✅ options A-E
   - ✅ correct_answer

### Test 4: Test Koneksi dari Aplikasi

1. **Buka** aplikasi CBT Exam di browser
2. **Buka** Developer Console (`F12`)
3. **Lihat** tab Console
4. **Harus muncul:** 
   ```
   ✅ Supabase initialized successfully
   ```

---

## 🔄 Update Aplikasi untuk Menggunakan Supabase

Saya sudah menyediakan file `js/supabase-config.js` yang berisi fungsi-fungsi untuk:

### Student Operations:
```javascript
// Login dan start exam
SupabaseAPI.getExamByToken(token)
SupabaseAPI.startExamSession(examId, nisn, name, class)
SupabaseAPI.getExamQuestions(examId)

// Submit answers
SupabaseAPI.submitAnswer(sessionId, questionId, answer)
SupabaseAPI.toggleMarkQuestion(sessionId, questionId, isMarked)

// Complete exam
SupabaseAPI.completeExamSession(sessionId)
SupabaseAPI.getFinalScore(sessionId)

// Record violations
SupabaseAPI.recordViolation(sessionId, violationType, data)
```

### Admin Operations:
```javascript
// Monitoring
SupabaseAPI.getActiveSessions()
SupabaseAPI.getExamResults(examId)

// Question management
SupabaseAPI.addQuestion(examId, questionData)
SupabaseAPI.updateQuestion(questionId, questionData)
SupabaseAPI.deleteQuestion(questionId)
```

### Real-time Monitoring:
```javascript
// Subscribe to live updates
const channel = SupabaseAPI.subscribeToActiveSessions((payload) => {
    console.log('Session updated:', payload);
    // Update UI
});

// Unsubscribe when done
SupabaseAPI.unsubscribe(channel);
```

---

## 🎨 Integrasi dengan App.js

Untuk mengintegrasikan Supabase ke aplikasi yang sudah ada:

### Option 1: Hybrid Mode (Recommended untuk Transisi)

Deteksi apakah Supabase configured, jika ya gunakan Supabase, jika tidak fallback ke LocalStorage:

```javascript
// Di app.js
async function handleLogin(e) {
    e.preventDefault();
    
    // Check if Supabase configured
    if (SupabaseAPI.isConfigured() && SupabaseAPI.init()) {
        // Use Supabase
        const result = await SupabaseAPI.getExamByToken(token);
        if (result.success) {
            // Process with Supabase
        }
    } else {
        // Fallback to LocalStorage (existing code)
        const examData = DataManager.validateToken(token);
        // ... existing code
    }
}
```

### Option 2: Pure Supabase Mode

Ganti semua `DataManager` calls dengan `SupabaseAPI`:

```javascript
// Before (LocalStorage):
DataManager.saveAnswer(questionId, answer);

// After (Supabase):
await SupabaseAPI.submitAnswer(sessionId, questionId, answer);
```

---

## 🔒 Keamanan

### Row Level Security (RLS)

Database sudah dikonfigurasi dengan RLS policies:

✅ **Siswa hanya bisa:**
- Lihat exam yang aktif
- Akses soal dari exam yang diikuti
- Submit jawaban ke sesi mereka sendiri
- Record violation mereka sendiri

✅ **Admin bisa:**
- Akses semua data
- CRUD questions
- Monitoring semua sessions

### Best Practices:

1. **Jangan share** Supabase credentials di public repo
2. **Gunakan** environment variables untuk production
3. **Enable** Row Level Security (sudah aktif)
4. **Rotate** API keys secara berkala
5. **Monitor** Supabase dashboard untuk aktivitas mencurigakan

---

## 📊 Monitoring via Supabase Dashboard

### Database Stats:
- **Klik** "Database" → "Reports"
- **Lihat:**
  - Active connections
  - Query performance
  - Database size

### Table Activity:
- **Klik** "Table Editor"
- **Select** table
- **Filter** dan search data real-time

### API Logs:
- **Klik** "Logs"
- **Pilih** "API" logs
- **Monitor** semua request

### Real-time:
- **Klik** "Database" → "Replication"
- **Lihat** active subscriptions

---

## 🐛 Troubleshooting

### Problem 1: "Supabase not initialized"

**Solusi:**
1. Pastikan `supabase-config.js` sudah diupdate dengan URL dan key yang benar
2. Cek Developer Console untuk error details
3. Pastikan Supabase library loaded (check Network tab)

### Problem 2: "Failed to fetch"

**Solusi:**
1. Cek internet connection
2. Pastikan Supabase project status = "Active" di dashboard
3. Verify API credentials correct

### Problem 3: "Permission denied" errors

**Solusi:**
1. Cek RLS policies di Supabase
2. Pastikan table permissions sudah benar
3. Verify user authenticated properly

### Problem 4: Soal tidak muncul

**Solusi:**
1. Cek tabel `questions` di Supabase
2. Pastikan `exam_id` match dengan exam yang dipilih
3. Run `supabase-insert-questions.sql` lagi

### Problem 5: Session tidak tersimpan

**Solusi:**
1. Cek tabel `exam_sessions`
2. Verify function `start_exam_session` works:
   ```sql
   SELECT start_exam_session(
       'exam-uuid-here'::uuid,
       '12345',
       'Test Student',
       'XI TO'
   );
   ```

---

## 🚀 Deploy to Production

### Step 1: Update RLS Policies

Review dan sesuaikan RLS policies sesuai kebutuhan production.

### Step 2: Setup Custom Domain

1. **Settings** → **General**
2. **Add** custom domain
3. **Update** DNS records

### Step 3: Enable SSL

Supabase menggunakan SSL by default. Pastikan aplikasi Anda juga deploy dengan HTTPS.

### Step 4: Backup Strategy

1. **Enable** Point-in-Time Recovery (PITR) untuk paid plans
2. **Setup** regular database dumps:
   ```bash
   # Manual backup via CLI
   supabase db dump > backup.sql
   ```

### Step 5: Monitoring Setup

1. **Enable** email alerts untuk:
   - Database usage > 80%
   - API errors spike
   - Unusual activity

---

## 💰 Upgrade Plans

Jika aplikasi berkembang dan membutuhkan lebih:

### Pro Plan ($25/month):
- 8 GB Database
- 100 GB Bandwidth
- 100,000 MAU
- Point-in-Time Recovery
- Daily backups

### Team Plan (Custom):
- Dedicated resources
- Priority support
- SLA guarantees

---

## 📚 Resources

### Official Documentation:
- Supabase Docs: https://supabase.com/docs
- PostgreSQL Docs: https://www.postgresql.org/docs/
- JavaScript Client: https://supabase.com/docs/reference/javascript

### Tutorials:
- Supabase YouTube: https://youtube.com/@Supabase
- Realtime Features: https://supabase.com/docs/guides/realtime

### Community:
- Discord: https://discord.supabase.com
- GitHub Discussions: https://github.com/supabase/supabase/discussions

---

## ✅ Checklist Setup

Gunakan checklist ini untuk memastikan setup lengkap:

- [ ] Buat akun Supabase
- [ ] Buat project baru
- [ ] Run `supabase-setup.sql`
- [ ] Run `supabase-insert-questions.sql`
- [ ] Copy URL dan anon key
- [ ] Update `supabase-config.js`
- [ ] Tambah Supabase library di HTML
- [ ] Test koneksi di browser
- [ ] Test login siswa
- [ ] Test submit answer
- [ ] Test monitoring admin
- [ ] Enable RLS policies
- [ ] Setup backup strategy
- [ ] Deploy aplikasi

---

## 🎉 Selesai!

Aplikasi CBT Exam Anda sekarang menggunakan **Supabase Database**!

**Keuntungan yang Anda dapatkan:**
- ✅ Data persistent dan aman
- ✅ Multi-device support
- ✅ Real-time monitoring
- ✅ Scalable untuk ratusan siswa
- ✅ Backup otomatis
- ✅ Professional grade database

**Untuk bantuan lebih lanjut:**
- Baca dokumentasi Supabase
- Check troubleshooting section
- Hubungi admin sekolah

---

**Dibuat dengan ❤️ untuk SMKN 1 KUOK**
```