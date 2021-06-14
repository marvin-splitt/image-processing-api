import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import sizeOf from 'image-size';
import imageHelper from '../../helpers/imageHelper';
import { Stats } from 'fs';
import { ISizeCalculationResult } from 'image-size/dist/types/interface';

const imageRouter = express.Router();

imageRouter.get('/', async (req, res) => {
  const filename = req.query.filename;
  const height = req.query.height
    ? parseInt(req.query.height as string, 10)
    : null;
  const width = req.query.width
    ? parseInt(req.query.width as string, 10)
    : null;

  // check if the query is correct
  if (!filename || !height || !width) {
    res
      .status(400)
      .send('Please make sure url contains filename, height and width params');
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
  const fullImage: Stats | null = await fs.stat(filePathFullImage).catch(() => {
    res.status(404).send('Image does not exist');
    return null;
  });

  if (!fullImage) {
    return;
  }

  // Check if thumb was already created
  const existingThumb: Stats | null = await fs
    .stat(filePathThumbImage)
    .catch(() => {
      return null;
    });
  const dimensions: ISizeCalculationResult | null = existingThumb
    ? sizeOf(filePathThumbImage)
    : null;

  if (
    existingThumb &&
    dimensions &&
    dimensions.height === height &&
    dimensions.width === width
  ) {
    fs.readFile(filePathThumbImage)
      .then((thumbData) => {
        res.status(200).contentType('jpg').send(thumbData);
      })
      .catch(() => {
        res.status(500).send('Error occured processing the image');
      });
  } else {
    // resize image
    imageHelper
      .resizeImage({
        filePathFullImage,
        filePathThumbImage,
        height,
        width,
      })
      .then((resizedImage: Buffer) => {
        res.status(200).contentType('jpg').send(resizedImage);
      })
      .catch(() => {
        res.status(500).send('Error occured processing the image');
      });
  }
});

export default imageRouter;
