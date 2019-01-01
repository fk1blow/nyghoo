export interface Station {
  name: string
  // TODO change to `streamUrl` ??
  stream: string
  description?: string
  // TODO change to `playlistUrl` ??
  playlist?: string
  pic?: {
    small: string,
    big?: string
  }
}
