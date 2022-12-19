import { ImageProcessingService } from '../src/services/image-processing-service';
import { FakeImageProcessor } from './services/fake-image-processor';

it('expects service to resolve if imageProcessor resolves and has expected metadata', async () => {
  const imageProcessor = new ImageProcessingService(new FakeImageProcessor());
  const result = await imageProcessor.resizeImage('Image.png', {
    width: 200,
    height: 200,
  });

  expect(result).toEqual({
    path: imageProcessor.generateThumbnailPath('Image.png', {
      width: 200,
      height: 200,
    }),
    width: 200,
    height: 200,
  });
});

it('expects service to fail if imageProcessor fails', () => {
  const imageProcessor = new ImageProcessingService(
    new FakeImageProcessor(false),
  );
  imageProcessor
    .resizeImage('', { width: 200, height: 200 })
    .catch((err) => expect(err).toContain('Cannot process image'));
});
