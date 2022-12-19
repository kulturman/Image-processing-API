import { Dimension } from "../src/models/dimension";
import { ImageProcessorInterface, ResizedImageResult } from "../src/services/image-processor-interface";

export class FakeImageProcessor implements ImageProcessorInterface {
    constructor(private resolve = true) {}

    resizeImage(source: string, destination: string, dimension: Dimension): Promise<ResizedImageResult> {
        return this.resolve ? Promise.resolve({
            path: '',
            width: 0,
            height: 0
        }): Promise.reject('Cannot process image');
    }
    
}