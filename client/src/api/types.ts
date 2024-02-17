export interface IUser {
  email: string
  name: string
  createdAt: string
  updatedAt: string
  id: string
}

export interface IBlog {
  content: string
  title: string
  authorName?: string
  user?: Partial<IUser>
  createdAt?: string
  updatedAt?: string
  id: string
}

export interface GenericResponse {
  status: string
  message: string
}

export interface ILoginResponse {
  access_token: string
  status: string
}
