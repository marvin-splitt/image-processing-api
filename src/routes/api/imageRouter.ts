import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import expressLogger from '../../helpers/expressLogger';

const imageRouter = express.Router();
imageRouter.use(expressLogger);

imageRouter.get('/', async (req, res) => {
  const filename = req.query.filename;
  const height = req.query.height
    ? parseInt(req.query.height as string, 10)
    : null;
  const width = req.query.width
    ? parseInt(req.query.width as string, 10)
    : null;

  // check if the query is correct
  if (!filename) {
    res.status(400).send('Filename is missing in url params');
    return;
  }

  if (!height) {
    res.status(400).send('Height is missing in url params');
    return;
  }

  if (!width) {
    res.status(400).send('Width is missing in url params');
    return;
  }

  // get the full path from the filename
  const filePathFullImage = `${path.resolve(
    __dirname,
    `../../../assets/full/${filename}.jpg`
  )}`;

  const filePathThumbImage = `${path.resolve(
    __dirname,
    `../../../assets/thumb/${filename}.jpg`
  )}`;

  // Check if filename exists in full folder
  await fs.stat(filePathFullImage).catch((e) => res.status(404).send(e));

  // Check if thumb was already created
  await fs.stat(filePathThumbImage).catch((e) => console.log(e));

  const data = await fs.readFile(filePathFullImage);

  // resize image
  sharp(data)
    .resize(width, height)
    .toFile(filePathThumbImage, async (err, info) => {
      // Check if thumb was created
      await fs.stat(filePathThumbImage).catch((e) => res.status(500).send(e));

      const thumbData = await fs.readFile(filePathThumbImage);

      // Setting the headers
      res.status(200).contentType('jpg').send(thumbData);
    });
});

export default imageRouter;
