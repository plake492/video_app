// app/api/auth/login/route.ts
import { NextResponse } from "next/server"
import connect from "@/lib/mongoose"
import User from "@/models/User"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    // Connect to the database
    await connect()

    // Parse the incoming JSON body
    const { email, password } = await req.json()

    // Validate input data
    if (!email || !password) {
      return NextResponse.json(
        { error: "Please provide both email and password" },
        { status: 400 },
      )
    }

    // Find the user by email
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      )
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      )
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET as string, // Ensure you have set this in your .env
      { expiresIn: "1h" }, // Token expires in 1 hour
    )

    // Set the token in an HTTP-only cookie
    const res = NextResponse.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
    res.cookies.set("token", token, {
      httpOnly: true, // Ensures that the cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Protect against CSRF attacks
      maxAge: 60 * 60, // Set the cookie to expire in 1 hour (matches JWT expiration)
      path: "/", // Cookie will be available on the entire site
    })

    return res
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to log in" }, { status: 500 })
  }
}
