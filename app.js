// CBT EXAM - Main Application Logic

// Application State
const AppState = {
    currentPage: 'login',
    currentQuestion: 0,
    examStartTime: null,
    examDuration: 60, // minutes
    timerInterval: null,
    questions: [],
    answers: {},
    markedQuestions: [],
    violations: [],
    studentData: null,
    examData: null,
    isExamActive: false,
    focusWarningCount: 0
};

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    // Check for existing session
    checkExistingSession();
    
    // Setup event listeners
    setupEventListeners();
    
    // Prevent context menu during exam
    document.addEventListener('contextmenu', preventContextMenu);
    
    // Detect page visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Detect focus loss
    window.addEventListener('blur', handleWindowBlur);
    
    // Prevent common shortcuts
    document.addEventListener('keydown', preventShortcuts);
}

// Check for existing session
function checkExistingSession() {
    const session = DataManager.getStudentSession();
    if (session && session.examActive) {
        // Resume existing exam
        AppState.studentData = session;
        AppState.isExamActive = true;
        AppState.examData = session.examData;
        AppState.questions = DataManager.getQuestions();
        AppState.answers = DataManager.getAnswers();
        AppState.markedQuestions = DataManager.getMarkedQuestions();
        AppState.examStartTime = session.startTime;
        AppState.examDuration = session.examData.duration;
        
        showPage('examPage');
        initializeExam();
        showToast('Melanjutkan ujian yang sedang berlangsung');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Start exam button
    const startExamBtn = document.getElementById('startExamBtn');
    if (startExamBtn) {
        startExamBtn.addEventListener('click', showStartConfirmation);
    }
    
    // Confirm start exam
    const confirmStartBtn = document.getElementById('confirmStartBtn');
    if (confirmStartBtn) {
        confirmStartBtn.addEventListener('click', startExam);
    }
    
    const cancelStartBtn = document.getElementById('cancelStartBtn');
    if (cancelStartBtn) {
        cancelStartBtn.addEventListener('click', () => hideModal('confirmStartModal'));
    }
    
    // Navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
        prevBtn.addEventListener('click', previousQuestion);
    }
    
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }
    
    // Mark question button
    const markQuestionBtn = document.getElementById('markQuestionBtn');
    if (markQuestionBtn) {
        markQuestionBtn.addEventListener('click', toggleMarkQuestion);
    }
    
    // Submit exam button
    const submitExamBtn = document.getElementById('submitExamBtn');
    if (submitExamBtn) {
        submitExamBtn.addEventListener('click', showSubmitConfirmation);
    }
    
    // Confirm submit
    const confirmSubmitBtn = document.getElementById('confirmSubmitBtn');
    if (confirmSubmitBtn) {
        confirmSubmitBtn.addEventListener('click', submitExam);
    }
    
    const cancelSubmitBtn = document.getElementById('cancelSubmitBtn');
    if (cancelSubmitBtn) {
        cancelSubmitBtn.addEventListener('click', () => hideModal('confirmSubmitModal'));
    }
    
    // Focus warning modal
    const returnToExamBtn = document.getElementById('returnToExamBtn');
    if (returnToExamBtn) {
        returnToExamBtn.addEventListener('click', returnToExam);
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleSidebar);
    }
    
    const toggleSidebar = document.getElementById('toggleSidebar');
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.remove('show');
        });
    }
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const nisn = document.getElementById('nisn').value.trim();
    const studentName = document.getElementById('studentName').value.trim();
    const studentClass = document.getElementById('studentClass').value;
    const examToken = document.getElementById('examToken').value.trim();
    
    // Validate inputs
    if (!nisn || !studentName || !studentClass || !examToken) {
        showError('loginError', 'Semua data wajib diisi');
        return;
    }
    
    // Validate token
    const examData = DataManager.validateToken(examToken);
    if (!examData) {
        showError('loginError', 'Token ujian tidak valid');
        return;
    }
    
    // Check if class is valid for this exam
    if (!examData.validClasses.includes(studentClass)) {
        showError('loginError', 'Kelas tidak valid untuk ujian ini');
        return;
    }
    
    // Check if student already logged in
    const existingSession = DataManager.getStudentSession();
    if (existingSession && existingSession.nisn === nisn && existingSession.examActive) {
        showError('loginError', 'Anda sudah login dan ujian sedang berlangsung');
        return;
    }
    
    // Save student data
    AppState.studentData = {
        nisn,
        name: studentName,
        class: studentClass,
        examToken
    };
    
    AppState.examData = examData;
    
    // Show pre-exam dashboard
    showPreExamDashboard();
}

// Show pre-exam dashboard
function showPreExamDashboard() {
    const data = AppState.studentData;
    const exam = AppState.examData;
    
    document.getElementById('displayName').textContent = data.name;
    document.getElementById('displayClass').textContent = data.class;
    document.getElementById('displaySubject').textContent = exam.subject;
    document.getElementById('displayTeacher').textContent = exam.teacher;
    document.getElementById('displayDate').textContent = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('displayDuration').textContent = `${exam.duration} menit`;
    document.getElementById('displayTotalQuestions').textContent = `${exam.totalQuestions} Soal`;
    
    showPage('preExamPage');
}

// Show start confirmation
function showStartConfirmation() {
    showModal('confirmStartModal');
}

// Start exam
function startExam() {
    hideModal('confirmStartModal');
    showLoading();
    
    // Simulate loading
    setTimeout(() => {
        // Load questions
        AppState.questions = DataManager.getQuestions();
        AppState.examStartTime = new Date().getTime();
        AppState.examDuration = AppState.examData.duration;
        AppState.isExamActive = true;
        
        // Save session
        const sessionData = {
            ...AppState.studentData,
            examData: AppState.examData,
            startTime: AppState.examStartTime,
            examActive: true
        };
        DataManager.saveStudentSession(sessionData);
        
        // Initialize exam page
        initializeExam();
        
        // Try to enter fullscreen
        enterFullscreen();
        
        // Add exam mode class
        document.body.classList.add('exam-mode');
        
        hideLoading();
        showPage('examPage');
        showToast('Ujian dimulai. Semoga sukses!');
    }, 1000);
}

// Initialize exam
function initializeExam() {
    // Set header info
    document.getElementById('examSubject').textContent = AppState.examData.subject;
    document.getElementById('examStudentName').textContent = AppState.studentData.name;
    
    // Load answers and marked questions
    AppState.answers = DataManager.getAnswers();
    AppState.markedQuestions = DataManager.getMarkedQuestions();
    
    // Generate question grid
    generateQuestionGrid();
    
    // Load first question
    loadQuestion(0);
    
    // Start timer
    startTimer();
}

// Generate question grid
function generateQuestionGrid() {
    const grid = document.getElementById('questionGrid');
    grid.innerHTML = '';
    
    AppState.questions.forEach((q, index) => {
        const btn = document.createElement('button');
        btn.className = 'question-btn';
        btn.textContent = index + 1;
        btn.dataset.index = index;
        
        // Check if answered
        if (AppState.answers[q.id]) {
            btn.classList.add('answered');
        }
        
        // Check if marked
        if (AppState.markedQuestions.includes(q.id)) {
            btn.classList.add('marked');
        }
        
        btn.addEventListener('click', () => {
            loadQuestion(index);
        });
        
        grid.appendChild(btn);
    });
}

// Load question
function loadQuestion(index) {
    if (index < 0 || index >= AppState.questions.length) return;
    
    AppState.currentQuestion = index;
    const question = AppState.questions[index];
    
    // Update question number
    document.getElementById('questionNumber').textContent = 
        `SOAL ${String(index + 1).padStart(2, '0')} / ${AppState.questions.length}`;
    
    // Update question text
    document.getElementById('questionText').textContent = question.question;
    
    // Update options
    const optionsContainer = document.getElementById('answerOptions');
    optionsContainer.innerHTML = '';
    
    Object.keys(question.options).forEach(key => {
        const option = document.createElement('label');
        option.className = 'option';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = key;
        radio.id = `option${key}`;
        
        // Check if this answer was selected
        if (AppState.answers[question.id] && AppState.answers[question.id].answer === key) {
            radio.checked = true;
            option.classList.add('selected');
        }
        
        radio.addEventListener('change', () => {
            handleAnswerSelection(key);
        });
        
        const optionText = document.createElement('span');
        optionText.className = 'option-text';
        optionText.textContent = `${key}. ${question.options[key]}`;
        
        option.appendChild(radio);
        option.appendChild(optionText);
        optionsContainer.appendChild(option);
    });
    
    // Update mark button
    const markBtn = document.getElementById('markQuestionBtn');
    if (AppState.markedQuestions.includes(question.id)) {
        markBtn.classList.add('marked');
        markBtn.querySelector('.mark-text').textContent = 'Ditandai';
    } else {
        markBtn.classList.remove('marked');
        markBtn.querySelector('.mark-text').textContent = 'Tandai Soal';
    }
    
    // Update active state in grid
    updateQuestionGrid();
    
    // Update navigation buttons
    updateNavigationButtons();
}

// Handle answer selection
function handleAnswerSelection(answer) {
    const question = AppState.questions[AppState.currentQuestion];
    
    // Save answer
    AppState.answers[question.id] = { answer, timestamp: new Date().toISOString() };
    DataManager.saveAnswer(question.id, answer);
    
    // Update UI
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    document.querySelector(`#option${answer}`).parentElement.classList.add('selected');
    
    // Show autosave indicator
    showAutosaveIndicator();
    
    // Update question grid
    updateQuestionGrid();
    
    // Update answered count
    updateAnsweredCount();
}

// Show autosave indicator
function showAutosaveIndicator() {
    const indicator = document.getElementById('autosaveIndicator');
    indicator.classList.add('show');
    
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 2000);
}

// Update question grid
function updateQuestionGrid() {
    const buttons = document.querySelectorAll('.question-btn');
    buttons.forEach((btn, index) => {
        const question = AppState.questions[index];
        
        // Remove all state classes
        btn.classList.remove('active', 'answered', 'marked');
        
        // Add active class
        if (index === AppState.currentQuestion) {
            btn.classList.add('active');
        }
        
        // Add answered class
        if (AppState.answers[question.id]) {
            btn.classList.add('answered');
        }
        
        // Add marked class
        if (AppState.markedQuestions.includes(question.id)) {
            btn.classList.add('marked');
        }
    });
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = AppState.currentQuestion === 0;
    nextBtn.disabled = AppState.currentQuestion === AppState.questions.length - 1;
}

// Update answered count
function updateAnsweredCount() {
    const answeredCount = Object.keys(AppState.answers).length;
    const totalQuestions = AppState.questions.length;
    
    const countElement = document.getElementById('answeredCount');
    if (countElement) {
        countElement.textContent = `${answeredCount}/${totalQuestions}`;
    }
}

// Previous question
function previousQuestion() {
    if (AppState.currentQuestion > 0) {
        loadQuestion(AppState.currentQuestion - 1);
    }
}

// Next question
function nextQuestion() {
    if (AppState.currentQuestion < AppState.questions.length - 1) {
        loadQuestion(AppState.currentQuestion + 1);
    }
}

// Toggle mark question
function toggleMarkQuestion() {
    const question = AppState.questions[AppState.currentQuestion];
    DataManager.toggleMarkQuestion(question.id);
    AppState.markedQuestions = DataManager.getMarkedQuestions();
    
    const markBtn = document.getElementById('markQuestionBtn');
    if (AppState.markedQuestions.includes(question.id)) {
        markBtn.classList.add('marked');
        markBtn.querySelector('.mark-text').textContent = 'Ditandai';
        showToast('Soal ditandai untuk ditinjau');
    } else {
        markBtn.classList.remove('marked');
        markBtn.querySelector('.mark-text').textContent = 'Tandai Soal';
        showToast('Tanda dihapus');
    }
    
    updateQuestionGrid();
}

// Start timer
function startTimer() {
    updateTimer();
    AppState.timerInterval = setInterval(updateTimer, 1000);
}

// Update timer
function updateTimer() {
    const now = new Date().getTime();
    const elapsed = Math.floor((now - AppState.examStartTime) / 1000);
    const remaining = (AppState.examDuration * 60) - elapsed;
    
    if (remaining <= 0) {
        // Time's up
        clearInterval(AppState.timerInterval);
        autoSubmitExam();
        return;
    }
    
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    
    const timerElement = document.getElementById('examTimer');
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Warning states
    if (remaining <= 300) { // 5 minutes
        timerElement.classList.add('warning');
        timerElement.classList.remove('danger');
    }
    
    if (remaining <= 60) { // 1 minute
        timerElement.classList.remove('warning');
        timerElement.classList.add('danger');
    }
}

// Show submit confirmation
function showSubmitConfirmation() {
    const answeredCount = Object.keys(AppState.answers).length;
    const totalQuestions = AppState.questions.length;
    const unansweredCount = totalQuestions - answeredCount;
    const markedCount = AppState.markedQuestions.length;
    
    document.getElementById('summaryAnswered').textContent = answeredCount;
    document.getElementById('summaryUnanswered').textContent = unansweredCount;
    document.getElementById('summaryMarked').textContent = markedCount;
    
    showModal('confirmSubmitModal');
}

// Submit exam
function submitExam() {
    hideModal('confirmSubmitModal');
    showLoading();
    
    // Stop timer
    clearInterval(AppState.timerInterval);
    
    // Calculate score
    const score = DataManager.calculateScore();
    
    // Mark exam as completed
    AppState.isExamActive = false;
    const session = DataManager.getStudentSession();
    session.examActive = false;
    session.completedAt = new Date().toISOString();
    session.score = score;
    DataManager.saveStudentSession(session);
    
    // Remove exam mode
    document.body.classList.remove('exam-mode');
    exitFullscreen();
    
    // Show results
    setTimeout(() => {
        showResults();
        hideLoading();
    }, 1500);
}

// Auto submit when time's up
function autoSubmitExam() {
    showToast('Waktu ujian habis. Jawaban Anda akan dikumpulkan otomatis.');
    
    setTimeout(() => {
        submitExam();
    }, 2000);
}

// Show results
function showResults() {
    const answeredCount = Object.keys(AppState.answers).length;
    
    document.getElementById('resultsName').textContent = AppState.studentData.name;
    document.getElementById('resultsSubject').textContent = AppState.examData.subject;
    document.getElementById('resultsTotalQuestions').textContent = AppState.questions.length;
    document.getElementById('resultsAnswered').textContent = answeredCount;
    
    showPage('resultsPage');
}

// Toggle sidebar (mobile)
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('show');
}

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    AppState.currentPage = pageId;
}

// Modal functions
function showModal(modalId) {
    document.getElementById(modalId).classList.add('show');
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// Loading functions
function showLoading() {
    document.getElementById('loadingOverlay').classList.add('show');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('show');
}

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Error display
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    setTimeout(() => {
        errorElement.classList.remove('show');
    }, 5000);
}

// Fullscreen functions
function enterFullscreen() {
    const elem = document.documentElement;
    
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(err => {
            console.log('Fullscreen not supported:', err);
        });
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => console.log(err));
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

// Security functions
function preventContextMenu(e) {
    if (AppState.isExamActive) {
        e.preventDefault();
        return false;
    }
}

function preventShortcuts(e) {
    if (!AppState.isExamActive) return;
    
    // Prevent common shortcuts
    if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'a' || e.key === 's' || e.key === 'p')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'j' || e.key === 'c')) ||
        e.key === 'F12' ||
        e.key === 'PrintScreen'
    ) {
        e.preventDefault();
        return false;
    }
}

function handleVisibilityChange() {
    if (!AppState.isExamActive) return;
    
    if (document.hidden) {
        // User switched tab
        recordViolation('tab_switch');
        showFocusWarning();
    }
}

function handleWindowBlur() {
    if (!AppState.isExamActive) return;
    
    // Window lost focus
    recordViolation('window_blur');
}

function recordViolation(type) {
    AppState.violations.push({
        type,
        timestamp: new Date().toISOString()
    });
    DataManager.saveViolation(type);
    AppState.focusWarningCount++;
}

function showFocusWarning() {
    if (AppState.focusWarningCount <= 3) {
        document.getElementById('warningCount').textContent = 
            `${AppState.focusWarningCount}/3`;
        showModal('focusWarningModal');
    }
}

function returnToExam() {
    hideModal('focusWarningModal');
    enterFullscreen();
}
