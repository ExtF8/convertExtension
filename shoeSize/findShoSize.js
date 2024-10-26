import { shoeSizeConversionTable } from './shoeSizeConversionTable.js';

/**
 * Finds a shoe size in the conversion table on the input standard and size.
 * Searches the shoe size conversion table for an entry matching the specified standard and size.
 * @param {string} inputStandart - The standard of the shoe size.
 * @param {number|string} inputSize - The shoe size to search for within the specified standard.
 * @returns {Object|undefined} - The matched shoe size object from the table or undefined if not found.
 */
export function findShoeSize(inputStandart, inputSize) {
    return shoeSizeConversionTable.find(size => size[inputStandart] === inputSize);
}
