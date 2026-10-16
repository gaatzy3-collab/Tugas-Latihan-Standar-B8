export interface BookNote {
  id: number
  title: string
  content: string
}

export type BookNotePayload = Omit<BookNote, 'id'>

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResult {
  token: string
  user: string
}
