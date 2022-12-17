import path from "path";
import sharp from 'sharp';
import * as fs from 'fs';

export class ImageProcessingService {
    private imagesPath = 'full';
    private thumbnailsPath = 'thumb';

    resizeImage(imageName: string, dimension: Dimension) {
        const { ext: extension, name } = path.parse(imageName);
        const thumbnailPath = path.join(__dirname, 'assets', this.thumbnailsPath, `${name}${dimension.width}x${dimension.height}${extension}`);

        return sharp(path.join(__dirname, 'assets', this.imagesPath, imageName))
            .resize(dimension.width, dimension.height)
            .toFile(thumbnailPath)
            .then(data => {
                return Promise.resolve({
                    thumbnailPath,
                    ...data
                });
            })
    }

    getExistingThumbnailPath(imageName: string, dimension: Dimension): string | null {
        const { ext: extension, name } = path.parse(imageName);
        const thumbnailPath = path.join(__dirname, 'assets', this.thumbnailsPath, `${name}${dimension.width}x${dimension.height}${extension}`);

        return fs.existsSync(thumbnailPath) ? thumbnailPath: null;
    }
}

export interface Dimension {
    width: number,
    height: number;
}