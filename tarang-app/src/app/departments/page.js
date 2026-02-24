import siteData from '@/data/siteData.json';
import Link from 'next/link';

export const metadata = {
    title: 'Departments — Tarang 2026 | GPC Kannur',
    description: 'Explore events from all six departments at Tarang 2026 — Civil, EEE, ECE, Mechanical, Textile, and Wood & Paper Technology.',
};

export default function DepartmentsPage() {
    return (
        <>
            {/* NAVBAR */}
            <nav className="navbar scrolled" style={{ position: 'relative' }}>
                <div className="nav-inner">
                    <Link href="/" className="nav-logo">
                        <img src="/assets/logo.png" alt="Tarang" />
                        <span className="nav-logo-text">TARANG</span>
                    </Link>
                    <div className="nav-links">
                        <Link href="/#about">About</Link>
                        <Link href="/#events">Events</Link>
                        <Link href="/#schedule">Schedule</Link>
                        <Link href="/departments" className="nav-cta" style={{ fontSize: '0.78rem' }}>All Departments</Link>
                    </div>
                </div>
            </nav>

            {/* HERO BANNER */}
            <section className="dept-page-hero">
                <div className="dept-page-hero-bg">
                    <div className="dept-page-hero-orb dept-page-hero-orb-1" />
                    <div className="dept-page-hero-orb dept-page-hero-orb-2" />
                    <div className="dept-page-hero-orb dept-page-hero-orb-3" />
                </div>
                <div className="container">
                    <div className="dept-page-hero-content">
                        <Link href="/" className="dept-page-breadcrumb">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                            Home
                        </Link>
                        <div className="dept-page-label">— Departments —</div>
                        <h1 className="dept-page-title">
                            Six Departments, <span className="highlight">Unlimited Events</span>
                        </h1>
                        <p className="dept-page-subtitle">
                            Each department at GPC Kannur hosts its own set of technical competitions during Tarang 2026.
                            Explore department-specific events and find the competitions that match your skills.
                        </p>
                    </div>
                </div>
            </section>

            {/* DEPARTMENTS GRID */}
            <section className="section">
                <div className="container">
                    <div className="dept-listing-grid">
                        {siteData.departments.map((dept, i) => (
                            <Link
                                key={dept.id}
                                href={`/departments/${dept.id}`}
                                className="dept-listing-card"
                                style={{ '--dept-color': dept.color, animationDelay: `${i * 0.1}s` }}
                            >
                                <div className="dept-listing-card-accent" />
                                <div className="dept-listing-card-content">
                                    <div className="dept-listing-icon">{dept.icon}</div>
                                    <div className="dept-listing-info">
                                        <h2 className="dept-listing-name">{dept.name}</h2>
                                        <p className="dept-listing-desc">{dept.description}</p>
                                        <div className="dept-listing-meta">
                                            <span className="dept-listing-event-count">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                                {dept.departmentEvents.length} Events
                                            </span>
                                            <span className="dept-listing-cta">
                                                Explore Events
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Stats bar */}
                    <div className="dept-listing-stats">
                        <div className="dept-listing-stat">
                            <div className="dept-listing-stat-number">{siteData.departments.length}</div>
                            <div className="dept-listing-stat-label">Departments</div>
                        </div>
                        <div className="dept-listing-stat-divider" />
                        <div className="dept-listing-stat">
                            <div className="dept-listing-stat-number">
                                {siteData.departments.reduce((acc, d) => acc + d.departmentEvents.length, 0)}
                            </div>
                            <div className="dept-listing-stat-label">Department Events</div>
                        </div>
                        <div className="dept-listing-stat-divider" />
                        <div className="dept-listing-stat">
                            <div className="dept-listing-stat-number">{siteData.events.length}</div>
                            <div className="dept-listing-stat-label">General Events</div>
                        </div>
                        <div className="dept-listing-stat-divider" />
                        <div className="dept-listing-stat">
                            <div className="dept-listing-stat-number">2</div>
                            <div className="dept-listing-stat-label">Days</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-bottom">
                        <p>© 2026 Tarang · GPC Kannur. All rights reserved.</p>
                        <Link href="/" style={{ color: '#f27b1a' }}>← Back to Home</Link>
                    </div>
                </div>
            </footer>
        </>
    );
}
