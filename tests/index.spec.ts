import request from 'supertest';
import app from "../src";
import fs from 'fs';
import { ImageProcessingService } from '../src/services/image-processing-service';
import { FakeImageProcessor } from './services/fake-image-processor';

describe('GET /api/images', () => {
    it('Should create a thumbnail if image exists and is processable', async () => {
        const imageProcessingService = new ImageProcessingService(new FakeImageProcessor());
        const thumbnailPath = imageProcessingService.generateThumbnailPath('test.png', { width: 300, height: 300 });

        expect(fs.existsSync(thumbnailPath)).toBeFalsy();
        await request(app).get('/api/images?filename=test.png&width=300&height=300').expect(200);

        //Thumbnail must exist now
        expect(fs.existsSync(thumbnailPath)).toBeTruthy();
        //We delete thumbnail, otherwise the test will fail if we run it again
        fs.rmSync(thumbnailPath);

    })

    it('Should return a 400 if image not found', async () => {
        await request(app).get('/api/images?filename=inexistent.png&width=300&height=300').expect(400);
    });

    it('Should return a 400 one of the required 3 query params is missing', async () => {
        await request(app).get('/api/images?filename=test.png&width=300').expect(400);
    });
})