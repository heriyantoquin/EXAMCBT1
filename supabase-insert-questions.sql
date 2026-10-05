-- ============================================================
-- INSERT SOAL PAI - CBT EXAM SMKN 1 KUOK
-- ============================================================
-- Jalankan setelah supabase-setup.sql berhasil
-- ============================================================

-- Dapatkan exam_id terlebih dahulu
DO $$
DECLARE
    v_exam_id UUID;
BEGIN
    -- Get exam ID dengan token TOKEN2024
    SELECT id INTO v_exam_id FROM exams WHERE token = 'TOKEN2024';
    
    IF v_exam_id IS NULL THEN
        RAISE EXCEPTION 'Exam dengan token TOKEN2024 tidak ditemukan. Jalankan supabase-setup.sql terlebih dahulu.';
    END IF;
    
    -- Insert 40 soal PAI
    INSERT INTO questions (exam_id, question_number, question, option_a, option_b, option_c, option_d, option_e, correct_answer, score, difficulty, category) VALUES
    
    -- Soal 1-10
    (v_exam_id, 1, 'Al-Qur''an diturunkan kepada Nabi Muhammad SAW melalui perantara...', 'Malaikat Jibril', 'Malaikat Mikail', 'Malaikat Israfil', 'Malaikat Izrail', 'Malaikat Ridwan', 'A', 1, 'mudah', 'Al-Quran'),
    (v_exam_id, 2, 'Berapa jumlah surat dalam Al-Qur''an?', '110 surat', '112 surat', '114 surat', '116 surat', '118 surat', 'C', 1, 'mudah', 'Al-Quran'),
    (v_exam_id, 3, 'Rukun Islam yang pertama adalah...', 'Salat', 'Puasa', 'Zakat', 'Syahadat', 'Haji', 'D', 1, 'mudah', 'Rukun Islam'),
    (v_exam_id, 4, 'Kitab yang diturunkan kepada Nabi Musa AS adalah...', 'Injil', 'Taurat', 'Zabur', 'Al-Qur''an', 'Suhuf', 'B', 1, 'mudah', 'Rukun Iman'),
    (v_exam_id, 5, 'Salat yang dikerjakan pada hari Jumat disebut...', 'Salat Ied', 'Salat Tarawih', 'Salat Jumat', 'Salat Witir', 'Salat Dhuha', 'C', 1, 'mudah', 'Ibadah'),
    (v_exam_id, 6, 'Puasa Ramadan diwajibkan pada tahun ke...', 'Pertama Hijriyah', 'Kedua Hijriyah', 'Ketiga Hijriyah', 'Keempat Hijriyah', 'Kelima Hijriyah', 'B', 1, 'sedang', 'Ibadah'),
    (v_exam_id, 7, 'Zakat fitrah wajib dikeluarkan pada bulan...', 'Syawal', 'Ramadan', 'Dzulhijjah', 'Muharram', 'Rajab', 'B', 1, 'mudah', 'Ibadah'),
    (v_exam_id, 8, 'Hukum mengucapkan salam adalah...', 'Wajib', 'Sunah', 'Mubah', 'Makruh', 'Haram', 'B', 1, 'sedang', 'Akhlak'),
    (v_exam_id, 9, 'Niat puasa harus dilakukan pada waktu...', 'Setelah terbit matahari', 'Siang hari', 'Sebelum terbit matahari', 'Saat berbuka', 'Kapan saja', 'C', 1, 'sedang', 'Ibadah'),
    (v_exam_id, 10, 'Malaikat yang bertugas mencatat amal baik manusia adalah...', 'Rakib', 'Atid', 'Munkar', 'Nakir', 'Ridwan', 'A', 1, 'sedang', 'Rukun Iman'),
    
    -- Soal 11-20
    (v_exam_id, 11, 'Kiblat umat Islam adalah...', 'Masjid Nabawi', 'Ka''bah', 'Masjid Al-Aqsa', 'Gua Hira', 'Jabal Rahmah', 'B', 1, 'mudah', 'Ibadah'),
    (v_exam_id, 12, 'Rasul yang dijuluki Ulul Azmi berjumlah...', '3 orang', '4 orang', '5 orang', '6 orang', '7 orang', 'C', 1, 'sedang', 'Rukun Iman'),
    (v_exam_id, 13, 'Rukun iman yang kedua adalah iman kepada...', 'Allah', 'Malaikat', 'Kitab', 'Rasul', 'Hari Akhir', 'B', 1, 'mudah', 'Rukun Iman'),
    (v_exam_id, 14, 'Surat pertama yang turun kepada Nabi Muhammad SAW adalah...', 'Al-Fatihah', 'Al-Ikhlas', 'Al-Alaq', 'An-Nas', 'Al-Falaq', 'C', 1, 'sedang', 'Al-Quran'),
    (v_exam_id, 15, 'Hukum menjawab salam adalah...', 'Sunah', 'Mubah', 'Wajib Kifayah', 'Wajib Ain', 'Makruh', 'C', 1, 'sulit', 'Akhlak'),
    (v_exam_id, 16, 'Bacaan yang dibaca setelah takbiratul ihram adalah...', 'Al-Fatihah', 'Doa Iftitah', 'Tasbih', 'Surat pendek', 'Takbir', 'B', 1, 'sedang', 'Ibadah'),
    (v_exam_id, 17, 'Jumlah rakaat salat Subuh adalah...', '2 rakaat', '3 rakaat', '4 rakaat', '5 rakaat', '6 rakaat', 'A', 1, 'mudah', 'Ibadah'),
    (v_exam_id, 18, 'Kitab suci umat Nasrani adalah...', 'Taurat', 'Zabur', 'Injil', 'Al-Qur''an', 'Suhuf', 'C', 1, 'mudah', 'Rukun Iman'),
    (v_exam_id, 19, 'Mengerjakan ibadah haji hukumnya...', 'Sunah', 'Wajib bagi yang mampu', 'Mubah', 'Wajib bagi semua muslim', 'Makruh', 'B', 1, 'sedang', 'Rukun Islam'),
    (v_exam_id, 20, 'Hari kiamat termasuk perkara...', 'Yang pasti terjadi', 'Yang mungkin terjadi', 'Yang tidak pasti', 'Yang mustahil', 'Yang dapat dihindari', 'A', 1, 'sedang', 'Rukun Iman'),
    
    -- Soal 21-30
    (v_exam_id, 21, 'Salah satu sifat wajib Allah adalah...', 'Qidam', 'Fana', 'Huduts', 'Jism', 'Aradh', 'A', 1, 'sedang', 'Aqidah'),
    (v_exam_id, 22, 'Berapa kali salat fardhu dalam sehari semalam?', '3 kali', '4 kali', '5 kali', '6 kali', '7 kali', 'C', 1, 'mudah', 'Rukun Islam'),
    (v_exam_id, 23, 'Zakat yang wajib dikeluarkan setiap akhir Ramadan adalah...', 'Zakat mal', 'Zakat profesi', 'Zakat fitrah', 'Zakat perdagangan', 'Zakat pertanian', 'C', 1, 'mudah', 'Ibadah'),
    (v_exam_id, 24, 'Nabi yang terakhir diutus adalah...', 'Nabi Isa AS', 'Nabi Musa AS', 'Nabi Ibrahim AS', 'Nabi Muhammad SAW', 'Nabi Nuh AS', 'D', 1, 'mudah', 'Rukun Iman'),
    (v_exam_id, 25, 'Malaikat yang bertugas meniup sangkakala adalah...', 'Jibril', 'Mikail', 'Israfil', 'Izrail', 'Munkar', 'C', 1, 'sedang', 'Rukun Iman'),
    (v_exam_id, 26, 'Bacaan dalam salat yang artinya "Maha Suci Tuhanku Yang Maha Agung" adalah...', 'Subhana Rabbiyal A''la', 'Subhana Rabbiyal Adzim', 'Sami''allahu liman hamidah', 'Rabbana lakal hamd', 'Allahu Akbar', 'B', 1, 'sedang', 'Ibadah'),
    (v_exam_id, 27, 'Puasa yang dilakukan pada tanggal 13, 14, dan 15 setiap bulan Hijriyah disebut...', 'Puasa Senin Kamis', 'Puasa Daud', 'Puasa Ayyamul Bidh', 'Puasa Syawal', 'Puasa Arafah', 'C', 1, 'sulit', 'Ibadah'),
    (v_exam_id, 28, 'Jumlah rakaat salat Maghrib adalah...', '2 rakaat', '3 rakaat', '4 rakaat', '5 rakaat', '6 rakaat', 'B', 1, 'mudah', 'Ibadah'),
    (v_exam_id, 29, 'Hukum mendirikan salat berjamaah bagi laki-laki adalah...', 'Wajib ain', 'Wajib kifayah', 'Sunah muakkad', 'Sunah', 'Mubah', 'C', 1, 'sedang', 'Ibadah'),
    (v_exam_id, 30, 'Rukun Islam ada...', '3', '4', '5', '6', '7', 'C', 1, 'mudah', 'Rukun Islam'),
    
    -- Soal 31-40
    (v_exam_id, 31, 'Orang yang menerima zakat disebut...', 'Muzaki', 'Mustahiq', 'Amil', 'Muallaf', 'Gharim', 'B', 1, 'sedang', 'Ibadah'),
    (v_exam_id, 32, 'Masjid pertama yang dibangun Nabi Muhammad SAW adalah...', 'Masjidil Haram', 'Masjid Nabawi', 'Masjid Quba', 'Masjid Al-Aqsa', 'Masjid Qubah', 'C', 1, 'sedang', 'Sejarah'),
    (v_exam_id, 33, 'Nabi yang mendapat gelar Khalilullah adalah...', 'Nabi Adam AS', 'Nabi Ibrahim AS', 'Nabi Musa AS', 'Nabi Isa AS', 'Nabi Muhammad SAW', 'B', 1, 'sedang', 'Rukun Iman'),
    (v_exam_id, 34, 'Iman menurut bahasa artinya...', 'Percaya', 'Yakin', 'Membenarkan', 'Berserah diri', 'Tunduk', 'C', 1, 'sulit', 'Aqidah'),
    (v_exam_id, 35, 'Salat yang dikerjakan ketika terjadi gerhana matahari disebut...', 'Salat Khusuf', 'Salat Kusuf', 'Salat Istisqa', 'Salat Istikharah', 'Salat Tahajud', 'B', 1, 'sulit', 'Ibadah'),
    (v_exam_id, 36, 'Tempat berkumpulnya manusia pada hari kiamat adalah...', 'Padang Arafah', 'Padang Mahsyar', 'Jabal Rahmah', 'Mina', 'Muzdalifah', 'B', 1, 'sedang', 'Rukun Iman'),
    (v_exam_id, 37, 'Jumlah sifat wajib Allah adalah...', '10', '15', '20', '25', '30', 'C', 1, 'sulit', 'Aqidah'),
    (v_exam_id, 38, 'Lawan kata dari sifat wajib Allah "Qidam" adalah...', 'Fana', 'Huduts', 'Baqa', 'Wahdaniyat', 'Mukhalafatu lil hawadits', 'B', 1, 'sulit', 'Aqidah'),
    (v_exam_id, 39, 'Cara membersihkan najis mughaladzah adalah...', 'Dibasuh 7 kali, salah satunya dengan tanah', 'Dibasuh 3 kali', 'Dibasuh 1 kali', 'Cukup dihilangkan', 'Dibasuh dengan air dan sabun', 'A', 1, 'sulit', 'Fiqih'),
    (v_exam_id, 40, 'Rukun Iman ada...', '3', '4', '5', '6', '7', 'D', 1, 'mudah', 'Rukun Iman');
    
    RAISE NOTICE '====================================================';
    RAISE NOTICE '✅ 40 Soal PAI berhasil diinsert!';
    RAISE NOTICE 'Exam ID: %', v_exam_id;
    RAISE NOTICE '====================================================';
END $$;
