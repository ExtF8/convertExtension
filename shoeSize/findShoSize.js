import { shoeSizeConversionTable } from './shoeSizeConversionTable.js';

export function findShoeSize(inputStandart, inputSize) {
    return shoeSizeConversionTable.find(size => size[inputStandart] === inputSize);
}
