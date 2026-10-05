// CBT EXAM - Data Management

// Sample data structure
const SAMPLE_DATA = {
    // Admin credentials (in production, use secure authentication)
    admin: {
        username: 'admin',
        password: 'admin123', // In production: use hashed passwords
        name: 'Heriyanto'
    },

    // Valid exam tokens
    examTokens: {
        'TOKEN2024': {
            subject: 'PAI dan Budi Pekerti',
            teacher: 'Heriyanto',
            duration: 60, // minutes
            totalQuestions: 40,
            validClasses: ['X APAT', 'X TO', 'XI APAT', 'XI TO', 'XII APAT', 'XII TO']
        }
    },

    // Sample questions for PAI
    questions: [
        {
            id: 1,
            question: 'Al-Qur\'an diturunkan kepada Nabi Muhammad SAW melalui perantara...',
            options: {
                A: 'Malaikat Jibril',
                B: 'Malaikat Mikail',
                C: 'Malaikat Israfil',
                D: 'Malaikat Izrail',
                E: 'Malaikat Ridwan'
            },
            correctAnswer: 'A',
            score: 1
        },
        {
            id: 2,
            question: 'Berapa jumlah surat dalam Al-Qur\'an?',
            options: {
                A: '110 surat',
                B: '112 surat',
                C: '114 surat',
                D: '116 surat',
                E: '118 surat'
            },
            correctAnswer: 'C',
            score: 1
        },
        {
            id: 3,
            question: 'Rukun Islam yang pertama adalah...',
            options: {
                A: 'Salat',
                B: 'Puasa',
                C: 'Zakat',
                D: 'Syahadat',
                E: 'Haji'
            },
            correctAnswer: 'D',
            score: 1
        },
        {
            id: 4,
            question: 'Kitab yang diturunkan kepada Nabi Musa AS adalah...',
            options: {
                A: 'Injil',
                B: 'Taurat',
                C: 'Zabur',
                D: 'Al-Qur\'an',
                E: 'Suhuf'
            },
            correctAnswer: 'B',
            score: 1
        },
        {
            id: 5,
            question: 'Salat yang dikerjakan pada hari Jumat disebut...',
            options: {
                A: 'Salat Ied',
                B: 'Salat Tarawih',
                C: 'Salat Jumat',
                D: 'Salat Witir',
                E: 'Salat Dhuha'
            },
            correctAnswer: 'C',
            score: 1
        },
        {
            id: 6,
            question: 'Puasa Ramadan diwajibkan pada tahun ke...',
            options: {
                A: 'Pertama Hijriyah',
                B: 'Kedua Hijriyah',
                C: 'Ketiga Hijriyah',
                D: 'Keempat Hijriyah',
                E: 'Kelima Hijriyah'
            },
            correctAnswer: 'B',
            score: 1
        },
        {
            id: 7,
            question: 'Zakat fitrah wajib dikeluarkan pada bulan...',
            options: {
                A: 'Syawal',
                B: 'Ramadan',
                C: 'Dzulhijjah',
                D: 'Muharram',
                E: 'Rajab'
            },
            correctAnswer: 'B',
            score: 1
        },
        {
            id: 8,
            question: 'Hukum mengucapkan salam adalah...',
            options: {
                A: 'Wajib',
                B: 'Sunah',
                C: 'Mubah',
                D: 'Makruh',
                E: 'Haram'
            },
            correctAnswer: 'B',
            score: 1
        },
        {
            id: 9,
            question: 'Niat puasa harus dilakukan pada waktu...',
            options: {
                A: 'Setelah terbit matahari',
                B: 'Siang hari',
                C: 'Sebelum terbit matahari',
                D: 'Saat berbuka',
                E: 'Kapan saja'
            },
            correctAnswer: 'C',
            score: 1
        },
        {
            id: 10,
            question: 'Malaikat yang bertugas mencatat amal baik manusia adalah...',
            options: {
                A: 'Rakib',
                B: 'Atid',
                C: 'Munkar',
                D: 'Nakir',
                E: 'Ridwan'
            },
            correctAnswer: 'A',
            score: 1
        },
        {
            id: 11,
            question: 'Kiblat umat Islam adalah...',
            options: {
                A: 'Masjid Nabawi',
                B: 'Ka\'bah',
                C: 'Masjid Al-Aqsa',
                D: 'Gua Hira',
                E: 'Jabal Rahmah'
            },
            correctAnswer: 'B',
            score: 1
        },
        {
            id: 12,
            question: 'Rasul yang dijuluki Ulul Azmi berjumlah...',
            options: {
                A: '3 orang',
                B: '4 orang',
                C: '5 orang',
                D: '6 orang',
                E: '7 orang'
            },
            correctAnswer: 'C',
            score: 1
        },
        {
            id: 13,
            question: 'Rukun iman yang kedua adalah iman kepada...',
            options: {
                A: 'Allah',
                B: 'Malaikat',
                C: 'Kitab',
                D: 'Rasul',
                E: 'Hari Akhir'
            },
            correctAnswer: 'B',
            score: 1
        },
        {
            id: 14,
            question: 'Surat pertama yang turun kepada Nabi Muhammad SAW adalah...',
            options: {
                A: 'Al-Fatihah',
                B: 'Al-Ikhlas',
                C: 'Al-Alaq',
                D: 'An-Nas',
                E: 'Al-Falaq'
            },
            correctAnswer: 'C',
            score: 1
        },
        {
            id: 15,
            question: 'Hukum menjawab salam adalah...',
            options: {
                A: 'Sunah',
                B: 'Mubah',
                C: 'Wajib Kifayah',
                D: 'Wajib Ain',
                E: 'Makruh'
            },
            correctAnswer: 'C',
            score: 1
        },
        {
            id: 16,
            question: 'Bacaan yang dibaca setelah takbiratul ihram adalah...',
            options: {
                A: 'Al-Fatihah',
                B: 'Doa Iftitah',
                C: 'Tasbih',
                D: 'Surat pendek',
                E: 'Takbir'
            },
            correctAnswer: 'B',
            score: 1
        },
        {
            id: 17,
            question: 'Jumlah rakaat salat Subuh adalah...',
            options: {
                A: '2 rakaat',
                B: '3 rakaat',
                C: '4 rakaat',
                D: '5 rakaat',
                E: '6 rakaat'
            },
            correctAnswer: 'A',
            score: 1
        },
        {
            id: 18,
            question: 'Kitab suci umat Nasrani adalah...',
            options: {
                A: 'Taurat',
                B: 'Zabur',
                C: 'Injil',
                D: 'Al-Qur\'an',
                E: 'Suhuf'
            },
            correctAnswer: 'C',
            score: 1
        },
        {
            id: 19,
            question: 'Mengerjakan ibadah haji hukumnya...',
            options: {
                A: 'Sunah',
                B: 'Wajib bagi yang mampu',
                C: 'Mubah',
                D: 'Wajib bagi semua muslim',
                E: 'Makruh'
            },
            correctAnswer: 'B',
            score: 1
        },
        {
            id: 20,
            question: 'Hari kiamat termasuk perkara...',
            options: {
                A: 'Yang pasti terjadi',
                B: 'Yang mungkin terjadi',
                C: 'Yang tidak pasti',
                D: 'Yang mustahil',
                E: 'Yang dapat dihindari'
            },
            correctAnswer: 'A',
            score: 1
        },
        {
            id: 21,
            question: 'Salah satu sifat wajib Allah adalah...',
            options: {
                A: 'Qidam',
                B: 'Fana',
                C: 'Huduts',
                D: 'Jism',
                E: 'Aradh'
            },
            correctAnswer: 'A',
            score: 1
        },
        {
            id: 22,
            question: 'Berapa kali salat fardhu dalam sehari semalam?',
            options: {
                A: '3 kali',
                B: '4 kali',
                C: '5 kali',
                D: '6 kali',
                E: '7 kali'
            },
            correctAnswer: 'C',
            score: 1
        },
        {
            id: 23,
            question: 'Zakat yang wajib dikeluarkan setiap akhir Ramadan adalah...',
            options: {
                A: 'Zakat mal',
                B: 'Zakat profesi',
                C: 'Zakat fitrah',
                D: 'Zakat perdagangan',
                E: 'Zakat pertanian'
            },
            correctAnswer: 'C',
            score: 1
        },
        {
            id: 24,
            question: 'Nabi yang terakhir diutus adalah...',
            options: {
                A: 'Nabi Isa AS',
                B: 'Nabi Musa AS',
                C: 'Nabi Ibrahim AS',
                D: 'Nabi Muhammad SAW',
                E: 'Nabi Nuh AS'
            },
            correctAnswer: 'D',
            score: 1
        },
        {
            id: 25,
            question: 'Malaikat yang bertugas meniup sangkakala adalah...',
            options: {
                A: 'Jibril',
                B: 'Mikail',
                C: 'Israfil',
                D: 'Izrail',
                E: 'Munkar'
            },
            correctAnswer: 'C',
            score: 1
        },
        {
            id: 26,
            question: 'Bacaan dalam salat yang artinya "Maha Suci Tuhanku Yang Maha Agung" adalah...',
            options: {
                A: 'Subhana Rabbiyal A\'la',
                B: 'Subhana Rabbiyal Adzim',
                C: 'Sami\'allahu liman hamidah',
                D: 'Rabbana lakal hamd',
                E: 'Allahu Akbar'
            },
            correctAnswer: 'B',
            score: 1
        },
        {
            id: 27,
            question: 'Puasa yang dilakukan pada tanggal 13, 14, dan 15 setiap bulan Hijriyah disebut...',
            options: {
                A: 'Puasa Senin Kamis',
                B: 'Puasa Daud',
                C: 'Puasa Ayyamul Bidh',
                D: 'Puasa Syawal',
                E: 'Puasa Arafah'
            },
            correctAnswer: 'C',
            score: 1
        },
        {
            id: 28,
            question: 'Jumlah rakaat salat Maghrib adalah...',
            options: {
                A: '2 rakaat',
                B: '3 rakaat',
                C: '4 rakaat',
                D: '5 rakaat',
                E: '6 rakaat'
            },
            correctAnswer: 'B',
            score: 1
        },
        {
            id: 29,
            question: 'Hukum mendirikan salat berjamaah bagi laki-laki adalah...',
            options: {
                A: 'Wajib ain',
                B: 'Wajib kifayah',
                C: 'Sunah muakkad',
                D: 'Sunah',
                E: 'Mubah'
            },
            correctAnswer: 'C',
            score: 1
        },
        {
            id: 30,
            question: 'Rukun Islam ada...',
            options: {
                A: '3',
                B: '4',
                C: '5',
                D: '6',
                E: '7'
            },
            correctAnswer: 'C',
            score: 1
        },
        {
            id: 31,
            question: 'Orang yang menerima zakat disebut...',
            options: {
                A: 'Muzaki',
                B: 'Mustahiq',
                C: 'Amil',
                D: 'Muallaf',
                E: 'Gharim'
            },
            correctAnswer: 'B',
            score: 1
        },
        {
            id: 32,
            question: 'Masjid pertama yang dibangun Nabi Muhammad SAW adalah...',
            options: {
                A: 'Masjidil Haram',
                B: 'Masjid Nabawi',
                C: 'Masjid Quba',
                D: 'Masjid Al-Aqsa',
                E: 'Masjid Qubah'
            },
            correctAnswer: 'C',
            score: 1
        },
        {
            id: 33,
            question: 'Nabi yang mendapat gelar Khalilullah adalah...',
            options: {
                A: 'Nabi Adam AS',
                B: 'Nabi Ibrahim AS',
                C: 'Nabi Musa AS',
                D: 'Nabi Isa AS',
                E: 'Nabi Muhammad SAW'
            },
            correctAnswer: 'B',
            score: 1
        },
        {
            id: 34,
            question: 'Iman menurut bahasa artinya...',
            options: {
                A: 'Percaya',
                B: 'Yakin',
                C: 'Membenarkan',
                D: 'Berserah diri',
                E: 'Tunduk'
            },
            correctAnswer: 'C',
            score: 1
        },
        {
            id: 35,
            question: 'Salat yang dikerjakan ketika terjadi gerhana matahari disebut...',
            options: {
                A: 'Salat Khusuf',
                B: 'Salat Kusuf',
                C: 'Salat Istisqa',
                D: 'Salat Istikharah',
                E: 'Salat Tahajud'
            },
            correctAnswer: 'B',
            score: 1
        },
        {
            id: 36,
            question: 'Tempat berkumpulnya manusia pada hari kiamat adalah...',
            options: {
                A: 'Padang Arafah',
                B: 'Padang Mahsyar',
                C: 'Jabal Rahmah',
                D: 'Mina',
                E: 'Muzdalifah'
            },
            correctAnswer: 'B',
            score: 1
        },
        {
            id: 37,
            question: 'Jumlah sifat wajib Allah adalah...',
            options: {
                A: '10',
                B: '15',
                C: '20',
                D: '25',
                E: '30'
            },
            correctAnswer: 'C',
            score: 1
        },
        {
            id: 38,
            question: 'Lawan kata dari sifat wajib Allah "Qidam" adalah...',
            options: {
                A: 'Fana',
                B: 'Huduts',
                C: 'Baqa',
                D: 'Wahdaniyat',
                E: 'Mukhalafatu lil hawadits'
            },
            correctAnswer: 'B',
            score: 1
        },
        {
            id: 39,
            question: 'Cara membersihkan najis mughaladzah adalah...',
            options: {
                A: 'Dibasuh 7 kali, salah satunya dengan tanah',
                B: 'Dibasuh 3 kali',
                C: 'Dibasuh 1 kali',
                D: 'Cukup dihilangkan',
                E: 'Dibasuh dengan air dan sabun'
            },
            correctAnswer: 'A',
            score: 1
        },
        {
            id: 40,
            question: 'Rukun Iman ada...',
            options: {
                A: '3',
                B: '4',
                C: '5',
                D: '6',
                E: '7'
            },
            correctAnswer: 'D',
            score: 1
        }
    ]
};

// LocalStorage keys
const STORAGE_KEYS = {
    STUDENT_SESSION: 'cbt_student_session',
    EXAM_DATA: 'cbt_exam_data',
    ANSWERS: 'cbt_answers',
    VIOLATIONS: 'cbt_violations',
    ADMIN_SESSION: 'cbt_admin_session',
    EXAM_START_TIME: 'cbt_exam_start_time',
    MARKED_QUESTIONS: 'cbt_marked_questions'
};

// Data management functions
const DataManager = {
    // Save to localStorage
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            return false;
        }
    },

    // Load from localStorage
    load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading data:', error);
            return null;
        }
    },

    // Remove from localStorage
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing data:', error);
            return false;
        }
    },

    // Clear all CBT data
    clearAll() {
        Object.values(STORAGE_KEYS).forEach(key => {
            this.remove(key);
        });
    },

    // Validate exam token
    validateToken(token) {
        return SAMPLE_DATA.examTokens[token] || null;
    },

    // Get questions for exam
    getQuestions() {
        return SAMPLE_DATA.questions;
    },

    // Get shuffled questions
    getShuffledQuestions() {
        const questions = [...SAMPLE_DATA.questions];
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        return questions;
    },

    // Save student session
    saveStudentSession(data) {
        return this.save(STORAGE_KEYS.STUDENT_SESSION, data);
    },

    // Get student session
    getStudentSession() {
        return this.load(STORAGE_KEYS.STUDENT_SESSION);
    },

    // Save answer
    saveAnswer(questionId, answer) {
        const answers = this.load(STORAGE_KEYS.ANSWERS) || {};
        answers[questionId] = {
            answer: answer,
            timestamp: new Date().toISOString()
        };
        return this.save(STORAGE_KEYS.ANSWERS, answers);
    },

    // Get all answers
    getAnswers() {
        return this.load(STORAGE_KEYS.ANSWERS) || {};
    },

    // Mark question
    toggleMarkQuestion(questionId) {
        const marked = this.load(STORAGE_KEYS.MARKED_QUESTIONS) || [];
        const index = marked.indexOf(questionId);
        
        if (index > -1) {
            marked.splice(index, 1);
        } else {
            marked.push(questionId);
        }
        
        return this.save(STORAGE_KEYS.MARKED_QUESTIONS, marked);
    },

    // Get marked questions
    getMarkedQuestions() {
        return this.load(STORAGE_KEYS.MARKED_QUESTIONS) || [];
    },

    // Check if question is marked
    isQuestionMarked(questionId) {
        const marked = this.getMarkedQuestions();
        return marked.includes(questionId);
    },

    // Save violation
    saveViolation(type) {
        const violations = this.load(STORAGE_KEYS.VIOLATIONS) || [];
        violations.push({
            type: type,
            timestamp: new Date().toISOString()
        });
        return this.save(STORAGE_KEYS.VIOLATIONS, violations);
    },

    // Get violations
    getViolations() {
        return this.load(STORAGE_KEYS.VIOLATIONS) || [];
    },

    // Calculate score
    calculateScore() {
        const answers = this.getAnswers();
        const questions = this.getQuestions();
        let totalScore = 0;
        let correctAnswers = 0;

        questions.forEach(q => {
            if (answers[q.id] && answers[q.id].answer === q.correctAnswer) {
                totalScore += q.score;
                correctAnswers++;
            }
        });

        return {
            totalScore,
            correctAnswers,
            totalQuestions: questions.length,
            percentage: (correctAnswers / questions.length * 100).toFixed(2)
        };
    },

    // Validate admin login
    validateAdmin(username, password) {
        return username === SAMPLE_DATA.admin.username && 
               password === SAMPLE_DATA.admin.password;
    },

    // Save admin session
    saveAdminSession(data) {
        return this.save(STORAGE_KEYS.ADMIN_SESSION, data);
    },

    // Get admin session
    getAdminSession() {
        return this.load(STORAGE_KEYS.ADMIN_SESSION);
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DataManager, SAMPLE_DATA, STORAGE_KEYS };
}
