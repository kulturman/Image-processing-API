import express, { Express, Request, Response } from 'express';
import { ImageProcessingService } from './image-processing-service';

const app: Express = express();
const port = 5000;

app.get('/api/images', async (req: Request, res: Response) => {
    const imageProcessor = new ImageProcessingService();

    const { filename, width, height } = req.query;

    if (!filename || !width || ! height) {
        return res.status(400).send('You should provide filename, width and height parameters');
    }

    const thumbnailPath = imageProcessor.getExistingThumbnailPath(filename.toString(), { width: +width, height: +height });

    if (thumbnailPath) {
        return res.sendFile(thumbnailPath); 
    }

    try {
        const result = await imageProcessor.resizeImage(filename.toString(), { width: +width, height: +height });
        return res.sendFile(result.thumbnailPath);
    }

    catch(error) {
        return res.status(400).send('Unable to process image, check that it exists and is a valid image')
    }
})

app.listen(port, () => console.log(`App listening on port ${port}`))