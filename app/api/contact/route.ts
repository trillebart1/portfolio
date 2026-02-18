import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Interface for Message
interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    read: boolean;
}

// Ensure file exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(MESSAGES_FILE)) fs.writeFileSync(MESSAGES_FILE, '[]', 'utf-8');

function getMessages(): Message[] {
    try {
        const data = fs.readFileSync(MESSAGES_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveMessages(messages: Message[]) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

export async function GET() {
    const messages = getMessages();
    // Sort by recent
    messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(messages);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const messages = getMessages();
        const newMessage: Message = {
            id: Date.now().toString(),
            name,
            email,
            message,
            createdAt: new Date().toISOString(),
            read: false,
        };

        messages.push(newMessage);
        saveMessages(messages);

        return NextResponse.json({ success: true, message: 'Message sent' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
