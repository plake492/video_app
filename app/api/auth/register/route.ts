import { NextResponse } from "next/server"
import connect from "../../../../lib/mongoose"
import User from "../../../../models/User"

export async function POST(req: Request) {
  try {
    // Connect to the database
    await connect()

    // Get the user data from the request body
    const { firstName, lastName, email, password } = await req.json()

    // Validate input data
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Please provide all required fields" },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 },
      )
    }

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    })

    await newUser.save()

    // Respond with the created user data (excluding password)
    const userResponse = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    }

    return NextResponse.json(
      { message: "User registered successfully", user: userResponse },
      { status: 201 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 },
    )
  }
}
