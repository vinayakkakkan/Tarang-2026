'use client';
import { useState, useEffect } from 'react';

const SECTIONS = [
    { key: 'siteConfig', label: 'Site Config', type: 'object' },
    { key: 'events', label: 'Events', type: 'array' },
    { key: 'departments', label: 'Departments', type: 'array' },
    { key: 'schedule', label: 'Schedule', type: 'array' },
    { key: 'team', label: 'Team', type: 'array' },
    { key: 'faq', label: 'FAQ', type: 'array' },
    { key: 'customPages', label: 'Custom Pages', type: 'array' },
];

const FIELD_DEFS = {
    events: ['title', 'desc', 'category|tech,cultural,flagship', 'badge', 'date', 'team'],
    departments: ['name', 'icon', 'events', 'pdf'],
    team: ['name', 'role', 'initials'],
    faq: ['question', 'answer'],
    customPages: ['title', 'slug', 'content'],
};

export default function AdminDashboard() {
    const [data, setData] = useState(null);
    const [activeSection, setActiveSection] = useState('events');
    const [editingItem, setEditingItem] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            const res = await fetch('/api/data');
            const json = await res.json();
            setData(json);
        } catch (e) {
            setMessage('Failed to load data');
        }
    };

    const showMsg = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 3000);
    };

    const handleAdd = () => {
        const fields = FIELD_DEFS[activeSection] || [];
        const empty = {};
        fields.forEach(f => {
            const key = f.split('|')[0];
            empty[key] = '';
        });
        setEditingItem('new');
        setFormValues(empty);
    };

    const handleEdit = (item) => {
        setEditingItem(item.id);
        setFormValues({ ...item });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (editingItem === 'new') {
                await fetch('/api/data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ section: activeSection, item: formValues }),
                });
                showMsg('✅ Item added!');
            } else {
                await fetch('/api/data', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ section: activeSection, id: editingItem, item: formValues }),
                });
                showMsg('✅ Item updated!');
            }
            setEditingItem(null);
            setFormValues({});
            await loadData();
        } catch (e) {
            showMsg('❌ Error saving');
        }
        setSaving(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            await fetch(`/api/data?section=${activeSection}&id=${id}`, { method: 'DELETE' });
            showMsg('🗑️ Item deleted');
            await loadData();
        } catch (e) {
            showMsg('❌ Error deleting');
        }
    };

    const handleConfigSave = async () => {
        setSaving(true);
        try {
            await fetch('/api/data', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ section: 'siteConfig', item: formValues }),
            });
            showMsg('✅ Config saved!');
            await loadData();
        } catch (e) {
            showMsg('❌ Error saving config');
        }
        setSaving(false);
    };

    // Schedule editor
    const handleScheduleSave = async (dayIndex, events) => {
        setSaving(true);
        try {
            const schedCopy = [...data.schedule];
            schedCopy[dayIndex] = { ...schedCopy[dayIndex], events };
            await fetch('/api/data', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ section: 'schedule', id: data.schedule[dayIndex].id || String(dayIndex), item: { ...schedCopy[dayIndex] } }),
            });
            showMsg('✅ Schedule updated!');
            await loadData();
        } catch (e) {
            showMsg('❌ Error saving schedule');
        }
        setSaving(false);
    };

    if (!data) return <div style={styles.loading}>Loading admin panel...</div>;

    const sectionConfig = SECTIONS.find(s => s.key === activeSection);
    const items = data[activeSection];

    return (
        <div style={styles.container}>
            {/* SIDEBAR */}
            <div style={styles.sidebar}>
                <div style={styles.sidebarHeader}>
                    <img src="/assets/logo.png" alt="Logo" style={{ width: 40 }} />
                    <div>
                        <div style={styles.sidebarTitle}>TARANG</div>
                        <div style={styles.sidebarSub}>Admin Panel</div>
                    </div>
                </div>
                <nav style={styles.nav}>
                    {SECTIONS.map(s => (
                        <button
                            key={s.key}
                            style={{
                                ...styles.navBtn,
                                ...(activeSection === s.key ? styles.navBtnActive : {}),
                            }}
                            onClick={() => { setActiveSection(s.key); setEditingItem(null); }}
                        >
                            {s.label}
                            {s.type === 'array' && data[s.key] && (
                                <span style={styles.badge}>{data[s.key].length}</span>
                            )}
                        </button>
                    ))}
                </nav>
                <a href="/" style={styles.backLink}>← Back to Site</a>
            </div>

            {/* MAIN */}
            <div style={styles.main}>
                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.headerTitle}>{sectionConfig?.label}</h1>
                    {message && <div style={styles.message}>{message}</div>}
                    {sectionConfig?.type === 'array' && activeSection !== 'schedule' && (
                        <button style={styles.addBtn} onClick={handleAdd}>+ Add New</button>
                    )}
                </div>

                {/* SITE CONFIG EDITOR */}
                {activeSection === 'siteConfig' && (
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>General Settings</h3>
                        {Object.entries(data.siteConfig).map(([key, val]) => (
                            <div key={key} style={styles.fieldGroup}>
                                <label style={styles.label}>{key}</label>
                                <input
                                    style={styles.input}
                                    value={formValues[key] ?? val}
                                    onChange={e => setFormValues({ ...formValues, [key]: e.target.value })}
                                    onFocus={() => { if (Object.keys(formValues).length === 0) setFormValues({ ...data.siteConfig }); }}
                                />
                            </div>
                        ))}
                        <button style={styles.saveBtn} onClick={handleConfigSave} disabled={saving}>
                            {saving ? 'Saving...' : 'Save Config'}
                        </button>
                    </div>
                )}

                {/* SCHEDULE EDITOR */}
                {activeSection === 'schedule' && (
                    <div>
                        {data.schedule.map((day, dayIdx) => (
                            <ScheduleEditor key={dayIdx} day={day} dayIndex={dayIdx} onSave={handleScheduleSave} saving={saving} />
                        ))}
                    </div>
                )}

                {/* ARRAY EDITOR (Events, Team, FAQ, etc.) */}
                {sectionConfig?.type === 'array' && activeSection !== 'schedule' && (
                    <>
                        {/* Edit/Add Form */}
                        {editingItem && (
                            <div style={styles.card}>
                                <h3 style={styles.cardTitle}>
                                    {editingItem === 'new' ? 'Add New Item' : 'Edit Item'}
                                </h3>
                                {(FIELD_DEFS[activeSection] || Object.keys(formValues).filter(k => k !== 'id')).map(fieldDef => {
                                    const parts = (typeof fieldDef === 'string' ? fieldDef : '').split('|');
                                    const key = parts[0];
                                    const options = parts[1]?.split(',');
                                    const isLong = key === 'desc' || key === 'answer' || key === 'content';

                                    return (
                                        <div key={key} style={styles.fieldGroup}>
                                            <label style={styles.label}>{key}</label>
                                            {options ? (
                                                <select
                                                    style={styles.input}
                                                    value={formValues[key] || ''}
                                                    onChange={e => setFormValues({ ...formValues, [key]: e.target.value })}
                                                >
                                                    <option value="">Select...</option>
                                                    {options.map(o => <option key={o} value={o}>{o}</option>)}
                                                </select>
                                            ) : isLong ? (
                                                <textarea
                                                    style={{ ...styles.input, minHeight: 100 }}
                                                    value={formValues[key] || ''}
                                                    onChange={e => setFormValues({ ...formValues, [key]: e.target.value })}
                                                />
                                            ) : (
                                                <input
                                                    style={styles.input}
                                                    value={formValues[key] || ''}
                                                    onChange={e => setFormValues({ ...formValues, [key]: e.target.value })}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                                <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
                                    <button style={styles.saveBtn} onClick={handleSave} disabled={saving}>
                                        {saving ? 'Saving...' : 'Save'}
                                    </button>
                                    <button style={styles.cancelBtn} onClick={() => { setEditingItem(null); setFormValues({}); }}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Items List */}
                        <div style={styles.tableContainer}>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        {(FIELD_DEFS[activeSection] || []).slice(0, 4).map(f => (
                                            <th key={f} style={styles.th}>{f.split('|')[0]}</th>
                                        ))}
                                        <th style={styles.th}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(items) && items.map(item => (
                                        <tr key={item.id} style={styles.tr}>
                                            {(FIELD_DEFS[activeSection] || []).slice(0, 4).map(f => {
                                                const key = f.split('|')[0];
                                                const val = item[key] || '';
                                                return <td key={key} style={styles.td}>{val.length > 60 ? val.slice(0, 60) + '...' : val}</td>;
                                            })}
                                            <td style={styles.td}>
                                                <button style={styles.editBtn} onClick={() => handleEdit(item)}>Edit</button>
                                                <button style={styles.deleteBtn} onClick={() => handleDelete(item.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {(!items || items.length === 0) && <p style={{ color: '#666', padding: 20, textAlign: 'center' }}>No items yet. Click &quot;+ Add New&quot; to create one.</p>}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// Schedule sub-editor
function ScheduleEditor({ day, dayIndex, onSave, saving }) {
    const [events, setEvents] = useState(day.events);
    const [editIdx, setEditIdx] = useState(null);
    const [form, setForm] = useState({});

    const handleEventChange = (idx, field, val) => {
        const copy = [...events];
        copy[idx] = { ...copy[idx], [field]: val };
        setEvents(copy);
    };

    const addEvent = () => {
        setEvents([...events, { time: '', name: '', desc: '' }]);
        setEditIdx(events.length);
        setForm({ time: '', name: '', desc: '' });
    };

    const removeEvent = (idx) => {
        setEvents(events.filter((_, i) => i !== idx));
    };

    return (
        <div style={{ ...styles.card, marginBottom: 20 }}>
            <h3 style={styles.cardTitle}>{day.day}</h3>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Time</th>
                        <th style={styles.th}>Event</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((ev, i) => (
                        <tr key={i} style={styles.tr}>
                            <td style={styles.td}>
                                <input style={styles.inlineInput} value={ev.time} onChange={e => handleEventChange(i, 'time', e.target.value)} />
                            </td>
                            <td style={styles.td}>
                                <input style={styles.inlineInput} value={ev.name} onChange={e => handleEventChange(i, 'name', e.target.value)} />
                            </td>
                            <td style={styles.td}>
                                <input style={styles.inlineInput} value={ev.desc} onChange={e => handleEventChange(i, 'desc', e.target.value)} />
                            </td>
                            <td style={styles.td}>
                                <button style={styles.deleteBtn} onClick={() => removeEvent(i)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
                <button style={styles.editBtn} onClick={addEvent}>+ Add Event</button>
                <button style={styles.saveBtn} onClick={() => onSave(dayIndex, events)} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Schedule'}
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: { display: 'flex', minHeight: '100vh', background: '#0a0f1e', color: '#e0e0e0', fontFamily: "'Space Grotesk', -apple-system, sans-serif" },
    sidebar: { width: 260, background: '#0d1525', borderRight: '1px solid #1a2540', padding: '24px 16px', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' },
    sidebarHeader: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30, padding: '0 8px' },
    sidebarTitle: { fontSize: '1.1rem', fontWeight: 800, background: 'linear-gradient(135deg, #f5c91a, #f27b1a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    sidebarSub: { fontSize: '0.7rem', color: '#5e6f8a', letterSpacing: '0.15em', textTransform: 'uppercase' },
    nav: { display: 'flex', flexDirection: 'column', gap: 4, flex: 1 },
    navBtn: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'transparent', border: 'none', borderRadius: 10, color: '#8898b2', fontSize: '0.88rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' },
    navBtnActive: { background: 'rgba(242,123,26,0.1)', color: '#f27b1a', fontWeight: 600 },
    badge: { background: '#1a2d52', color: '#f27b1a', padding: '2px 8px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700 },
    backLink: { display: 'block', padding: '14px', color: '#5e6f8a', textDecoration: 'none', fontSize: '0.85rem', borderTop: '1px solid #1a2540', marginTop: 10 },
    main: { flex: 1, padding: '28px 36px', overflowY: 'auto' },
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 },
    headerTitle: { fontSize: '1.6rem', fontWeight: 800, background: 'linear-gradient(135deg, #f5c91a, #f27b1a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    message: { padding: '8px 18px', background: '#162647', borderRadius: 8, fontSize: '0.85rem', color: '#f0ece4' },
    addBtn: { padding: '10px 22px', background: 'linear-gradient(135deg, #f5c91a, #f27b1a, #e64525)', border: 'none', borderRadius: 8, color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' },
    card: { background: '#0d1525', border: '1px solid #1a2540', borderRadius: 14, padding: 24, marginBottom: 20 },
    cardTitle: { fontSize: '1.1rem', fontWeight: 700, marginBottom: 18, color: '#f0ece4' },
    fieldGroup: { marginBottom: 14 },
    label: { display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#8898b2', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 },
    input: { width: '100%', padding: '10px 14px', background: '#0a0f1e', border: '1px solid #1a2540', borderRadius: 8, color: '#f0ece4', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' },
    inlineInput: { width: '100%', padding: '6px 10px', background: '#0a0f1e', border: '1px solid #1a2540', borderRadius: 6, color: '#f0ece4', fontSize: '0.82rem', outline: 'none', fontFamily: 'inherit' },
    saveBtn: { padding: '10px 24px', background: 'linear-gradient(135deg, #f5c91a, #f27b1a)', border: 'none', borderRadius: 8, color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' },
    cancelBtn: { padding: '10px 24px', background: 'transparent', border: '1px solid #1a2540', borderRadius: 8, color: '#8898b2', fontWeight: 500, cursor: 'pointer', fontSize: '0.85rem' },
    tableContainer: { background: '#0d1525', border: '1px solid #1a2540', borderRadius: 14, overflow: 'hidden' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: '14px 16px', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#5e6f8a', borderBottom: '1px solid #1a2540', background: '#0a1020' },
    tr: { borderBottom: '1px solid #111a30' },
    td: { padding: '12px 16px', fontSize: '0.85rem', color: '#a8b4c8' },
    editBtn: { padding: '5px 14px', background: 'rgba(242,123,26,0.12)', border: '1px solid rgba(242,123,26,0.25)', borderRadius: 6, color: '#f27b1a', fontSize: '0.78rem', cursor: 'pointer', marginRight: 6, fontWeight: 600 },
    deleteBtn: { padding: '5px 14px', background: 'rgba(230,35,108,0.1)', border: '1px solid rgba(230,35,108,0.2)', borderRadius: 6, color: '#e6236c', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 },
    loading: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0f1e', color: '#f27b1a', fontSize: '1.1rem' },
};
