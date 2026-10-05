# ============================================================
# SCRIPT DEPLOY OTOMATIS KE GITHUB
# CBT EXAM - SMKN 1 KUOK
# Username: heriyantoquin
# ============================================================

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  CBT EXAM - Deploy ke GitHub Pages" -ForegroundColor Cyan
Write-Host "  Repository: heriyantoquin/cbt-exam-smkn1kuok" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Cek apakah Git terinstall
Write-Host "Checking Git installation..." -ForegroundColor Yellow
$gitVersion = git --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Git tidak terinstall!" -ForegroundColor Red
    Write-Host "Download dan install Git dari: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}
Write-Host "✓ Git terinstall: $gitVersion" -ForegroundColor Green
Write-Host ""

# Cek apakah sudah ada .git folder
if (Test-Path ".git") {
    Write-Host "Git repository sudah ada." -ForegroundColor Green
    Write-Host ""
    
    # Update mode
    Write-Host "MODE: UPDATE" -ForegroundColor Cyan
    Write-Host "---------------------------------------" -ForegroundColor Cyan
    
    # Status
    Write-Host "Checking changes..." -ForegroundColor Yellow
    git status --short
    Write-Host ""
    
    # Commit message
    $defaultMessage = "Update: " + (Get-Date -Format "yyyy-MM-dd HH:mm")
    $commitMessage = Read-Host "Commit message (tekan Enter untuk default: '$defaultMessage')"
    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        $commitMessage = $defaultMessage
    }
    
    # Add, commit, push
    Write-Host ""
    Write-Host "Adding files..." -ForegroundColor Yellow
    git add .
    
    Write-Host "Committing..." -ForegroundColor Yellow
    git commit -m "$commitMessage"
    
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    git push
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "================================================" -ForegroundColor Green
        Write-Host "  ✓ UPDATE BERHASIL!" -ForegroundColor Green
        Write-Host "================================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Website akan update dalam 1-2 menit:" -ForegroundColor Cyan
        Write-Host "https://heriyantoquin.github.io/cbt-exam-smkn1kuok/launcher.html" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "ERROR: Push gagal!" -ForegroundColor Red
        Write-Host "Mungkin perlu Personal Access Token." -ForegroundColor Yellow
        Write-Host "Baca: DEPLOY_GITHUB.md untuk panduan." -ForegroundColor Yellow
    }
    
} else {
    # Initial setup mode
    Write-Host "MODE: INITIAL SETUP" -ForegroundColor Cyan
    Write-Host "---------------------------------------" -ForegroundColor Cyan
    Write-Host ""
    
    # Setup Git config
    Write-Host "Setup Git configuration..." -ForegroundColor Yellow
    $userName = Read-Host "Git username (default: Heriyanto)"
    if ([string]::IsNullOrWhiteSpace($userName)) {
        $userName = "Heriyanto"
    }
    
    $userEmail = Read-Host "Git email (contoh: heriyantoquin@gmail.com)"
    if ([string]::IsNullOrWhiteSpace($userEmail)) {
        Write-Host "Email wajib diisi!" -ForegroundColor Red
        pause
        exit 1
    }
    
    git config --global user.name "$userName"
    git config --global user.email "$userEmail"
    Write-Host "✓ Git config set" -ForegroundColor Green
    Write-Host ""
    
    # Initialize
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit: CBT Exam SMKN 1 KUOK v1.0"
    git branch -M main
    
    # Add remote
    Write-Host ""
    Write-Host "Connecting to GitHub..." -ForegroundColor Yellow
    Write-Host "Repository: https://github.com/heriyantoquin/cbt-exam-smkn1kuok.git" -ForegroundColor Cyan
    git remote add origin https://github.com/heriyantoquin/cbt-exam-smkn1kuok.git
    
    # Push
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    Write-Host "Anda akan diminta login GitHub:" -ForegroundColor Yellow
    Write-Host "  Username: heriyantoquin" -ForegroundColor White
    Write-Host "  Password: Personal Access Token (bukan password biasa!)" -ForegroundColor White
    Write-Host ""
    
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "================================================" -ForegroundColor Green
        Write-Host "  ✓ DEPLOY BERHASIL!" -ForegroundColor Green
        Write-Host "================================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "LANGKAH SELANJUTNYA:" -ForegroundColor Cyan
        Write-Host "1. Buka: https://github.com/heriyantoquin/cbt-exam-smkn1kuok" -ForegroundColor White
        Write-Host "2. Klik: Settings → Pages" -ForegroundColor White
        Write-Host "3. Source: main branch" -ForegroundColor White
        Write-Host "4. Save" -ForegroundColor White
        Write-Host "5. Tunggu 1-2 menit" -ForegroundColor White
        Write-Host "6. Akses: https://heriyantoquin.github.io/cbt-exam-smkn1kuok/launcher.html" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "ERROR: Push gagal!" -ForegroundColor Red
        Write-Host ""
        Write-Host "SOLUSI:" -ForegroundColor Yellow
        Write-Host "1. Pastikan repository sudah dibuat di GitHub" -ForegroundColor White
        Write-Host "2. Gunakan Personal Access Token, bukan password" -ForegroundColor White
        Write-Host "3. Baca DEPLOY_GITHUB.md untuk panduan lengkap" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
pause
