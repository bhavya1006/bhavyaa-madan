import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
export const runtime = "nodejs";

export async function GET() {
  try {
    const snapshot = await db
      .collection("comments")
      .orderBy("createdAt", "desc")
      .get();

    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET /api/comments error:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, message, rating } = await request.json();
    if (!message || !rating)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const docRef = await db.collection("comments").add({
      name: name || "Anonymous",
      message,
      rating,
      createdAt: new Date(),
    });

    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    console.error("POST /api/comments error:", error);
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}
