import imageParamsParser from '../../helpers/imageParamsParser';

const queryString = '?filename=test.png&width=100&height=150';

describe('The imageParamsParser', () => {
  it('parses all params correctly', () => {
    expect(imageParamsParser(queryString)).toEqual({
      filename: 'test.png',
      width: 100,
      height: 150,
    });
  });
});
