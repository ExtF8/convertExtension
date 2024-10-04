import { getInputValue, displayError } from '../utils/utils.js';
import { findShoeSize } from './findShoSize.js';

export class ShoeSizeConversion {
    constructor() {
        this.shoeSizes = {
            eur_shoe_size: null,
            mondo_shoe_size: null,
            uk_shoe_size: null,
            us_men_shoe_size: null,
            us_women_shoe_size: null,
            aus_men_shoe_size: null,
            aus_women_shoe_size: null,
        };

        // Define the valid size ranges based on the shoeSizeConversionTable
        this.sizeRanges = {
            eur_shoe_size: { min: 34, max: 50 },
            mondo_shoe_size: { min: 215, max: 320 },
            uk_shoe_size: { min: 2, max: 15 },
            us_men_shoe_size: { min: 3, max: 16 },
            us_women_shoe_size: { min: 4, max: 17 },
            aus_men_shoe_size: { min: 2, max: 15 },
            aus_women_shoe_size: { min: 4, max: 17 },
        };

        // Define valid increments (0.5 for EUR, for example)
        this.validIncrements = {
            eur_shoe_size: 0.5,
            mondo_shoe_size: 5,
            uk_shoe_size: 0.5,
            us_men_shoe_size: 0.5,
            us_women_shoe_size: 0.5,
            aus_men_shoe_size: 0.5,
            aus_women_shoe_size: 0.5,
        };
    }

    handleInputChanges(event) {
        // Clear the error message
        displayError('', 'error-message-shoe');

        let value = getInputValue(event.target);
        // Replace commas with periods (for locales that use commas)
        value = value.replace(',', '.');

        // Validate that input only contains numbers and a single period (decimal point)
        if (!/^(\d*\.?\d*)$/.test(value)) {
            displayError(
                '*Invalid format. Please enter a valid decimal number.',
                'error-message-shoe'
            );
            return;
        }

        // Set the value back to the input to reflect correct format (e.g., allowing "34.")
        event.target.value = value;

        // If value is now a valid number, proceed with conversion
        const floatValue = parseFloat(value);

        // Prevent running logic if value is incomplete (e.g., if user just typed "34.")
        if (!isNaN(floatValue)) {
            // Ensure the value is within the valid range
            const baseSize = event.target.getAttribute('data-input-type');
            if (!this.isValidRange(baseSize, floatValue)) {
                let trimmedSize;
                if (baseSize === 'mondo_shoe_size') {
                    let baseToUpper = baseSize[0].toUpperCase() + baseSize.slice(1);
                    trimmedSize = baseToUpper.split('_')[0];
                } else if (baseSize === 'us_men_shoe_size' || 'us_women_shoe_size') {
                    trimmedSize = baseSize
                        .split('_')
                        .map((part, index) => {
                            return index === 0
                                ? part.toUpperCase()
                                : part.charAt(0).toUpperCase() + part.slice(1);
                        })
                        .join(' ');
                } else {
                    trimmedSize = baseSize.split('_')[0].toUpperCase();
                }

                trimmedSize = trimmedSize.replace('Shoe Size', '');

                const minSize = this.sizeRanges[baseSize].min; // Ensure this exists
                const maxSize = this.sizeRanges[baseSize].max; // Ensure this exists

                const errorMessage = `*${trimmedSize} size must be between ${minSize} and ${maxSize}.`;

                displayError(errorMessage, 'error-message-shoe');
                return;
            }

            // Round the value to the nearest valid increment (e.g., 0.5 for EUR)
            const roundedValue = this.roundToNearestValidIncrement(baseSize, floatValue);

            // Proceed with size conversion using the rounded value
            this.processSizeConversion(baseSize, roundedValue);
        }
    }

    isValidRange(baseSize, value) {
        const range = this.sizeRanges[baseSize];
        if (!range) return true; // If no specific range is defined, assume it's valid
        return value >= range.min && value <= range.max;
    }

    roundToNearestValidIncrement(baseSize, value) {
        const increment = this.validIncrements[baseSize] || 1; // Default to 1 if no specific increment is set
        return Math.round(value / increment) * increment;
    }

    processSizeConversion(baseSize, value) {
        const size = findShoeSize(baseSize, value);
        this.updateShoeSizes(size);
        this.updateOutputs();
    }

    updateShoeSizes(size) {
        Object.keys(this.shoeSizes).forEach(type => {
            this.shoeSizes[type] = size[type];
        });
    }

    updateOutputs() {
        Object.keys(this.shoeSizes).forEach(type => {
            const outputElement = document.querySelector(`[data-input-type='${type}']`);
            if (outputElement) {
                outputElement.value = this.shoeSizes[type];
            }
        });
    }
}
