'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HomePage({ initialData }) {
    const [data, setData] = useState(initialData);
    const [activeTab, setActiveTab] = useState('all');
    const [activeDay, setActiveDay] = useState(0);
    const [splashVisible, setSplashVisible] = useState(true);
    const canvasRef = useRef(null);

    // ====== SPLASH ======
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const timer = setTimeout(() => {
            setSplashVisible(false);
            document.body.style.overflow = 'auto';
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    const dismissSplash = () => {
        setSplashVisible(false);
        document.body.style.overflow = 'auto';
    };

    // ====== PARTICLES ======
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animId;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.8 + 0.4;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.35 + 0.08;
                const colors = ['242,123,26', '245,201,26', '230,69,37', '230,35,108'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }
            update() {
                this.x += this.speedX; this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 50; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            // connect
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 140) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(242,123,26,${0.04 * (1 - d / 140)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(animate);
        }
        animate();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, []);

    // ====== SCROLL REVEAL ======
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        const observe = () => {
            document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => observer.observe(el));
        };
        observe();
        const interval = setInterval(observe, 800);
        return () => { observer.disconnect(); clearInterval(interval); };
    }, [activeTab, activeDay]);

    // ====== NAVBAR ======
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    // ====== COUNTDOWN ======
    const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
    useEffect(() => {
        const target = new Date(data.siteConfig.countdownTarget).getTime();
        const update = () => {
            const diff = target - Date.now();
            if (diff <= 0) return;
            setCountdown({
                days: String(Math.floor(diff / 864e5)).padStart(2, '0'),
                hours: String(Math.floor((diff % 864e5) / 36e5)).padStart(2, '0'),
                minutes: String(Math.floor((diff % 36e5) / 6e4)).padStart(2, '0'),
                seconds: String(Math.floor((diff % 6e4) / 1e3)).padStart(2, '0'),
            });
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, [data.siteConfig.countdownTarget]);

    // ====== BACK TO TOP ======
    const [showTop, setShowTop] = useState(false);
    useEffect(() => {
        const h = () => setShowTop(window.scrollY > 500);
        window.addEventListener('scroll', h);
        return () => window.removeEventListener('scroll', h);
    }, []);

    // ====== FAQ TOGGLE ======
    const [openFaq, setOpenFaq] = useState(null);

    // ====== FILTERED EVENTS ======
    const filteredEvents = activeTab === 'all' ? data.events : data.events.filter(e => e.category === activeTab);

    const closeMobileMenu = () => {
        setMenuOpen(false);
        document.body.style.overflow = 'auto';
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.style.overflow = menuOpen ? 'auto' : 'hidden';
    };

    const badgeClass = (cat) => ({
        tech: 'badge-tech', cultural: 'badge-cultural', flagship: 'badge-flagship', workshop: 'badge-workshop'
    }[cat] || 'badge-tech');

    const bgGradient = (cat) => ({
        tech: '#0a1628, #162647',
        cultural: '#28100a, #4a1a2d',
        flagship: '#2a1500, #4a2d0a',
    }[cat] || '#0a1628, #162647');

    const catIcon = (cat) => ({
        tech: '⚙', cultural: '♪', flagship: '🔥',
    }[cat] || '⚙');

    const pdfMap = {};
    data.departments.forEach(d => { pdfMap[d.name] = d.pdf; });

    return (
        <>
            {/* SPLASH */}
            <div id="splash-screen" className={splashVisible ? '' : 'hidden'} onClick={dismissSplash}>
                <div className="splash-bg-pattern" />
                <div className="splash-content">
                    <img src="/assets/logo.png" alt="Tarang Logo" className="splash-logo" />
                    <div className="splash-date-text">{data.siteConfig.dates.toUpperCase()}</div>
                    <div className="splash-college">{data.siteConfig.college}</div>
                    <div className="splash-enter">— Click anywhere to enter —</div>
                </div>
            </div>

            {/* PARTICLE CANVAS */}
            <canvas id="particle-canvas" ref={canvasRef} />

            {/* NAVBAR */}
            <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
                <div className="nav-inner">
                    <a href="#" className="nav-logo">
                        <img src="/assets/logo.png" alt="Tarang" />
                        <span className="nav-logo-text">TARANG</span>
                    </a>
                    <div className="nav-links">
                        <a href="#about">About</a>
                        <a href="#departments">Departments</a>
                        <a href="#events">Events</a>
                        <a href="#schedule">Schedule</a>
                        <a href="#team">Team</a>
                        <a href="#faq">FAQ</a>
                        <a href="#register" className="nav-cta">Register</a>
                    </div>
                    <div className={`hamburger${menuOpen ? ' active' : ''}`} onClick={toggleMenu}>
                        <span /><span /><span />
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU */}
            <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
                <div className="mobile-menu-content">
                    <div className="mobile-menu-image">
                        <img src="/assets/logo.png" alt="Logo" />
                    </div>
                    <div className="mobile-menu-links">
                        {['about', 'departments', 'events', 'schedule', 'team', 'sponsors', 'register'].map(s => (
                            <a key={s} href={`#${s}`} onClick={closeMobileMenu}>{s.charAt(0).toUpperCase() + s.slice(1)}</a>
                        ))}
                    </div>
                </div>
            </div>

            {/* HERO */}
            <section className="hero" id="home">
                <div className="hero-bg"><img src="/assets/hero-bg.png" alt="Background" /></div>
                <div className="glow-orb glow-orb-orange" style={{ width: 350, height: 350, top: '10%', left: '-8%' }} />
                <div className="glow-orb glow-orb-pink" style={{ width: 250, height: 250, bottom: '15%', right: '-5%' }} />
                <div className="glow-orb glow-orb-gold" style={{ width: 300, height: 300, top: '50%', left: '60%' }} />
                <div className="hero-content">
                    <div className="hero-college">{data.siteConfig.college.replace('Kannur', '').trim()} <span>Kannur</span></div>
                    <img src="/assets/logo.png" alt="Tarang Logo" className="hero-logo-hero" />
                    <img src="/assets/tarang-name.png" alt="TARANG" className="hero-name-art" />
                    <div className="hero-year">2 0 2 6</div>
                    <div className="hero-date"><span>{data.siteConfig.dates}</span></div>
                    <div className="hero-buttons">
                        <a href="#register" className="btn-primary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M14 10l7-7M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /></svg>
                            Register Now
                        </a>
                        <a href="#events" className="btn-secondary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
                            Explore Events
                        </a>
                    </div>
                </div>
                <div className="scroll-indicator"><span>Scroll</span><div className="scroll-line" /></div>
            </section>

            {/* COUNTDOWN */}
            <section className="countdown-section" id="countdown">
                <div className="container">
                    <div className="countdown-wrapper">
                        {[['days', countdown.days], ['hours', countdown.hours], ['minutes', countdown.minutes], ['seconds', countdown.seconds]].map(([label, val], i) => (
                            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'inherit' }}>
                                {i > 0 && <span className="countdown-colon">:</span>}
                                <div className="countdown-item reveal">
                                    <div className="countdown-number">{val}</div>
                                    <div className="countdown-label">{label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section className="section" id="about">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-visual reveal-left">
                            <div className="about-image-container">
                                <img src="/assets/cultural-bg.png" alt="Tarang Festival" />
                                <div className="about-image-overlay" />
                            </div>
                            <div className="about-floating-card">
                                <div className="number">GPC</div>
                                <div className="label">Kannur</div>
                            </div>
                        </div>
                        <div className="about-text reveal-right">
                            <div className="section-label">— About Tarang —</div>
                            <h2 className="section-title">The Spectrum of <span className="highlight">Technology</span> and <span className="highlight">Culture</span></h2>
                            <p>Tarang is the annual tech and cultural extravaganza of {data.siteConfig.college} — a vibrant celebration where engineering brilliance meets artistic expression.</p>
                            <p>Across two electrifying days, students from all six departments showcase their innovations, compete in cutting-edge technical events, and light up the stage with cultural performances.</p>
                            <div className="about-stats">
                                <div className="stat-item"><div className="stat-number">{data.departments.length}</div><div className="stat-label">Departments</div></div>
                                <div className="stat-item"><div className="stat-number">{data.events.length}+</div><div className="stat-label">Events</div></div>
                                <div className="stat-item"><div className="stat-number">{data.schedule.length}</div><div className="stat-label">Days</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DEPARTMENTS */}
            <section className="section depts-section" id="departments">
                <div className="container">
                    <div className="section-header reveal">
                        <div className="section-label">— Departments —</div>
                        <h2 className="section-title">Six Departments, <span className="highlight">One Spirit</span></h2>
                        <p className="section-desc">Each department hosts its own set of technical events. Click to explore.</p>
                    </div>
                    <div className="depts-grid">
                        {data.departments.map((dept, i) => (
                            <Link key={dept.id} href={`/departments/${dept.id}`} className="dept-card reveal" style={{ transitionDelay: `${i * 0.08}s`, textDecoration: 'none' }}>
                                <div className="dept-icon">{dept.icon}</div>
                                <div className="dept-name">{dept.name}</div>
                                <div className="dept-events-count">{dept.departmentEvents?.length || '5+'} Events</div>
                                <div className="dept-card-link">View Events →</div>
                            </Link>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 40 }}>
                        <Link href="/departments" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            View All Departments
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* EVENTS */}
            <section className="section events-section" id="events">
                <div className="container">
                    <div className="section-header reveal">
                        <div className="section-label">— Events —</div>
                        <h2 className="section-title">Competitions & <span className="highlight">Showcases</span></h2>
                        <p className="section-desc">Technical battles, cultural showdowns, and everything in between.</p>
                    </div>
                    <div className="events-tabs reveal">
                        {['all', 'tech', 'cultural', 'flagship'].map(cat => (
                            <button key={cat} className={`event-tab${activeTab === cat ? ' active' : ''}`} onClick={() => setActiveTab(cat)}>
                                {cat === 'all' ? 'All Events' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="events-grid">
                        {filteredEvents.map((ev, i) => (
                            <div key={ev.id} className="event-card reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                                <div className="event-card-image">
                                    <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg,${bgGradient(ev.category)})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '2.8rem', opacity: 0.25 }}>{catIcon(ev.category)}</span>
                                    </div>
                                    <span className={`event-card-badge ${badgeClass(ev.category)}`}>{ev.badge}</span>
                                </div>
                                <div className="event-card-body">
                                    <h3 className="event-card-title">{ev.title}</h3>
                                    <p className="event-card-desc">{ev.desc}</p>
                                    <div className="event-card-meta">
                                        <div style={{ display: 'flex', gap: 14 }}>
                                            <div className="event-card-detail">📅 {ev.date}</div>
                                            <div className="event-card-detail">👥 {ev.team}</div>
                                        </div>
                                        <div className="event-card-arrow">→</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SCHEDULE */}
            <section className="section schedule-section" id="schedule">
                <div className="container">
                    <div className="section-header reveal">
                        <div className="section-label">— Schedule —</div>
                        <h2 className="section-title">Two Days of <span className="highlight">Brilliance</span></h2>
                        <p className="section-desc">Here&apos;s what&apos;s happening across both days of Tarang 2026.</p>
                    </div>
                    <div className="schedule-days-nav reveal">
                        {data.schedule.map((day, i) => (
                            <button key={i} className={`schedule-day-btn${activeDay === i ? ' active' : ''}`} onClick={() => setActiveDay(i)}>
                                {day.day}
                            </button>
                        ))}
                    </div>
                    <div className="timeline">
                        {data.schedule[activeDay]?.events.map((ev, i) => (
                            <div key={i} className="timeline-item reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                                <div className="timeline-dot" />
                                <div className="timeline-content">
                                    <div className="timeline-time">{ev.time}</div>
                                    <div className="timeline-event-name">{ev.name}</div>
                                    <div className="timeline-event-desc">{ev.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TEAM */}
            <section className="section" id="team">
                <div className="container">
                    <div className="section-header reveal">
                        <div className="section-label">— Our Team —</div>
                        <h2 className="section-title">The <span className="highlight">Force</span> Behind Tarang</h2>
                        <p className="section-desc">Meet the passionate team that brings this festival to life.</p>
                    </div>
                    <div className="team-grid">
                        {data.team.map((m, i) => (
                            <div key={m.id} className="team-card reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                                <div className="team-avatar">{m.initials}</div>
                                <div className="team-name">{m.name}</div>
                                <div className="team-role">{m.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SPONSORS */}
            <section className="section" id="sponsors">
                <div className="container">
                    <div className="section-header reveal">
                        <div className="section-label">— Sponsors —</div>
                        <h2 className="section-title">Our <span className="highlight">Partners</span></h2>
                    </div>
                    <div className="sponsors-tiers reveal">
                        {['Title Sponsor', 'Platinum Sponsors', 'Gold Sponsors'].map(tier => (
                            <div key={tier} className="sponsor-tier">
                                <div className="sponsor-tier-label tier-title">{tier}</div>
                                <div className="sponsor-placeholder">Coming Soon</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section" id="faq">
                <div className="container">
                    <div className="section-header reveal">
                        <div className="section-label">— FAQ —</div>
                        <h2 className="section-title">Got <span className="highlight">Questions?</span></h2>
                    </div>
                    <div className="faq-list">
                        {data.faq.map((faq, i) => (
                            <div key={faq.id} className={`faq-item reveal${openFaq === faq.id ? ' open' : ''}`} style={{ transitionDelay: `${i * 0.07}s` }}>
                                <button className="faq-question" onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}>
                                    {faq.question}
                                    <svg className="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                </button>
                                <div className="faq-answer"><div className="faq-answer-content">{faq.answer}</div></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section" id="register">
                <div className="glow-orb glow-orb-orange" style={{ width: 450, height: 450, top: '-15%', left: '25%' }} />
                <div className="glow-orb glow-orb-pink" style={{ width: 300, height: 300, bottom: '-10%', right: '10%' }} />
                <div className="container">
                    <div className="cta-content reveal">
                        <h2 className="cta-title">Be Part of<br /><span className="gradient-text">Tarang 2026</span></h2>
                        <p className="cta-desc">Don&apos;t miss the most awaited fest of GPC Kannur. Register now and be part of the spectrum of technology and culture.</p>
                        <a href="#" className="btn-primary" style={{ fontSize: '1.05rem', padding: '17px 42px' }}>Register for Tarang 2026</a>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer" id="contact">
                <div className="container">
                    <div className="footer-top">
                        <div className="footer-brand">
                            <div className="footer-logo">
                                <img src="/assets/logo.png" alt="Tarang" />
                                <span className="footer-logo-text">TARANG 2026</span>
                            </div>
                            <p>{data.siteConfig.tagline}. Annual tech and cultural fest of {data.siteConfig.college}.</p>
                            <div className="footer-socials">
                                {['Instagram', 'YouTube', 'WhatsApp'].map(s => (
                                    <a key={s} href="#" className="footer-social-link" aria-label={s}>{s[0]}</a>
                                ))}
                            </div>
                        </div>
                        <div className="footer-column">
                            <h4>Quick Links</h4>
                            {['about', 'departments', 'events', 'schedule'].map(l => <a key={l} href={`#${l}`}>{l.charAt(0).toUpperCase() + l.slice(1)}</a>)}
                        </div>
                        <div className="footer-column">
                            <h4>More</h4>
                            {[['#team', 'Our Team'], ['#sponsors', 'Sponsors'], ['#faq', 'FAQ'], ['#register', 'Register']].map(([h, t]) => <a key={h} href={h}>{t}</a>)}
                        </div>
                        <div className="footer-column">
                            <h4>Contact</h4>
                            <a href={`mailto:${data.siteConfig.email}`}>{data.siteConfig.email}</a>
                            <a href="#">{data.siteConfig.location}</a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2026 Tarang · GPC Kannur. All rights reserved.</p>
                        <p>{data.siteConfig.tagline}</p>
                    </div>
                </div>
            </footer>

            {/* BACK TO TOP */}
            <button className={`back-to-top${showTop ? ' visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
            </button>
        </>
    );
}
