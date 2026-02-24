import siteData from '@/data/siteData.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
    return siteData.customPages.map(page => ({ slug: page.slug }));
}

export default async function CustomPage({ params }) {
    const { slug } = await params;
    const page = siteData.customPages.find(p => p.slug === slug);

    if (!page) notFound();

    return (
        <>
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
                        <Link href="/admin">Admin</Link>
                    </div>
                </div>
            </nav>

            <section className="section" style={{ paddingTop: 120 }}>
                <div className="container">
                    <div className="section-header">
                        <h1 className="section-title">{page.title}</h1>
                    </div>
                    <div
                        className="about-text"
                        style={{ maxWidth: 800, margin: '0 auto' }}
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-bottom">
                        <p>© 2026 Tarang · GPC Kannur</p>
                        <Link href="/" style={{ color: '#f27b1a' }}>← Back to Home</Link>
                    </div>
                </div>
            </footer>
        </>
    );
}
