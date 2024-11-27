"use client"

import React from "react"
import HeadshotUpload from "@/components/dashboard/HeadshotUpload"
import { StaggeredAnimation } from "@/components/StaggeredAnimation"
import Text from "@/components/Text"
import UserAvatar from "@/components/UserAvatar"
import { useUserStore } from "@/store"

export default function UserInfo() {
  const { user } = useUserStore()

  if (!user) return null

  return (
    <StaggeredAnimation stagger={0.3} className="flex-1">
      <UserAvatar avatar={user.avatar} className="mb-8" />
      <Text variant="xl">
        Welcome to your dashboard, {user.firstName} {user.lastName}!
      </Text>
      <HeadshotUpload />
    </StaggeredAnimation>
  )
}
