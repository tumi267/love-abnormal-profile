import { NextResponse } from "next/server";
import { db } from "../../../libs/firebase"
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET(req, { params }) {
    const { slug } = params;

    if (!slug) {
        return NextResponse.json({ message: "Category slug is required" }, { status: 400 });
    }

    try {
        const articlesRef = collection(db, "articles");
        const q = query(articlesRef, where("category", "==", slug));
        const querySnapshot = await getDocs(q);

        const articles = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })).map(({ preview, image, title, author, date, id,category }) => ({
            id,
            preview,
            image,
            category,
            title,
            author,
            date,
        }));

        return NextResponse.json({ articles }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching articles", error }, { status: 500 });
    }
}

