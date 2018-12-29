export interface Station {
  name: string
  stream: string
  description?: string
  playlist?: string
  pic?: {
    small: string,
    big?: string
  }
}
