// app/api/auth/me/route.ts
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers" // Import cookies() from next/headers

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token") // Get the token cookie

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string)
    return NextResponse.json({ user: decoded })
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
