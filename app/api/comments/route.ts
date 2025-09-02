// filepath: /home/bhavya/code-gg/profile/app/api/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';

export async function GET() {
    try {
        const q = query(collection(db, 'comments'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { name, message, rating } = await request.json();
        if (!message || !rating) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

        const docRef = await addDoc(collection(db, 'comments'), {
            name: name || 'Anonymous',
            message,
            rating,
            createdAt: new Date(),
        });
        return NextResponse.json({ id: docRef.id });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
    }
}