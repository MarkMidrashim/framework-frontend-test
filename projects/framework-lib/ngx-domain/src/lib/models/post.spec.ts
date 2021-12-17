import { IPost } from '../interfaces/post.interface';
import { publicPostMock } from './post';

const postMock: IPost = publicPostMock;

describe('Tests PostModel', () => {
  it('should test IPost with value', () => {
    const contaModel: IPost = {
      id: postMock.id,
      title: postMock.title,
      body: postMock.body,
      userId: postMock.userId
    };
    expect(contaModel.id).toEqual(postMock.id);
    expect(contaModel.title).toEqual(postMock.title);
    expect(contaModel.body).toEqual(postMock.body);
    expect(contaModel.userId).toEqual(postMock.userId);
  });
});
