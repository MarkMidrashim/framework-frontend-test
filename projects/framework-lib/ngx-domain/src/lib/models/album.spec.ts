import { IAlbum } from '../interfaces/album.interface';
import { publicAlbumMock } from './album';

const albumMock: IAlbum = publicAlbumMock;

describe('Tests AlbumModel', () => {
  it('should test IAlbum with value', () => {
    const albumModel: IAlbum = {
      id: albumMock.id,
      title: albumMock.title,
      userId: albumMock.userId
    };
    expect(albumModel.id).toEqual(albumMock.id);
    expect(albumModel.title).toEqual(albumMock.title);
    expect(albumModel.userId).toEqual(albumMock.userId);
  });
});
