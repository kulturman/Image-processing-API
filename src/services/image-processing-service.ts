import path from 'path';
import * as fs from 'fs';
import { Dimension } from '../models/dimension';
import { ImageProcessorInterface } from './image-processor-interface';

export class ImageProcessingService {
  public imagesPath = '../../assets/full';
  public thumbnailsPath = '../../assets/thumb';

  constructor(private imageProcessor: ImageProcessorInterface) {}

  resizeImage(imageName: string, dimension: Dimension) {
    const thumbnailPath = this.generateThumbnailPath(imageName, dimension);
    return this.imageProcessor.resizeImage(
      path.join(__dirname, this.imagesPath, imageName),
      thumbnailPath,
      dimension,
    );
  }

  getExistingThumbnailPath(
    imageName: string,
    dimension: Dimension,
  ): string | null {
    const thumbnailPath = this.generateThumbnailPath(imageName, dimension);

    return fs.existsSync(thumbnailPath) ? thumbnailPath : null;
  }

  generateThumbnailPath(imageName: string, dimension: Dimension): string {
    const { ext: extension, name } = path.parse(imageName);
    return path.join(
      __dirname,
      this.thumbnailsPath,
      `${name}${dimension.width}x${dimension.height}${extension}`,
    );
  }
}
