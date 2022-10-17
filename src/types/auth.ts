export type LoginForm = {
  email: string,
  password: string,
}

export type User = {
  id: string,
  name: string | null,
  email: string,
  createdAt: string,
}

export type AuthRes = {
  model: {
    user: User,
    token: string,
  }
}
