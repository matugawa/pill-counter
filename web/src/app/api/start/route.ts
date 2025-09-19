import { NextResponse } from "next/server";

export async function GET() {
  console.log("BE START");

  try {
    // FastAPI を叩く (compose 内は service 名 `api`)
    const res = await fetch("http://api:8502/predict");
    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching from FastAPI:", err);
    return NextResponse.json({ error: "FastAPI not reachable" }, { status: 500 });
  }
}
