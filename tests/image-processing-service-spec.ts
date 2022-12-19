import { ImageProcessingService } from "../src/services/image-processing-service"
import { FakeImageProcessor } from "./fake-image-processor";

it ('expects service to resolve if imageProcessor resolves', async () => {
    const imageProcessor = new ImageProcessingService(new FakeImageProcessor());
    const result = await imageProcessor.resizeImage('', { width: 200, height: 200 });
    expect(result).toBeDefined();
})

it ('expects service to fail if imageProcessor fails', () => {
    const imageProcessor = new ImageProcessingService(new FakeImageProcessor(false));
    imageProcessor.resizeImage('', { width: 200, height: 200 })
        .catch(err => expect(err).toContain('Cannot process image'));
})