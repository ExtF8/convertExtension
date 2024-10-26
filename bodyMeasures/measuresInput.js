import { getInputValue, displayError } from '../utils/utils.js';
import { calculateMeasures } from './calculateMeasures.js';

/**
 * A class foe converting measurements between centimeters and inches.
 * Stores measurements in both units for various input types.
 * @class
 */
export class MeasuresConverter {
    /**
     * @constructor
     * Initializes the measure object with properties for each input type, storing values in cm and inch.
     */
    constructor() {
        // Store measurements for each input type
        this.measures = {
            cm: {
                length: null,
                shoulder_width: null,
                waist_size: null,
                sleeve_length: null,
                inseam: null,
                head_circ: null,
                neck_size: null,
                bust_girth: null,
                under_bust: null,
                hip: null,
                hand_circ: null,
            },
            inch: {
                length: null,
                shoulder_width: null,
                waist_size: null,
                sleeve_length: null,
                inseam: null,
                head_circ: null,
                neck_size: null,
                bust_girth: null,
                under_bust: null,
                hip: null,
                hand_circ: null,
            },
        };
    }

    /**
     * Handles input changes by validating and formatting input values,
     * then initiating the conversion process.
     * @param {Object} event - The input event triggered by user interaction.
     */
    handleInputChanges(event) {
        displayError('', 'error-message-measurements');
        let value = getInputValue(event.target);

        // Replace commas with dots for decimal input
        value = value.replace(',', '.');

        const inputType = event.target.getAttribute('data-input-type');
        const measureType = event.target.getAttribute('data-measure-type');

        // Validate that input only contains numbers and a single period (decimal point)
        if (!/^(\d*\.?\d*)$/.test(value)) {
            displayError(
                '*Invalid format. Please enter a valid decimal number.',
                'error-message-measurements'
            );
            return;
        }

        // Set the value back to the input to reflect correct format (e.g., allowing "34.")
        event.target.value = value;

        // Convert value to a float and handle invalid input
        const floatValue = parseFloat(value);

        if (isNaN(value)) {
            displayError(
                '*Invalid format. Please enter a valid decimal number.',
                'error-message-measurements'
            );
            return;
        }

        // Process the conversion based on the input
        this.processConversion(inputType, measureType, floatValue);
    }

    /**
     * Processed the conversion based on input type and measure type, and updates measures.
     * @param {string} inputType - The specific measurement type.
     * @param {string} measureType - The unit type of the input value.
     * @param {number} floatValue - The parsed numeric value of the input.
     */
    processConversion(inputType, measureType, floatValue) {
        // Calculate and update the measures for the given input type and measure type
        this.measures = calculateMeasures(inputType, measureType, floatValue, this.measures);
        this.updateOutputs(inputType);
    }

    /**
     * Updated the display values in both cm and inches for the specified input type.
     * @param {string} inputType - The specific measurement type.
     */
    updateOutputs(inputType) {
        // Find the cm and inch input elements based on inputType
        const cmElement = document.querySelector(
            `[data-input-type='${inputType}'][data-measure-type='cm']`
        );
        const inchElement = document.querySelector(
            `[data-input-type='${inputType}'][data-measure-type='inch']`
        );

        // Update the cm input value if present
        if (cmElement) {
            cmElement.value = this.measures.cm[inputType];
        }

        // Update the inch input value if present
        if (inchElement) {
            inchElement.value = this.measures.inch[inputType];
        }
    }
}
