-- ============================================================
-- SUPABASE DATABASE SETUP FOR CBT EXAM - SMKN 1 KUOK
-- ============================================================
-- Copy dan jalankan SQL ini di Supabase SQL Editor
-- ============================================================

-- 1. TABEL USERS (Siswa dan Admin)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nisn VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    class VARCHAR(20) NOT NULL,
    password_hash TEXT,
    role VARCHAR(20) DEFAULT 'student', -- 'student' atau 'admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABEL EXAMS (Ujian)
CREATE TABLE IF NOT EXISTS exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    teacher VARCHAR(100) NOT NULL,
    class_allowed TEXT[], -- Array kelas yang boleh ikut
    duration INTEGER NOT NULL, -- Durasi dalam menit
    total_questions INTEGER NOT NULL,
    token VARCHAR(50) UNIQUE NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    show_score BOOLEAN DEFAULT false, -- Tampilkan nilai langsung
    shuffle_questions BOOLEAN DEFAULT false,
    shuffle_options BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABEL QUESTIONS (Bank Soal)
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
    question_number INTEGER NOT NULL,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    option_e TEXT,
    correct_answer VARCHAR(1) NOT NULL, -- A, B, C, D, atau E
    score INTEGER DEFAULT 1,
    difficulty VARCHAR(20) DEFAULT 'sedang', -- mudah, sedang, sulit
    category VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABEL EXAM_SESSIONS (Sesi Ujian Siswa)
CREATE TABLE IF NOT EXISTS exam_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    student_name VARCHAR(100) NOT NULL,
    student_nisn VARCHAR(20) NOT NULL,
    student_class VARCHAR(20) NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_time TIMESTAMP WITH TIME ZONE,
    submit_time TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    status VARCHAR(20) DEFAULT 'in_progress', -- in_progress, completed, timeout
    total_score INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(exam_id, student_nisn)
);

-- 5. TABEL ANSWERS (Jawaban Siswa)
CREATE TABLE IF NOT EXISTS answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES exam_sessions(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    student_answer VARCHAR(1), -- A, B, C, D, E, atau NULL jika belum dijawab
    is_correct BOOLEAN,
    is_marked BOOLEAN DEFAULT false, -- Ditandai untuk review
    time_spent INTEGER, -- Waktu yang dihabiskan di soal ini (detik)
    answered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(session_id, question_id)
);

-- 6. TABEL VIOLATIONS (Pelanggaran)
CREATE TABLE IF NOT EXISTS violations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES exam_sessions(id) ON DELETE CASCADE,
    violation_type VARCHAR(50) NOT NULL, -- tab_switch, window_blur, exit_fullscreen
    violation_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TABEL ADMINS (Khusus Admin)
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- INDEXES untuk performa
-- ============================================================

CREATE INDEX idx_users_nisn ON users(nisn);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_exams_token ON exams(token);
CREATE INDEX idx_exams_active ON exams(is_active);
CREATE INDEX idx_questions_exam ON questions(exam_id);
CREATE INDEX idx_sessions_exam ON exam_sessions(exam_id);
CREATE INDEX idx_sessions_status ON exam_sessions(status);
CREATE INDEX idx_answers_session ON answers(session_id);
CREATE INDEX idx_violations_session ON violations(session_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) - Keamanan tingkat baris
-- ============================================================

-- Enable RLS pada semua tabel
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Policy untuk PUBLIC (Siswa) - Bisa baca exam yang aktif
CREATE POLICY "Siswa bisa lihat exam aktif"
ON exams FOR SELECT
TO public
USING (is_active = true);

-- Policy untuk PUBLIC - Bisa baca questions dari exam yang diikuti
CREATE POLICY "Siswa bisa lihat soal ujian mereka"
ON questions FOR SELECT
TO public
USING (
    exam_id IN (
        SELECT exam_id FROM exam_sessions 
        WHERE user_id = auth.uid() AND is_active = true
    )
);

-- Policy untuk exam_sessions - Siswa hanya bisa akses sesi mereka sendiri
CREATE POLICY "Siswa bisa akses sesi mereka"
ON exam_sessions FOR ALL
TO public
USING (user_id = auth.uid());

-- Policy untuk answers - Siswa hanya bisa akses jawaban mereka
CREATE POLICY "Siswa bisa akses jawaban mereka"
ON answers FOR ALL
TO public
USING (
    session_id IN (
        SELECT id FROM exam_sessions WHERE user_id = auth.uid()
    )
);

-- Policy untuk violations
CREATE POLICY "Siswa bisa insert violation mereka"
ON violations FOR INSERT
TO public
WITH CHECK (
    session_id IN (
        SELECT id FROM exam_sessions WHERE user_id = auth.uid()
    )
);

-- ============================================================
-- FUNCTIONS - Fungsi helper
-- ============================================================

-- Function: Get exam by token
CREATE OR REPLACE FUNCTION get_exam_by_token(exam_token TEXT)
RETURNS TABLE (
    id UUID,
    title VARCHAR,
    subject VARCHAR,
    teacher VARCHAR,
    duration INTEGER,
    total_questions INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT e.id, e.title, e.subject, e.teacher, e.duration, e.total_questions
    FROM exams e
    WHERE e.token = exam_token AND e.is_active = true;
END;
$$ LANGUAGE plpgsql;

-- Function: Start exam session
CREATE OR REPLACE FUNCTION start_exam_session(
    p_exam_id UUID,
    p_student_nisn VARCHAR,
    p_student_name VARCHAR,
    p_student_class VARCHAR
)
RETURNS UUID AS $$
DECLARE
    v_session_id UUID;
    v_user_id UUID;
BEGIN
    -- Get or create user
    INSERT INTO users (nisn, name, class, role)
    VALUES (p_student_nisn, p_student_name, p_student_class, 'student')
    ON CONFLICT (nisn) DO UPDATE SET
        name = EXCLUDED.name,
        class = EXCLUDED.class,
        updated_at = NOW()
    RETURNING id INTO v_user_id;
    
    -- Create exam session
    INSERT INTO exam_sessions (
        exam_id, user_id, student_name, student_nisn, student_class
    )
    VALUES (
        p_exam_id, v_user_id, p_student_name, p_student_nisn, p_student_class
    )
    RETURNING id INTO v_session_id;
    
    RETURN v_session_id;
END;
$$ LANGUAGE plpgsql;

-- Function: Submit answer
CREATE OR REPLACE FUNCTION submit_answer(
    p_session_id UUID,
    p_question_id UUID,
    p_answer VARCHAR
)
RETURNS BOOLEAN AS $$
DECLARE
    v_correct_answer VARCHAR;
    v_is_correct BOOLEAN;
BEGIN
    -- Get correct answer
    SELECT correct_answer INTO v_correct_answer
    FROM questions
    WHERE id = p_question_id;
    
    -- Check if correct
    v_is_correct := (p_answer = v_correct_answer);
    
    -- Insert or update answer
    INSERT INTO answers (session_id, question_id, student_answer, is_correct, answered_at)
    VALUES (p_session_id, p_question_id, p_answer, v_is_correct, NOW())
    ON CONFLICT (session_id, question_id) DO UPDATE SET
        student_answer = EXCLUDED.student_answer,
        is_correct = EXCLUDED.is_correct,
        answered_at = EXCLUDED.answered_at,
        updated_at = NOW();
    
    RETURN v_is_correct;
END;
$$ LANGUAGE plpgsql;

-- Function: Calculate final score
CREATE OR REPLACE FUNCTION calculate_final_score(p_session_id UUID)
RETURNS TABLE (
    total_score INTEGER,
    correct_answers INTEGER,
    total_questions INTEGER,
    percentage NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(SUM(CASE WHEN a.is_correct THEN q.score ELSE 0 END), 0)::INTEGER as total_score,
        COUNT(CASE WHEN a.is_correct THEN 1 END)::INTEGER as correct_answers,
        COUNT(*)::INTEGER as total_questions,
        ROUND((COUNT(CASE WHEN a.is_correct THEN 1 END)::NUMERIC / COUNT(*)::NUMERIC * 100), 2) as percentage
    FROM answers a
    JOIN questions q ON a.question_id = q.id
    WHERE a.session_id = p_session_id;
END;
$$ LANGUAGE plpgsql;

-- Function: Complete exam session
CREATE OR REPLACE FUNCTION complete_exam_session(p_session_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    v_score INTEGER;
    v_correct INTEGER;
BEGIN
    -- Calculate score
    SELECT total_score, correct_answers INTO v_score, v_correct
    FROM calculate_final_score(p_session_id);
    
    -- Update session
    UPDATE exam_sessions SET
        status = 'completed',
        submit_time = NOW(),
        end_time = NOW(),
        total_score = v_score,
        correct_answers = v_correct,
        is_active = false,
        updated_at = NOW()
    WHERE id = p_session_id;
    
    RETURN true;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TRIGGERS - Auto update timestamps
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exams_updated_at BEFORE UPDATE ON exams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exam_sessions_updated_at BEFORE UPDATE ON exam_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_answers_updated_at BEFORE UPDATE ON answers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- SAMPLE DATA - Data contoh untuk testing
-- ============================================================

-- Insert admin default
INSERT INTO admins (username, password_hash, name, email) VALUES
('admin', '$2a$10$rKZLW8qPXZLW8qPXZLW8qO', 'Heriyanto', 'admin@smkn1kuok.sch.id')
ON CONFLICT (username) DO NOTHING;

-- Insert exam sample
INSERT INTO exams (
    title, subject, teacher, class_allowed, duration, total_questions,
    token, start_time, end_time, is_active, show_score
) VALUES (
    'Ujian Akhir Semester Ganjil 2024',
    'PAI dan Budi Pekerti',
    'Heriyanto',
    ARRAY['X APAT', 'X TO', 'XI APAT', 'XI TO', 'XII APAT', 'XII TO'],
    60,
    40,
    'TOKEN2024',
    NOW(),
    NOW() + INTERVAL '7 days',
    true,
    false
)
ON CONFLICT (token) DO NOTHING;

-- ============================================================
-- VIEWS - Tampilan untuk monitoring
-- ============================================================

-- View: Active sessions monitoring
CREATE OR REPLACE VIEW v_active_sessions AS
SELECT 
    es.id as session_id,
    es.student_name,
    es.student_nisn,
    es.student_class,
    e.subject,
    es.start_time,
    es.status,
    COUNT(a.id) as answered_questions,
    e.total_questions,
    ROUND((COUNT(a.id)::NUMERIC / e.total_questions::NUMERIC * 100), 2) as progress_percentage,
    COUNT(v.id) as violation_count,
    EXTRACT(EPOCH FROM (NOW() - es.start_time)) as elapsed_seconds,
    (e.duration * 60) - EXTRACT(EPOCH FROM (NOW() - es.start_time)) as remaining_seconds
FROM exam_sessions es
JOIN exams e ON es.exam_id = e.id
LEFT JOIN answers a ON es.id = a.session_id AND a.student_answer IS NOT NULL
LEFT JOIN violations v ON es.id = v.session_id
WHERE es.is_active = true
GROUP BY es.id, e.subject, e.total_questions, e.duration;

-- View: Exam results summary
CREATE OR REPLACE VIEW v_exam_results AS
SELECT 
    es.id as session_id,
    es.student_name,
    es.student_nisn,
    es.student_class,
    e.subject,
    es.start_time,
    es.submit_time,
    es.status,
    es.total_score,
    es.correct_answers,
    e.total_questions,
    ROUND((es.correct_answers::NUMERIC / e.total_questions::NUMERIC * 100), 2) as percentage,
    COUNT(v.id) as violation_count
FROM exam_sessions es
JOIN exams e ON es.exam_id = e.id
LEFT JOIN violations v ON es.id = v.session_id
WHERE es.status = 'completed'
GROUP BY es.id, e.subject, e.total_questions;

-- ============================================================
-- COMPLETION MESSAGE
-- ============================================================

-- Log setup completion
DO $$
BEGIN
    RAISE NOTICE '====================================================';
    RAISE NOTICE 'CBT EXAM Database Setup - COMPLETED SUCCESSFULLY!';
    RAISE NOTICE '====================================================';
    RAISE NOTICE 'Tables created: 7';
    RAISE NOTICE 'Functions created: 5';
    RAISE NOTICE 'Views created: 2';
    RAISE NOTICE 'Sample data inserted: Yes';
    RAISE NOTICE '====================================================';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Copy Supabase URL and API Key';
    RAISE NOTICE '2. Update supabase-config.js file';
    RAISE NOTICE '3. Deploy application';
    RAISE NOTICE '====================================================';
END $$;
