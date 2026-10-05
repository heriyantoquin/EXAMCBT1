# 🗄️ Supabase Integration - CBT EXAM

## 📦 File-file Supabase

Berikut file-file yang ditambahkan untuk integrasi Supabase:

```
CBTEXAM/
├── supabase-setup.sql              🔧 Database schema setup
├── supabase-insert-questions.sql   📝 Insert 40 soal PAI
├── js/
│   └── supabase-config.js          ⚙️ Supabase API wrapper
├── SUPABASE_SETUP_GUIDE.md         📖 Panduan setup lengkap
├── DATABASE_SCHEMA.md              📊 Dokumentasi schema
└── SUPABASE_README.md              📄 File ini
```

---

## 🚀 Quick Start (5 Menit)

### 1. Setup Supabase (2 menit)
```bash
1. Buka https://supabase.com
2. Buat project baru
3. Copy URL & anon key
```

### 2. Run SQL Scripts (2 menit)
```sql
-- Di Supabase SQL Editor:
1. Run supabase-setup.sql        ✅ Create tables
2. Run supabase-insert-questions.sql ✅ Insert soal
```

### 3. Configure App (1 menit)
```javascript
// Edit js/supabase-config.js:
url: 'https://your-project.supabase.co',
anonKey: 'your-anon-key-here'
```

**✅ Done!** Aplikasi siap menggunakan database cloud.

---

## 💾 Perbedaan LocalStorage vs Supabase

### Mode LocalStorage (Default)
```javascript
// Data tersimpan di browser
DataManager.save('answers', answersData);
DataManager.load('answers');
```

**Kelebihan:**
- ✅ Mudah, tidak perlu setup
- ✅ Works offline
- ✅ Gratis

**Kekurangan:**
- ❌ Per browser (tidak sync)
- ❌ Kapasitas terbatas (~5-10 MB)
- ❌ Hilang jika clear browser data
- ❌ Tidak bisa monitoring real-time

### Mode Supabase (Recommended)
```javascript
// Data tersimpan di cloud
await SupabaseAPI.submitAnswer(sessionId, questionId, answer);
await SupabaseAPI.getSessionAnswers(sessionId);
```

**Kelebihan:**
- ✅ Multi-device sync
- ✅ Data permanent
- ✅ Real-time monitoring
- ✅ Kapasitas besar (500 MB free)
- ✅ Backup otomatis
- ✅ Security terjamin

**Kekurangan:**
- ⚠️ Butuh internet
- ⚠️ Setup awal diperlukan

---

## 🔄 Migration Path

### Tahap 1: Hybrid Mode (Sekarang)
Aplikasi support **both** LocalStorage dan Supabase:
```javascript
if (SupabaseAPI.isConfigured()) {
    // Use Supabase
    await SupabaseAPI.submitAnswer(...);
} else {
    // Fallback to LocalStorage
    DataManager.saveAnswer(...);
}
```

### Tahap 2: Pure Supabase (Production)
Ganti semua calls ke Supabase:
```javascript
// Before
DataManager.saveAnswer(qId, answer);

// After
await SupabaseAPI.submitAnswer(sessionId, qId, answer);
```

---

## 📊 Database Tables

### Core Tables:
1. **exams** - Master ujian (token, durasi, soal)
2. **questions** - Bank soal (40 soal PAI)
3. **exam_sessions** - Sesi ujian siswa
4. **answers** - Jawaban siswa
5. **violations** - Pelanggaran
6. **users** - Data siswa
7. **admins** - Data admin/guru

### Views (untuk monitoring):
- **v_active_sessions** - Monitoring real-time
- **v_exam_results** - Hasil ujian

**Detail lengkap:** Baca `DATABASE_SCHEMA.md`

---

## 🔌 API Usage Examples

### Student Operations

#### 1. Login & Get Exam
```javascript
// Get exam by token
const result = await SupabaseAPI.getExamByToken('TOKEN2024');
if (result.success) {
    console.log('Exam:', result.data);
    // { id, title, subject, teacher, duration, total_questions }
}
```

#### 2. Start Exam Session
```javascript
// Start new session
const session = await SupabaseAPI.startExamSession(
    examId,
    '12345',        // NISN
    'Ahmad',        // Name
    'XI TO'         // Class
);

if (session.success) {
    const sessionId = session.sessionId;
    // Save sessionId for use
}
```

#### 3. Get Questions
```javascript
// Get all questions for exam
const questions = await SupabaseAPI.getExamQuestions(examId);
if (questions.success) {
    console.log('Questions:', questions.data);
    // Array of 40 questions
}
```

#### 4. Submit Answer
```javascript
// Submit single answer
const result = await SupabaseAPI.submitAnswer(
    sessionId,
    questionId,
    'A'  // Student answer
);

if (result.success) {
    console.log('Is correct:', result.isCorrect);
    // Auto-checked against correct_answer
}
```

#### 5. Mark Question
```javascript
// Toggle mark for review
await SupabaseAPI.toggleMarkQuestion(
    sessionId,
    questionId,
    true  // is_marked
);
```

#### 6. Complete Exam
```javascript
// Finish exam and calculate score
await SupabaseAPI.completeExamSession(sessionId);

// Get final score
const score = await SupabaseAPI.getFinalScore(sessionId);
if (score.success) {
    console.log('Score:', score.data);
    // { total_score, correct_answers, total_questions, percentage }
}
```

#### 7. Record Violation
```javascript
// Record when student switches tab
await SupabaseAPI.recordViolation(
    sessionId,
    'tab_switch',
    { timestamp: new Date(), userAgent: navigator.userAgent }
);
```

### Admin Operations

#### 1. Monitor Active Sessions
```javascript
// Get all active sessions (real-time)
const sessions = await SupabaseAPI.getActiveSessions();
if (sessions.success) {
    sessions.data.forEach(session => {
        console.log(`${session.student_name}: ${session.progress_percentage}%`);
    });
}
```

#### 2. Get Exam Results
```javascript
// Get completed exam results
const results = await SupabaseAPI.getExamResults(examId);
if (results.success) {
    console.log('Results:', results.data);
    // All completed sessions with scores
}
```

#### 3. Add Question
```javascript
// Add new question to exam
const newQuestion = await SupabaseAPI.addQuestion(examId, {
    questionNumber: 41,
    question: 'Pertanyaan baru?',
    optionA: 'Pilihan A',
    optionB: 'Pilihan B',
    optionC: 'Pilihan C',
    optionD: 'Pilihan D',
    optionE: 'Pilihan E',
    correctAnswer: 'A',
    score: 1,
    difficulty: 'sedang',
    category: 'Ibadah'
});
```

#### 4. Update Question
```javascript
// Edit existing question
await SupabaseAPI.updateQuestion(questionId, {
    question: 'Updated question text',
    optionA: 'New option A',
    correctAnswer: 'B'
    // ... other fields
});
```

#### 5. Delete Question
```javascript
// Delete question
await SupabaseAPI.deleteQuestion(questionId);
```

### Real-time Subscriptions

#### Monitor Active Sessions
```javascript
// Subscribe to live session updates
const channel = SupabaseAPI.subscribeToActiveSessions((payload) => {
    console.log('Session update:', payload);
    // { eventType: 'INSERT'|'UPDATE'|'DELETE', new: {...}, old: {...} }
    
    // Update UI accordingly
    updateDashboard(payload.new);
});

// Later: unsubscribe
SupabaseAPI.unsubscribe(channel);
```

#### Monitor Violations
```javascript
// Subscribe to violations for specific session
const violationChannel = SupabaseAPI.subscribeToViolations(
    sessionId,
    (payload) => {
        console.log('New violation:', payload.new);
        // Alert admin
        showViolationAlert(payload.new);
    }
);
```

---

## 🔐 Security

### Row Level Security (RLS)

**Siswa hanya bisa:**
```sql
-- Lihat exam aktif
SELECT FROM exams WHERE is_active = true

-- Akses soal dari exam yang diikuti
SELECT FROM questions 
WHERE exam_id IN (
    SELECT exam_id FROM exam_sessions 
    WHERE user_id = auth.uid()
)

-- CRUD session mereka sendiri
SELECT/UPDATE/DELETE FROM exam_sessions 
WHERE user_id = auth.uid()

-- CRUD jawaban mereka
SELECT/INSERT/UPDATE FROM answers
WHERE session_id IN (
    SELECT id FROM exam_sessions 
    WHERE user_id = auth.uid()
)
```

**Admin bisa akses semua.**

### API Key Security

```javascript
// ❌ JANGAN di-commit ke public repo
const SUPABASE_CONFIG = {
    url: 'https://project.supabase.co',
    anonKey: 'public-key-here'  // This is OK for client-side
};

// ✅ Service key (jika digunakan) simpan di environment variable
```

---

## 🎯 Integration Checklist

Untuk mengintegrasikan Supabase ke aplikasi existing:

### Step 1: Setup Database
- [ ] Run `supabase-setup.sql`
- [ ] Run `supabase-insert-questions.sql`
- [ ] Verify tables created
- [ ] Verify 40 questions inserted

### Step 2: Configure App
- [ ] Copy URL dan anon key
- [ ] Update `supabase-config.js`
- [ ] Add Supabase library to HTML
- [ ] Test connection in browser console

### Step 3: Update Login Flow
- [ ] Replace `DataManager.validateToken()` with `SupabaseAPI.getExamByToken()`
- [ ] Call `SupabaseAPI.startExamSession()` after validation
- [ ] Store `sessionId` in AppState

### Step 4: Update Exam Logic
- [ ] Replace `DataManager.getQuestions()` with `SupabaseAPI.getExamQuestions()`
- [ ] Replace `DataManager.saveAnswer()` with `SupabaseAPI.submitAnswer()`
- [ ] Replace mark logic with `SupabaseAPI.toggleMarkQuestion()`

### Step 5: Update Submit Flow
- [ ] Call `SupabaseAPI.completeExamSession()` on submit
- [ ] Call `SupabaseAPI.getFinalScore()` for results
- [ ] Display score from Supabase

### Step 6: Update Admin Panel
- [ ] Replace monitoring with `SupabaseAPI.getActiveSessions()`
- [ ] Setup real-time subscription
- [ ] Update question management to use Supabase API

### Step 7: Testing
- [ ] Test student login
- [ ] Test taking exam
- [ ] Test submit
- [ ] Test admin monitoring
- [ ] Test question management
- [ ] Test violations recording

---

## 🐛 Common Issues

### Issue: "Supabase is not defined"
```javascript
// Solution: Make sure library is loaded before config
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="js/supabase-config.js"></script>
```

### Issue: "Permission denied"
```sql
-- Solution: Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'exam_sessions';

-- Verify user authenticated
SELECT auth.uid();
```

### Issue: "Cannot read property 'data'"
```javascript
// Solution: Check result.success first
const result = await SupabaseAPI.getExamByToken(token);
if (result.success) {
    console.log(result.data);
} else {
    console.error(result.error);
}
```

### Issue: "Connection timeout"
```javascript
// Solution: Check internet connection
// Verify Supabase project is active
// Check if API keys are correct
```

---

## 📈 Performance

### Best Practices:

1. **Batch Operations**
```javascript
// ❌ Bad: Individual inserts
for (let answer of answers) {
    await SupabaseAPI.submitAnswer(...);
}

// ✅ Better: Batch insert (custom function)
await supabase.from('answers').insert(answers);
```

2. **Use Views**
```javascript
// ✅ Use optimized view
const sessions = await supabase
    .from('v_active_sessions')
    .select('*');
```

3. **Limit Results**
```javascript
// ✅ Paginate large results
const results = await supabase
    .from('exam_sessions')
    .select('*')
    .range(0, 99)  // First 100 rows
    .order('created_at', { ascending: false });
```

4. **Cache Frequent Queries**
```javascript
// Cache exam questions (they don't change during exam)
let cachedQuestions = null;

async function getQuestions(examId) {
    if (!cachedQuestions) {
        const result = await SupabaseAPI.getExamQuestions(examId);
        cachedQuestions = result.data;
    }
    return cachedQuestions;
}
```

---

## 📊 Monitoring

### Supabase Dashboard:

1. **Database → Reports**
   - Query performance
   - Active connections
   - Database size

2. **Database → Replication**
   - Real-time subscriptions
   - Active channels

3. **Logs**
   - API requests
   - Errors
   - Slow queries

4. **Settings → API**
   - Usage stats
   - Rate limits

---

## 🚀 Production Deployment

### Checklist:

1. **Environment Variables**
```javascript
// Don't hardcode in production
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
```

2. **Enable Connection Pooling**
```sql
-- In Supabase: Database → Settings → Connection Pooling
-- Use pooler connection string for better performance
```

3. **Setup Backups**
```bash
# Enable Point-in-Time Recovery (paid plans)
# Or setup daily cron for manual backups
```

4. **Monitor Performance**
```sql
-- Create indexes for slow queries
CREATE INDEX idx_custom ON table_name(column);
```

5. **Set Rate Limits**
```javascript
// In Supabase: Settings → API → Rate Limits
// Protect against abuse
```

---

## 📚 Resources

- **Setup Guide**: `SUPABASE_SETUP_GUIDE.md`
- **Schema Docs**: `DATABASE_SCHEMA.md`
- **SQL Scripts**: `supabase-setup.sql`, `supabase-insert-questions.sql`
- **API Config**: `js/supabase-config.js`

### External:
- Supabase Docs: https://supabase.com/docs
- JS Client: https://supabase.com/docs/reference/javascript
- PostgreSQL: https://www.postgresql.org/docs/

---

## ✅ Summary

**Dengan Supabase integration, aplikasi CBT Exam mendapatkan:**

- ✅ Database cloud yang powerful
- ✅ Real-time monitoring
- ✅ Multi-device support
- ✅ Data persistence yang aman
- ✅ Scalability untuk ratusan siswa
- ✅ Backup otomatis
- ✅ Professional-grade infrastructure

**Next Steps:**
1. Baca `SUPABASE_SETUP_GUIDE.md` untuk setup
2. Baca `DATABASE_SCHEMA.md` untuk struktur database
3. Test di development
4. Deploy to production

---

**Dibuat dengan ❤️ untuk SMKN 1 KUOK**

CBT EXAM v1.0 + Supabase Integration
