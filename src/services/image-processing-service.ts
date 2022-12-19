import path from "path";
import sharp from 'sharp';
import * as fs from 'fs';
import { Dimension } from "../models/dimension";
import { ImageProcessorInterface } from "./image-processor-interface";

export class ImageProcessingService {
    private imagesPath = '../../assets/full';
    private thumbnailsPath = '../../assets/thumb';

    constructor(private imageProcessor: ImageProcessorInterface) {}

    resizeImage(imageName: string, dimension: Dimension) {
        const { ext: extension, name } = path.parse(imageName);
        const thumbnailPath = path.join(__dirname, this.thumbnailsPath, `${name}${dimension.width}-${dimension.height}${extension}`);
console.log(path.join(__dirname, this.imagesPath, imageName))
        return this.imageProcessor
            .resizeImage(path.join(__dirname, this.imagesPath, imageName), thumbnailPath, dimension);
        /*return sharp(path.join(__dirname, this.imagesPath, imageName))
            .resize(dimension.width, dimension.height)
            .toFile(thumbnailPath)
            .then(data => {
                return Promise.resolve({
                    thumbnailPath,
                    ...data
                });
            })*/
    }

    getExistingThumbnailPath(imageName: string, dimension: Dimension): string | null {
        const { ext: extension, name } = path.parse(imageName);
        const thumbnailPath = path.join(__dirname, this.thumbnailsPath, `${name}${dimension.width}x${dimension.height}${extension}`);

        return fs.existsSync(thumbnailPath) ? thumbnailPath: null;
    }
}