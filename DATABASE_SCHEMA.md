# 📊 Database Schema - CBT EXAM

## Gambaran Umum

Database CBT Exam menggunakan **PostgreSQL** via Supabase dengan 7 tabel utama yang saling terkait.

---

## 📋 Tabel-tabel

### 1. **users** - Data Pengguna
```sql
id              UUID PRIMARY KEY
nisn            VARCHAR(20) UNIQUE NOT NULL
name            VARCHAR(100) NOT NULL
class           VARCHAR(20) NOT NULL
password_hash   TEXT
role            VARCHAR(20) DEFAULT 'student'
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

**Fungsi:**
- Menyimpan data siswa dan admin
- NISN sebagai unique identifier untuk siswa
- Role: 'student' atau 'admin'

**Indexes:**
- `idx_users_nisn` pada kolom nisn
- `idx_users_role` pada kolom role

---

### 2. **exams** - Data Ujian
```sql
id                  UUID PRIMARY KEY
title               VARCHAR(200) NOT NULL
subject             VARCHAR(100) NOT NULL
teacher             VARCHAR(100) NOT NULL
class_allowed       TEXT[] -- Array
duration            INTEGER NOT NULL (menit)
total_questions     INTEGER NOT NULL
token               VARCHAR(50) UNIQUE NOT NULL
start_time          TIMESTAMP
end_time            TIMESTAMP
is_active           BOOLEAN DEFAULT true
show_score          BOOLEAN DEFAULT false
shuffle_questions   BOOLEAN DEFAULT false
shuffle_options     BOOLEAN DEFAULT false
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

**Fungsi:**
- Master data ujian
- Token untuk akses siswa
- Pengaturan waktu dan konfigurasi
- class_allowed: Array kelas yang boleh ikut

**Indexes:**
- `idx_exams_token` pada kolom token
- `idx_exams_active` pada kolom is_active

---

### 3. **questions** - Bank Soal
```sql
id                  UUID PRIMARY KEY
exam_id             UUID REFERENCES exams(id)
question_number     INTEGER NOT NULL
question            TEXT NOT NULL
option_a            TEXT NOT NULL
option_b            TEXT NOT NULL
option_c            TEXT NOT NULL
option_d            TEXT NOT NULL
option_e            TEXT
correct_answer      VARCHAR(1) NOT NULL
score               INTEGER DEFAULT 1
difficulty          VARCHAR(20) DEFAULT 'sedang'
category            VARCHAR(100)
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

**Fungsi:**
- Menyimpan soal per exam
- Mendukung 4-5 pilihan (A-E)
- Kategorisasi berdasarkan kesulitan
- Cascade delete jika exam dihapus

**Indexes:**
- `idx_questions_exam` pada kolom exam_id

**Sample Categories:**
- Al-Quran, Rukun Iman, Rukun Islam
- Ibadah, Akhlak, Aqidah, Fiqih
- Sejarah

---

### 4. **exam_sessions** - Sesi Ujian Siswa
```sql
id                  UUID PRIMARY KEY
exam_id             UUID REFERENCES exams(id)
user_id             UUID REFERENCES users(id)
student_name        VARCHAR(100) NOT NULL
student_nisn        VARCHAR(20) NOT NULL
student_class       VARCHAR(20) NOT NULL
start_time          TIMESTAMP DEFAULT NOW()
end_time            TIMESTAMP
submit_time         TIMESTAMP
duration_seconds    INTEGER
status              VARCHAR(20) DEFAULT 'in_progress'
total_score         INTEGER DEFAULT 0
correct_answers     INTEGER DEFAULT 0
is_active           BOOLEAN DEFAULT true
created_at          TIMESTAMP
updated_at          TIMESTAMP
UNIQUE(exam_id, student_nisn)
```

**Fungsi:**
- Track sesi ujian per siswa
- Satu siswa hanya bisa punya 1 sesi aktif per exam
- Status: 'in_progress', 'completed', 'timeout'
- Menyimpan hasil akhir

**Indexes:**
- `idx_sessions_exam` pada kolom exam_id
- `idx_sessions_status` pada kolom status

---

### 5. **answers** - Jawaban Siswa
```sql
id              UUID PRIMARY KEY
session_id      UUID REFERENCES exam_sessions(id)
question_id     UUID REFERENCES questions(id)
student_answer  VARCHAR(1)
is_correct      BOOLEAN
is_marked       BOOLEAN DEFAULT false
time_spent      INTEGER (detik)
answered_at     TIMESTAMP
created_at      TIMESTAMP
updated_at      TIMESTAMP
UNIQUE(session_id, question_id)
```

**Fungsi:**
- Menyimpan jawaban siswa per soal
- Auto-calculate is_correct
- Support mark untuk review
- Track waktu per soal

**Indexes:**
- `idx_answers_session` pada kolom session_id

---

### 6. **violations** - Pelanggaran
```sql
id                  UUID PRIMARY KEY
session_id          UUID REFERENCES exam_sessions(id)
violation_type      VARCHAR(50) NOT NULL
violation_data      JSONB
created_at          TIMESTAMP
```

**Fungsi:**
- Logging pelanggaran siswa
- Violation types:
  - `tab_switch` - Pindah tab
  - `window_blur` - Kehilangan fokus
  - `exit_fullscreen` - Keluar fullscreen
- violation_data: JSON untuk info tambahan

**Indexes:**
- `idx_violations_session` pada kolom session_id

---

### 7. **admins** - Data Admin
```sql
id              UUID PRIMARY KEY
username        VARCHAR(50) UNIQUE NOT NULL
password_hash   TEXT NOT NULL
name            VARCHAR(100) NOT NULL
email           VARCHAR(100)
is_active       BOOLEAN DEFAULT true
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

**Fungsi:**
- Akun admin/guru
- Password harus di-hash (bcrypt/Argon2)
- Terpisah dari table users untuk security

---

## 🔗 Relasi Antar Tabel

```
exams (1) ──────► (N) questions
  │
  └──► (N) exam_sessions (1) ──────► (N) answers
                    │                      │
                    │                      └──► (1) questions
                    │
                    └──► (N) violations

users (1) ──────► (N) exam_sessions
```

---

## 📊 Views

### v_active_sessions
```sql
SELECT 
    session_id, student_name, student_nisn, student_class,
    subject, start_time, status,
    answered_questions, total_questions, progress_percentage,
    violation_count, elapsed_seconds, remaining_seconds
FROM exam_sessions
JOIN exams ON ...
WHERE is_active = true
```

**Fungsi:** Monitoring real-time untuk admin

### v_exam_results
```sql
SELECT 
    session_id, student_name, student_nisn, student_class,
    subject, start_time, submit_time, status,
    total_score, correct_answers, total_questions,
    percentage, violation_count
FROM exam_sessions
WHERE status = 'completed'
```

**Fungsi:** Laporan hasil ujian

---

## 🔧 Functions (Stored Procedures)

### 1. `get_exam_by_token(exam_token TEXT)`
```sql
RETURNS TABLE (id, title, subject, teacher, duration, total_questions)
```
Mendapatkan info exam berdasarkan token.

### 2. `start_exam_session(p_exam_id, p_student_nisn, p_student_name, p_student_class)`
```sql
RETURNS UUID (session_id)
```
- Create/update user
- Create exam session
- Return session_id

### 3. `submit_answer(p_session_id, p_question_id, p_answer)`
```sql
RETURNS BOOLEAN (is_correct)
```
- Get correct answer
- Check if correct
- Insert/update answer
- Return boolean

### 4. `calculate_final_score(p_session_id)`
```sql
RETURNS TABLE (total_score, correct_answers, total_questions, percentage)
```
Calculate score dari semua jawaban.

### 5. `complete_exam_session(p_session_id)`
```sql
RETURNS BOOLEAN
```
- Calculate final score
- Update session status = 'completed'
- Set end_time & submit_time

---

## 🔒 Row Level Security (RLS)

### Enabled pada semua tabel:
```sql
ALTER TABLE [table_name] ENABLE ROW LEVEL SECURITY;
```

### Policies untuk Siswa:

**exams:**
```sql
SELECT: is_active = true
```
Siswa hanya bisa lihat exam yang aktif.

**questions:**
```sql
SELECT: exam_id IN (SELECT exam_id FROM exam_sessions WHERE user_id = auth.uid())
```
Siswa hanya bisa lihat soal dari exam yang diikuti.

**exam_sessions:**
```sql
ALL: user_id = auth.uid()
```
Siswa hanya bisa akses sesi mereka sendiri.

**answers:**
```sql
ALL: session_id IN (SELECT id FROM exam_sessions WHERE user_id = auth.uid())
```
Siswa hanya bisa akses jawaban mereka.

**violations:**
```sql
INSERT: session_id IN (SELECT id FROM exam_sessions WHERE user_id = auth.uid())
```
Siswa hanya bisa insert violation mereka.

---

## 🔍 Query Examples

### Get exam dengan token:
```sql
SELECT * FROM exams 
WHERE token = 'TOKEN2024' AND is_active = true;
```

### Get soal untuk exam:
```sql
SELECT * FROM questions 
WHERE exam_id = 'uuid-here'
ORDER BY question_number;
```

### Get sesi aktif siswa:
```sql
SELECT * FROM exam_sessions
WHERE student_nisn = '12345'
  AND exam_id = 'uuid-here'
  AND is_active = true;
```

### Get jawaban siswa:
```sql
SELECT a.*, q.correct_answer
FROM answers a
JOIN questions q ON a.question_id = q.id
WHERE a.session_id = 'uuid-here';
```

### Count violations:
```sql
SELECT COUNT(*) as total_violations
FROM violations
WHERE session_id = 'uuid-here';
```

### Monitoring siswa aktif:
```sql
SELECT * FROM v_active_sessions
ORDER BY start_time DESC;
```

### Hasil ujian kelas:
```sql
SELECT 
    student_name,
    student_class,
    correct_answers,
    total_questions,
    ROUND((correct_answers::NUMERIC / total_questions::NUMERIC * 100), 2) as percentage
FROM v_exam_results
WHERE subject = 'PAI dan Budi Pekerti'
  AND student_class = 'XI TO'
ORDER BY correct_answers DESC;
```

---

## 🔄 Triggers

### Auto-update `updated_at`:
```sql
CREATE TRIGGER update_[table]_updated_at 
BEFORE UPDATE ON [table]
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();
```

Otomatis update kolom `updated_at` setiap ada perubahan data.

---

## 📈 Performance Tips

1. **Indexes** sudah dibuat untuk kolom yang sering di-query
2. **Use prepared statements** untuk query berulang
3. **Batch inserts** untuk multiple questions
4. **Use views** untuk query kompleks
5. **Enable connection pooling** di production
6. **Monitor slow queries** di Supabase dashboard

---

## 🔐 Security Best Practices

1. ✅ RLS enabled pada semua tabel
2. ✅ Password di-hash (jangan plaintext!)
3. ✅ Token unique per exam
4. ✅ Validate input di application level
5. ✅ Use parameterized queries
6. ✅ Limit API rate di Supabase
7. ✅ Monitor unauthorized access attempts

---

## 📊 Sample Data

### Exam:
- Token: `TOKEN2024`
- Subject: PAI dan Budi Pekerti
- Duration: 60 menit
- Questions: 40 soal

### Admin:
- Username: `admin`
- Password: (hashed)
- Name: Heriyanto

---

## 🔄 Migration & Backup

### Backup Database:
```bash
# Via Supabase CLI
supabase db dump -f backup.sql
```

### Restore:
```bash
supabase db reset
psql -h [host] -U [user] -d [database] < backup.sql
```

### Export to CSV:
```sql
COPY (SELECT * FROM exam_sessions) 
TO '/path/to/file.csv' 
WITH CSV HEADER;
```

---

## 📝 Notes

- **UUID** digunakan untuk semua primary keys (security & distribution)
- **TIMESTAMP WITH TIME ZONE** untuk semua waktu (timezone-aware)
- **JSONB** untuk data fleksibel (violations, metadata)
- **Arrays** untuk multiple values (class_allowed)
- **CASCADE DELETE** pada foreign keys penting
- **Unique constraints** mencegah duplikasi

---

**Database Version:** PostgreSQL 15 (via Supabase)
**Created:** October 2024
**For:** CBT EXAM - SMKN 1 KUOK
