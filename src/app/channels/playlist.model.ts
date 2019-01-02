export interface Item {
  text: string
}

export interface Song {
  artist: Item
  album: Item
  title: Item
}

export type Playlist = Song[]
