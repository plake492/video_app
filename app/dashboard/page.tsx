"use client"

import Container from "@/components/Container"
import HeadshotUpload from "@/components/dashboard/HeadshotUpload"
import { StaggeredAnimation } from "@/components/StaggeredAnimation"
import Text from "@/components/Text"
import UserAvatar from "@/components/UserAvatar"
import { useUserStore } from "@/store/index"

const Dashboard = () => {
  const { user } = useUserStore()
  console.log("user ==>", user)

  if (!user) return <div>Loading...</div>

  return (
    <Container>
      <StaggeredAnimation stagger={0.3}>
        <UserAvatar avatar={user.avatar} className="mb-8" />
        <Text variant="xl">
          Welcome to your dashboard, {user.firstName} {user.lastName}!
        </Text>
        <HeadshotUpload />
      </StaggeredAnimation>
    </Container>
  )
}

export default Dashboard
