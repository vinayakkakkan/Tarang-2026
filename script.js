/* ==============================================
   TARANG 2026 — GPC Kannur
   The Spectrum of Technology and Culture
   ============================================== */

// ============ DATA ============

const departmentsData = [
    { name: "Civil Engineering", icon: "🏗️", events: "5+ Events", color: "#f27b1a" },
    { name: "Electrical & Electronics", icon: "⚡", events: "5+ Events", color: "#f5c91a" },
    { name: "Electronics Engineering", icon: "📡", events: "5+ Events", color: "#e64525" },
    { name: "Mechanical Engineering", icon: "⚙️", events: "5+ Events", color: "#e6236c" },
    { name: "Textile Technology", icon: "🧵", events: "5+ Events", color: "#d4a017" },
    { name: "Wood & Paper Technology", icon: "🪵", events: "5+ Events", color: "#f27b1a" }
];

const eventsData = [
    // Technical Events
    {
        title: "Project Expo",
        desc: "Showcase innovative projects from all departments. Present your best engineering solutions to a panel of experts.",
        category: "tech",
        badge: "Technical",
        badgeClass: "badge-tech",
        date: "March 12",
        team: "2–4 members"
    },
    {
        title: "Quiz Competition",
        desc: "Test your knowledge across technology, science, and general engineering in this multi-round quiz battle.",
        category: "tech",
        badge: "Technical",
        badgeClass: "badge-tech",
        date: "March 12",
        team: "2–3 members"
    },
    {
        title: "Circuit Debugging",
        desc: "Find and fix faults in complex circuits within a time limit. Speed and precision are key!",
        category: "tech",
        badge: "Technical",
        badgeClass: "badge-tech",
        date: "March 12",
        team: "Individual"
    },
    {
        title: "CAD Modelling",
        desc: "Design precision 3D models using CAD software. Creativity meets engineering accuracy.",
        category: "tech",
        badge: "Technical",
        badgeClass: "badge-tech",
        date: "March 12",
        team: "Individual"
    },
    {
        title: "Seminar Presentation",
        desc: "Present your research papers on emerging technologies and innovative engineering solutions.",
        category: "tech",
        badge: "Technical",
        badgeClass: "badge-tech",
        date: "March 13",
        team: "1–2 members"
    },
    {
        title: "Bridge Building",
        desc: "Design and construct model bridges to withstand maximum load. Test your structural engineering skills.",
        category: "tech",
        badge: "Technical",
        badgeClass: "badge-tech",
        date: "March 13",
        team: "2–3 members"
    },
    {
        title: "Line Follower Robot",
        desc: "Build autonomous robots that can follow a path with speed and precision.",
        category: "tech",
        badge: "Technical",
        badgeClass: "badge-tech",
        date: "March 13",
        team: "2–4 members"
    },
    {
        title: "Treasure Hunt",
        desc: "A thrilling campus-wide hunt combining tech puzzles, riddles, and physical challenges.",
        category: "flagship",
        badge: "Flagship",
        badgeClass: "badge-flagship",
        date: "March 12",
        team: "3–4 members"
    },
    // Cultural Events
    {
        title: "Nrityanjali — Group Dance",
        desc: "Showcase your dance moves in this group dance competition spanning classical, folk, and contemporary styles.",
        category: "cultural",
        badge: "Cultural",
        badgeClass: "badge-cultural",
        date: "March 13",
        team: "6–12 members"
    },
    {
        title: "Solo Singing",
        desc: "Let your voice shine! Perform any song of your choice and capture the hearts of the audience.",
        category: "cultural",
        badge: "Cultural",
        badgeClass: "badge-cultural",
        date: "March 12",
        team: "Individual"
    },
    {
        title: "Mime & Skit",
        desc: "Tell compelling stories through mime or short skits. Creativity and expression take center stage.",
        category: "cultural",
        badge: "Cultural",
        badgeClass: "badge-cultural",
        date: "March 13",
        team: "5–10 members"
    },
    {
        title: "Photography Contest",
        desc: "Capture the spirit of Tarang through your lens. Best shots across categories win prizes.",
        category: "cultural",
        badge: "Cultural",
        badgeClass: "badge-cultural",
        date: "Both Days",
        team: "Individual"
    },
    {
        title: "Fashion Show",
        desc: "Walk the ramp with confidence and style. Showcase creativity in costume design and performance.",
        category: "flagship",
        badge: "Flagship",
        badgeClass: "badge-flagship",
        date: "March 13",
        team: "8–12 members"
    },
    {
        title: "Art & Poster Making",
        desc: "Express your artistic vision on canvas. Themes will be revealed on the spot.",
        category: "cultural",
        badge: "Cultural",
        badgeClass: "badge-cultural",
        date: "March 12",
        team: "Individual"
    }
];

const scheduleData = [
    {
        day: "Day 1 — March 12",
        events: [
            { time: "9:00 AM", name: "Opening Ceremony", desc: "Grand inauguration by chief guest" },
            { time: "10:00 AM", name: "Technical Events Begin", desc: "Project Expo, Quiz, Circuit Debugging, CAD" },
            { time: "10:30 AM", name: "Art & Poster Making", desc: "Spot theme art competition" },
            { time: "11:00 AM", name: "Treasure Hunt", desc: "Campus-wide puzzle adventure" },
            { time: "12:00 PM", name: "Solo Singing Prelims", desc: "Singing auditions and selection" },
            { time: "2:00 PM", name: "Department Tech Events", desc: "Department-wise technical competitions" },
            { time: "4:00 PM", name: "Photography Walk", desc: "Campus photo challenge begins" },
            { time: "5:00 PM", name: "Cultural Evening", desc: "Open stage performances and jamming" }
        ]
    },
    {
        day: "Day 2 — March 13",
        events: [
            { time: "9:30 AM", name: "Paper Presentations", desc: "Research paper competition" },
            { time: "10:00 AM", name: "Bridge Building & Robotics", desc: "Bridge Building, Line Follower Robot" },
            { time: "11:00 AM", name: "Mime & Skit", desc: "Drama and mime performances" },
            { time: "1:00 PM", name: "Solo Singing Finals", desc: "Final round of singing competition" },
            { time: "2:30 PM", name: "Group Dance — Nrityanjali", desc: "Grand inter-department dance battle" },
            { time: "4:00 PM", name: "Fashion Show", desc: "The grand ramp walk showcase" },
            { time: "5:30 PM", name: "Awards & Prize Distribution", desc: "Valedictory function with prizes" },
            { time: "6:30 PM", name: "Closing Ceremony", desc: "Grand finale and vote of thanks" }
        ]
    }
];

const teamData = [
    { name: "Fest Coordinator", role: "Overall Coordination", initials: "FC" },
    { name: "Tech Head", role: "Technical Events", initials: "TH" },
    { name: "Cultural Head", role: "Cultural Events", initials: "CH" },
    { name: "Design Lead", role: "Creative & Design", initials: "DL" },
    { name: "Sponsorship Head", role: "Sponsorship & PR", initials: "SH" },
    { name: "Logistics Head", role: "Logistics & Planning", initials: "LH" },
    { name: "Media Head", role: "Photography & Media", initials: "MH" },
    { name: "Web Team Lead", role: "Website & Digital", initials: "WT" }
];

const faqData = [
    {
        question: "Who can participate in Tarang 2026?",
        answer: "Tarang is primarily for students of Government Polytechnic College Kannur, but inter-college participants may be allowed for select events. A valid college ID is required."
    },
    {
        question: "When and where is Tarang 2026?",
        answer: "Tarang 2026 will be held on March 12 & 13, 2026 at the Government Polytechnic College Kannur campus."
    },
    {
        question: "Is there a registration fee?",
        answer: "Registration details will be announced soon. Some events may have a nominal fee. Keep an eye on our social media for updates."
    },
    {
        question: "Can I participate in multiple events?",
        answer: "Yes! You can participate in as many events as you want, as long as they don't overlap in schedule."
    },
    {
        question: "Which departments host technical events?",
        answer: "All six departments — Civil, Electrical & Electronics, Electronics, Mechanical, Textile Technology, and Wood & Paper Technology — host their own technical events."
    },
    {
        question: "How are the events organized?",
        answer: "Day 1 focuses on technical events, quizzes, art, and prelims. Day 2 features finals, cultural performances, fashion show, and the grand closing ceremony."
    }
];


// ============ INITIALIZATION ============

document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash-screen');

    createEmbers();

    splash.addEventListener('click', () => {
        splash.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    setTimeout(() => {
        splash.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 4000);

    document.body.style.overflow = 'hidden';

    initParticles();
    initNavbar();
    initCountdown();
    renderDepartments();
    renderEvents('all');
    renderSchedule(0);
    renderTeam();
    renderFAQ();
    initScrollReveal();
    initBackToTop();
    initEventTabs();
    initScheduleTabs();
});


// ============ EMBERS (Splash) ============

function createEmbers() {
    const container = document.getElementById('splash-embers');
    const colors = ['#f27b1a', '#f5c91a', '#e64525', '#e6236c'];

    for (let i = 0; i < 20; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember';
        ember.style.left = Math.random() * 100 + '%';
        ember.style.bottom = Math.random() * 30 + '%';
        ember.style.background = colors[Math.floor(Math.random() * colors.length)];
        ember.style.animationDelay = Math.random() * 3 + 's';
        ember.style.animationDuration = (2 + Math.random() * 2) + 's';
        container.appendChild(ember);
    }
}


// ============ PARTICLE SYSTEM ============

function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const count = 50;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.8 + 0.4;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.35 + 0.08;
            const colors = ['242, 123, 26', '245, 201, 26', '230, 69, 37', '230, 35, 108'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < count; i++) particles.push(new Particle());

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(242, 123, 26, ${0.04 * (1 - dist / 140)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();
}


// ============ NAVBAR ============

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : 'auto';
    });
}

function closeMobileMenu() {
    document.getElementById('hamburger').classList.remove('active');
    document.getElementById('mobile-menu').classList.remove('open');
    document.body.style.overflow = 'auto';
}


// ============ COUNTDOWN ============

function initCountdown() {
    const target = new Date('2026-03-12T09:00:00+05:30').getTime();

    function update() {
        const diff = target - Date.now();
        if (diff <= 0) {
            ['cd-days', 'cd-hours', 'cd-minutes', 'cd-seconds'].forEach(id =>
                document.getElementById(id).textContent = '00');
            return;
        }
        document.getElementById('cd-days').textContent = String(Math.floor(diff / 864e5)).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(Math.floor((diff % 864e5) / 36e5)).padStart(2, '0');
        document.getElementById('cd-minutes').textContent = String(Math.floor((diff % 36e5) / 6e4)).padStart(2, '0');
        document.getElementById('cd-seconds').textContent = String(Math.floor((diff % 6e4) / 1e3)).padStart(2, '0');
    }
    update();
    setInterval(update, 1000);
}


// ============ DEPARTMENTS ============

function renderDepartments() {
    const grid = document.getElementById('depts-grid');
    const pdfFiles = {
        'Civil Engineering': 'TARANG-GPC KANNUR-CIVIL ENGINEERING.pdf',
        'Electrical & Electronics': 'TARANG-GPC KANNUR-ELECTRICAL AND ELECTRONICS ENGINEERING.pdf',
        'Electronics Engineering': 'TARANG-GPC KANNUR-ELECTRONICS ENGG.pdf',
        'Mechanical Engineering': 'TARANG-GPC KANNUR-MECHANICAL ENGINEERING.pdf',
        'Textile Technology': 'TARANG-GPC KANNUR-TEXTILE TECHNOLOGY.pdf',
        'Wood & Paper Technology': 'TARANG-GPC KANNUR-WOOD AND PAPER TECHNOLOGY.pdf'
    };

    grid.innerHTML = departmentsData.map((dept, i) => `
    <a href="Resources/Technical events/${pdfFiles[dept.name] || '#'}" target="_blank" class="dept-card reveal" style="transition-delay: ${i * 0.08}s; text-decoration:none;">
      <div class="dept-icon">${dept.icon}</div>
      <div class="dept-name">${dept.name}</div>
      <div class="dept-events-count">${dept.events}</div>
      <div class="dept-card-link">
        View Events
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </div>
    </a>
  `).join('');
}


// ============ EVENT TABS ============

function initEventTabs() {
    document.getElementById('events-tabs').addEventListener('click', (e) => {
        if (e.target.classList.contains('event-tab')) {
            document.querySelectorAll('.event-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            renderEvents(e.target.dataset.category);
        }
    });
}


// ============ RENDER EVENTS ============

function renderEvents(category) {
    const grid = document.getElementById('events-grid');
    const filtered = category === 'all' ? eventsData : eventsData.filter(e => e.category === category);

    const bgMap = {
        tech: '#0a1628, #162647',
        cultural: '#28100a, #4a1a2d',
        flagship: '#2a1500, #4a2d0a',
        workshop: '#1a280a, #2d4a1a'
    };
    const iconMap = {
        tech: '⚙',
        cultural: '♪',
        flagship: '🔥',
        workshop: '📐'
    };

    grid.innerHTML = filtered.map((ev, i) => `
    <div class="event-card reveal" style="transition-delay: ${i * 0.07}s">
      <div class="event-card-image">
        <div style="width:100%;height:100%;background:linear-gradient(135deg, ${bgMap[ev.category]});display:flex;align-items:center;justify-content:center;">
          <span style="font-size:2.8rem;opacity:0.25;">${iconMap[ev.category]}</span>
        </div>
        <span class="event-card-badge ${ev.badgeClass}">${ev.badge}</span>
      </div>
      <div class="event-card-body">
        <h3 class="event-card-title">${ev.title}</h3>
        <p class="event-card-desc">${ev.desc}</p>
        <div class="event-card-meta">
          <div style="display:flex;gap:14px;">
            <div class="event-card-detail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              ${ev.date}
            </div>
            <div class="event-card-detail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              ${ev.team}
            </div>
          </div>
          <div class="event-card-arrow">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </div>
      </div>
    </div>
  `).join('');

    setTimeout(() => {
        document.querySelectorAll('.event-card.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) {
                el.classList.add('visible');
            }
        });
    }, 50);
}


// ============ SCHEDULE TABS ============

function initScheduleTabs() {
    document.getElementById('schedule-days-nav').addEventListener('click', (e) => {
        if (e.target.classList.contains('schedule-day-btn')) {
            document.querySelectorAll('.schedule-day-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderSchedule(parseInt(e.target.dataset.day));
        }
    });
}


// ============ RENDER SCHEDULE ============

function renderSchedule(dayIndex) {
    const timeline = document.getElementById('timeline');
    const day = scheduleData[dayIndex];

    timeline.innerHTML = day.events.map((ev, i) => `
    <div class="timeline-item reveal" style="transition-delay: ${i * 0.07}s">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-time">${ev.time}</div>
        <div class="timeline-event-name">${ev.name}</div>
        <div class="timeline-event-desc">${ev.desc}</div>
      </div>
    </div>
  `).join('');

    setTimeout(() => {
        document.querySelectorAll('.timeline-item.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) {
                el.classList.add('visible');
            }
        });
    }, 50);
}


// ============ RENDER TEAM ============

function renderTeam() {
    const grid = document.getElementById('team-grid');
    grid.innerHTML = teamData.map((m, i) => `
    <div class="team-card reveal" style="transition-delay: ${i * 0.07}s">
      <div class="team-avatar">${m.initials}</div>
      <div class="team-name">${m.name}</div>
      <div class="team-role">${m.role}</div>
    </div>
  `).join('');
}


// ============ RENDER FAQ ============

function renderFAQ() {
    const list = document.getElementById('faq-list');
    list.innerHTML = faqData.map((faq, i) => `
    <div class="faq-item reveal" style="transition-delay: ${i * 0.07}s">
      <button class="faq-question" onclick="toggleFAQ(this)">
        ${faq.question}
        <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
      <div class="faq-answer">
        <div class="faq-answer-content">${faq.answer}</div>
      </div>
    </div>
  `).join('');
}

function toggleFAQ(button) {
    const item = button.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
}


// ============ SCROLL REVEAL ============

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

    setInterval(() => {
        document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)')
            .forEach(el => observer.observe(el));
    }, 800);
}


// ============ BACK TO TOP ============

function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 500));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}


// ============ SMOOTH SCROLL ============

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
        }
    });
});
