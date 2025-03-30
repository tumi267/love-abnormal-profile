export const dynamic = 'force-dynamic';

import { db } from "../../../libs/firebase"
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing article ID" }, { status: 400 });
  }

  try {
    const articleRef = doc(db, "articles", id);
    const articleSnap = await getDoc(articleRef);

    if (!articleSnap.exists()) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ id: articleSnap.id, ...articleSnap.data() });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching article" }, { status: 500 });
  }
}


