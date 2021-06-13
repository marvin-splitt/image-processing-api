interface ImageParams {
  filename: string | null;
  width: number | null;
  height: number | null;
}

const imageParamsParser = (queryString: string): ImageParams => {
  const urlParams = new URLSearchParams(queryString);

  const filename = urlParams.get('filename');
  const height = urlParams.get('height');
  const width = urlParams.get('width');

  return {
    filename,
    height: height ? parseInt(height, 10) : null,
    width: width ? parseInt(width) : null,
  };
};

export default imageParamsParser;
