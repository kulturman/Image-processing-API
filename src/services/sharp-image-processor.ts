import { Dimension } from "../models/dimension";
import { ImageProcessorInterface, ResizedImageResult } from "./image-processor-interface";
import sharp from "sharp";

export class SharpImageProcessor implements ImageProcessorInterface {

    resizeImage(source: string, destination: string, dimension: Dimension): Promise<ResizedImageResult> {
        return sharp(source)
            .resize(dimension.width, dimension.height)
            .toFile(destination)
            .then(() => {
                return Promise.resolve({
                   path: destination,
                   ...dimension
                });
            })
            .catch(error => {
                return Promise.reject('Unable to process image');
            })
    }
    
}