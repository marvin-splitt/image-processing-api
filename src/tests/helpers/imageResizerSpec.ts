import path from 'path';
import imageHelper from '../../helpers/imageHelper';

const filePathFullImage = path.resolve(__dirname, '../../../assets/full/fjord.jpg');
const filePathThumbImage = path.resolve(__dirname, '../../../assets/thumb/fjord.jpg');

describe('The imageResizer function', (): void => {
    it('returns a buffer after sucessfully resizing an image', async () => {
        const imageBuffer: Buffer = await imageHelper.resizeImage({
            height: 100,
            width: 150,
            filePathFullImage,
            filePathThumbImage,
        });
        expect(imageBuffer).toBeInstanceOf(Buffer);
    });

    it('rejects promise if something went wrong', async (): Promise<void> => {
        await expectAsync(
            imageHelper.resizeImage({
                height: 100,
                width: 150,
                filePathFullImage: '',
                filePathThumbImage,
            }),
        ).toBeRejected();
    });
});
