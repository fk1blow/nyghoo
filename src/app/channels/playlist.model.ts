interface Item {
  text: string
}

interface Song {
  artist: Item
  album: Item
  title: Item
}

export type Playlist = Song[]
