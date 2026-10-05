// ============================================================
// SUPABASE CONFIGURATION - CBT EXAM
// ============================================================

// LANGKAH SETUP:
// 1. Buat project di https://supabase.com
// 2. Jalankan SQL di supabase-setup.sql di SQL Editor
// 3. Copy URL dan ANON KEY dari Project Settings > API
// 4. Paste di bawah ini

const SUPABASE_CONFIG = {
    // Ganti dengan Supabase Project URL Anda
    url: 'https://your-project-id.supabase.co',
    
    // Ganti dengan Supabase Anon Key Anda
    anonKey: 'your-anon-key-here',
    
    // Options
    options: {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        }
    }
};

// Initialize Supabase Client
let supabase;

// Function to initialize Supabase
function initSupabase() {
    if (typeof supabase !== 'undefined') {
        return supabase;
    }
    
    // Check if Supabase library is loaded
    if (typeof window.supabase === 'undefined') {
        console.error('Supabase library not loaded. Please include the Supabase CDN script.');
        return null;
    }
    
    try {
        supabase = window.supabase.createClient(
            SUPABASE_CONFIG.url,
            SUPABASE_CONFIG.anonKey,
            SUPABASE_CONFIG.options
        );
        
        console.log('✅ Supabase initialized successfully');
        return supabase;
    } catch (error) {
        console.error('❌ Error initializing Supabase:', error);
        return null;
    }
}

// ============================================================
// SUPABASE API WRAPPER - Database operations
// ============================================================

const SupabaseAPI = {
    // Check if Supabase is configured
    isConfigured() {
        return SUPABASE_CONFIG.url !== 'https://your-project-id.supabase.co' &&
               SUPABASE_CONFIG.anonKey !== 'your-anon-key-here';
    },

    // Initialize client
    init() {
        if (!this.isConfigured()) {
            console.warn('⚠️ Supabase not configured. Using LocalStorage fallback.');
            return false;
        }
        return initSupabase() !== null;
    },

    // ============================================================
    // EXAM OPERATIONS
    // ============================================================

    // Get exam by token
    async getExamByToken(token) {
        try {
            const { data, error } = await supabase
                .from('exams')
                .select('*')
                .eq('token', token)
                .eq('is_active', true)
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error getting exam:', error);
            return { success: false, error: error.message };
        }
    },

    // Get exam questions
    async getExamQuestions(examId) {
        try {
            const { data, error } = await supabase
                .from('questions')
                .select('*')
                .eq('exam_id', examId)
                .order('question_number');

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error getting questions:', error);
            return { success: false, error: error.message };
        }
    },

    // ============================================================
    // SESSION OPERATIONS
    // ============================================================

    // Start exam session
    async startExamSession(examId, nisn, name, studentClass) {
        try {
            const { data, error } = await supabase
                .rpc('start_exam_session', {
                    p_exam_id: examId,
                    p_student_nisn: nisn,
                    p_student_name: name,
                    p_student_class: studentClass
                });

            if (error) throw error;
            return { success: true, sessionId: data };
        } catch (error) {
            console.error('Error starting session:', error);
            return { success: false, error: error.message };
        }
    },

    // Get active session
    async getActiveSession(nisn, examId) {
        try {
            const { data, error } = await supabase
                .from('exam_sessions')
                .select('*')
                .eq('student_nisn', nisn)
                .eq('exam_id', examId)
                .eq('is_active', true)
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error getting session:', error);
            return { success: false, error: error.message };
        }
    },

    // ============================================================
    // ANSWER OPERATIONS
    // ============================================================

    // Submit answer
    async submitAnswer(sessionId, questionId, answer) {
        try {
            const { data, error } = await supabase
                .rpc('submit_answer', {
                    p_session_id: sessionId,
                    p_question_id: questionId,
                    p_answer: answer
                });

            if (error) throw error;
            return { success: true, isCorrect: data };
        } catch (error) {
            console.error('Error submitting answer:', error);
            return { success: false, error: error.message };
        }
    },

    // Get session answers
    async getSessionAnswers(sessionId) {
        try {
            const { data, error } = await supabase
                .from('answers')
                .select('*')
                .eq('session_id', sessionId);

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error getting answers:', error);
            return { success: false, error: error.message };
        }
    },

    // Toggle mark question
    async toggleMarkQuestion(sessionId, questionId, isMarked) {
        try {
            const { error } = await supabase
                .from('answers')
                .update({ is_marked: isMarked })
                .eq('session_id', sessionId)
                .eq('question_id', questionId);

            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Error marking question:', error);
            return { success: false, error: error.message };
        }
    },

    // ============================================================
    // COMPLETION OPERATIONS
    // ============================================================

    // Complete exam session
    async completeExamSession(sessionId) {
        try {
            const { data, error } = await supabase
                .rpc('complete_exam_session', {
                    p_session_id: sessionId
                });

            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Error completing session:', error);
            return { success: false, error: error.message };
        }
    },

    // Get final score
    async getFinalScore(sessionId) {
        try {
            const { data, error } = await supabase
                .rpc('calculate_final_score', {
                    p_session_id: sessionId
                });

            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Error getting score:', error);
            return { success: false, error: error.message };
        }
    },

    // ============================================================
    // VIOLATION OPERATIONS
    // ============================================================

    // Record violation
    async recordViolation(sessionId, violationType, violationData = {}) {
        try {
            const { error } = await supabase
                .from('violations')
                .insert({
                    session_id: sessionId,
                    violation_type: violationType,
                    violation_data: violationData
                });

            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Error recording violation:', error);
            return { success: false, error: error.message };
        }
    },

    // Get session violations
    async getSessionViolations(sessionId) {
        try {
            const { data, error } = await supabase
                .from('violations')
                .select('*')
                .eq('session_id', sessionId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error getting violations:', error);
            return { success: false, error: error.message };
        }
    },

    // ============================================================
    // ADMIN OPERATIONS
    // ============================================================

    // Admin login
    async adminLogin(username, password) {
        try {
            // Note: In production, use proper authentication
            // This is simplified for demo
            const { data, error } = await supabase
                .from('admins')
                .select('id, username, name, email')
                .eq('username', username)
                .eq('is_active', true)
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error admin login:', error);
            return { success: false, error: error.message };
        }
    },

    // Get active sessions (for monitoring)
    async getActiveSessions() {
        try {
            const { data, error } = await supabase
                .from('v_active_sessions')
                .select('*');

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error getting active sessions:', error);
            return { success: false, error: error.message };
        }
    },

    // Get exam results
    async getExamResults(examId) {
        try {
            const { data, error } = await supabase
                .from('v_exam_results')
                .select('*')
                .eq('exam_id', examId);

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error getting results:', error);
            return { success: false, error: error.message };
        }
    },

    // ============================================================
    // QUESTION BANK OPERATIONS (Admin)
    // ============================================================

    // Add question
    async addQuestion(examId, questionData) {
        try {
            const { data, error } = await supabase
                .from('questions')
                .insert({
                    exam_id: examId,
                    question_number: questionData.questionNumber,
                    question: questionData.question,
                    option_a: questionData.optionA,
                    option_b: questionData.optionB,
                    option_c: questionData.optionC,
                    option_d: questionData.optionD,
                    option_e: questionData.optionE,
                    correct_answer: questionData.correctAnswer,
                    score: questionData.score,
                    difficulty: questionData.difficulty,
                    category: questionData.category
                })
                .select()
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error adding question:', error);
            return { success: false, error: error.message };
        }
    },

    // Update question
    async updateQuestion(questionId, questionData) {
        try {
            const { data, error } = await supabase
                .from('questions')
                .update({
                    question: questionData.question,
                    option_a: questionData.optionA,
                    option_b: questionData.optionB,
                    option_c: questionData.optionC,
                    option_d: questionData.optionD,
                    option_e: questionData.optionE,
                    correct_answer: questionData.correctAnswer,
                    score: questionData.score,
                    difficulty: questionData.difficulty
                })
                .eq('id', questionId)
                .select()
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error updating question:', error);
            return { success: false, error: error.message };
        }
    },

    // Delete question
    async deleteQuestion(questionId) {
        try {
            const { error } = await supabase
                .from('questions')
                .delete()
                .eq('id', questionId);

            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Error deleting question:', error);
            return { success: false, error: error.message };
        }
    },

    // ============================================================
    // REALTIME SUBSCRIPTIONS (untuk monitoring)
    // ============================================================

    // Subscribe to active sessions changes
    subscribeToActiveSessions(callback) {
        return supabase
            .channel('active_sessions')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'exam_sessions',
                    filter: 'is_active=eq.true'
                },
                (payload) => callback(payload)
            )
            .subscribe();
    },

    // Subscribe to violations
    subscribeToViolations(sessionId, callback) {
        return supabase
            .channel(`violations_${sessionId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'violations',
                    filter: `session_id=eq.${sessionId}`
                },
                (payload) => callback(payload)
            )
            .subscribe();
    },

    // Unsubscribe from channel
    unsubscribe(channel) {
        if (channel) {
            supabase.removeChannel(channel);
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SUPABASE_CONFIG, SupabaseAPI };
}
