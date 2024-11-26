import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Clear the 'token' cookie by setting it with an immediate expiration
    const res = NextResponse.json({ message: "Logout successful" })

    res.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    })

    return res
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Failed to log out" }, { status: 500 })
  }
}
