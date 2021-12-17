import { IAlbum } from './../interfaces/album.interface';

export class Album implements IAlbum {
  id: number;
  title: string;
  userId: number;

  constructor(rawData: IAlbum) {
    this.id = rawData.id;
    this.title = rawData.title;
    this.userId = rawData.userId;
  }
}

export const publicAlbumMock: IAlbum = {
  id: 1,
  title: "quidem molestiae enim",
  userId: 1
};
