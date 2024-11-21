"use client"

import React from "react"
import { Input } from "../../components/FormComponents"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface User {
  email: string
  password: string
}

export default function index() {
  const router = useRouter()

  const [user, setUser] = React.useState<User>({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    if (res.ok) {
      router.push("/dashboard")
    } else {
      const data = await res.json()
      console.error(data)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 py-8 bg-slate-800 w-[600px] p-8 rounded-xl mx-auto"
    >
      <legend className="text-3xl text-white font-bold">Login</legend>
      <Input
        label="Email"
        value={user.email}
        placeholder="E.g. john@google.com"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <Input
        label="Password"
        value={user.password}
        placeholder="************"
        type="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <div className="mt-2 flex flex-col gap-2">
        <Link href="/signup" className="text-blue-500 hover:underline">
          Already have an account?
        </Link>
        <button
          className="bg-blue-600 hover:bg-blue-500 transition-all text-white px-4 py-2 rounded w-full"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  )
}
