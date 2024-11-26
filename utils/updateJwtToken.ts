import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

interface UpdateTokenParams {
  req: Request
  updatedUserInfo: Record<string, any>
  location: string
}

export const updateJwtToken = ({
  req,
  updatedUserInfo,
  location,
}: UpdateTokenParams) => {
  const token = req.cookies.get("token")

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const decoded = jwt.verify(
    token.value,
    process.env.JWT_SECRET as string,
  ) as any

  // Update the user information in the token
  const updatedUser = {
    ...decoded,
    ...updatedUserInfo,
  }

  // Remove the existing exp property if it exists
  delete updatedUser.exp

  // Generate a new JWT token with the updated user information
  const newToken = jwt.sign(updatedUser, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  })

  // Set the new token in the HTTP-only cookie
  const response = NextResponse.json({ location }, { status: 200 })
  response.cookies.set("token", newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60,
    path: "/",
  })

  return response
}
