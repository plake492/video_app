import { create } from "zustand"

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  createdAt: number
  updatedAt: number
}

interface UserState {
  user: User | null
  userFetched: boolean
  setUser: (user: null | User) => void
  setUserFetched: (fetched: boolean) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  userFetched: false,

  setUser: (user) => set({ user }),
  setUserFetched: (userFetched) => set({ userFetched }),
}))
