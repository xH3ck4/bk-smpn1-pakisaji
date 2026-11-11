/* ==========================================================================
   BIMBINGAN DAN KONSELING — SMP NEGERI 1 PAKISAJI
   Interactive Client-Side Application Logic
   ========================================================================== */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* --------------------------------------------------------------------------
     1. MOBILE NAVIGATION & STICKY SCROLL SPY
     -------------------------------------------------------------------------- */
  const mobileBtn = $('#mobileMenuBtn');
  const mobileNav = $('#mobileNav');

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
    });

    $$('#mobileNav a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const sections = $$('section[id], header[id]');
  const navAnchors = $$('.nav-links a, #mobileNav a');

  window.addEventListener(
    'scroll',
    () => {
      const scrollPos = window.scrollY + 130;
      let currentId = 'beranda';
      sections.forEach((sec) => {
        if (sec.offsetTop <= scrollPos) {
          currentId = sec.id;
        }
      });
      navAnchors.forEach((a) => {
        const href = a.getAttribute('href') || '';
        a.classList.toggle('active', href === `#${currentId}`);
      });
    },
    { passive: true }
  );

  /* --------------------------------------------------------------------------
     2. HERO PHOTO SHOWCASE SWITCHER (USING ./assets/img/1.jpeg - 4.jpeg)
     -------------------------------------------------------------------------- */
  const heroSlides = [
    {
      src: 'assets/img/4.jpeg',
      caption: 'Kebersamaan Guru BK & Siswa SMPN 1 Pakisaji dalam Program Sahabat BK'
    },
    {
      src: 'assets/img/3.jpeg',
      caption: 'Layanan Bimbingan Klasikal Interaktif di Ruang Kelas SMPN 1 Pakisaji'
    },
    {
      src: 'assets/img/2.jpeg',
      caption: 'Eksplorasi Minat & Cita-Cita Siswa Melalui Media Kartu Profesi Karier'
    },
    {
      src: 'assets/img/1.jpeg',
      caption: 'Diskusi Kelompok & Penguatan Karakter di Lingkungan Sekolah Adiwiyata'
    }
  ];

  const heroShowcaseImg = $('#heroShowcaseImg');
  const heroShowcaseCap = $('#heroShowcaseCap');
  const heroDots = $$('.hero__dot');
  let currentHeroIdx = 0;

  function setHeroSlide(index) {
    if (!heroShowcaseImg || !heroShowcaseCap) return;
    currentHeroIdx = (index + heroSlides.length) % heroSlides.length;
    const item = heroSlides[currentHeroIdx];
    heroShowcaseImg.style.opacity = '0.35';
    setTimeout(() => {
      heroShowcaseImg.src = item.src;
      heroShowcaseCap.textContent = item.caption;
      heroShowcaseImg.style.opacity = '1';
    }, 180);
    heroDots.forEach((d, i) => d.classList.toggle('active', i === currentHeroIdx));
  }

  heroDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => setHeroSlide(idx));
  });

  setInterval(() => {
    setHeroSlide(currentHeroIdx + 1);
  }, 6000);

  /* --------------------------------------------------------------------------
     3. INTERACTIVE "MITOS VS FAKTA BK" FLIP CARDS
     -------------------------------------------------------------------------- */
  $$('.myth-card').forEach((card) => {
    card.addEventListener('click', () => {
      const isRevealed = card.classList.toggle('revealed');
      const tag = $('.myth-tag', card);
      const title = $('.myth-card__title', card);
      const body = $('.myth-card__body', card);
      const footer = $('.myth-card__footer', card);

      if (isRevealed) {
        tag.className = 'myth-tag myth-tag--fact';
        tag.textContent = '✓ FAKTA SEBENARNYA';
        title.textContent = card.dataset.factTitle;
        body.textContent = card.dataset.factBody;
        footer.textContent = 'Klik untuk melihat mitos awal ↺';
      } else {
        tag.className = 'myth-tag myth-tag--myth';
        tag.textContent = '✕ MITOS UMUM';
        title.textContent = card.dataset.mythTitle;
        body.textContent = card.dataset.mythBody;
        footer.textContent = 'Klik untuk mengungkap fakta →';
      }
    });
  });

  /* --------------------------------------------------------------------------
     4. LAYANAN 4 BIDANG BK (SMPN 12 SURABAYA INTERACTIVE SPLIT SHOWCASE)
     -------------------------------------------------------------------------- */
  const bidangData = {
    pribadi: {
      badge: 'Bidang Layanan 01',
      title: 'Bimbingan Pribadi',
      desc: 'Membantu siswa mengenal potensi diri, membangun rasa percaya diri, membentuk kepribadian yang positif, serta mengelola emosi dan tantangan psikologis masa remaja secara sehat.',
      topics: [
        'Pengenalan Potensi Diri',
        'Regulasi Emosi Remaja',
        'Kepercayaan Diri',
        'Kesehatan Mental',
        'Kemandirian & Tanggung Jawab'
      ],
      image: 'assets/img/4.jpeg',
      caption: 'Pendampingan hangat bagi setiap siswa untuk mengenali jati diri dan kekuatan pribadinya.',
      targetTab: 'm3'
    },
    sosial: {
      badge: 'Bidang Layanan 02',
      title: 'Bimbingan Sosial',
      desc: 'Mendorong siswa untuk mampu berinteraksi secara sehat, santun, dan saling menghargai dengan teman sebaya, lawan jenis, guru, keluarga, serta lingkungan masyarakat.',
      topics: [
        'Etika Pergaulan Sebaya',
        'Komunikasi Asertif & Sopan',
        'Pencegahan Perundungan (Anti-Bullying)',
        'Empati & Toleransi',
        'Resolusi Konflik Teman'
      ],
      image: 'assets/img/1.jpeg',
      caption: 'Membangun iklim pertemanan kelas yang positif, suportif, dan bebas perundungan di SMPN 1 Pakisaji.',
      targetTab: 'm1'
    },
    belajar: {
      badge: 'Bidang Layanan 03',
      title: 'Bimbingan Belajar',
      desc: 'Mendampingi siswa mengatasi hambatan akademik, menemukan gaya belajar yang paling efektif (Visual, Auditori, Kinestetik), meningkatkan motivasi, serta mengatur waktu belajar.',
      topics: [
        'Strategi Gaya Belajar VAK',
        'Motivasi Intrinsik & Ekstrinsik',
        'Manajemen Waktu & Tugas',
        'Mengatasi Rasa Malas/Prokrastinasi',
        'Persiapan Ujian & Evaluasi'
      ],
      image: 'assets/img/3.jpeg',
      caption: 'Suasana bimbingan klasikal yang aktif untuk menumbuhkan semangat belajar siswa di kelas.',
      targetTab: 'm2'
    },
    karier: {
      badge: 'Bidang Layanan 04',
      title: 'Bimbingan Karier',
      desc: 'Membantu siswa mengenali minat, bakat, dan berbagai profesi masa depan sejak bangku SMP, serta merencanakan kelanjutan studi ke jenjang SMA, SMK, atau MA yang tepat.',
      topics: [
        'Eksplorasi Kartu Profesi',
        'Pemetaan Minat & Bakat',
        'Perencanaan Studi Lanjut SMA/SMK',
        'Literasi Finansial Remaja',
        'Cita-Cita & Rencana Masa Depan'
      ],
      image: 'assets/img/2.jpeg',
      caption: 'Penggunaan media Kartu Profesi (Dokter, Arsitek, Programmer, Guru, dll.) pada sesi Bimbingan Karier.',
      targetTab: 'm4'
    }
  };

  const bidangBtns = $$('.bidang-btn');
  const bpBadge = $('#bpBadge');
  const bpTitle = $('#bpTitle');
  const bpDesc = $('#bpDesc');
  const bpTopics = $('#bpTopics');
  const bpImage = $('#bpImage');
  const bpCaption = $('#bpCaption');
  const bpActionBtn = $('#bpActionBtn');

  function selectBidang(key) {
    const data = bidangData[key];
    if (!data) return;

    bidangBtns.forEach((btn) => {
      const isSelected = btn.dataset.bidang === key;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-pressed', String(isSelected));
    });

    if (bpBadge) bpBadge.textContent = data.badge;
    if (bpTitle) bpTitle.textContent = data.title;
    if (bpDesc) bpDesc.textContent = data.desc;
    if (bpTopics) {
      bpTopics.innerHTML = data.topics
        .map((t) => `<span class="topic-chip">${t}</span>`)
        .join('');
    }
    if (bpImage) {
      bpImage.src = data.image;
      bpImage.alt = data.title;
    }
    if (bpCaption) bpCaption.textContent = data.caption;
    if (bpActionBtn) {
      bpActionBtn.onclick = () => {
        activateModuleTab(data.targetTab);
        const materiSec = $('#materi');
        if (materiSec) materiSec.scrollIntoView({ behavior: 'smooth' });
      };
    }
  }

  bidangBtns.forEach((btn) => {
    btn.addEventListener('click', () => selectBidang(btn.dataset.bidang));
  });

  /* --------------------------------------------------------------------------
     5. 10 JENIS LAYANAN BK (SYMMETRICAL 2-COLUMN HORIZONTAL CARDS)
     -------------------------------------------------------------------------- */
  const tenServices = [
    {
      num: '01',
      title: 'Layanan Orientasi',
      cat: 'dasar',
      catLabel: 'Layanan Dasar',
      desc: 'Mengenalkan siswa baru pada lingkungan SMPN 1 Pakisaji, tata tertib, fasilitas, kurikulum, dan teman baru agar cepat beradaptasi.'
    },
    {
      num: '02',
      title: 'Layanan Informasi',
      cat: 'dasar',
      catLabel: 'Layanan Dasar',
      desc: 'Memberikan pemahaman tentang informasi pribadi-sosial, tips belajar efektif, pengenalan profesi karier, dan informasi studi lanjut SMA/SMK.'
    },
    {
      num: '03',
      title: 'Penempatan & Penyaluran',
      cat: 'dasar',
      catLabel: 'Perencanaan Individual',
      desc: 'Membantu siswa menempati wadah yang sesuai dengan potensi dan minatnya, seperti kelompok belajar, ekstrakurikuler, maupun peminatan.'
    },
    {
      num: '04',
      title: 'Penguasaan Konten',
      cat: 'dasar',
      catLabel: 'Layanan Dasar',
      desc: 'Membantu siswa menguasai kompetensi dan kebiasaan positif tertentu, seperti manajemen waktu, cara mencatat kreatif, atau komunikasi santun.'
    },
    {
      num: '05',
      title: 'Konseling Perorangan',
      cat: 'responsif',
      catLabel: 'Layanan Responsif',
      desc: 'Pertemuan tatap muka secara empat mata antara siswa dan Guru BK untuk membahas persoalan pribadi secara aman, nyaman, dan terjaga kerahasiaannya.'
    },
    {
      num: '06',
      title: 'Bimbingan Kelompok',
      cat: 'responsif',
      catLabel: 'Layanan Pengembangan',
      desc: 'Mendiskusikan topik umum yang hangat dan bermanfaat bagi siswa dalam suasana kelompok yang akrab untuk melatih keberanian berpendapat.'
    },
    {
      num: '07',
      title: 'Konseling Kelompok',
      cat: 'responsif',
      catLabel: 'Layanan Responsif',
      desc: 'Membantu mengentaskan permasalahan anggota kelompok secara bersama-sama dengan memanfaatkan dukungan dan empati dinamika kelompok.'
    },
    {
      num: '08',
      title: 'Layanan Konsultasi',
      cat: 'kolaborasi',
      catLabel: 'Kolaborasi & Sistem',
      desc: 'Memfasilitasi orang tua, wali kelas, atau guru mata pelajaran yang membutuhkan wawasan bersama dalam mendampingi perkembangan siswa.'
    },
    {
      num: '09',
      title: 'Layanan Mediasi',
      cat: 'kolaborasi',
      catLabel: 'Resolusi Konflik',
      desc: 'Membantu menyelesaikan kesalahpahaman atau perselisihan antar siswa secara damai dan adil dengan Guru BK sebagai penengah netral.'
    },
    {
      num: '10',
      title: 'Layanan Advokasi',
      cat: 'kolaborasi',
      catLabel: 'Perlindungan Siswa',
      desc: 'Memberikan pendampingan dan perlindungan terhadap hak-hak siswa agar terbebas dari perlakuan tidak adil, perundungan, atau tekanan.'
    }
  ];

  const servicesGrid = $('#servicesGrid');
  const serviceFilterBtns = $$('.filter-pill[data-sfilter]');

  function renderServices(filter = 'all') {
    if (!servicesGrid) return;
    const filtered =
      filter === 'all' ? tenServices : tenServices.filter((s) => s.cat === filter);

    servicesGrid.innerHTML = filtered
      .map(
        (s) => `
      <article class="service-card">
        <div class="service-card__icon" aria-hidden="true">${s.num}</div>
        <div class="service-card__content">
          <div class="service-card__top">
            <h4>${s.title}</h4>
            <span class="service-card__cat">${s.catLabel}</span>
          </div>
          <p>${s.desc}</p>
        </div>
      </article>
    `
      )
      .join('');
  }

  serviceFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      serviceFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderServices(btn.dataset.sfilter);
    });
  });

  renderServices('all');

  /* --------------------------------------------------------------------------
     6. MATERI EDUKASI & EKSPLORASI KARIER (4 TABS + SIMULATORS)
     -------------------------------------------------------------------------- */
  const moduleTabs = $$('.module-tab[data-mtab]');
  const modulePanes = $$('.module-pane');

  function activateModuleTab(tabId) {
    moduleTabs.forEach((t) => {
      const active = t.dataset.mtab === tabId;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
    });
    modulePanes.forEach((p) => {
      p.classList.toggle('active', p.id === tabId);
    });
  }

  moduleTabs.forEach((tab) => {
    tab.addEventListener('click', () => activateModuleTab(tab.dataset.mtab));
  });

  // 6A. Simulator Menolak Perlakuan Tidak Nyaman (Materi 1)
  const refusalScenarios = {
    barang: {
      situation: 'Teman mengambil atau membuka barang pribadimu (buku harian, kotak pensil, atau HP) tanpa izin.',
      response: '“Tolong jangan ambil barangku tanpa izin ya. Kalau mau pinjam, bilang dulu supaya aku tahu.”',
      tip: 'Ucapkan dengan nada tenang namun tegas sambil menatap lawan bicara. Jika teman masih memaksa, simpan barangmu di tempat aman dan sampaikan ke wali kelas atau Guru BK.'
    },
    jodoh: {
      situation: 'Teman-teman di kelas terus mengejek atau menjodoh-jodohkanmu secara berlebihan hingga kamu merasa risih.',
      response: '“Aku kurang nyaman kalau dijodoh-jodohkan begitu. Kita semua di sini berteman baik saja, ya.”',
      tip: 'Jangan membalas dengan kemarahan berlebihan; alihkan topik pembicaraan ke pelajaran atau hobi, dan ajak teman dekatmu untuk tidak ikut menimpali.'
    },
    sentuh: {
      situation: 'Ada teman yang menyentuh bahu, tangan, atau bagian tubuhmu yang membuatmu merasa tidak nyaman atau tidak aman.',
      response: '“Maaf, tolong jangan sentuh aku seperti itu. Aku merasa tidak nyaman.”',
      tip: 'Tubuhmu adalah otoritasmu. Segera mundur selangkah untuk menjaga jarak aman, dan jangan ragu melapor ke Guru BK apabila tindakan tersebut berulang.'
    },
    umum: {
      situation: 'Teman menyebarkan foto aib, tangkapan layar chat pribadi, atau mempermalukanmu di depan umum.',
      response: '“Tolong hapus foto/chat itu dan jangan mempermalukan aku di depan teman-teman. Kita harus saling menjaga nama baik.”',
      tip: 'Simpan bukti bila terjadi di media sosial/grup kelas, jangan membalas dengan perundungan balik, dan segera konsultasikan ke Ruang BK SMPN 1 Pakisaji.'
    }
  };

  const scenarioBtns = $$('.scenario-btn');
  const scenarioOutput = $('#scenarioOutput');

  function updateScenario(key) {
    const item = refusalScenarios[key];
    if (!item || !scenarioOutput) return;
    scenarioBtns.forEach((b) => b.classList.toggle('active', b.dataset.scen === key));
    scenarioOutput.innerHTML = `
      <p style="margin-bottom:6px;color:var(--text-muted);font-size:0.82rem;"><strong>Situasi:</strong> ${item.situation}</p>
      <p style="margin-bottom:6px;font-size:0.95rem;color:var(--navy-900);"><strong>Kalimat Penolakan Sopan &amp; Tegas:</strong><br><span style="color:var(--blue-600);font-weight:700;">${item.response}</span></p>
      <p style="margin:0;font-size:0.84rem;color:var(--text-secondary);"><strong>Saran Langkah BK:</strong> ${item.tip}</p>
    `;
  }

  scenarioBtns.forEach((btn) => {
    btn.addEventListener('click', () => updateScenario(btn.dataset.scen));
  });
  updateScenario('barang');

  // 6B. Interactive Study Habit Checklist (Materi 2)
  const habitChecks = $$('.habit-checkbox');
  const habitScoreText = $('#habitScoreText');
  const habitProgressFill = $('#habitProgressFill');

  function updateHabitScore() {
    if (!habitChecks.length) return;
    const checkedCount = habitChecks.filter((c) => c.checked).length;
    const total = habitChecks.length;
    const pct = Math.round((checkedCount / total) * 100);

    habitChecks.forEach((c) => {
      const parent = c.closest('.check-item');
      if (parent) parent.classList.toggle('checked', c.checked);
    });

    if (habitProgressFill) habitProgressFill.style.width = `${pct}%`;
    if (habitScoreText) {
      let msg = 'Pilih kebiasaan belajar yang sudah atau ingin kamu terapkan minggu ini.';
      if (checkedCount >= 1 && checkedCount <= 3) {
        msg = `${checkedCount} dari ${total} langkah (${pct}%) — Awal yang bagus! Mulailah konsisten dari 2–3 kebiasaan kecil setiap hari.`;
      } else if (checkedCount >= 4 && checkedCount <= 6) {
        msg = `${checkedCount} dari ${total} langkah (${pct}%) — Hebat! Kamu sudah memiliki fondasi manajemen belajar yang baik.`;
      } else if (checkedCount >= 7) {
        msg = `${checkedCount} dari ${total} langkah (${pct}%) — Luar biasa! Pertahankan rutinitas positif ini dan bagikan semangatmu ke teman-teman.`;
      }
      habitScoreText.textContent = msg;
    }
  }

  habitChecks.forEach((chk) => chk.addEventListener('change', updateHabitScore));

  // 6C. Interactive Mindset Reframing Cards (Materi 3 - Percaya Diri)
  $$('.reframe-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = $(`#${btn.dataset.target}`);
      if (target) {
        const isShown = target.style.display === 'block';
        target.style.display = isShown ? 'none' : 'block';
        btn.textContent = isShown
          ? 'Ubah ke Pola Pikir Positif →'
          : 'Sembunyikan Reframing ↑';
      }
    });
  });

  // 6D. Dek Kartu Eksplorasi Karier (9 Profesi dari Foto 2.jpeg SMPN 1 Pakisaji)
  const careerCardsData = [
    {
      id: 'dokter',
      field: 'Kesehatan & Kedokteran',
      title: 'Dokter',
      summary: 'Mendiagnosis, mengobati, dan memberikan edukasi pencegahan penyakit demi menjaga kualitas hidup masyarakat.',
      skills: 'Empati tinggi, ketelitian sains, pemecahan masalah kritis, komunikasi terapeutik.',
      subjects: 'IPA (Biologi & Kimia), Bahasa Inggris, Bahasa Indonesia.',
      pathway: 'SMA (Peminatan Sains/MIPA) → Fakultas Kedokteran & Pendidikan Profesi Dokter.'
    },
    {
      id: 'arsitek',
      field: 'Desain & Rekayasa',
      title: 'Arsitek',
      summary: 'Merancang bangunan dan ruang lingkungan yang estetis, aman, fungsional, serta ramah lingkungan.',
      skills: 'Visualisasi spasial, kreativitas desain, logika struktur, ketelitian menggambar teknik.',
      subjects: 'Matematika, Seni Budaya, IPA (Fisika), Prakarya.',
      pathway: 'SMA (MIPA) atau SMK Teknik Bangunan/DPIB → S1 Arsitektur.'
    },
    {
      id: 'programmer',
      field: 'Teknologi Informasi',
      title: 'Programmer',
      summary: 'Mengembangkan perangkat lunak, website, aplikasi mobile, dan sistem cerdas untuk memecahkan berbagai masalah modern.',
      skills: 'Berpikir algoritmik & logis, ketekunan debugging, kolaborasi tim, adaptasi teknologi.',
      subjects: 'Informatika / TIK, Matematika, Bahasa Inggris.',
      pathway: 'SMA (MIPA/Informatika) atau SMK Rekayasa Perangkat Lunak (RPL) → Teknik Informatika / Ilmu Komputer.'
    },
    {
      id: 'guru',
      field: 'Pendidikan & Pembinaan',
      title: 'Guru & Konselor',
      summary: 'Mendidik, membimbing karakter, dan memfasilitasi generasi muda agar menemukan potensi terbaiknya.',
      skills: 'Komunikasi publik, kesabaran, kepemimpinan kelas, empati & psikologi perkembangan.',
      subjects: 'Seluruh mata pelajaran sesuai bidang minat, Bahasa Indonesia, PPKn.',
      pathway: 'SMA / SMK → Universitas Kependidikan (seperti UNIKAMA / FKIP) & Pendidikan Profesi Guru (PPG).'
    },
    {
      id: 'jurnalis',
      field: 'Media & Komunikasi',
      title: 'Jurnalis',
      summary: 'Meliput fakta di lapangan, melakukan wawancara, dan menyajikan berita yang akurat serta berimbang kepada publik.',
      skills: 'Menulis efektif, riset & verifikasi fakta, keberanian bertanya, etika komunikasi.',
      subjects: 'Bahasa Indonesia, IPS, Bahasa Inggris, PPKn.',
      pathway: 'SMA (IPS/Bahasa) atau SMK Broadcasting → Ilmu Komunikasi / Jurnalistik.'
    },
    {
      id: 'fotografer',
      field: 'Seni & Industri Kreatif',
      title: 'Fotografer',
      summary: 'Mengabadikan momen, bercerita lewat komposisi visual, pencahayaan, dan penyuntingan karya fotografi profesional.',
      skills: 'Kepekaan visual & artistik, penguasaan kamera & cahaya, komunikasi arah gaya, editing digital.',
      subjects: 'Seni Budaya, Prakarya, Informatika.',
      pathway: 'SMK Multimedia/DKV atau SMA → Desain Komunikasi Visual (DKV) / Fotografi.'
    },
    {
      id: 'perawat',
      field: 'Layanan Kesehatan',
      title: 'Perawat',
      summary: 'Memberikan asuhan keperawatan secara holistik, mendampingi pemulihan pasien, dan mengedukasi kesehatan keluarga.',
      skills: 'Kepedulian tulus, ketanggapan darurat, kerja sama tim medis, ketahanan fisik & mental.',
      subjects: 'IPA (Biologi), Bahasa Indonesia, Pendidikan Jasmani.',
      pathway: 'SMA (MIPA) atau SMK Keperawatan → D3/S1 Ilmu Keperawatan & Profesi Ners.'
    },
    {
      id: 'polisi',
      field: 'Keamanan & Hukum',
      title: 'Polisi',
      summary: 'Memelihara keamanan dan ketertiban masyarakat, menegakkan hukum, serta memberikan perlindungan dan pengayoman.',
      skills: 'Kedisiplinan tinggi, kebugaran fisik prima, integritas hukum, ketegasan & komunikasi sosial.',
      subjects: 'PPKn, Pendidikan Jasmani & Olahraga, Bahasa Indonesia, IPS.',
      pathway: 'SMA/MA → Akademi Kepolisian (Akpol), Bintara Polri, atau Sekolah Kedinasan.'
    },
    {
      id: 'atlet',
      field: 'Olahraga & Prestasi',
      title: 'Atlet Profesional',
      summary: 'Berlatih secara disiplin dalam cabang olahraga tertentu untuk meraih prestasi di tingkat daerah, nasional, hingga internasional.',
      skills: 'Disiplin latihan, sportivitas, ketahanan fisik & mental juara, kerja sama tim.',
      subjects: 'Pendidikan Jasmani, Olahraga & Kesehatan (PJOK), Biologi (Gizi & Anatomi).',
      pathway: 'Kelas Khusus Olahraga / SMA / SMK → Fakultas Ilmu Keolahragaan (FIK) & Pembinaan Atlet Nasional.'
    }
  ];

  const careerDeckEl = $('#careerDeck');
  const careerDetailEl = $('#careerDetailPanel');

  function renderCareerDeck(activeId = 'dokter') {
    if (!careerDeckEl) return;
    careerDeckEl.innerHTML = careerCardsData
      .map(
        (c) => `
      <button type="button" class="career-card ${c.id === activeId ? 'active' : ''}" data-cid="${c.id}">
        <div>
          <div class="career-card__field">${c.field}</div>
          <div class="career-card__title">${c.title}</div>
          <p style="font-size:0.82rem;color:var(--text-secondary);line-height:1.5;">${c.summary}</p>
        </div>
        <span style="margin-top:12px;font-size:0.76rem;font-weight:700;color:var(--blue-600);">Lihat Detail Jalur Karier →</span>
      </button>
    `
      )
      .join('');

    $$('.career-card', careerDeckEl).forEach((card) => {
      card.addEventListener('click', () => {
        renderCareerDeck(card.dataset.cid);
      });
    });

    const selected = careerCardsData.find((c) => c.id === activeId) || careerCardsData[0];
    if (careerDetailEl && selected) {
      careerDetailEl.innerHTML = `
        <span class="eyebrow" style="margin-bottom:6px;">Detail Kartu Profesi Terpilih</span>
        <h4 style="font-size:1.25rem;font-weight:800;color:var(--navy-900);margin-bottom:6px;">${selected.title} — ${selected.field}</h4>
        <p style="font-size:0.9rem;color:var(--text-secondary);">${selected.summary}</p>
        <div class="career-detail-grid">
          <div class="career-detail-box">
            <strong style="font-size:0.75rem;text-transform:uppercase;color:var(--blue-600);display:block;margin-bottom:4px;">Keterampilan Penting</strong>
            <span style="font-size:0.85rem;color:var(--text-primary);">${selected.skills}</span>
          </div>
          <div class="career-detail-box">
            <strong style="font-size:0.75rem;text-transform:uppercase;color:var(--emerald-600);display:block;margin-bottom:4px;">Mapel SMP Pendukung</strong>
            <span style="font-size:0.85rem;color:var(--text-primary);">${selected.subjects}</span>
          </div>
          <div class="career-detail-box">
            <strong style="font-size:0.75rem;text-transform:uppercase;color:var(--amber-500);display:block;margin-bottom:4px;">Jalur Studi Lanjut</strong>
            <span style="font-size:0.85rem;color:var(--text-primary);">${selected.pathway}</span>
          </div>
        </div>
      `;
    }
  }

  renderCareerDeck('dokter');

  /* --------------------------------------------------------------------------
     7. PUSAT ASESMEN SISWA (MINAT BAKAT, GAYA BELAJAR VAK, CEK MOOD HARIAN)
     -------------------------------------------------------------------------- */
  const assessTabs = $$('[data-atab]');
  const assessCards = $$('.assessment-card');

  assessTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      assessTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const targetId = tab.dataset.atab;
      assessCards.forEach((c) => c.classList.toggle('active', c.id === targetId));
    });
  });

  // 7A. Asesmen 1: Minat dan Bakat (10 Dimensi)
  const minatItems = [
    { dim: 'Seni Rupa & Desain', q: 'Saya senang menggambar, mendesain poster/visual, atau membuat karya kerajinan tangan.', career: 'Arsitek, Desainer Grafis, Fotografer' },
    { dim: 'Musik & Pertunjukan', q: 'Saya senang bernyanyi, bermain alat musik, menari, atau tampil di atas panggung.', career: 'Seniman Pertunjukan, Kreator Konten, Guru Seni' },
    { dim: 'Logika & Matematika', q: 'Saya senang berhitung, menganalisis data, atau memecahkan teka-teki logika.', career: 'Programmer, Akuntan, Analis Data, Insinyur' },
    { dim: 'Bahasa & Komunikasi', q: 'Saya senang membaca buku, menulis cerita/artikel, atau berbicara di depan publik.', career: 'Jurnalis, Penulis, Guru Bahasa, Diplomasi' },
    { dim: 'Olahraga & Fisik', q: 'Saya senang berolahraga, latihan fisik, atau kegiatan lapangan yang aktif bergerak.', career: 'Atlet Profesional, Polisi/TNI, Pelatih Olahraga' },
    { dim: 'Sosial & Kemanusiaan', q: 'Saya senang membantu teman, mendengarkan curhat, dan peduli pada kesehatan/kesejahteraan orang lain.', career: 'Konselor/Guru BK, Perawat, Dokter, Psikolog' },
    { dim: 'Kepemimpinan', q: 'Saya senang mengatur kegiatan kelompok, memimpin diskusi, atau mengkoordinasikan teman.', career: 'Manajer Proyek, Pengusaha, Aparatur Publik' },
    { dim: 'Sains & Eksperimen', q: 'Saya senang melakukan percobaan IPA, meneliti fenomena alam, dan mencari tahu "mengapa bisa begitu?".', career: 'Dokter, Peneliti Sains, Apoteker, Ahli Gizi' },
    { dim: 'Alam & Lingkungan', q: 'Saya senang merawat tanaman, menyayangi hewan, dan menjaga kelestarian lingkungan Adiwiyata.', career: 'Ahli Lingkungan, Dokter Hewan, Agronomis' },
    { dim: 'Teknik & Teknologi', q: 'Saya senang mengutak-atik komputer, merakit perangkat, atau mempelajari cara kerja teknologi baru.', career: 'Programmer, Teknisi Jaringan, Arsitek Sistem' }
  ];

  const minatQuestionsEl = $('#minatQuestions');
  if (minatQuestionsEl) {
    minatQuestionsEl.innerHTML = minatItems
      .map(
        (item, idx) => `
      <div class="question-item">
        <p class="question-item__title">${idx + 1}. ${item.q}</p>
        <div class="option-pills">
          <label class="option-pill">
            <input type="radio" name="minat_${idx}" value="2" required>
            <span>Sangat Sesuai</span>
          </label>
          <label class="option-pill">
            <input type="radio" name="minat_${idx}" value="1">
            <span>Cukup Sesuai</span>
          </label>
          <label class="option-pill">
            <input type="radio" name="minat_${idx}" value="0">
            <span>Belum Sesuai</span>
          </label>
        </div>
      </div>
    `
      )
      .join('');
  }

  const formMinat = $('#formMinat');
  if (formMinat) {
    formMinat.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama = ($('[name="nama"]', formMinat)?.value || 'Siswa').trim();
      const kelas = ($('[name="kelas"]', formMinat)?.value || '-').trim();

      const scored = minatItems.map((item, idx) => {
        const checked = $(`input[name="minat_${idx}"]:checked`, formMinat);
        return {
          ...item,
          score: checked ? parseInt(checked.value, 10) : 0
        };
      });

      const topMatches = [...scored].sort((a, b) => b.score - a.score).filter((x) => x.score > 0);
      const resBox = $('#resMinat');
      if (!resBox) return;

      if (topMatches.length === 0) {
        resBox.innerHTML = `
          <h4 style="font-size:1.15rem;color:var(--navy-900);margin-bottom:6px;">Halo, ${escapeHtml(nama)} (Kelas ${escapeHtml(kelas)})!</h4>
          <p style="font-size:0.9rem;">Kamu belum memilih bidang yang sesuai. Yuk berdiskusi santai dengan Guru BK di SMPN 1 Pakisaji untuk menggali hobi dan potensimu lebih dalam.</p>
        `;
      } else {
        const top3 = topMatches.slice(0, 3);
        const chartHtml = topMatches
          .slice(0, 5)
          .map((m) => {
            const pct = m.score === 2 ? 100 : 55;
            return `
              <div class="bar-row">
                <span>${m.dim}</span>
                <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
                <span>${pct}%</span>
              </div>
            `;
          })
          .join('');

        resBox.innerHTML = `
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;">
            <h4 style="font-size:1.18rem;color:var(--navy-900);">Hasil Pemetaan Minat &amp; Bakat: ${escapeHtml(nama)} (${escapeHtml(kelas)})</h4>
            <span class="eyebrow" style="margin:0;">Analisis Selesai</span>
          </div>
          <p style="margin-bottom:12px;font-size:0.9rem;color:var(--text-secondary);">Kecenderungan potensi terkuatmu berada pada bidang: <strong>${top3.map((x) => x.dim).join(', ')}</strong>.</p>
          <div class="bar-chart">${chartHtml}</div>
          <div style="background:var(--bg-surface);padding:14px 16px;border-radius:12px;border:1px solid var(--border-light);margin-top:12px;">
            <strong style="color:var(--navy-800);display:block;margin-bottom:4px;font-size:0.86rem;">Rekomendasi Profesi &amp; Karier Terkait:</strong>
            <p style="font-size:0.86rem;color:var(--text-secondary);margin:0;">${top3.map((x) => `<b>${x.dim}:</b> ${x.career}`).join(' • ')}</p>
          </div>
        `;
      }
      resBox.classList.add('show');
      resBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // 7B. Asesmen 2: Gaya Belajar (Visual, Auditori, Kinestetik)
  const gayaQuestions = [
    {
      q: 'Saat mempelajari materi baru di kelas, saya paling cepat paham melalui...',
      opts: [
        { k: 'V', text: 'Gambar, diagram, peta konsep, atau tayangan video visual' },
        { k: 'A', text: 'Penjelasan suara guru secara langsung atau diskusi tanya-jawab' },
        { k: 'K', text: 'Praktik langsung, percobaan, atau memperagakan materi' }
      ]
    },
    {
      q: 'Untuk mengingat materi pelajaran menjelang ujian, saya biasanya...',
      opts: [
        { k: 'V', text: 'Mencatat rapi dengan stabilo warna-warni atau membuat mind map' },
        { k: 'A', text: 'Membaca materi dengan suara terdengar atau menjelaskan ulang ke teman' },
        { k: 'K', text: 'Menulis rangkuman berulang kali atau belajar sambil bergerak ringan' }
      ]
    },
    {
      q: 'Saat belajar di kelas, konsentrasi saya paling mudah terganggu oleh...',
      opts: [
        { k: 'V', text: 'Meja belajar atau tulisan papan tulis yang berantakan' },
        { k: 'A', text: 'Suara gaduh atau obrolan berisik di sekitar kelas' },
        { k: 'K', text: 'Keharusan duduk diam terlalu lama tanpa aktivitas praktik' }
      ]
    },
    {
      q: 'Saat menerima petunjuk mengerjakan tugas, saya lebih menyukai...',
      opts: [
        { k: 'V', text: 'Petunjuk tertulis lengkap atau contoh gambar langkah-langkahnya' },
        { k: 'A', text: 'Penjelasan lisan secara langsung dari guru atau teman' },
        { k: 'K', text: 'Langsung mencoba mengerjakan sambil melihat contohnya' }
      ]
    },
    {
      q: 'Ketika mengisi waktu luang di rumah atau sekolah, saya lebih suka...',
      opts: [
        { k: 'V', text: 'Membaca buku/komik, menggambar, atau menonton video edukatif' },
        { k: 'A', text: 'Mendengarkan musik, podcast, atau mengobrol bersama teman' },
        { k: 'K', text: 'Berolahraga, membuat kerajinan, atau melakukan aktivitas fisik' }
      ]
    },
    {
      q: 'Dalam keseharian, hal yang paling mudah saya ingat dari seseorang adalah...',
      opts: [
        { k: 'V', text: 'Wajahnya dan tempat pertama kali kami bertemu' },
        { k: 'A', text: 'Nama panggilan, suara, dan topik yang pernah kami bicarakan' },
        { k: 'K', text: 'Kegiatan atau pengalaman yang pernah kami lakukan bersama' }
      ]
    }
  ];

  const gayaQuestionsEl = $('#gayaQuestions');
  if (gayaQuestionsEl) {
    gayaQuestionsEl.innerHTML = gayaQuestions
      .map(
        (item, idx) => `
      <div class="question-item">
        <p class="question-item__title">${idx + 1}. ${item.q}</p>
        <div style="display:grid;gap:8px;">
          ${item.opts
            .map(
              (o, j) => `
            <label class="option-pill" style="display:block;">
              <input type="radio" name="gaya_${idx}" value="${o.k}" ${j === 0 ? 'required' : ''}>
              <span style="width:100%;justify-content:flex-start;border-radius:10px;"><strong>${o.k}.</strong> ${o.text}</span>
            </label>
          `
            )
            .join('')}
        </div>
      </div>
    `
      )
      .join('');
  }

  const gayaTips = {
    V: {
      name: 'Visual (Penglihatan)',
      tip: 'Gunakan catatan berwarna (stabilo), buat peta konsep (mind map), duduk di barisan depan agar jelas melihat papan tulis, dan manfaatkan ilustrasi/video saat belajar.'
    },
    A: {
      name: 'Auditori (Pendengaran)',
      tip: 'Simak penjelasan guru dengan saksama, rekam atau baca ringkasan materi dengan suara pelan, serta aktiflah berdiskusi atau belajar kelompok bersama teman.'
    },
    K: {
      name: 'Kinestetik (Gerak & Praktik)',
      tip: 'Libatkan aktivitas fisik seperti membuat model/alat peraga, lakukan peregangan singkat setiap 25–30 menit belajar (teknik Pomodoro), dan perbanyak latihan soal.'
    }
  };

  const formGaya = $('#formGaya');
  if (formGaya) {
    formGaya.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama = ($('[name="nama"]', formGaya)?.value || 'Siswa').trim();
      const kelas = ($('[name="kelas"]', formGaya)?.value || '-').trim();
      const counts = { V: 0, A: 0, K: 0 };

      gayaQuestions.forEach((_, idx) => {
        const val = $(`input[name="gaya_${idx}"]:checked`, formGaya)?.value;
        if (val && counts[val] !== undefined) counts[val]++;
      });

      const total = gayaQuestions.length;
      const maxVal = Math.max(counts.V, counts.A, counts.K);
      const dominants = Object.keys(counts).filter((k) => counts[k] === maxVal);

      const resBox = $('#resGaya');
      if (!resBox) return;

      resBox.innerHTML = `
        <h4 style="font-size:1.18rem;color:var(--navy-900);margin-bottom:6px;">Profil Gaya Belajar: ${escapeHtml(nama)} (${escapeHtml(kelas)})</h4>
        <p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:12px;">
          Gaya belajar dominanmu adalah: <strong>${dominants.map((k) => gayaTips[k].name).join(' & ')}</strong>
          ${dominants.length > 1 ? '(Kombinasi seimbang)' : ''}.
        </p>
        <div class="bar-chart">
          ${['V', 'A', 'K']
            .map((k) => {
              const pct = Math.round((counts[k] / total) * 100);
              return `
              <div class="bar-row">
                <span>${gayaTips[k].name.split(' ')[0]}</span>
                <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
                <span>${pct}%</span>
              </div>
            `;
            })
            .join('')}
        </div>
        <div style="background:var(--bg-surface);padding:14px 16px;border-radius:12px;border:1px solid var(--border-light);margin-top:12px;">
          <strong style="color:var(--navy-800);display:block;margin-bottom:4px;font-size:0.86rem;">Strategi Belajar yang Disarankan untukmu:</strong>
          <p style="font-size:0.86rem;color:var(--text-secondary);margin:0;">${dominants.map((k) => gayaTips[k].tip).join(' ')}</p>
        </div>
      `;
      resBox.classList.add('show');
      resBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // 7C. Asesmen 3: Cek Mood & Perasaan Hari Ini
  const formMood = $('#formMood');
  if (formMood) {
    formMood.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama = ($('[name="nama"]', formMood)?.value || 'Sahabat').trim();
      const kelas = ($('[name="kelas"]', formMood)?.value || '-').trim();
      const feelings = $$('input[name="mood_feel"]:checked', formMood).map((x) => x.value);
      const energy = $('input[name="mood_energy"]:checked', formMood)?.value || '3';
      const sleep = $('input[name="mood_sleep"]:checked', formMood)?.value || 'Cukup';
      const factor = $('input[name="mood_factor"]:checked', formMood)?.value || 'Kegiatan sehari-hari';
      const talk = $('input[name="mood_talk"]:checked', formMood)?.value || 'Mungkin nanti';
      const note = ($('#moodSentence')?.value || '').trim();

      const resBox = $('#resMood');
      if (!resBox) return;

      const wantCounseling = talk.startsWith('Ya');
      const feelText = feelings.length ? feelings.join(', ') : 'Beragam perasaan';

      resBox.innerHTML = `
        <h4 style="font-size:1.18rem;color:var(--navy-900);margin-bottom:6px;">Terima kasih sudah berbagi jujur hari ini, ${escapeHtml(nama)} (${escapeHtml(kelas)})</h4>
        <p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:10px;">
          Hari ini kamu merasakan: <strong>${escapeHtml(feelText)}</strong> dengan tingkat semangat <strong>${escapeHtml(energy)}/5</strong> (Kualitas istirahat: ${escapeHtml(sleep)}, dipengaruhi oleh: ${escapeHtml(factor)}).
        </p>
        ${
          note
            ? `<div style="font-style:italic;background:var(--bg-surface);padding:10px 14px;border-left:4px solid var(--amber-400);border-radius:8px;margin-bottom:10px;font-size:0.88rem;">“${escapeHtml(note)}”</div>`
            : ''
        }
        <div style="background:var(--bg-surface);padding:14px 16px;border-radius:12px;border:1px solid var(--border-light);">
          <strong style="color:var(--navy-800);display:block;margin-bottom:4px;font-size:0.86rem;">Pesan dari Sahabat BK SMPN 1 Pakisaji:</strong>
          <p style="font-size:0.86rem;color:var(--text-secondary);margin:0;">
            ${
              wantCounseling
                ? 'Kamu memilih ingin bercerita dengan Guru BK hari ini. Pintu Ruang BK SMPN 1 Pakisaji sangat terbuka untukmu pada jam istirahat atau jam layanan—kami siap mendengarkan ceritamu dengan hangat dan rahasia terjaga.'
                : 'Semua emosi yang kamu rasakan hari ini adalah hal yang wajar. Jangan lupa tarik napas perlahan, istirahat yang cukup, dan ingat bahwa Ruang BK selalu terbuka kapan pun kamu butuh teman bercerita.'
            }
          </p>
        </div>
      `;
      resBox.classList.add('show');
      resBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* --------------------------------------------------------------------------
     8. MINI INTERACTIVE GAME: LITERASI FINANSIAL (BUTUH VS CUMA INGIN)
     -------------------------------------------------------------------------- */
  const finItems = [
    { name: 'Makan Bergizi & Air Minum', type: 'butuh', reason: 'Kebutuhan pokok agar tubuh sehat dan fokus saat belajar di sekolah.' },
    { name: 'Top-Up Skin Game Online', type: 'ingin', reason: 'Bersifat hiburan tambahan dan bisa ditunda tanpa mengganggu sekolah.' },
    { name: 'Buku Tulis & Alat Sekolah', type: 'butuh', reason: 'Kebutuhan utama untuk menunjang kegiatan belajar sehari-hari.' },
    { name: 'Ganti Sepatu Baru Karena Tren', type: 'ingin', reason: 'Selama sepatu lama masih layak pakai, membeli karena tren adalah keinginan.' }
  ];

  const finContainer = $('#finQuizContainer');
  const finFeedback = $('#finQuizFeedback');

  if (finContainer && finFeedback) {
    finContainer.innerHTML = finItems
      .map(
        (item, i) => `
      <div class="fin-item-row">
        <span style="font-weight:700;font-size:0.88rem;">${item.name}</span>
        <div style="display:flex;gap:6px;">
          <button type="button" class="filter-pill" style="padding:5px 12px;font-size:0.76rem;" data-fidx="${i}" data-fchoice="butuh">Kebutuhan</button>
          <button type="button" class="filter-pill" style="padding:5px 12px;font-size:0.76rem;" data-fidx="${i}" data-fchoice="ingin">Cuma Ingin</button>
        </div>
      </div>
    `
      )
      .join('');

    $$('[data-fchoice]', finContainer).forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.fidx, 10);
        const choice = btn.dataset.fchoice;
        const item = finItems[idx];
        const parent = btn.parentElement;
        $$('button', parent).forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const isCorrect = choice === item.type;
        finFeedback.style.display = 'block';
        finFeedback.style.borderColor = isCorrect ? 'var(--emerald-500)' : 'var(--amber-500)';
        finFeedback.innerHTML = isCorrect
          ? `<strong style="color:var(--emerald-600);">✓ Tepat sekali!</strong> <b>${item.name}</b> termasuk <b>${item.type === 'butuh' ? 'Kebutuhan' : 'Keinginan'}</b>. ${item.reason}`
          : `<strong style="color:var(--rose-600);">Kurang tepat.</strong> <b>${item.name}</b> sebenarnya termasuk <b>${item.type === 'butuh' ? 'Kebutuhan' : 'Cuma Keinginan'}</b>. ${item.reason}`;
      });
    });
  }

  /* --------------------------------------------------------------------------
     9. GALERI DOKUMENTASI FILTER & LIGHTBOX MODAL
     -------------------------------------------------------------------------- */
  const galFilterBtns = $$('[data-gfilter]');
  const galItems = $$('.gallery-item');

  galFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      galFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.gfilter;
      galItems.forEach((item) => {
        const show = cat === 'all' || item.dataset.gcat === cat;
        item.style.display = show ? 'block' : 'none';
      });
    });
  });

  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImg');
  const lightboxTitle = $('#lightboxTitle');
  const lightboxDesc = $('#lightboxDesc');
  const lightboxClose = $('#lightboxClose');

  galItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = $('img', item);
      const title = $('.gallery-item__title', item)?.textContent || '';
      const desc = $('.gallery-item__desc', item)?.textContent || '';
      if (lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = title;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxDesc) lightboxDesc.textContent = desc;
        lightbox.classList.add('open');
      }
    });
  });

  $$('.poster-card').forEach((card) => {
    card.addEventListener('click', () => {
      const src = card.dataset.posterSrc;
      const title = card.dataset.posterTitle || '';
      const desc = card.dataset.posterDesc || '';
      if (src && lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightboxImg.alt = title;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxDesc) lightboxDesc.textContent = desc;
        lightbox.classList.add('open');
      }
    });
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  /* --------------------------------------------------------------------------
     10. KOTAK SAHABAT BK (RESERVASI JADWAL KONSELING & TIKET)
     -------------------------------------------------------------------------- */
  const bookingForm = $('#bookingForm');
  const bookingResult = $('#bookingResult');

  if (bookingForm && bookingResult) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama = ($('#bkNama')?.value || '').trim();
      const kelas = ($('#bkKelas')?.value || '').trim();
      const bidang = $('#bkBidang')?.value || 'Bimbingan Pribadi';
      const metode = $('#bkMetode')?.value || 'Tatap Muka di Ruang BK';
      const waktu = $('#bkWaktu')?.value || 'Jam Istirahat';
      const pesan = ($('#bkPesan')?.value || '').trim();
      const ticketCode = 'BK-PKJ-' + Math.floor(1000 + Math.random() * 9000);

      bookingResult.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px dashed var(--border-medium);padding-bottom:10px;margin-bottom:10px;">
          <strong style="color:var(--navy-900);font-size:1rem;">Tiket Permohonan Konseling Terbuat</strong>
          <span style="background:var(--amber-400);color:var(--navy-950);font-weight:800;font-size:0.75rem;padding:4px 10px;border-radius:99px;">${ticketCode}</span>
        </div>
        <p style="font-size:0.86rem;color:var(--text-secondary);margin-bottom:8px;">
          <strong>Nama / Kelas:</strong> ${escapeHtml(nama)} (${escapeHtml(kelas)})<br>
          <strong>Topik Layanan:</strong> ${escapeHtml(bidang)}<br>
          <strong>Cara &amp; Waktu:</strong> ${escapeHtml(metode)} • ${escapeHtml(waktu)}
        </p>
        ${pesan ? `<p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:10px;"><strong>Catatan Awal:</strong> “${escapeHtml(pesan)}”</p>` : ''}
        <p style="font-size:0.82rem;color:var(--emerald-600);font-weight:700;margin:0;">
          ✓ Silakan tunjukkan ringkasan tiket ini saat datang ke Ruang BK SMP Negeri 1 Pakisaji. Rahasia ceritamu dijamin aman!
        </p>
      `;
      bookingResult.classList.add('show');
    });
  }

  /* --------------------------------------------------------------------------
     11. ALAT AKSESIBILITAS (SMPN 12 SURABAYA REFERENCE WIDGET)
     -------------------------------------------------------------------------- */
  const a11yFab = $('#a11yFab');
  const a11yDrawer = $('#a11yDrawer');
  const a11yClose = $('#a11yClose');
  const fontDecBtn = $('#fontDecBtn');
  const fontResetBtn = $('#fontResetBtn');
  const fontIncBtn = $('#fontIncBtn');
  const fontScaleLabel = $('#fontScaleLabel');
  const toggleGrayBtn = $('#toggleGrayBtn');
  const toggleContrastBtn = $('#toggleContrastBtn');
  const toggleUnderlineBtn = $('#toggleUnderlineBtn');
  const toggleSpeechBtn = $('#toggleSpeechBtn');

  let fontScale = 1;
  let isReading = false;

  if (a11yFab && a11yDrawer) {
    a11yFab.addEventListener('click', () => {
      a11yDrawer.classList.toggle('open');
    });
  }
  if (a11yClose && a11yDrawer) {
    a11yClose.addEventListener('click', () => a11yDrawer.classList.remove('open'));
  }

  function applyFontScale(newScale) {
    fontScale = Math.min(1.25, Math.max(0.85, Number(newScale.toFixed(2))));
    document.documentElement.style.setProperty('--base-font-scale', String(fontScale));
    if (fontScaleLabel) fontScaleLabel.textContent = `${Math.round(fontScale * 100)}%`;
  }

  if (fontDecBtn) fontDecBtn.addEventListener('click', () => applyFontScale(fontScale - 0.08));
  if (fontResetBtn) fontResetBtn.addEventListener('click', () => applyFontScale(1));
  if (fontIncBtn) fontIncBtn.addEventListener('click', () => applyFontScale(fontScale + 0.08));

  if (toggleGrayBtn) {
    toggleGrayBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-grayscale') === 'true';
      document.documentElement.setAttribute('data-grayscale', String(!current));
      toggleGrayBtn.classList.toggle('active', !current);
      toggleGrayBtn.textContent = !current ? 'Aktif' : 'Nonaktif';
    });
  }

  if (toggleContrastBtn) {
    toggleContrastBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-contrast') === 'high';
      document.documentElement.setAttribute('data-contrast', !current ? 'high' : 'normal');
      toggleContrastBtn.classList.toggle('active', !current);
      toggleContrastBtn.textContent = !current ? 'Aktif' : 'Nonaktif';
    });
  }

  if (toggleUnderlineBtn) {
    toggleUnderlineBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-underline') === 'true';
      document.documentElement.setAttribute('data-underline', String(!current));
      toggleUnderlineBtn.classList.toggle('active', !current);
      toggleUnderlineBtn.textContent = !current ? 'Aktif' : 'Nonaktif';
    });
  }

  if (toggleSpeechBtn) {
    toggleSpeechBtn.addEventListener('click', () => {
      if (!('speechSynthesis' in window)) {
        alert('Browser Anda belum mendukung fitur pembaca suara otomatis.');
        return;
      }
      if (isReading) {
        window.speechSynthesis.cancel();
        isReading = false;
        toggleSpeechBtn.classList.remove('active');
        toggleSpeechBtn.textContent = 'Mulai Baca';
      } else {
        const selectedText = window.getSelection().toString().trim();
        const textToRead =
          selectedText ||
          'Selamat datang di Sahabat Bimbingan dan Konseling SMP Negeri 1 Pakisaji Kabupaten Malang. Ruang aman dan nyaman bagi seluruh siswa untuk mengenal diri, bertumbuh, dan merencanakan masa depan.';
        const utter = new SpeechSynthesisUtterance(textToRead);
        utter.lang = 'id-ID';
        utter.onend = () => {
          isReading = false;
          toggleSpeechBtn.classList.remove('active');
          toggleSpeechBtn.textContent = 'Mulai Baca';
        };
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
        isReading = true;
        toggleSpeechBtn.classList.add('active');
        toggleSpeechBtn.textContent = 'Berhenti';
      }
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
  }
})();
