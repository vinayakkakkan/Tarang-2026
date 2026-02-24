import siteData from '@/data/siteData.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
    return siteData.departments.map(dept => ({ id: dept.id }));
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const dept = siteData.departments.find(d => d.id === id);
    if (!dept) return {};
    return {
        title: `${dept.name} Events — Tarang 2026 | GPC Kannur`,
        description: dept.description,
    };
}

export default async function DepartmentPage({ params }) {
    const { id } = await params;
    const dept = siteData.departments.find(d => d.id === id);

    if (!dept) notFound();

    const deptIndex = siteData.departments.findIndex(d => d.id === id);
    const prevDept = deptIndex > 0 ? siteData.departments[deptIndex - 1] : null;
    const nextDept = deptIndex < siteData.departments.length - 1 ? siteData.departments[deptIndex + 1] : null;

    const day1Events = dept.departmentEvents.filter(e => e.date === 'March 12');
    const day2Events = dept.departmentEvents.filter(e => e.date === 'March 13');

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
                        <Link href="/departments">Departments</Link>
                        <Link href="/#events">Events</Link>
                        <Link href="/#schedule">Schedule</Link>
                    </div>
                </div>
            </nav>

            {/* DEPARTMENT HERO */}
            <section className="dept-detail-hero" style={{ '--dept-color': dept.color }}>
                <div className="dept-detail-hero-bg">
                    <div className="dept-detail-hero-orb dept-detail-hero-orb-1" style={{ background: dept.color }} />
                    <div className="dept-detail-hero-orb dept-detail-hero-orb-2" style={{ background: dept.color }} />
                    <div className="dept-detail-pattern" />
                </div>
                <div className="container">
                    <div className="dept-detail-hero-content">
                        <div className="dept-detail-breadcrumb">
                            <Link href="/">Home</Link>
                            <span className="dept-detail-breadcrumb-sep">/</span>
                            <Link href="/departments">Departments</Link>
                            <span className="dept-detail-breadcrumb-sep">/</span>
                            <span className="dept-detail-breadcrumb-current">{dept.name}</span>
                        </div>

                        <div className="dept-detail-icon-wrapper" style={{ '--dept-color': dept.color }}>
                            <span className="dept-detail-icon">{dept.icon}</span>
                        </div>

                        <h1 className="dept-detail-title">{dept.name}</h1>
                        <p className="dept-detail-description">{dept.description}</p>

                        <div className="dept-detail-quick-stats">
                            <div className="dept-detail-stat">
                                <div className="dept-detail-stat-value">{dept.departmentEvents.length}</div>
                                <div className="dept-detail-stat-label">Events</div>
                            </div>
                            <div className="dept-detail-stat">
                                <div className="dept-detail-stat-value">{day1Events.length}</div>
                                <div className="dept-detail-stat-label">Day 1</div>
                            </div>
                            <div className="dept-detail-stat">
                                <div className="dept-detail-stat-value">{day2Events.length}</div>
                                <div className="dept-detail-stat-label">Day 2</div>
                            </div>
                        </div>

                        {dept.pdf && (
                            <a
                                href={`/Resources/Technical events/${dept.pdf}`}
                                target="_blank"
                                className="dept-detail-pdf-btn"
                                style={{ '--dept-color': dept.color }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                                Download Event PDF
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* EVENTS SECTION */}
            <section className="section dept-events-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">— Events —</div>
                        <h2 className="section-title">
                            <span className="highlight">{dept.name}</span> Events
                        </h2>
                        <p className="section-desc">All technical events conducted by the {dept.name} department during Tarang 2026.</p>
                    </div>

                    {/* Day 1 Events */}
                    {day1Events.length > 0 && (
                        <div className="dept-events-day">
                            <div className="dept-events-day-header">
                                <div className="dept-events-day-badge" style={{ '--dept-color': dept.color }}>Day 1</div>
                                <h3 className="dept-events-day-title">March 12, 2026</h3>
                            </div>
                            <div className="dept-events-grid">
                                {day1Events.map((event, i) => (
                                    <div
                                        key={event.id}
                                        className="dept-event-card"
                                        style={{ '--dept-color': dept.color, animationDelay: `${i * 0.08}s` }}
                                    >
                                        <div className="dept-event-card-top">
                                            <div className="dept-event-card-icon-area" style={{ '--dept-color': dept.color }}>
                                                <span>{dept.icon}</span>
                                            </div>
                                            <div className="dept-event-card-time">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                                {event.time}
                                            </div>
                                        </div>
                                        <h4 className="dept-event-card-title">{event.title}</h4>
                                        <p className="dept-event-card-desc">{event.desc}</p>
                                        <div className="dept-event-card-details">
                                            <div className="dept-event-card-detail">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                                {event.venue}
                                            </div>
                                            <div className="dept-event-card-detail">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
                                                {event.team}
                                            </div>
                                        </div>
                                        {event.rules && event.rules.length > 0 && (
                                            <div className="dept-event-card-rules">
                                                <div className="dept-event-card-rules-title">Rules & Info</div>
                                                <ul>
                                                    {event.rules.map((rule, ri) => (
                                                        <li key={ri}>{rule}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Day 2 Events */}
                    {day2Events.length > 0 && (
                        <div className="dept-events-day">
                            <div className="dept-events-day-header">
                                <div className="dept-events-day-badge" style={{ '--dept-color': dept.color }}>Day 2</div>
                                <h3 className="dept-events-day-title">March 13, 2026</h3>
                            </div>
                            <div className="dept-events-grid">
                                {day2Events.map((event, i) => (
                                    <div
                                        key={event.id}
                                        className="dept-event-card"
                                        style={{ '--dept-color': dept.color, animationDelay: `${i * 0.08}s` }}
                                    >
                                        <div className="dept-event-card-top">
                                            <div className="dept-event-card-icon-area" style={{ '--dept-color': dept.color }}>
                                                <span>{dept.icon}</span>
                                            </div>
                                            <div className="dept-event-card-time">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                                {event.time}
                                            </div>
                                        </div>
                                        <h4 className="dept-event-card-title">{event.title}</h4>
                                        <p className="dept-event-card-desc">{event.desc}</p>
                                        <div className="dept-event-card-details">
                                            <div className="dept-event-card-detail">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                                {event.venue}
                                            </div>
                                            <div className="dept-event-card-detail">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
                                                {event.team}
                                            </div>
                                        </div>
                                        {event.rules && event.rules.length > 0 && (
                                            <div className="dept-event-card-rules">
                                                <div className="dept-event-card-rules-title">Rules & Info</div>
                                                <ul>
                                                    {event.rules.map((rule, ri) => (
                                                        <li key={ri}>{rule}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* DEPARTMENT NAVIGATION */}
            <section className="dept-nav-section">
                <div className="container">
                    <div className="dept-nav-grid">
                        {prevDept ? (
                            <Link href={`/departments/${prevDept.id}`} className="dept-nav-link dept-nav-prev">
                                <div className="dept-nav-direction">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                                    Previous Department
                                </div>
                                <div className="dept-nav-name">{prevDept.icon} {prevDept.name}</div>
                            </Link>
                        ) : <div />}
                        {nextDept ? (
                            <Link href={`/departments/${nextDept.id}`} className="dept-nav-link dept-nav-next">
                                <div className="dept-nav-direction">
                                    Next Department
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                </div>
                                <div className="dept-nav-name">{nextDept.icon} {nextDept.name}</div>
                            </Link>
                        ) : <div />}
                    </div>

                    {/* All departments mini-nav */}
                    <div className="dept-all-nav">
                        <h4 className="dept-all-nav-title">All Departments</h4>
                        <div className="dept-all-nav-pills">
                            {siteData.departments.map(d => (
                                <Link
                                    key={d.id}
                                    href={`/departments/${d.id}`}
                                    className={`dept-all-nav-pill${d.id === dept.id ? ' active' : ''}`}
                                    style={{ '--dept-color': d.color }}
                                >
                                    {d.icon} {d.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-bottom">
                        <p>© 2026 Tarang · GPC Kannur. All rights reserved.</p>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <Link href="/departments" style={{ color: '#f27b1a' }}>← All Departments</Link>
                            <Link href="/" style={{ color: '#f27b1a' }}>Home</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
