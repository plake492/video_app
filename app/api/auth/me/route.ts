// app/api/auth/me/route.ts
import { NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { cookies } from "next/headers" // Import cookies() from next/headers

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token") // Get the token cookie

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET) // Ensure JWT_SECRET is set
    const { payload } = await jwtVerify(token.value, secret)
    return NextResponse.json(payload)
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
