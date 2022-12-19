import { Dimension } from "../models/dimension";

export interface ImageProcessorInterface {
    resizeImage(source: string, destination: string, dimension: Dimension): Promise<any>;
}

export interface ResizedImageResult {
    path: string,
    width: number,
    height: number
}