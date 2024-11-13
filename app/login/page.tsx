"use client"

import React from "react"
import { useRouter } from "next/navigation"

interface User {
  name: string
  email: string
  password: string
}

export default function index() {
  const router = useRouter()

  const [user, setUser] = React.useState<User>({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    if (res.ok) {
      const data = await res.json()
      console.log("data ==>", data)

      // router.push("/dashboard")
    } else {
      const data = await res.json()
      console.error(data)
    }
  }

  return (
    <div className="flex flex-col gap-4 py-8">
      <div className="flex flex-col gap-1 items-start">
        <label htmlFor="name">Name</label>
        <input
          className="border border-gray-500 bg-slate-800 px-2 py-1 rounded w-96"
          id="name"
          type="text"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1 items-start">
        <label htmlFor="email">Email</label>
        <input
          className="border border-gray-500 bg-slate-800 px-2 py-1 rounded w-96"
          id="email"
          type="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1 items-start">
        <label htmlFor="password">Password</label>
        <input
          className="border border-gray-500 bg-slate-800 px-2 py-1 rounded w-96"
          id="password"
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-64"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  )
}
