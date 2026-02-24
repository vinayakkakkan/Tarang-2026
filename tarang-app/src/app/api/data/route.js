import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src', 'data', 'siteData.json');

function readData() {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(raw);
}

function writeData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

// GET - Read all data or a specific section
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const section = searchParams.get('section');
        const data = readData();

        if (section && data[section] !== undefined) {
            return NextResponse.json({ [section]: data[section] });
        }
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Add an item to a section
export async function POST(request) {
    try {
        const body = await request.json();
        const { section, item } = body;
        const data = readData();

        if (!data[section]) {
            return NextResponse.json({ error: `Section "${section}" not found` }, { status: 400 });
        }

        if (Array.isArray(data[section])) {
            item.id = String(Date.now());
            data[section].push(item);
        } else {
            Object.assign(data[section], item);
        }

        writeData(data);
        return NextResponse.json({ success: true, data: data[section] });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT - Update an item in a section
export async function PUT(request) {
    try {
        const body = await request.json();
        const { section, id, item } = body;
        const data = readData();

        if (!data[section]) {
            return NextResponse.json({ error: `Section "${section}" not found` }, { status: 400 });
        }

        if (Array.isArray(data[section])) {
            const index = data[section].findIndex(i => i.id === id);
            if (index === -1) {
                return NextResponse.json({ error: 'Item not found' }, { status: 404 });
            }
            data[section][index] = { ...data[section][index], ...item };
        } else {
            Object.assign(data[section], item);
        }

        writeData(data);
        return NextResponse.json({ success: true, data: data[section] });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE - Remove an item from a section
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const section = searchParams.get('section');
        const id = searchParams.get('id');
        const data = readData();

        if (!data[section] || !Array.isArray(data[section])) {
            return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
        }

        data[section] = data[section].filter(i => i.id !== id);
        writeData(data);
        return NextResponse.json({ success: true, data: data[section] });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
