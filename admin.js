// CBT EXAM - Admin Panel Logic

// Admin State
const AdminState = {
    currentPage: 'dashboard',
    currentAdmin: null,
    questions: [],
    students: [],
    exams: [],
    monitoringData: []
};

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
});

function initializeAdmin() {
    // Check admin session
    checkAdminSession();
    
    // Setup event listeners
    setupAdminListeners();
    
    // Load dark mode preference
    loadDarkModePreference();
}

// Check admin session
function checkAdminSession() {
    const session = DataManager.getAdminSession();
    if (session && session.loggedIn) {
        AdminState.currentAdmin = session;
        showAdminDashboard();
    }
}

// Setup admin event listeners
function setupAdminListeners() {
    // Admin login
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }
    
    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            switchAdminPage(page);
        });
    });
    
    // Logout button
    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleAdminLogout);
    }
    
    // Dark mode toggle
    const darkModeBtn = document.getElementById('toggleDarkMode');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', toggleDarkMode);
    }
    
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileAdminMenu');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleAdminSidebar);
    }
    
    // Add question button
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    if (addQuestionBtn) {
        addQuestionBtn.addEventListener('click', showAddQuestionModal);
    }
    
    // Question form
    const questionForm = document.getElementById('questionForm');
    if (questionForm) {
        questionForm.addEventListener('submit', handleSaveQuestion);
    }
    
    // Close question modal
    const closeQuestionModal = document.getElementById('closeQuestionModal');
    if (closeQuestionModal) {
        closeQuestionModal.addEventListener('click', hideQuestionModal);
    }
    
    const cancelQuestionBtn = document.getElementById('cancelQuestionBtn');
    if (cancelQuestionBtn) {
        cancelQuestionBtn.addEventListener('click', hideQuestionModal);
    }
    
    // Search question
    const searchQuestion = document.getElementById('searchQuestion');
    if (searchQuestion) {
        searchQuestion.addEventListener('input', filterQuestions);
    }
    
    // Filter subject
    const filterSubject = document.getElementById('filterSubject');
    if (filterSubject) {
        filterSubject.addEventListener('change', filterQuestions);
    }
}

// Handle admin login
function handleAdminLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value;
    
    if (!username || !password) {
        showAdminError('adminLoginError', 'Username dan password wajib diisi');
        return;
    }
    
    // Validate credentials
    if (!DataManager.validateAdmin(username, password)) {
        showAdminError('adminLoginError', 'Username atau password salah');
        return;
    }
    
    // Save admin session
    const adminData = {
        username,
        name: SAMPLE_DATA.admin.name,
        loggedIn: true,
        loginTime: new Date().toISOString()
    };
    
    DataManager.saveAdminSession(adminData);
    AdminState.currentAdmin = adminData;
    
    // Show dashboard
    showAdminDashboard();
}

// Show admin dashboard
function showAdminDashboard() {
    document.getElementById('adminLoginPage').classList.remove('active');
    document.getElementById('adminDashboard').classList.add('active');
    
    // Set admin name
    document.getElementById('adminNameDisplay').textContent = AdminState.currentAdmin.name;
    
    // Load dashboard data
    loadDashboardData();
}

// Load dashboard data
function loadDashboardData() {
    // Load questions
    AdminState.questions = DataManager.getQuestions();
    
    // Update stats
    document.getElementById('statTotalExams').textContent = '1';
    document.getElementById('statTotalStudents').textContent = '0';
    document.getElementById('statTotalQuestions').textContent = AdminState.questions.length;
    document.getElementById('statCompletedExams').textContent = '0';
    
    // Load active exams (sample data)
    loadActiveExams();
}

// Load active exams
function loadActiveExams() {
    const table = document.getElementById('activeExamsTable');
    
    // Sample active exam
    const sampleExam = `
        <tr>
            <td>PAI dan Budi Pekerti</td>
            <td>XI TO, XI APAT</td>
            <td><span class="status-online">Aktif</span></td>
            <td>60 menit</td>
            <td><span class="status-online">Berjalan</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-action" onclick="viewExam()">Lihat</button>
                    <button class="btn-action" onclick="monitorExam()">Monitor</button>
                </div>
            </td>
        </tr>
    `;
    
    table.innerHTML = sampleExam;
}

// Switch admin page
function switchAdminPage(page) {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) {
            item.classList.add('active');
        }
    });
    
    // Hide all content
    document.querySelectorAll('.admin-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Show selected content
    const contentId = page.replace(/-/g, '') + 'Content';
    const contentElement = document.getElementById(contentId);
    if (contentElement) {
        contentElement.style.display = 'block';
    }
    
    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'bank-soal': 'Bank Soal',
        'peserta': 'Peserta',
        'ujian': 'Ujian',
        'hasil': 'Hasil',
        'monitoring': 'Monitoring',
        'pengaturan': 'Pengaturan'
    };
    
    document.getElementById('pageTitle').textContent = titles[page] || 'Dashboard';
    
    // Load page-specific data
    switch(page) {
        case 'bank-soal':
            loadBankSoal();
            break;
        case 'monitoring':
            loadMonitoring();
            break;
    }
    
    AdminState.currentPage = page;
}

// Load Bank Soal
function loadBankSoal() {
    const table = document.getElementById('questionBankTable');
    table.innerHTML = '';
    
    AdminState.questions.forEach((q, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${q.question.substring(0, 60)}${q.question.length > 60 ? '...' : ''}</td>
            <td>PAI dan Budi Pekerti</td>
            <td><span class="status-badge">Sedang</span></td>
            <td>${q.score}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-action edit" onclick="editQuestion(${q.id})">Edit</button>
                    <button class="btn-action delete" onclick="deleteQuestion(${q.id})">Hapus</button>
                </div>
            </td>
        `;
        table.appendChild(row);
    });
}

// Load Monitoring
function loadMonitoring() {
    const table = document.getElementById('monitoringTable');
    
    // Sample monitoring data
    const sampleData = [
        {
            student: 'Ahmad Rizki',
            class: 'XI TO',
            status: 'online',
            progress: '25/40',
            time: '42:10',
            warnings: 0
        },
        {
            student: 'Budi Santoso',
            class: 'XI APAT',
            status: 'online',
            progress: '18/40',
            time: '38:20',
            warnings: 1
        },
        {
            student: 'Citra Dewi',
            class: 'XI TO',
            status: 'online',
            progress: '30/40',
            time: '45:15',
            warnings: 0
        }
    ];
    
    table.innerHTML = '';
    
    sampleData.forEach(data => {
        const row = document.createElement('tr');
        const statusClass = data.status === 'online' ? 'status-online' : 'status-offline';
        
        row.innerHTML = `
            <td>${data.student}</td>
            <td>${data.class}</td>
            <td><span class="${statusClass}">${data.status === 'online' ? 'Online' : 'Offline'}</span></td>
            <td>${data.progress}</td>
            <td>${data.time}</td>
            <td><span class="status-badge ${data.warnings > 0 ? 'warning' : ''}">${data.warnings}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-action" onclick="viewStudentDetail()">Detail</button>
                </div>
            </td>
        `;
        
        table.appendChild(row);
    });
}

// Show add question modal
function showAddQuestionModal() {
    document.getElementById('questionModalTitle').textContent = 'Tambah Soal';
    document.getElementById('questionForm').reset();
    showAdminModal('questionModal');
}

// Handle save question
function handleSaveQuestion(e) {
    e.preventDefault();
    
    const questionData = {
        subject: document.getElementById('questionSubject').value,
        question: document.getElementById('questionText').value,
        optionA: document.getElementById('optionA').value,
        optionB: document.getElementById('optionB').value,
        optionC: document.getElementById('optionC').value,
        optionD: document.getElementById('optionD').value,
        optionE: document.getElementById('optionE').value,
        correctAnswer: document.getElementById('correctAnswer').value,
        score: parseInt(document.getElementById('questionScore').value),
        difficulty: document.getElementById('questionDifficulty').value
    };
    
    // Validate
    if (!questionData.subject || !questionData.question || !questionData.correctAnswer) {
        showAdminToast('Mohon lengkapi data soal');
        return;
    }
    
    // In production, save to database
    console.log('Saving question:', questionData);
    
    hideQuestionModal();
    showAdminToast('Soal berhasil disimpan');
    
    // Reload bank soal
    if (AdminState.currentPage === 'bank-soal') {
        loadBankSoal();
    }
}

// Filter questions
function filterQuestions() {
    const searchTerm = document.getElementById('searchQuestion').value.toLowerCase();
    const subjectFilter = document.getElementById('filterSubject').value;
    
    // Filter logic would go here
    console.log('Filtering:', searchTerm, subjectFilter);
}

// Hide question modal
function hideQuestionModal() {
    hideAdminModal('questionModal');
}

// Handle admin logout
function handleAdminLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        DataManager.remove(STORAGE_KEYS.ADMIN_SESSION);
        AdminState.currentAdmin = null;
        
        document.getElementById('adminDashboard').classList.remove('active');
        document.getElementById('adminLoginPage').classList.add('active');
        
        showAdminToast('Berhasil keluar');
    }
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    
    const btn = document.getElementById('toggleDarkMode');
    btn.textContent = isDark ? '☀️' : '🌙';
}

// Load dark mode preference
function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        const btn = document.getElementById('toggleDarkMode');
        if (btn) btn.textContent = '☀️';
    }
}

// Toggle admin sidebar (mobile)
function toggleAdminSidebar() {
    document.querySelector('.admin-sidebar').classList.toggle('show');
}

// Modal functions
function showAdminModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

function hideAdminModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// Toast notification
function showAdminToast(message) {
    const toast = document.getElementById('adminToast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Error display
function showAdminError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        setTimeout(() => {
            errorElement.classList.remove('show');
        }, 5000);
    }
}

// Global functions for inline event handlers
function editQuestion(id) {
    const question = AdminState.questions.find(q => q.id === id);
    if (question) {
        document.getElementById('questionModalTitle').textContent = 'Edit Soal';
        document.getElementById('questionText').value = question.question;
        document.getElementById('optionA').value = question.options.A;
        document.getElementById('optionB').value = question.options.B;
        document.getElementById('optionC').value = question.options.C;
        document.getElementById('optionD').value = question.options.D;
        document.getElementById('optionE').value = question.options.E || '';
        document.getElementById('correctAnswer').value = question.correctAnswer;
        document.getElementById('questionScore').value = question.score;
        
        showAdminModal('questionModal');
    }
}

function deleteQuestion(id) {
    if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
        // In production, delete from database
        console.log('Deleting question:', id);
        showAdminToast('Soal berhasil dihapus');
        loadBankSoal();
    }
}

function viewExam() {
    showAdminToast('Fitur detail ujian akan segera tersedia');
}

function monitorExam() {
    switchAdminPage('monitoring');
}

function viewStudentDetail() {
    showAdminToast('Fitur detail siswa akan segera tersedia');
}

// Auto-refresh monitoring (every 5 seconds)
setInterval(() => {
    if (AdminState.currentPage === 'monitoring' && AdminState.currentAdmin) {
        loadMonitoring();
    }
}, 5000);
