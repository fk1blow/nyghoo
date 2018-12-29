export interface Station {
  name: string
  stream: string
  description?: string
  pic?: {
    small: string,
    big?: string
  }
}
